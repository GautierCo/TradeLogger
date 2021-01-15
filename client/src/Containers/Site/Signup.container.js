import Signup from "../../Components/Site/Auth/Signup/Signup";
import { connect } from "react-redux";
import { setSignupData, signupSubmit } from "../../Store/actions/auth.actions";

const mapStateToProps = (state) => ({
    signupErrors: state.authReducer.signupErrors,
    signupLoading: state.authReducer.signupLoading,
});

const mapDispatchToProps = (dispatch) => ({
    setSignupData: (signupData) => dispatch(setSignupData(signupData)),
    signupSubmit: () => dispatch(signupSubmit()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
