import { authReducer } from "./auth.reducer";
import { tradeReducer } from "./trade.reducer";
import { noteReducer } from "./note.reducer";
import { connectRouter } from "connected-react-router";
const { combineReducers } = require("redux");

export const rootReducer = (history) =>
    combineReducers({ router: connectRouter(history), authReducer, tradeReducer, noteReducer });
