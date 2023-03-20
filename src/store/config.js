import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "./reducers/userReducer";
import { projectDetailReducer } from "./reducers/projectDetailReducer";
import { userManagementReducer } from "./reducers/userManagementReducer";

const rootReducer = combineReducers({
  userReducer,
  projectDetailReducer,
  userManagementReducer,
});

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
