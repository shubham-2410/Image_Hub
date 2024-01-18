
const BASE_URL = process.env.REACT_APP_BASE_URL

export const  endPoints = {
    SIGNUP_API : BASE_URL + "/auth/signup",
    LOGIN_API : BASE_URL + "/auth/login",

    SESSION_API : BASE_URL + '/auth/session',

    SENDOTP_API :BASE_URL +"/password/sendotp",
    RESETPASSWORD_API: BASE_URL + "/password/reset",
}

export const imageEndPoints = {
    UPLOADIMAGE_API : BASE_URL + '/image/upload',
    GETALL_API : BASE_URL + '/image/get-all',
    UPDATECOUNT_API : BASE_URL + '/image/count'
}