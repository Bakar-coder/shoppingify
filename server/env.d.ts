declare namespace NodeJS {
  export interface ProcessEnv {
    CORS_ORIGIN: string;
    DB_TYPE: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    PORT: string;
    PRIVATE_KEY: string;
    REDIS_URL: string;
    APP_DOMAIN: string;
    BRAINTREE_MERCHANT_ID: string;
    BRAINTREE_PUBLIC_KEY: string;
    BRAINTREE_PRIVATE_KEY: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_CALLBACK_URL: string;
  }
}
