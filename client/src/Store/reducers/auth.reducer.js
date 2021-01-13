import { SET_LOGIN_DATA, LOGIN_SUBMIT, LOGIN_SUBMIT_SUCCESS, LOGIN_SUBMIT_ERROR } from "../actions/auth.actions";

const initialState = {
    loginData: {
        email: "gautiear.colasse@gmail.com",
        password: "123456",
    },
    user: {
        id: "",
        token: "",
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
        default:
            return state;
    }
};
