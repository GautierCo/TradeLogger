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
