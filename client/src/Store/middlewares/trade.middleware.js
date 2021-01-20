import axios from "axios";
import {
    FETCH_TRADES,
    fetchTradesSuccess,
    fetchTradesError,
    ADD_TRADE,
    addTradeSuccess,
    addTradeError,
    SET_TRADE_UPDATE_ID,
    setTradeUpdateData,
    UPDATE_TRADE,
    updateTradeSuccess,
    updateTradeError,
    DELETE_TRADE,
    deleteTradeSuccess,
    deleteTradeError,
    setShowAddModal,
    setShowUpdateModal,
} from "../actions/trade.actions";
import { validateForm } from "../../Utils/trade.utils";

export const tradeMiddleware = (store) => (next) => (action) => {
    next(action);
    switch (action.type) {
        case FETCH_TRADES: {
            axios({
                method: "GET",
                url: `${process.env.REACT_APP_API_URL}/trade/`,
            })
                .then((res) => {
                    store.dispatch(fetchTradesSuccess(res.data.trades));
                })
                .catch((err) => {
                    console.log(err);
                    store.dispatch(fetchTradesError());
                });
            break;
        }
        case ADD_TRADE: {
            const { tradeData } = store.getState().tradeReducer;
            const { user } = store.getState().authReducer;

            const errors = validateForm(tradeData);

            console.log("errors", errors);

            if (errors) {
                store.dispatch(addTradeError(errors));
                break;
            }
            axios({
                method: "POST",
                url: `${process.env.REACT_APP_API_URL}/trade/${user.id}`,
                data: { ...tradeData, userId: user.id },
            })
                .then((res) => {
                    store.dispatch(addTradeSuccess({ ...res.data }));
                    store.dispatch(setShowAddModal(false));
                })
                .catch((err) => {
                    console.log(err);
                    store.dispatch(addTradeError());
                });

            break;
        }
        case SET_TRADE_UPDATE_ID: {
            const { trades } = store.getState().tradeReducer;
            const tradeUpdateSelect = action.payload;

            const trade = trades.find((trade) => trade._id === tradeUpdateSelect);

            store.dispatch(setTradeUpdateData(trade));
            break;
        }
        case UPDATE_TRADE: {
            console.log("UDAPTE trade");
            const { tradeUpdateData, trades } = store.getState().tradeReducer;
            const { user } = store.getState().authReducer;

            axios({
                method: "PATCH",
                url: `${process.env.REACT_APP_API_URL}/trade/${tradeUpdateData._id}`,
                data: { ...tradeUpdateData, userId: user.id },
            })
                .then((res) => {
                    const tradesUpdate = trades.map((trade) => {
                        if (trade._id === tradeUpdateData._id) {
                            return res.data.doc;
                        } else {
                            return trade;
                        }
                    });

                    store.dispatch(updateTradeSuccess(tradesUpdate));
                    store.dispatch(setShowUpdateModal(false));
                })
                .catch((err) => {
                    console.log(err);
                    store.dispatch(updateTradeError());
                });

            break;
        }
        case DELETE_TRADE: {
            console.log("delete trade");
            const { trades, tradeUpdateId } = store.getState().tradeReducer;

            axios({
                method: "DELETE",
                url: `${process.env.REACT_APP_API_URL}/trade/${tradeUpdateId}`,
            })
                .then((res) => {
                    let removeTrade = trades.filter((trade) => trade._id !== tradeUpdateId);
                    store.dispatch(deleteTradeSuccess(removeTrade));
                })
                .catch((err) => {
                    console.log(err);
                    store.dispatch(deleteTradeError());
                });

            break;
        }
    }
};
