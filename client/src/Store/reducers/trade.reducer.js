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
    DELETE_TRADE,
    DELETE_TRADE_SUCCESS,
    DELETE_TRADE_ERROR,
    SET_SHOW_ADD_MODAL,
    SET_SHOW_UPDATE_MODAL,
} from "../actions/trade.actions";
import moment from "moment";

const initialState = {
    trades: [],
    tradeData:
        process.env.REACT_APP_NODE_ENV === "DEV"
            ? {
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
                  leverage: 3,
                  fees: 1,
                  feeling: "",
                  note:
                      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, fuga amet a reprehenderit consequuntur placeat nisi animi quasi, dicta possimus quidem! Adipisci excepturi qui, dolorum ea voluptatem iusto voluptate enim.",
                  screenshotUrl: "https://www.tradingview.com/x/SmAFIBVz/",
                  entryDate: moment(),
                  exitDate: moment(),
              }
            : {
                  platform: "",
                  type: "",
                  format: "",
                  priceBtcVsUsd: "",
                  assets: "",
                  capital: "",
                  entryPrice: "",
                  stopLoss: "",
                  takeProfit: "",
                  exitPrice: "",
                  riskRatio: "",
                  setup: "",
                  leverage: 1,
                  fees: "",
                  feeling: "",
                  note: "",
                  screenshotUrl: "",
                  entryDate: moment(),
                  exitDate: moment(),
              },
    errorsForm: null,
    showAddModal: false,
    showUpdateModal: false,
    tradeUpdateId: "",
    tradeUpdateData: {
        platform: "",
        type: "",
        format: "",
        priceBtcVsUsd: "",
        assets: "",
        capital: "",
        entryPrice: "",
        stopLoss: "",
        takeProfit: "",
        exitPrice: "",
        riskRatio: "",
        setup: "",
        leverage: 1,
        fees: "",
        feeling: "",
        note: "",
        screenshotUrl: "",
        entryDate: moment(),
        exitDate: moment(),
    },
    tradesLoading: false,
    addTradeLoading: false,
    updateTradeLoading: false,
    deleteTradeLoading: false,
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
                errorsForm: null,
            };
        case ADD_TRADE_ERROR:
            return {
                ...state,
                errorsForm: action.payload,
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
                errorsForm: null,
            };
        case UPDATE_TRADE_ERROR:
            return {
                ...state,
                errorsForm: action.payload,
                updateTradeLoading: false,
            };
        case DELETE_TRADE:
            return {
                ...state,
                deleteTradeLoading: true,
            };
        case DELETE_TRADE_SUCCESS:
            return {
                ...state,
                trades: action.payload,
                deleteTradeLoading: false,
            };
        case DELETE_TRADE_ERROR:
            return {
                ...state,
                deleteTradeLoading: false,
            };
        case SET_SHOW_ADD_MODAL:
            return {
                ...state,
                showAddModal: action.payload,
            };
        case SET_SHOW_UPDATE_MODAL:
            return {
                ...state,
                showUpdateModal: action.payload,
            };
        default:
            return state;
    }
};
