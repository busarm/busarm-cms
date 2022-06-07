import { Sequelize } from "sequelize";
import config, { ENV } from "../configs/app";
import db from "../configs/db";
import { initModels as app } from "../models/app/init-models";
import { initModels as access } from "../models/access/init-models";
import { initModels as oauth } from "../models/oauth/init-models";
import { AccessPermissions } from "../admin/helpers/permissions";

/**
 * Initialize database
 * @param {String} name
 * @param {String} host
 * @param {String} port
 * @param {String} username
 * @param {String} password
 * @returns {Sequelize}
 */
const database = (name: string, host: string, port: number, username: string, password: string): Sequelize => {
    return new Sequelize(name, username, password, {
        host: host,
        port: port,
        dialect: "mysql",
        logging: config.env !== ENV.PROD ? console.log : false,
        benchmark: config.env === ENV.DEV,
    });
};

/**
 * Set up database connections
 */
export const Connections = {
    access: database(
        db.access.name || "",
        db.app.host || "",
        db.app.port || 0,
        db.app.username || "",
        db.app.password || ""
    ),
    app: database(db.app.name || "", db.app.host || "", db.app.port || 0, db.app.username || "", db.app.password || ""),
    oauth: database(
        db.oauth.name || "",
        db.oauth.host || "",
        db.oauth.port || 0,
        db.oauth.username || "",
        db.oauth.password || ""
    ),
};

/**
 * Set up database models
 */
export const Models = {
    access: access(Connections.access),
    app: app(Connections.app),
    oauth: oauth(Connections.oauth),
};

/**
 * Define permission required to view each db
 */
export const ViewPermissions = {
    access: AccessPermissions.VIEW_ACCESS,
    app: AccessPermissions.VIEW_APP,
    oauth: AccessPermissions.VIEW_OAUTH,
};

/**
 *
 * Define permission required to modify each db
 */
export const ModifyPermissions = {
    access: AccessPermissions.MODIFY_ACCESS,
    app: AccessPermissions.MODIFY_APP,
    oauth: AccessPermissions.MODIFY_OAUTH,
};
