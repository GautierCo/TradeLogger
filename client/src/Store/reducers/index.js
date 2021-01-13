import { authReducer } from "./auth.reducer";
const { combineReducers } = require("redux");

export const rootReducer = combineReducers({ authReducer });
