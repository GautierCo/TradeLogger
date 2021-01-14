import axios from "axios";
import jwt_decode from "jwt-decode";
import { setAccessToken } from "../actions/auth.actions";

export const refreshTokenMiddleware = (store) => (next) => (action) => {
    next(action);
    const { accessToken, refreshToken, connected, id } = store.getState().authReducer.user;

    if (!connected) return;

    const decodedToken = jwt_decode(accessToken);

    const timestamp = Date.now() / 1000;

    if (decodedToken.exp <= timestamp) {
        console.log("Faire une requête pour refresh le token");

        const data = {
            id,
            accessToken,
            refreshToken,
        };

        axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_URL}/auth/refresh`,
            withCredentials: true,
            data,
        })
            .then((res) => {
                console.log(res);
                axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.accessToken}`;
                store.dispatch(setAccessToken(res.data.accessToken));
            })
            .catch((err) => {
                console.log(err);
            });
    }
};
