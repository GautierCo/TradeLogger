import {
    FETCH_TRADES,
    FETCH_TRADES_SUCCESS,
    FETCH_TRADES_ERROR,
    ADD_TRADE,
    ADD_TRADE_SUCCESS,
    ADD_TRADE_ERROR,
    SET_TRADE_DATA,
    SET_TRADE_UPDATE_ID,
    SET_TRADE_UPDATE_DATA,
    UPDATE_TRADE,
    UPDATE_TRADE_SUCCESS,
    UPDATE_TRADE_ERROR,
} from "../actions/trade.actions";
import moment from "moment";

const initialState = {
    trades: [],
    tradeData: {
        platform: "Binance",
        type: "Long",
        format: "USDT",
        priceBtcVsUsd: "",
        assets: "BTC/USDT",
        capital: 1000,
        entryPrice: 2500,
        stopLoss: 2000,
        takeProfit: 3000,
        exitPrice: "",
        riskRatio: 2,
        setup: "Ichimoku",
        leverage: 1,
        fees: 1,
        note: "",
        screenshotUrl: "",
        entryDate: moment(),
        exitDate: moment(),
    },
    tradeUpdateId: "",
    tradeUpdateData: {},
    tradesLoading: false,
    addTradeLoading: false,
    updateTradeLoading: false,
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
        case SET_TRADE_DATA:
            return {
                ...state,
                tradeData: {
                    ...state.tradeData,
                    ...action.payload,
                },
            };
        case ADD_TRADE:
            return {
                ...state,
                addTradeLoading: true,
            };
        case ADD_TRADE_SUCCESS:
            return {
                ...state,
                trades: [...state.trades, action.payload],
                addTradeLoading: false,
            };
        case ADD_TRADE_ERROR:
            return {
                ...state,
                addTradeLoading: false,
            };

        case SET_TRADE_UPDATE_ID:
            return {
                ...state,
                tradeUpdateId: action.payload,
            };
        case SET_TRADE_UPDATE_DATA:
            return {
                ...state,
                tradeUpdateData: {
                    ...state.tradeUpdateData,
                    ...action.payload,
                },
            };
        case UPDATE_TRADE:
            return {
                ...state,
                updateTradeLoading: true,
            };
        case UPDATE_TRADE_SUCCESS:
            return {
                ...state,
                trades: action.payload,
                updateTradeLoading: false,
            };
        case UPDATE_TRADE_ERROR:
            return {
                ...state,
                updateTradeLoading: false,
            };

        default:
            return state;
    }
};
