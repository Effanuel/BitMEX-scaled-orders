import {registeredToasts} from './registerToasts';

export default (store: any) => (next: any) => (action: Action) => {
  registeredToasts[action.type]?.(store, action);
  next(action);
};
