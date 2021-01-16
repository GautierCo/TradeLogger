import axios from "axios";
import {
    FETCH_TRADES,
    fetchTradesSuccess,
    fetchTradesError,
    ADD_TRADE,
    addTradeSuccess,
    addTradeError,
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
                    //store.dispatch(addTradeError());
                });

            break;
        }
    }
};
