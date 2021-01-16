import UpdateTrade from "../../Components/Dashboard/TradeLogger/UpdateTrade/UpdateTrade";
import { connect } from "react-redux";
import { setTradeUpdateData, setTradeUpdateId, updateTrade } from "../../Store/actions/trade.actions";

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
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTrade);
