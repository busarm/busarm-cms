import fs from "fs";
import minimist from "minimist";
import envs from "../env.json";
import stgEnvs from "../env.stg.json";
import prodEnvs from "../env.prod.json";
import secrets from "../bootstrap/secrets";

// Defined command Args
const ARG_ENV = "env";
const ARG_SECRET = "secret";
const ARG_REGION = "region";
const ARG_OUT = "out";
const ARG_FORCE = "force";
const ARG_FORCE_SC = "f";

// Get command args
const args = minimist(process.argv.slice(2))

// Define args vars
const environment = args[ARG_ENV] || 'local';
const outPath = args[ARG_OUT] || '.env';
const forceSync = Boolean(args[ARG_FORCE] || args[ARG_FORCE_SC] || false);

// Merge Environment Vars
const conbinedEnvs = {
    ...envs,
    ...prodEnvs,
    ...stgEnvs,
}
// Define Environment Vars Type
type EnvType = typeof conbinedEnvs;

/**
 * Merge Envs with Secrets
 * @param {Object} secrets 
 * @param {EnvType} envs 
 * @returns {EnvType}
 */
const mergeSecretEnvs = (secrets: {
    db_app_name: string,
    db_access_name: string,
    db_oauth_name: string,
    db_host: string,
    db_port: string,
    db_username: string,
    db_password: string,
    cms_session_secret: string,
    cms_admin_user: string,
    cms_admin_pass: string,
}, envs: EnvType): EnvType => {

    return {
        ...envs,

        DB_APP_HOST: secrets.db_host,
        DB_APP_PORT: secrets.db_port,
        DB_APP_USERNAME: secrets.db_username,
        DB_APP_PASSWORD: secrets.db_password,
        DB_APP_NAME: secrets.db_app_name,

        DB_ACCESS_HOST: secrets.db_host,
        DB_ACCESS_PORT: secrets.db_port,
        DB_ACCESS_USERNAME: secrets.db_username,
        DB_ACCESS_PASSWORD: secrets.db_password,
        DB_ACCESS_NAME: secrets.db_access_name,


        DB_OAUTH_HOST: secrets.db_host,
        DB_OAUTH_PORT: secrets.db_port,
        DB_OAUTH_USERNAME: secrets.db_username,
        DB_OAUTH_PASSWORD: secrets.db_password,
        DB_OAUTH_NAME: secrets.db_oauth_name,

        SESSION_SECRET: secrets.cms_session_secret
    }
}

/**
 * Convert env object to env file
 * 
 * @param {Object} obj 
 * @returns {String} 
 */
const toEnvFile = (envs: EnvType): string => {
    let env = ''
    for (const key of Object.keys(envs)) {
        env += `${key}="${envs[key]}"\n`
    }
    return env
}

/**
 * Save to .env file
 * 
 * @param {String} path 
 * @param {EnvType} envs 
 * @returns {Promise<boolean>} 
 */
const saveEnv = (path: string, envs: EnvType): Promise<boolean> => {
    return new Promise((resolve) => {
        if (forceSync || !fs.existsSync(path)) {
            fs.writeFile(path, toEnvFile(envs), (err) => {
                resolve(!err);
            })
        }
    });
}

// Local environment
if (environment == 'local') {
    saveEnv(outPath, envs)
        .then((done) => {
            if (done) console.log("Completed syncing env");
            else throw "Failed to save env file";
        })
        .catch(console.log);
}

// Staging or Dev or Production environment - process if options available
else {

    // If server env vars available - a.k.a build environment
    if (process.env.DB_USER && process.env.DB_PASS) {
        saveEnv(outPath, mergeSecretEnvs({
            db_app_name: process.env.DB_APP_NAME,
            db_access_name: process.env.DB_ACCESS_NAME,
            db_oauth_name: process.env.DB_OAUTH_NAME,
            db_host: process.env.DB_HOST,
            db_port: process.env.DB_PORT,
            db_username: process.env.DB_USER,
            db_password: process.env.DB_PASS,
            cms_session_secret: process.env.SESSION_SECRET,
            cms_admin_user: process.env.ADMIN_USERNAME,
            cms_admin_pass: process.env.ADMIN_PASSWORD,
        }, {
            ...envs,
            ...(environment == 'production' ? prodEnvs : (environment == 'staging' || environment == 'development') ? stgEnvs : {})
        })).then((done) => {
            if (done) console.log("Completed syncing env");
            else throw "Failed to save env file";
        }).catch(console.log);
    }

    // If AWS Secret Manager ID available
    else if (args[ARG_SECRET] && args[ARG_REGION]) {
        secrets.load(args[ARG_SECRET], args[ARG_REGION])
            .then(async (data) => {
                const done = await saveEnv(outPath, mergeSecretEnvs(Object(data), {
                    ...envs,
                    ...(environment == 'production' ? prodEnvs : (environment == 'staging' || environment == 'development') ? stgEnvs : {})
                }))
                if (done) console.log("Completed syncing env");
                else throw "Failed to save env file";
            })
            .catch(console.log)
    }

    else console.log(`Expected options: '--${ARG_SECRET}' and '--${ARG_REGION}'`);
}
