export const __prod__ = process.env.NODE_ENV === "production";
export const CORS_ORIGIN = __prod__
  ? process.env.CORS_ORIGIN
  : "http://localhost:3000";
export const REDIS_URL = __prod__ ? process.env.REDIS_URL : "127.0.0.1:6379";
export const PRIVATE_KEY = process.env.PRIVATE_KEY;
export const APP_DOMAIN = process.env.APP_DOMAIN;
export const PORT = process.env.PORT || 8080;
export const RESET_PASSWORD_PREFIX = "reset-password";
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;
export const BRAINTREE_MERCHANT_ID = process.env.BRAINTREE_MERCHANT_ID;
export const BRAINTREE_PUBLIC_KEY = process.env.BRAINTREE_PUBLIC_KEY;
export const BRAINTREE_PRIVATE_KEY = process.env.BRAINTREE_PRIVATE_KEY;
export const DB_TYPE = process.env.DB_TYPE;
export const DB_HOST = __prod__ ? process.env.DB_HOST : "localhost";
export const DB_PORT = process.env.DB_PORT;
export const DB_NAME = process.env.DB_NAME;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
