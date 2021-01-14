import axios from "axios";
import {
    loginSubmitError,
    loginSubmitSuccess,
    LOGIN_SUBMIT,
    LOGOUT,
    logoutError,
    logoutSuccess,
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
                    console.log(res);
                    const { data } = res;
                    if (res.status !== 201) return store.dispatch(loginSubmitError());

                    //localStorage.setItem("auth", JSON.stringify(data));

                    console.log("data.accessToken", data.accessToken);
                    axios.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;

                    store.dispatch(loginSubmitSuccess(data));
                    store.dispatch(push("/dashboard"));
                })
                .catch((err) => {
                    console.log(err);
                    store.dispatch(loginSubmitError());
                });
            break;
        }
        case LOGOUT: {
            const { accessToken } = store.getState().authReducer.user;

            axios({
                method: "GET",
                url: `${process.env.REACT_APP_API_URL}/auth/logout`,

                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
                .then((res) => {
                    console.log(res);
                    store.dispatch(logoutSuccess(res.data));
                    //store.dispatch(push("/login"));
                })
                .catch((err) => {
                    console.log(err);
                    store.dispatch(logoutError());
                });
            break;
        }
    }
};
