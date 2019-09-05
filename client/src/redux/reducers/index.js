import { combineReducers } from "redux";
import previewReducer from "./previewReducer";
import websocketReducer from "./websocketReducer";

export default combineReducers({
  preview: previewReducer,
  websocket: websocketReducer
});
