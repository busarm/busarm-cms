import CryptoJS from "crypto-js";
import { Request, RequestHandler } from "express";
import { Models } from "../../bootstrap/database";
import { AccessCredential } from "../../models/access/access_credential";
import { CanAdmin } from "../helpers/permissions";
import { RolePermissions } from "../helpers/roles";
import { AdminJSSettings, CurrentAdmin } from "adminjs";

/**
 * Authenticate user
 * @param username
 * @param password
 * @returns {Promise<AccessCredential>}
 */
export const authenticate = async function (username: string, password: string): Promise<AccessCredential> {
    try {
        const user = await Models.access.AccessCredential.findOne({
            where: { username: username },
        });
        if (user && user.isActive) {
            const hash = CryptoJS.SHA256(user.username + ":" + user.salt + ":" + password).toString();
            if (hash === user.password) {
                user.attempts = user.attempts + 1;
                user.attemptedAt = new Date();
                return user.save();
            } else {
                user.attempts = user.attempts + 1;
                user.attemptedAt = new Date();
                return user.save();
            }
        }
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
};

/**
 * Check authentication middleware
 * @param paths 
 * @returns 
 */
export const checkAuth = function (paths: {
    rootPath: string,
    loginPath: string,
    logoutPath: string,
    frontendPath: string,
}): RequestHandler {
    return (req, res, next) => {
        const authUser =
            req.session.adminUser && Object.keys(req.session.adminUser).length > 0 ? req.session.adminUser : null;

        if (!authUser ||
            !((authUser.role && CanAdmin(RolePermissions[authUser.role])) ||
                (authUser.permissions && CanAdmin(Object.values(authUser.permissions))))) {

            req.session.adminUser = null;
            if (req.path.startsWith(paths.rootPath.replace(/\/$/, "") + paths.frontendPath)) {
                return res.status(401).send();
            } else if (
                !req.path.startsWith(paths.logoutPath) &&
                !req.path.startsWith(paths.loginPath)
            ) {
                return res.redirect(paths.logoutPath);
            }
        }
        return next();
    }
};
