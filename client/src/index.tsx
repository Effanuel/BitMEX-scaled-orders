import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// REDUX
import { Provider } from "react-redux";
import { store } from "redux/store";
// Service worker
import * as serviceWorker from "./serviceWorker";
// Theme
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
);

serviceWorker.unregister();
