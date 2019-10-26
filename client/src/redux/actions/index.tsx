import * as constants from "./actionTypes";

// ACTION INTERFACES
export interface PostOrderLoading {
  type: constants.POST_ORDER_LOADING;
  error: string;
  loading: boolean;
}
export interface PostOrderSuccess {
  type: constants.POST_ORDER_SUCCESS;
  payload: any;
  showPreview: boolean;
  error: string;
  orders: any; //object[];
  loading: boolean;
}
export interface PostOrderError {
  showPreview: boolean;
  orders: object[];
  error: string;
  loading: boolean;
}
export interface PreviewOrdersSuccess {
  showPreview: boolean;
  orders: any; //ojbect[]
  error: string;
}
