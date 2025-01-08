const config = {
  BASE_URL: process.env.REACT_APP_BASE_URL,
  CMS_URL: process.env.REACT_CMS_URL,
  API_URL_LIVE: process.env.REACT_APP_API_LIVE_URL,
  API_URL: process.env.REACT_APP_API_URL,
  FILE_URL: process.env.REACT_APP_FILE_URL, 

  ADS_URL: 'ad',
  PRODUCT_URL: 'product',
  CATEGORY_URL: 'category',
  LOCATION_URL: 'location',
  SITEINFO_URL: 'siteinfo',
  LOGIN_URL: 'login',
  USER_URL: 'user-info',
  REGISTER_URL: 'register',  
  LOGOUT_URL: 'logout',
  SEND_VERIFICATION_URL: 'send-verification-code',
  VERIFY_URL: 'verify-code',
  CHANGE_URL: 'change-password',
  PAGE_URL: 'page',
};

export default config;
