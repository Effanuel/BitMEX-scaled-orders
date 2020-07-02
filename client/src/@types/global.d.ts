interface Action {
  readonly type: string;
  readonly payload?: any;
}

type unnull = undefined | null;
