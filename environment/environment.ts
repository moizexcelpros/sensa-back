import { IEnviroment } from "../types/environment";

const NODE_ENV: any = process.env.NODE_ENV

const conmmon = {
    APP_ID: process.env.APP_ID,
    PORT: process.env.PORT,
    LOG_LEVEL: process.env.LOG_LEVEL,
    REQUEST_LIMIT: process.env.REQUEST_LIMIT,
    SESSION_SECRET: process.env.SESSION_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_TOKEN_API: process.env.GOOGLE_TOKEN_API,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET_ID: process.env.CLIENT_SECRET_ID,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
    debug: process.env.debug,
    NODE_ENV: NODE_ENV,
}

const ENVIORMENT_SETTING = {
    local: {
        MONGODB_URI: process.env.MONGODB_URI_LOCAL,
        APP_HOST: process.env.APP_HOST_LOCAL,
        WHITELIST_URL: process.env.WHITELIST_URL
    },
    development: {
        MONGODB_URI: process.env.MONGODB_URI_DEV,
        APP_HOST: process.env.APP_HOST_DEV,
        WHITELIST_URL: process.env.WHITELIST_URL
    },
    production: {
        MONGODB_URI: process.env.MONGODB_URI_PRODUCTION,
        APP_HOST: process.env.APP_HOST_PRODUCTION,
        WHITELIST_URL: process.env.WHITELIST_URL
    },
    staging: {
        MONGODB_URI: process.env.MONGODB_URI_STAGING,
        APP_HOST: process.env.APP_HOST_STAGING,
        WHITELIST_URL: process.env.WHITELIST_URL
    }
}


const setting = ENVIORMENT_SETTING[NODE_ENV];
const config: IEnviroment = {
    ...setting,
    ...conmmon
}

export { config }