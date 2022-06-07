import CryptoJS from "crypto-js";
import { Models } from "../bootstrap/database";
import { AccessCredential } from "../models/access/access_credential";
import { AccessPermissions } from "../admin/helpers/permissions";
import { AccessRoles } from "../admin/helpers/roles";

/**
 * Create admin user
 * @param username
 * @param password
 * @param role
 * @param permissions
 */
export const createAdmin = async function (
    username: string,
    password: string,
    role: AccessRoles = null,
    permissions: AccessPermissions[] = []
): Promise<AccessCredential> {
    const salt = CryptoJS.lib.WordArray.random(128 / 8).toString();
    return Models.access.AccessCredential.create({
        username,
        password: CryptoJS.SHA256(
            username + ":" + salt + ":" + password
        ).toString(),
        salt,
        role,
        permissions,
    });
};

/**
 * Check if an admin exist
 */
export const checkAdmin = async function (): Promise<boolean> {
    const admin = await Models.access.AccessCredential.findOne({
        where: { role: AccessRoles.ADMINISTRATOR },
    });
    return admin ? true : false;
};
