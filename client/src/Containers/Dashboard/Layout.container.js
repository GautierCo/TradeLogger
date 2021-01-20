import Layout from "../../Components/Dashboard/Layout";
import { connect } from "react-redux";
import { logout } from "../../Store/actions/auth.actions";

const mapStateToProps = (state) => ({
    pseudo: state.authReducer.user.pseudo,
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
