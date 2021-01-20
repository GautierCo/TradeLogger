import UpdateTrade from "../../Components/Dashboard/TradeLogger/UpdateTrade/UpdateTrade";
import { connect } from "react-redux";
import { setTradeUpdateData, setTradeUpdateId, updateTrade, deleteTrade } from "../../Store/actions/trade.actions";

const mapStateToProps = (state) => ({
    tradeUpdateData: state.tradeReducer.tradeUpdateData,
});

const mapDispatchToProps = (dispatch) => ({
    setTradeUpdateId: (tradeUpdateId) => {
        dispatch(setTradeUpdateId(tradeUpdateId));
    },
    setTradeUpdateData: (tradeUpdateData) => {
        dispatch(setTradeUpdateData(tradeUpdateData));
    },
    updateTrade: () => {
        dispatch(updateTrade());
    },
    deleteTrade: () => {
        dispatch(deleteTrade());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTrade);
