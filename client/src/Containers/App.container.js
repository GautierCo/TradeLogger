import App from "../App";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
    user: state.authReducer.user,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
