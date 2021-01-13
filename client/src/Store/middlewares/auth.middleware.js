import axios from "axios";
import { loginSubmitError, loginSubmitSuccess, LOGIN_SUBMIT } from "../actions/auth.actions";

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
                    store.dispatch(loginSubmitSuccess(data));
                })
                .catch((err) => {
                    console.log(err);
                    store.dispatch(loginSubmitError());
                });
            break;
        }
    }
};
