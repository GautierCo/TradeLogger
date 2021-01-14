import {
    SET_ACCESS_TOKEN,
    SET_LOGIN_DATA,
    LOGIN_SUBMIT,
    LOGIN_SUBMIT_SUCCESS,
    LOGIN_SUBMIT_ERROR,
    LOGOUT_SUCCESS,
} from "../actions/auth.actions";

const initialState = {
    loginData: {
        email: "gautiear.colasse@gmail.com",
        password: "123456",
    },
    user: {
        id: "",
        accessToken: "",
        refreshToken: "",
        connected: false,
    },
    loginLoading: false,
    loginErrors: {
        message: "",
    },
};

export const authReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_LOGIN_DATA:
            return {
                ...state,
                loginData: {
                    ...state.loginData,
                    ...action.payload,
                },
                loginErrors: {},
            };
        case LOGIN_SUBMIT:
            return {
                ...state,
                loginLoading: true,
            };
        case LOGIN_SUBMIT_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload,
                },
                loginErrors: {},
                loginLoading: false,
            };
        case LOGIN_SUBMIT_ERROR:
            return {
                ...state,
                loginErrors: {
                    ...state.loginErrors,
                    ...action.payload,
                },
                loginLoading: false,
            };
        case SET_ACCESS_TOKEN:
            return {
                ...state,
                user: {
                    ...state.user,
                    accessToken: action.payload,
                },
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload,
                },
            };
        default:
            return state;
    }
};
