// Permission List. // TODO Add permissions
export enum AccessPermissions {
    ACCESS_ADMIN = "access_admin",
    
    VIEW_SYSTEM = "view_system",
    MODIFY_SYSTEM = "modify_system",
    
    VIEW_ACCESS_USER = "view_access_user",
    MODIFY_ACCESS_USER = "modify_access_user",

    VIEW_OAUTH_USER = "view_oauth_user",
    MODIFY_OAUTH_USER = "modify_oauth_user",

    VIEW_ALL = "view_all",
    MODIFY_ALL = "modify_all",

    VIEW_APP = "view_app",
    MODIFY_APP = "modify_app",

    VIEW_OAUTH = "view_oauth",
    MODIFY_OAUTH = "modify_oauth",

    VIEW_ACCESS = "view_access",
    MODIFY_ACCESS = "modify_access",

    VIEW_DASHBORD = "view_dashboard",
    MODIFY_DASHBORD = "modify_dashboard",
}

/**
 * @param {Array} userPermissions
 * @returns {boolean}
 */
export const CanAdmin = (userPermissions: Array<any> = []): boolean => {
    return (
        userPermissions &&
        userPermissions.some((perm) => perm === AccessPermissions.ACCESS_ADMIN)
    );
};

/**
 * @param {String} permission
 * @param {Array} userPermissions
 * @returns {boolean}
 */
export const CanView = (
    permission: string,
    userPermissions: Array<any> = []
): boolean => {
    return (
        userPermissions &&
        userPermissions.some(
            (perm) =>
                perm === permission ||
                perm === AccessPermissions.VIEW_ALL ||
                perm === AccessPermissions.MODIFY_ALL
        )
    );
};

/**
 * @param {String} permission
 * @param {Array} userPermissions
 * @returns {boolean}
 */
export const CanModify = (
    permission: string,
    userPermissions: Array<any> = []
): boolean => {
    return (
        userPermissions &&
        userPermissions.some(
            (perm) =>
                perm === permission || perm === AccessPermissions.MODIFY_ALL
        )
    );
};
