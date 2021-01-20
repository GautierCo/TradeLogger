import HomeDashboard from "../../Components/Dashboard/HomeDashboard/HomeDashboard";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
    pseudo: state.authReducer.user.pseudo,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(HomeDashboard);
