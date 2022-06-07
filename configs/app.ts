export enum ENV {
    PROD = "production",
    TEST = "testing",
    DEV = "development",
    LOCAL = "local",
}
/**
 * Get environment name
 * @returns {ENV}
 */
function getEnv(): ENV {
    if (process.env.NODE_ENV == ENV.PROD || process.env.ENV == ENV.PROD) {
        return ENV.PROD;
    } else if (process.env.NODE_ENV == ENV.TEST || process.env.ENV == ENV.TEST) {
        return ENV.TEST;
    } else if (process.env.NODE_ENV == ENV.DEV || process.env.ENV == ENV.DEV) {
        return ENV.DEV;
    } else {
        return ENV.LOCAL;
    }
}
export default {
    env: getEnv(),
    server: {
        name: process.env.APP_NAME || "CMS APP",
        company: process.env.APP_COMPANY || "CMS",
        port: Number(process.env.APP_PORT) || 80,
    },
    session: {
        secret: process.env.SESSION_SECRET || "cms@admin1!",
        // Session expiry in seconds
        timeout: 60 * 60 * 24,
    },
    url: {
        logo: process.env.URL_LOGO,
        favicon: process.env.URL_FAVICON,
    },
    theme: {
        primary: process.env.THEME_PRIMARY,
        seconday: process.env.THEME_SECONDARY,
        danger: process.env.THEME_DANGER,
        warning: process.env.THEME_WARNING,
        success: process.env.THEME_SUCCESS,
        normal: process.env.THEME_NORMAL,
    },
    pagination: {
        per_page: 20,
    },
    adminjs: {
        // Max resource list count
        max_list_count: 5,
    },
    oauth: {
        client_id: process.env.OAUTH_CLIENT_ID,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
        authorize_url: process.env.OAUTH_AUTHORIZE_URL,
        token_url: process.env.OAUTH_TOKEN_URL,
    },
    // Default admin credentials
    admin: {
        username: process.env.ADMIN_DEFAULT_USERNAME,
        password: process.env.ADMIN_DEFAULT_PASSWORD,
    },
};
