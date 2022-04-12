import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import tasksReducer from "./reducers";
import logger from "./middleware/logger";
import analytics from "./middleware/analytics";
import apiMiddleware from "./middleware/api";

const rootReducer = (state = {}, action) => {
  return {
    /* Reducer for tasks state only */
    tasks: tasksReducer(state.tasks, action),
  };
};

const store = createStore(
  rootReducer,
  /* register middlewares with the store */
  composeWithDevTools(applyMiddleware(thunk, apiMiddleware, logger, analytics))
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
