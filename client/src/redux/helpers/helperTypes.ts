import { Action } from "redux";

export type CreateNoPayloadAction<T> = Action<T>;

export interface CreateAction<T, P> extends CreateNoPayloadAction<T> {
  payload: P;
}
