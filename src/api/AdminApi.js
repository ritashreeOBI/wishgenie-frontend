// #################### cms ####################### ///////////
// const cmsBaseUrl = "http://localhost:8006/api";
const cmsBaseUrl = "https://services.wishgenie.io/cms/api";

//test 

export const CREATE_PAGE = `${cmsBaseUrl}/create_page`;
export const GET_PAGES = `${cmsBaseUrl}/get_pages`;
export const UPDATE_PAGE = `${cmsBaseUrl}/update_page`;
export const REMOVE_PAGE = `${cmsBaseUrl}/remove_page`;

// #################### ADMIN ####################### ///////////
// const adminAuthBaseUrl = "http://localhost:8003/api/auth";
const adminAuthBaseUrl = "https://services.wishgenie.io/user/api/auth";

export const ADMIN_LOGIN = `${adminAuthBaseUrl}/login`;
export const CREATE_USER = `${adminAuthBaseUrl}/create_user`;
export const GET_USERS = `${adminAuthBaseUrl}/get_users`;
export const GET_CUSTOMERS = `${adminAuthBaseUrl}/customers`;
export const ADMIN_CHECK_AUTH = `${adminAuthBaseUrl}/check_auth`;
export const ASSIGN_ROLE = `${adminAuthBaseUrl}/assign_role`;
export const BLOCK_USER = `${adminAuthBaseUrl}/block_user`;


// #################### ROLE ####################### ///////////

// const RoleBaseUrl = "http://localhost:8003/api/role";
const RoleBaseUrl = "https://services.wishgenie.io/user/api/role";
export const GET_ROLES = `${RoleBaseUrl}/get_roles`;
export const CREATE_ROLE = `${RoleBaseUrl}/create_role`;
export const UPDATE_ROLE = `${RoleBaseUrl}/update_role`;
export const GET_ROLE_DETAILS = `${RoleBaseUrl}/get_role_details`;

// const MenuBaseUrl = "http://localhost:8003/api/menu";
const MenuBaseUrl = "https://services.wishgenie.io/user/api/menu";
export const GET_MENUS = `${MenuBaseUrl}/get_menus`;


// const DashboardBaseUrl = "http://localhost:8003/api/dashboard";
const DashboardBaseUrl = "https://services.wishgenie.io/user/api/dashboard";
export const GET_USERS_COUNT = `${DashboardBaseUrl}/get_users_count`;


