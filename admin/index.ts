import express, { Application, Router } from "express";
import AdminJS, { CurrentAdmin } from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import { Model, ModelStatic } from "sequelize/types";

import config from "../configs/app";
import { Connections, Models, ModifyPermissions, ViewPermissions } from "../bootstrap/database";
import { Resource, ModelResource, Groups } from "./resource";
import { Utils } from "./helpers/utils";
import { Action } from "./helpers/actions";
import { getSessionOption } from "./helpers/session";
import { authenticate, checkAuth } from "./services/AuthService";
import { checkAdmin, createAdmin } from "./services/AdminUserService";
import { AccessRoles, RolePermissions } from "./helpers/roles";
import { aceessAudit } from "./helpers/audit";

// Register sequelize adapter to handle sequelize db
AdminJS.registerAdapter(AdminJSSequelize);

/**
 * Initialize AdminJS
 *
 * @param {AdminJS} adminJs
 * @returns {Router}
 */
const init = async (adminJs: AdminJS): Promise<Router> => {
    // Add custom global action handlers
    AdminJS.ACTIONS.new.after = Action.after_record_log;
    AdminJS.ACTIONS.edit.after = Action.after_record_log;
    AdminJS.ACTIONS.delete.after = Action.after_record_log;
    AdminJS.ACTIONS.bulkDelete.after = Action.after_bulk_log;

    // Init router
    const router = express.Router();

    // Create default admin if none exist
    if (config.admin.username && config.admin.password && !(await checkAdmin())) {
        createAdmin(config.admin.username, config.admin.username, AccessRoles.ADMINISTRATOR);
    }

    // Set up authenticated route
    return AdminJSExpress.buildAuthenticatedRouter(
        adminJs,
        {
            // Function to authenticate admin
            authenticate: async (username, password): Promise<CurrentAdmin | null> => {
                const user = await authenticate(username, password);
                if (user) {
                    return {
                        id: String(user.id),
                        email: user.username,
                        permissions: [
                            ...new Set([
                                ...Object.values(RolePermissions[user.role] || []),
                                ...Object.values(user.permissions || []),
                            ]),
                        ],
                        title: user.role,
                    };
                }
                return null;
            },
            cookiePassword: config.session.secret,
            maxRetries: config.admin.max_retry || 10,
        },
        router,
        getSessionOption()
    );
};

/**
 * @returns {Resource[]}
 */
const resources = async (): Promise<Resource[]> => {
    let list: Resource[] = [];
    let names: string[] = [];

    // Load resources
    Object.entries(Models).forEach(([db, models]) => {
        for (const name in models) {
            const model = models[name as keyof typeof models];
            // Check if model name already exist
            const id = names.some((n) => n == name) ? db + "_" + model.tableName : model.tableName;
            const resource = ModelResource(
                id,
                model as ModelStatic<Model>,
                list.length,
                Groups[db],
                ViewPermissions[db],
                ModifyPermissions[db]
            );
            if (resource) {
                list.push(resource);
            }
            names.push(name);
        }
    });

    // Sort list
    return list.sort((a, b) => {
        return a.order > b.order ? 1 : a.order === b.order ? (a.name > b.name ? 1 : -1) : -1;
    });
};

/**
 * Setup Admin Panel
 *
 * @param {String} path
 * @param {Application} app
 * @returns {Application}
 */
export default async (path: string, app: Application): Promise<Application> => {
    try {
        // Initialize AdminJS
        const adminJs = new AdminJS({
            rootPath: path,
            loginPath: path.replace(/\/$/, "") + "/login",
            logoutPath: path.replace(/\/$/, "") + "/logout",
            resources: (await resources()),
            branding: {
                logo: config.url.logo,
                favicon: config.url.favicon,
                companyName: config.server.company,
                softwareBrothers: false,
                theme: {
                    colors: {
                        primary100: config.theme.primary || "",
                        // filterBg: config.theme.normal || "",primary100: string;
                        primary80: Utils.lightenColor(config.theme.primary || "", 20),
                        primary60: Utils.lightenColor(config.theme.primary || "", 40),
                        primary40: Utils.lightenColor(config.theme.primary || "", 60),
                        primary20: Utils.lightenColor(config.theme.primary || "", 30),
                        filterBg: Utils.darkenColor(config.theme.normal || "", 60),
                        hoverBg: Utils.lightenColor(config.theme.primary || "", 30),
                        border: Utils.lightenColor(config.theme.primary || "", 30),
                    },
                },
            },
            locale: {
                language: "en",
                translations: {
                    labels: {
                        loginWelcome: "Welcome",
                    },
                    messages: {
                        loginWelcome: config.server.name,
                    },
                },
            },
            assets: {
                styles: ["/assets/css/app.css"],
                scripts: ["/assets/js/app.js"],
            },
            settings: {
                defaultPerPage: config.pagination.per_page
            },
            version: {
                admin: true,
                app: config.version
            },
        });
        // Set up AdminJS router
        const adminJsRouter = await init(adminJs);

        // Add Audit middleware
        app.use(aceessAudit({
            databases: Object.values(Connections)
        }));

        // Add Admin Auth middleware
        app.use(checkAuth({
            rootPath: adminJs.options.rootPath,
            loginPath: adminJs.options.loginPath,
            logoutPath: adminJs.options.logoutPath,
            frontendPath: "/frontend"
        }));

        // Add Admin route middleware
        app.use(path, adminJsRouter);
    } catch (error) {
        console.log(error);
    }
    return app;
};
