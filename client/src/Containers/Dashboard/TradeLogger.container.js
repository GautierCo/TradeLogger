import TradeLogger from "../../Components/Dashboard/TradeLogger/TradeLogger";
import { connect } from "react-redux";
import { fetchTrades } from "../../Store/actions/trade.actions";

const mapStateToProps = (state) => ({
    trades: state.tradeReducer.trades,
    tradeData: state.tradeReducer.tradeData,
    tradeUpdateId: state.tradeReducer.tradeUpdateId,
    showAddModal: state.tradeReducer.showAddModal,
    showUpdateModal: state.tradeReducer.showUpdateModal,
});

const mapDispatchToProps = (dispatch) => ({
    fetchTrades: () => {
        dispatch(fetchTrades());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(TradeLogger);
