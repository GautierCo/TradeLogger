import Login from "../../Components/Site/Auth/Login/Login";
import { connect } from "react-redux";
import { setLoginData, loginSubmit } from "../../Store/actions/auth.actions";

const mapStateToProps = (state) => ({
    loginData: state.authReducer.loginData,
    loginErrors: state.authReducer.loginErrors,
    loginLoading: state.authReducer.loginLoading,
    user: state.authReducer.user,
});

const mapDispatchToProps = (dispatch) => ({
    setLoginData: (loginData) => dispatch(setLoginData(loginData)),
    loginSubmit: () => dispatch(loginSubmit()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
