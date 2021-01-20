import axios from "axios";
import { persistor } from "../store";
import {
    loginSubmitError,
    loginSubmitSuccess,
    LOGIN_SUBMIT,
    LOGOUT,
    logoutError,
    logoutSuccess,
    signupSubmitError,
    signupSubmitSuccess,
    SIGNUP_SUBMIT,
} from "../actions/auth.actions";
import { push } from "connected-react-router";

export const authMiddleware = (store) => (next) => (action) => {
    next(action);

    switch (action.type) {
        case LOGIN_SUBMIT: {
            const loginData = store.getState().authReducer.loginData;

            axios({
                method: "POST",
                url: `${process.env.REACT_APP_API_URL}/auth/login`,
                withCredentials: true,
                data: loginData,
            })
                .then((res) => {
                    const { data } = res;

                    console.log(data.message);

                    if (data.message) {
                        return store.dispatch(loginSubmitError({ message: data.message }));
                    }

                    if (res.status !== 201) return store.dispatch(loginSubmitError());

                    axios.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;

                    store.dispatch(loginSubmitSuccess(data));
                    store.dispatch(push("/dashboard"));
                })
                .catch((err) => {
                    console.log("err", err);
                    store.dispatch(loginSubmitError(err));
                });
            break;
        }
        case LOGOUT: {
            axios({
                method: "GET",
                url: `${process.env.REACT_APP_API_URL}/auth/logout`,
            })
                .then((res) => {
                    console.log(res);
                    store.dispatch(logoutSuccess(res.data));

                    persistor.purge();
                })
                .catch((err) => {
                    console.log(err);
                    store.dispatch(logoutError());
                });
            break;
        }
        case SIGNUP_SUBMIT: {
            const signupData = store.getState().authReducer.signupData;

            axios({
                method: "POST",
                url: `${process.env.REACT_APP_API_URL}/auth/signup`,
                withCredentials: true,
                data: signupData,
            })
                .then((res) => {
                    const { data } = res;

                    if (data.errors) {
                        return store.dispatch(signupSubmitError(data.errors));
                    }

                    if (res.status !== 201) return;

                    store.dispatch(signupSubmitSuccess(data));
                    store.dispatch(push("/dashboard"));
                })
                .catch((err) => {
                    console.log(err);
                    store.dispatch(signupSubmitError());
                });
            break;
        }
    }
};
