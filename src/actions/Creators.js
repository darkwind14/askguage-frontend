import createAction from './CreateAction';
import Types from './Types';

// const startUp = () => createAction(Types.STARTUP);
// const toggleMessage = (message) => createAction(Types.TOGGLE_MESSAGE, {message});
// const setAppProps = (data) => createAction(Types.SET_APP_PROPS, {data});

const signOut = (data) => createAction(Types.SIGN_OUT, {data});
const signUp = (data) => createAction(Types.SIGN_UP, {data});
const signUpSuccess = (response) => createAction(Types.SIGN_UP_SUCCESS, {response});
const signUpFailure = (errCode) => createAction(Types.SIGN_UP_FAILURE, {errCode});

const login = (data) => createAction(Types.LOG_IN, {data});
const loginSuccess = (response) => createAction(Types.LOG_IN_SUCCESS, {response});
const loginFailure = (errCode) => createAction(Types.LOG_IN_FAILURE, {errCode})

const getUser = (data) => createAction(Types.GET_USERS, {data});
const getUserSuccess = (response) => createAction(Types.GET_USERS_SUCCESS, {response})
const getUserFailure = (errCode) => createAction(Types.GET_USERS_FAILURE, {errCode})

const putProfile = (data) => createAction(Types.PUT_PROFILES, {data});
const putProfileSuccess = (response) => createAction(Types.PUT_PROFILES_SUCCESS, {response});
const putProfileFailure = (errCode) => createAction(Types.PUT_PROFILES_FAILURE, {errCode});

const getSetting = (data) => createAction(Types.GET_SETTINGS, {data});
const getSettingSuccess = (response) => createAction(Types.GET_SETTINGS_SUCCESS, {response});
const getSettingFailure = (errCode) => createAction(Types.GET_SETTINGS_FAILURE, {errCode});

const getQuestions = (data) => createAction(Types.GET_QUESTIONS, {data});
const getQuestionsSuccess = (response) => createAction(Types.GET_QUESTIONS_SUCCESS, {response});
const getQuestionsFailure = (errCode) => createAction(Types.GET_QUESTIONS_FAILURE, {errCode});

const postRequest = (data) => createAction(Types.POST_REQUEST, {data});
const postRequestSuccess = (response) => createAction(Types.POST_REQUEST_SUCCESS, {response});
const postRequestFailure = (errCode) => createAction(Types.POST_REQUEST_FAILURE, {errCode});

const putRequest = (data) => createAction(Types.PUT_REQUEST, {data})
const putRequestSuccess = (response) => createAction(Types.PUT_REQUEST_SUCCESS, {response})
const putRequestFailure = (errCode) => createAction(Types.PUT_REQUEST_FAILURE, {errCode})

const getRequest = (data) => createAction(Types.GET_REQUEST, {data});
const getRequestSuccess = (response) => createAction(Types.GET_REQUEST_SUCCESS, {response});
const getRequestFailure = (errCode) => createAction(Types.GET_REQUEST_FAILURE, {errCode});

const matchRequest = (data) => createAction(Types.MATCH_REQUEST, {data});
const matchRequestSuccess = (response) => createAction(Types.MATCH_REQUEST_SUCCESS, {response});
const matchRequestFailure = (errCode) => createAction(Types.MATCH_REQUEST_FAILURE, {errCode});

const getRequestById = (data) => createAction(Types.GET_REQUEST_BY_ID, {data})
const getRequestByIdSuccess = (response) => createAction(Types.GET_REQUEST_BY_ID_SUCCESS, {response})
const getRequestByIdFailure = (errCode) => createAction(Types.GET_REQUEST_BY_ID_FAILURE, {errCode})

const setRequestType = (data) => createAction(Types.SET_REQUEST_TYPE, {data})
const setRequestTmp = (data) => createAction(Types.SET_REQUEST_TMP, {data})
const removeRequestTmp = () => createAction(Types.REMOVE_REQUEST_TMP)

const bidRequest = (data) => createAction(Types.BID_REQUEST, {data})
const bidRequestSuccess = (response) => createAction(Types.BID_REQUEST_SUCCESS, {response})
const bidRequestFailure = (errCode) => createAction(Types.BID_REQUEST_FAILURE, {errCode})

const getBidRequest = (data) => createAction(Types.GET_BID_REQUEST, {data})
const getBidRequestSuccess = (response) => createAction(Types.GET_BID_REQUEST_SUCCESS, {response})
const getBidRequestFailure = (errCode) => createAction(Types.GET_BID_REQUEST_FAILURE, {errCode})

const changePassword = (data) => createAction(Types.CHANGE_PASSWORD, {data})
const changePasswordSuccess = (response) => createAction(Types.CHANGE_PASSWORD_SUCCESS, {response})
const changePasswordFailure = (errCode) => createAction(Types.CHANGE_PASSWORD_FAILURE, {errCode})

const loginFacebook = (data) => createAction(Types.LOGIN_FACEBOOK, {data})
const loginFacebookSuccess = (response) => createAction(Types.LOGIN_FACEBOOK_SUCCESS, {response})


// const removeMatchingRequest = (data) => createAction(Types.REMOVE_MATCHING_REQUEST, {data})
// const removeMatchingRequestSuccess = (response) => createAction(Types.REMOVE_MATCHING_REQUEST_SUCCESS, {response})
// const removeMatchingRequestFailure = (errCode) => createAction(Types.REMOVE_MATCHING_REQUEST_FAILURE, {errCode})

export default {
    setRequestType,
    setRequestTmp,
    removeRequestTmp,
    signOut,
    signUp,
    signUpSuccess,
    signUpFailure,

    login,
    loginSuccess,
    loginFailure,

    getUser,
    getUserSuccess,
    getUserFailure,

    putProfile,
    putProfileSuccess,
    putProfileFailure,

    getSetting,
    getSettingSuccess,
    getSettingFailure,

    getQuestions,
    getQuestionsSuccess,
    getQuestionsFailure,

    postRequest,
    postRequestSuccess,
    postRequestFailure,

    getRequest,
    getRequestSuccess,
    getRequestFailure,

    putRequest,
    putRequestSuccess,
    putRequestFailure,

    getRequestById,
    getRequestByIdSuccess,
    getRequestByIdFailure,

    matchRequest,
    matchRequestSuccess,
    matchRequestFailure,

    bidRequest,
    bidRequestSuccess,
    bidRequestFailure,

    getBidRequest,
    getBidRequestSuccess,
    getBidRequestFailure,

    changePassword,
    changePasswordSuccess,
    changePasswordFailure,

    loginFacebook,
    loginFacebookSuccess,
}