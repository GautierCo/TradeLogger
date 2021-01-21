import {
    SET_ACCESS_TOKEN,
    SET_LOGIN_DATA,
    LOGIN_SUBMIT,
    LOGIN_SUBMIT_SUCCESS,
    LOGIN_SUBMIT_ERROR,
    LOGOUT_SUCCESS,
    SET_SIGNUP_DATA,
    SIGNUP_SUBMIT,
    SIGNUP_SUBMIT_SUCCESS,
    SIGNUP_SUBMIT_ERROR,
} from "../actions/auth.actions";

const initialState = {
    user: {
        id: "",
        accessToken: "",
        refreshToken: "",
        connected: false,
    },
    loginData:
        process.env.REACT_APP_NODE_ENV === "DEV"
            ? {
                  email: "test@gmail.com",
                  password: "123456",
              }
            : {
                  email: "",
                  password: "",
              },
    loginLoading: false,
    loginErrors: {
        message: "",
    },
    signupData: {
        email: "",
        pseudo: "",
        password: "",
        confirmPassword: "",
    },
    signupLoading: false,
    signupErrors: {
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
                loginData: { email: "", password: "" },
            };
        case LOGIN_SUBMIT_ERROR:
            return {
                ...state,
                loginErrors: {
                    message: action.payload.message,
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
        case SET_SIGNUP_DATA: {
            return {
                ...state,
                signupData: {
                    ...state.signupData,
                    ...action.payload,
                },
            };
        }
        case SIGNUP_SUBMIT: {
            return {
                ...state,
                signupLoading: true,
                signupErrors: {
                    message: "",
                },
            };
        }
        case SIGNUP_SUBMIT_SUCCESS: {
            return {
                ...state,
                signupLoading: false,
                signupData: {
                    email: "",
                    pseudo: "",
                    password: "",
                    confirmPassword: "",
                },
            };
        }
        case SIGNUP_SUBMIT_ERROR: {
            return {
                ...state,
                signupLoading: false,
                signupErrors: {
                    ...action.payload,
                },
            };
        }
        default:
            return state;
    }
};
