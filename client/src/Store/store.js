// Store

import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { rootReducer } from "./reducers";
import { routerMiddleware } from "connected-react-router";
import { authMiddleware } from "./middlewares/auth.middleware";
import { refreshTokenMiddleware } from "./middlewares/refreshToken.middleware";
import { createBrowserHistory } from "history";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    whitelist: ["authReducer"],
    blacklist: ["router"],
    storage,
};

export const history = createBrowserHistory();

const composeEnhancers = (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const enhancers = composeEnhancers(applyMiddleware(routerMiddleware(history), authMiddleware, refreshTokenMiddleware));

const persistedReducer = persistReducer(persistConfig, rootReducer(history));

const store = createStore(persistedReducer, enhancers);

const persistor = persistStore(store);

export { store, persistor };
