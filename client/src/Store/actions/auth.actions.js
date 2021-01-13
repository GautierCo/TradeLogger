export const SET_LOGIN_DATA = "SET_LOGIN_DATA";
export const LOGIN_SUBMIT = "LOGIN_SUBMIT";
export const LOGIN_SUBMIT_SUCCESS = "LOGIN_SUBMIT_SUCCESS";
export const LOGIN_SUBMIT_ERROR = "LOGIN_SUBMIT_ERROR";

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
