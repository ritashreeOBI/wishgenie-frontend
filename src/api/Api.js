// const baseUrl = "https://chat.wishgenie.io/api"
//const baseUrl = "https://talk.wishgenie.io/api";
// const baseUrl = //"https://wg-alb-backend-2025890274.ap-south-1.elb.amazonaws.com/api";

//const baseUrl = "http://3.6.231.0:5000/api"
// const baseUrl = "http://3.6.231.0:7000/api"

//const baseUrl = "http://preprod-wg-backend-alb-1676339817.ap-south-1.elb.amazonaws.com/api"


const baseUrl = "http://3.111.156.224:5000/api"
export const PREDICTION = `${baseUrl}/chat_prediction`;

export const SHOPPING_RESULT = `${baseUrl}/online_shopping_text`;

export const IMAGE_SEARCH = `${baseUrl}/get_exctracted_objects`;

export const optionAPI = `${baseUrl}/get_exctracted_objects_shoppingLinks`;

// ======================AUTH=======================

// const authBaseUrl = "http://localhost:8003/api";
const authBaseUrl = "https://services.wishgenie.io/user/api";
export const LOGIN = `${authBaseUrl}/login`;
export const USER_REGISTER = `${authBaseUrl}/register`;
export const CHECK_AUTH = `${authBaseUrl}/check_auth`;
export const VERIFY_EMAIL_ADDRESS = `${authBaseUrl}/verify_email_address`;
export const SEND_OTP = `${authBaseUrl}/send_otp`;
export const Google_Register = `${authBaseUrl}/google_register`;
export const Facebook_Register = `${authBaseUrl}/facebook_register`;
export const FORGOT_PASSWORD = `${authBaseUrl}/forgot-password`; // send link to email address
export const RESET_PASSWORD = `${authBaseUrl}/reset-password`; //update password
export const CHECK_EXPIRY = `${authBaseUrl}/check-expiry`; //CHECK if reset password link expired or not

////////////////address routes
export const ADD_ADDRESS = `${authBaseUrl}/add_address`;
export const UPDATE_ADDRESS = `${authBaseUrl}/update_address`;
export const DELETE_ADDRESS = `${authBaseUrl}/delete_address`;
export const GET_ADDRESSES = `${authBaseUrl}/get_addresses`;
export const SET_DEFAULT_ADDRESS = `${authBaseUrl}/set_default_address`;

// const productBaseUrl = "http://localhost:8001/api/product";
const productBaseUrl = "https://services.wishgenie.io/product/api/product";
export const GET_PRODUCTS = `${productBaseUrl}/getProducts`;
export const GET_TOTAL_PRODUCTS = `${productBaseUrl}/getProductCounts`;

/*** Printful API ***/
export const printFullApi = baseUrl;
export  const MOCKUP_TEMPLATE = `${baseUrl}/mockup_template`
