export const FETCH_TRADES = "FETCH_TRADES";
export const FETCH_TRADES_SUCCESS = "FETCH_TRADES_SUCCESS";
export const FETCH_TRADES_ERROR = "FETCH_TRADES_ERROR";

export const fetchTrades = () => ({
    type: FETCH_TRADES,
});

export const fetchTradesSuccess = (payload) => ({
    type: FETCH_TRADES_SUCCESS,
    payload,
});

export const fetchTradesError = (payload) => ({
    type: FETCH_TRADES_ERROR,
    payload,
});

export const SET_TRADE_DATA = "SET_TRADE_DATA";
export const ADD_TRADE = "ADD_TRADE";
export const ADD_TRADE_SUCCESS = "ADD_TRADE_SUCCESS";
export const ADD_TRADE_ERROR = "ADD_TRADE_ERROR";

export const setTradeData = (payload) => ({
    type: SET_TRADE_DATA,
    payload,
});

export const addTrade = () => ({
    type: ADD_TRADE,
});

export const addTradeSuccess = (payload) => ({
    type: ADD_TRADE_SUCCESS,
    payload,
});

export const addTradeError = (payload) => ({
    type: ADD_TRADE_ERROR,
    payload,
});
