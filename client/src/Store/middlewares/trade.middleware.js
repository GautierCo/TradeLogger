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
} from "../actions/trade.actions";

export const tradeMiddleware = (store) => (next) => (action) => {
    next(action);
    switch (action.type) {
        case FETCH_TRADES: {
            axios({
                method: "GET",
                url: `${process.env.REACT_APP_API_URL}/trade/`,
            })
                .then((res) => {
                    console.log(res);
                    store.dispatch(fetchTradesSuccess(res.data.trades));
                })
                .catch((err) => {
                    console.log(err);
                    store.dispatch(fetchTradesError());
                });
            break;
        }
        case ADD_TRADE: {
            console.log("add trade");
            const { tradeData } = store.getState().tradeReducer;
            const { user } = store.getState().authReducer;

            axios({
                method: "POST",
                url: `${process.env.REACT_APP_API_URL}/trade/${user.id}`,
                data: { ...tradeData, userId: user.id },
            })
                .then((res) => {
                    console.log(res);
                    store.dispatch(addTradeSuccess({ ...res.data }));
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
            const { tradeUpdateData } = store.getState().tradeReducer;
            const { user } = store.getState().authReducer;
            /*
            axios({
                method: "POST",
                url: `${process.env.REACT_APP_API_URL}/trade/${user.id}`,
                data: { ...tradeUpdateData, userId: user.id },
            })
                .then((res) => {
                    console.log(res);
                    store.dispatch(addTradeSuccess({ ...res.data }));
                })
                .catch((err) => {
                    console.log(err);
                    store.dispatch(addTradeError());
                });
*/
            break;
        }
    }
};
