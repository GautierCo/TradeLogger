import AddTrade from "../../../Components/Dashboard/TradeLogger/AddTrade/AddTrade";
import { connect } from "react-redux";
import { addTrade, setTradeData, setShowAddModal } from "../../../Store/actions/trade.actions";

const mapStateToProps = (state) => ({
    tradeData: state.tradeReducer.tradeData,
    errors: state.tradeReducer.errorsForm,
    showAddModal: state.tradeReducer.showAddModal,
});

const mapDispatchToProps = (dispatch) => ({
    setTradeData: (tradeData) => {
        dispatch(setTradeData(tradeData));
    },
    addTrade: () => {
        dispatch(addTrade());
    },
    setShowAddModal: (bool) => {
        dispatch(setShowAddModal(bool));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTrade);
