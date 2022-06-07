import { AccessPermissions } from "./permissions";

// Permission List
export enum AccessRoles {
    ADMINISTRATOR = "Administrator",
    DEVELOPER = "Developer",
    MANAGER = "Manager",
    VIEWER = "Viewer",
}

// Roles Permission List
export const RolePermissions: {[k in AccessRoles] :  AccessPermissions[]} = {
    [AccessRoles.ADMINISTRATOR]: Object.values(AccessPermissions),
    [AccessRoles.DEVELOPER]: [
        AccessPermissions.ACCESS_ADMIN,
        AccessPermissions.VIEW_ACCESS_USER,
        AccessPermissions.VIEW_OAUTH_USER,
        AccessPermissions.VIEW_APP,
        AccessPermissions.MODIFY_APP,
        AccessPermissions.VIEW_ACCESS,
        AccessPermissions.MODIFY_ACCESS,
        AccessPermissions.VIEW_OAUTH,
        AccessPermissions.MODIFY_OAUTH,
        AccessPermissions.VIEW_SYSTEM,
        AccessPermissions.MODIFY_SYSTEM,
        AccessPermissions.VIEW_DASHBORD,
        AccessPermissions.MODIFY_DASHBORD,
    ],
    [AccessRoles.MANAGER]: [
        AccessPermissions.ACCESS_ADMIN,
        AccessPermissions.VIEW_ACCESS_USER,
        AccessPermissions.VIEW_APP,
        AccessPermissions.MODIFY_APP,
        AccessPermissions.VIEW_OAUTH,
        AccessPermissions.VIEW_SYSTEM,
        AccessPermissions.VIEW_DASHBORD,
        AccessPermissions.MODIFY_DASHBORD,
    ],
    [AccessRoles.VIEWER]: [
        AccessPermissions.ACCESS_ADMIN,
        AccessPermissions.VIEW_APP,
        AccessPermissions.VIEW_SYSTEM,
        AccessPermissions.VIEW_DASHBORD,
    ],
};

/**
 * @param {String[]} roles
 * @returns {boolean}
 */
export const HasRoles = (roles: String[]): boolean => {
    return (
        roles &&
        roles.every((role) =>
            Object.values(AccessRoles).some((ar) => ar === role)
        )
    );
};
