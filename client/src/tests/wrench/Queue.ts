import EventEmitter from 'events';

enum State {
  IDLE = 0,
  RUNNING = 1,
  STOPPED = 2,
}

type Tasks<T> = {[key: string]: () => Promise<T>};

export default class Queue<T = any> extends EventEmitter {
  private tasks: Tasks<T> = {};
  private logs: obj[] = [];
  private state: State = State.IDLE;
  private currentlyHandled = 0;
  private concurrent = 1;

  private stop() {
    this.state = State.STOPPED;
    this.emit('stop');
  }

  private async execute(id: string) {
    const promises: Promise<T>[] = [];
    const promise = this.tasks?.[id];
    if (!promise) {
      throw new Error(`Promise with id '${id}' is not defined.`);
    }

    if (this.currentlyHandled < this.concurrent) {
      this.currentlyHandled++;
      delete this.tasks[id];

      promises.push(
        Promise.resolve(promise())
          .then((value) => {
            this.emit('resolve', value);
            return value;
          })
          .catch((error) => {
            this.emit('reject', error);
            return error;
          })
          .finally(() => {
            this.emit('dequeue');
            this.finalize();
          }),
      );
    }

    const output = await Promise.all(promises);

    return this.concurrent === 1 ? output[0] : output;
  }

  private finalize() {
    this.currentlyHandled -= 1;

    if (this.currentlyHandled === 0 && this.isEmpty) {
      this.stop();
      this.state = State.IDLE;
      this.emit('end');
    }
  }

  dequeue(id: string) {
    return new Promise((resolve, reject) => {
      setImmediate(() => void this.execute(id).then(resolve));
    });
  }

  enqueue(tasks: Tasks<T>) {
    const currentTasks = Object.keys(this.tasks);
    Object.keys(tasks).forEach((taskId) => {
      if (currentTasks.includes(taskId)) {
        throw new Error(`Task with id "${taskId}" has already been enqueued`);
      }
    });
    this.tasks = {...this.tasks, ...tasks};
  }

  clear() {
    this.tasks = {};
    this.logs = [];
  }

  getLogs() {
    return this.logs;
  }

  log(event: obj) {
    this.logs.push(event);
  }

  get isEmpty() {
    return Object.keys(this.tasks).length === 0;
  }

  get shouldRun() {
    return !this.isEmpty && this.state !== State.STOPPED;
  }
}
