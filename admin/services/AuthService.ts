import CryptoJS from "crypto-js";
import { Request } from "express";
import { Models } from "../../bootstrap/database";
import { AccessCredential } from "../../models/access/access_credential";
import { CanAdmin } from "../helpers/permissions";
import { RolePermissions } from "../helpers/roles";
import { CurrentAdmin } from "adminjs";

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
 * Authenticate user
 * @param req
 * @returns {Promise<CurrentAdmin>}
 */
export const checkAuth = async function (req: Request): Promise<CurrentAdmin> {
    try {
        const authUser =
            req.session.adminUser && Object.keys(req.session.adminUser).length > 0 ? req.session.adminUser : null;

        return authUser &&
            ((authUser.role && CanAdmin(RolePermissions[authUser.role])) ||
                (authUser.permissions && CanAdmin(Object.values(authUser.permissions))))
            ? authUser
            : null;
    } catch (error) {
        console.log(error);
        return null;
    }
};
