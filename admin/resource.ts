
import config from "../configs/app";
import { flat, PropertyOptions, ResourceOptions, ResourceWithOptions } from "adminjs";
import { CanView, CanModify, AccessPermissions } from "./helpers/permissions";
import { DataTypes, Model, ModelStatic } from "sequelize";
import { OauthJti } from "../models/oauth/oauth_jti";
import { Migration as AppMigration } from "../models/app/migration";
import { Migration as AccessMigration } from "../models/access/migration";
import { Migration as OauthMigration } from "../models/oauth/migration";
import { OauthUser } from "../models/oauth/oauth_user";
import { OauthUserResource } from "./resources/oauth/oauth_user";
import { AccessCredential } from "../models/access/access_credential";
import { AccessCredentialsResource } from "./resources/access/access_credentials";
import { LogSession } from "../models/access/log_session";
import { LogSessionResource } from "./resources/access/log_session";

export interface Resource extends ResourceWithOptions {
    resource: ModelStatic<Model>;
    options: ResourceOptions;
    name: String;
    order: Number;
}
export interface Navigation {
    name: string;
    icon?: string;
}

/**
 * @param {String} name
 * @param {String} icon
 * @returns {Navigation}
 */
export const Nav = (name: string = "Content", icon?: string): Navigation => {
    return {
        name,
        icon,
    };
};

/**
 * @param {Model} model Model Object
 * @param {Number} order Order of resource in list
 * @param {Navigation} navigation
 * @param {AccessPermissions} viewPermission
 * @param {AccessPermissions} modifyPermission
 * @returns {Resource}
 */
export function ModelResource(
    id: string,
    model: ModelStatic<Model>,
    order: number = 0,
    navigation: Navigation,
    viewPermission: AccessPermissions = AccessPermissions.VIEW_SYSTEM,
    modifyPermission: AccessPermissions = AccessPermissions.VIEW_SYSTEM
): Resource | false {
    switch (String(model.name)) {
        // TODO Add custom resources
        case AccessCredential.name:
            return AccessCredentialsResource(
                id,
                model,
                order,
                navigation,
                AccessPermissions.VIEW_ACCESS_USER,
                AccessPermissions.MODIFY_ACCESS_USER
            );
        case LogSession.name:
            return LogSessionResource(
                id,
                model,
                order,
                navigation,
                AccessPermissions.VIEW_ACCESS_USER,
                AccessPermissions.MODIFY_ACCESS_USER
            );

        case OauthUser.name:
            return OauthUserResource(
                id,
                model,
                order,
                navigation,
                AccessPermissions.VIEW_OAUTH_USER,
                AccessPermissions.MODIFY_OAUTH_USER
            );

        // Hide these models from the list
        case AccessMigration.name:
        case AppMigration.name:
        case OauthJti.name:
        case OauthMigration.name:
            return false;
        default:
            return DefaultResource(id, model, order, navigation, viewPermission, modifyPermission);
    }
}

/**
 * @param {Model} model Model Object
 * @param {Number} order Order of resource in list
 * @param {Navigation} navigation
 * @param {AccessPermissions} viewPermission
 * @param {AccessPermissions} modifyPermission
 * @returns {Resource}
 */
export const DefaultResource = (
    id: string,
    model: ModelStatic<Model>,
    order: number = 0,
    navigation: Navigation,
    viewPermission: AccessPermissions = AccessPermissions.VIEW_SYSTEM,
    modifyPermission: AccessPermissions = AccessPermissions.VIEW_SYSTEM
): Resource | false => {
    let listCount = 0;
    let props: Record<string, PropertyOptions> = {};
    // Filter properties
    Object.entries(model.getAttributes()).forEach(([key, attr], index) => {
        const length = Number(attr.type["_length"]);
        const isId = attr.primaryKey;
        const isTitle = Boolean(attr.primaryKey || attr.unique);
        const isArray = attr.type.constructor.name == DataTypes.JSON.name;
        const isSortable = !isArray;
        const isRequired = isId || !attr.allowNull;
        const canShow = !["password", "salt", "secret", "client_secret", "private_key"].includes(attr.field);
        const canEdit =
            !(attr.primaryKey && attr.autoIncrement) &&
            ![
                "password",
                "salt",
                "date_created",
                "created_date",
                "created_at",
                "date_updated",
                "updated_date",
                "updated_at",
                "date_deleted",
                "deleted_date",
                "deleted_at",
            ].includes(attr.field);
        const canList =
            canShow &&
            (attr.primaryKey || attr.type.constructor.name != DataTypes.STRING.name || length < 256) &&
            listCount < config.adminjs.max_list_count;

        // Add props
        props[key] = {
            isId,
            isTitle,
            isArray,
            isSortable,
            isRequired,
            isVisible: {
                filter: true,
                list: canList,
                edit: canEdit,
                show: canShow,
            },
            position: 100 + (index + 1),
        };
        if (attr.type.constructor.name === DataTypes.TEXT.name || length >= 1024) {
            props[key].type = "textarea";
        }
        listCount = listCount + Number(canList);
    });
    return {
        resource: model,
        options: {
            id,
            navigation,
            actions: {
                list: {
                    isVisible: ({ currentAdmin }) => currentAdmin && CanView(viewPermission, currentAdmin.permissions),
                    isAccessible: ({ currentAdmin }) =>
                        currentAdmin && CanView(viewPermission, currentAdmin.permissions),
                },
                show: {
                    isVisible: ({ currentAdmin }) => currentAdmin && CanView(viewPermission, currentAdmin.permissions),
                    isAccessible: ({ currentAdmin }) =>
                        currentAdmin && CanView(viewPermission, currentAdmin.permissions),
                },
                new: {
                    isVisible: ({ currentAdmin }) =>
                        currentAdmin && CanModify(modifyPermission, currentAdmin.permissions),
                    isAccessible: ({ currentAdmin }) =>
                        currentAdmin && CanModify(modifyPermission, currentAdmin.permissions),
                    before: async (request) => {
                        request.payload = flat.unflatten(request.payload);
                        return request;
                    },
                },
                edit: {
                    isVisible: ({ currentAdmin }) =>
                        currentAdmin && CanModify(modifyPermission, currentAdmin.permissions),
                    isAccessible: ({ currentAdmin }) =>
                        currentAdmin && CanModify(modifyPermission, currentAdmin.permissions),
                    before: async (request) => {
                        request.payload = flat.unflatten(request.payload);
                        return request;
                    },
                },
                delete: {
                    isVisible: ({ currentAdmin }) =>
                        currentAdmin && CanModify(modifyPermission, currentAdmin.permissions),
                    isAccessible: ({ currentAdmin }) =>
                        currentAdmin && CanModify(modifyPermission, currentAdmin.permissions),
                },
                bulkDelete: {
                    isVisible: ({ currentAdmin }) =>
                        currentAdmin && CanModify(modifyPermission, currentAdmin.permissions),
                    isAccessible: ({ currentAdmin }) =>
                        currentAdmin && CanModify(modifyPermission, currentAdmin.permissions),
                },
            },
            properties: {
                ...props,
            },
        },
        name: id,
        order: Number(order),
    };
};
