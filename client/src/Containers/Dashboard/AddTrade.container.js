import AddTrade from "../../Components/Dashboard/TradeLogger/AddTrade/AddTrade";
import { connect } from "react-redux";
import { addTrade, setTradeData } from "../../Store/actions/trade.actions";

const mapStateToProps = (state) => ({
    tradeData: state.tradeReducer.tradeData,
});

const mapDispatchToProps = (dispatch) => ({
    setTradeData: (tradeData) => {
        dispatch(setTradeData(tradeData));
    },
    addTrade: () => {
        dispatch(addTrade());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTrade);
