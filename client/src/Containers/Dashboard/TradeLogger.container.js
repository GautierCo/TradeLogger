import TradeLogger from "../../Components/Dashboard/TradeLogger/TradeLogger";
import { connect } from "react-redux";
import { fetchTrades } from "../../Store/actions/trade.actions";

const mapStateToProps = (state) => ({
    trades: state.tradeReducer.trades,
    tradeData: state.tradeReducer.tradeData,
});

const mapDispatchToProps = (dispatch) => ({
    fetchTrades: () => {
        dispatch(fetchTrades());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(TradeLogger);
