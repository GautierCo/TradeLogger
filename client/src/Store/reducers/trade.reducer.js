import { FETCH_TRADES, FETCH_TRADES_SUCCESS, FETCH_TRADES_ERROR } from "../actions/trade.actions";

const initialState = {
    trades: [],
    tradesLoading: false,
};

export const tradeReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case FETCH_TRADES:
            return {
                ...state,
                tradesLoading: true,
            };
        case FETCH_TRADES_SUCCESS:
            return {
                ...state,
                trades: [...action.payload],
                tradesLoading: false,
            };
        case FETCH_TRADES_ERROR:
            return {
                ...state,
                tradesLoading: false,
            };

        default:
            return state;
    }
};
