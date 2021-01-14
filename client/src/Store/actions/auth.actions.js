export const SET_LOGIN_DATA = "SET_LOGIN_DATA";
export const LOGIN_SUBMIT = "LOGIN_SUBMIT";
export const LOGIN_SUBMIT_SUCCESS = "LOGIN_SUBMIT_SUCCESS";
export const LOGIN_SUBMIT_ERROR = "LOGIN_SUBMIT_ERROR";
export const LOGOUT = "LOGOUT";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";
export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";

export const setLoginData = (payload) => ({
    type: SET_LOGIN_DATA,
    payload,
});

export const loginSubmit = () => ({
    type: LOGIN_SUBMIT,
});

export const loginSubmitSuccess = (payload) => ({
    type: LOGIN_SUBMIT_SUCCESS,
    payload,
});

export const loginSubmitError = (payload) => ({
    type: LOGIN_SUBMIT_ERROR,
    payload,
});

export const logout = () => ({
    type: LOGOUT,
});

export const logoutSuccess = (payload) => ({
    type: LOGOUT_SUCCESS,
    payload,
});

export const logoutError = () => ({
    type: LOGOUT_ERROR,
});

export const setAccessToken = (payload) => ({
    type: SET_ACCESS_TOKEN,
    payload,
});
