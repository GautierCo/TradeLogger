import UpdateTrade from "../../../Components/Dashboard/TradeLogger/UpdateTrade/UpdateTrade";
import { connect } from "react-redux";
import {
    setTradeUpdateData,
    setTradeUpdateId,
    updateTrade,
    deleteTrade,
    setShowUpdateModal,
} from "../../../Store/actions/trade.actions";

const mapStateToProps = (state) => ({
    tradeUpdateData: state.tradeReducer.tradeUpdateData,
    errors: state.tradeReducer.errorsForm,
    showUpdateModal: state.tradeReducer.showUpdateModal,
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
    setShowUpdateModal: (bool) => {
        dispatch(setShowUpdateModal(bool));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTrade);
