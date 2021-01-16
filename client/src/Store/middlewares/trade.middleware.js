import axios from "axios";
import { FETCH_TRADES, fetchTradesSuccess, fetchTradesError } from "../actions/trade.actions";

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
    }
};
