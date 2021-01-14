import { authReducer } from "./auth.reducer";
import { connectRouter } from "connected-react-router";
const { combineReducers } = require("redux");

export const rootReducer = (history) => combineReducers({ router: connectRouter(history), authReducer });
