export const SET_LOGIN_DATA = "SET_LOGIN_DATA";
export const SET_SIGNUP_DATA = "SET_SIGNUP_DATA";
export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";

export const SIGNUP_SUBMIT = "SIGNUP_SUBMIT";
export const SIGNUP_SUBMIT_SUCCESS = "SIGNUP_SUBMIT_SUCCESS";
export const SIGNUP_SUBMIT_ERROR = "SIGNUP_SUBMIT_ERROR";

export const LOGIN_SUBMIT = "LOGIN_SUBMIT";
export const LOGIN_SUBMIT_SUCCESS = "LOGIN_SUBMIT_SUCCESS";
export const LOGIN_SUBMIT_ERROR = "LOGIN_SUBMIT_ERROR";

export const LOGOUT = "LOGOUT";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";

export const setLoginData = (payload) => ({
    type: SET_LOGIN_DATA,
    payload,
});

export const setSignupData = (payload) => ({
    type: SET_SIGNUP_DATA,
    payload,
});

export const setAccessToken = (payload) => ({
    type: SET_ACCESS_TOKEN,
    payload,
});

export const signupSubmit = () => ({
    type: SIGNUP_SUBMIT,
});

export const signupSubmitSuccess = (payload) => ({
    type: SIGNUP_SUBMIT_SUCCESS,
    payload,
});

export const signupSubmitError = (payload) => ({
    type: SIGNUP_SUBMIT_ERROR,
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
