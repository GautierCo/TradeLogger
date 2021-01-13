// Store

import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "./reducers";
import { authMiddleware } from "./middlewares/auth.middleware";

const composeEnhancers = (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const enhancer = composeEnhancers(applyMiddleware(authMiddleware));

const store = createStore(rootReducer, enhancer);

export default store;
