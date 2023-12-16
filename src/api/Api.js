// const baseUrl = "https://chat.wishgenie.io/api"
//const baseUrl = "https://talk.wishgenie.io/api";
// const baseUrl = //"https://wg-alb-backend-2025890274.ap-south-1.elb.amazonaws.com/api";

//const baseUrl = "http://3.6.231.0:5000/api"
// const baseUrl = "http://3.6.231.0:7000/api"

//const baseUrl = "http://preprod-wg-backend-alb-1676339817.ap-south-1.elb.amazonaws.com/api"

const baseUrl = "http://3.111.156.224:5000/api";

export const PREDICTION = `${baseUrl}/chat_prediction`;

export const SHOPPING_RESULT = `${baseUrl}/online_shopping_text`;

//export const IMAGE_SEARCH = `${baseUrl}/get_exctracted_objects`;

export const IMAGE_SEARCH = `${baseUrl}/upload_image_for_chckeing_and_object_detection`;

export const optionAPI = `${baseUrl}/get_exctracted_objects_shoppingLinks`;

// ======================AUTH=======================

// const authBaseUrl = "http://localhost:8003/api";
// const authBaseUrl = "https://services.wishgenie.io/user/api";
const authBaseUrl = process.env.NEXT_PUBLIC_AUTH_BASE_URL;

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

export const STRIPE_ONBOARD = `${authBaseUrl}/onboard-user`;
export const STRIPE_CREATE_INTENT = `${authBaseUrl}/create-intent`;
export const STRIPE_UPDATE_PAYMENT_STATUS = `${authBaseUrl}/payment`;
export const STRIPE_PAYOUT_USER = `${authBaseUrl}/payout-user`;
export const STRIPE_CREATE_INTENT_FOR_PLAN = `${authBaseUrl}/plan/create-intent`;

export const UPLOAD_PRODCUT_ART = `${authBaseUrl}/image_upload`;

//const productBaseUrl = "http://3.111.156.224:8001/api/product";

const productBaseUrl = "http://localhost:8001/api/product";

//const productBaseUrl = "https://services.wishgenie.io/product/api/product";
export const GET_PRODUCTS = `${productBaseUrl}/getProducts`;

export const GET_TOTAL_PRODUCTS = `${productBaseUrl}/getProductCounts`;

export const GET_ALL_PRODUCTS = `${productBaseUrl}/getAllProducts`;

export const GET_PRODUCT_DETAIL = `${productBaseUrl}/get_product_detail`;

/* price  */
const priceBaseUrl = "https://services.wishgenie.io/product/api/product";
export const priceIncrementor = `${priceBaseUrl}/update`;

/*** Printful API ***/
export const printFullApi = baseUrl;

//export  const MOCKUP_TEMPLATE = `${baseUrl}/mockup_template`
export const MOCKUP_TEMPLATE =
  "http://3.111.156.224:8005/api/printful/mockup-generator/templates";

/* EDITOR */
export const TEXT_IMAGE_GENERATION =
  "http://3.111.156.224:5000/api/provide_image_description";

export const IMAGE_VARIANT_GENERATION =
  "http://3.111.156.224:5000/api/process_image";

export const MULTI_IMAGE_GENERATION =
  "http://3.111.156.224:5000/api/generate_image_with_ai";

// art wall
//const ArtwallURL = 'http://3.111.156.224:8007/art'

const ArtwallURL = "http://localhost:8007/art";

export const IMAGE_APPORVAL_REQUEST = `${ArtwallURL}/admin/aprroval_requests`;

export const IMAGE_APPROVE_DENY_REQUEST = `${ArtwallURL}/admin/request`;

export const IMAGE_UPLOAD_REQUEST = `${ArtwallURL}/upload`;

//ORDER
const ORDER_URL = "http://localhost:8002/api";

export const ADD_TO_CART = `${ORDER_URL}/cart/addToCart`;

export const GET_CART_PRODUCTS = `${ORDER_URL}/cart/getCartItems`;
