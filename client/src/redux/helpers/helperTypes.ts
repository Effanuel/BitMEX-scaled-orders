import { Action } from "redux";

export interface createAction<T, P = undefined> extends Action {
  type: T;
  payload?: P;
}
