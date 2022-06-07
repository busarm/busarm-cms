interface DatabaseConfig {
    name?: string;
    host?: string;
    port?: number;
    username?: string;
    password?: string;
}
const databases: { [key in string]: DatabaseConfig } = {
    app: {
        name: process.env.DB_APP_NAME,
        host: process.env.DB_APP_HOST,
        port: Number(process.env.DB_APP_PORT),
        username: process.env.DB_APP_USERNAME,
        password: process.env.DB_APP_PASSWORD,
    },
    access: {
        name: process.env.DB_ACCESS_NAME,
        host: process.env.DB_ACCESS_HOST,
        port: Number(process.env.DB_ACCESS_PORT),
        username: process.env.DB_ACCESS_USERNAME,
        password: process.env.DB_ACCESS_PASSWORD,
    },
    oauth: {
        name: process.env.DB_OAUTH_NAME,
        host: process.env.DB_OAUTH_HOST,
        port: Number(process.env.DB_OAUTH_PORT),
        username: process.env.DB_OAUTH_USERNAME,
        password: process.env.DB_OAUTH_PASSWORD,
    },
};
export default databases;
