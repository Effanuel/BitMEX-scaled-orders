import {registeredToasts} from './registerToasts';

export default (store: any) => (next: any) => (action: Action) => {
  console.log(action.type, 'TYPE ACTIONTYPR');
  registeredToasts[action.type]?.(store, action);
  next(action);
};
