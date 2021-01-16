import TradeLogger from "../../Components/Dashboard/TradeLogger/TradeLogger";
import { connect } from "react-redux";
import { fetchTrades, addTrade, setTradeData } from "../../Store/actions/trade.actions";

const mapStateToProps = (state) => ({
    trades: state.tradeReducer.trades,
    tradeData: state.tradeReducer.tradeData,
});

const mapDispatchToProps = (dispatch) => ({
    fetchTrades: () => {
        dispatch(fetchTrades());
    },
    setTradeData: (tradeData) => {
        dispatch(setTradeData(tradeData));
    },
    addTrade: () => {
        dispatch(addTrade());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(TradeLogger);
