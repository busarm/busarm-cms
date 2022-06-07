import { AccessPermissions } from "../../helpers/permissions";
import { Model, ModelStatic } from "sequelize/types";
import { DefaultResource, Navigation, Resource } from "../../resource";
import { Response } from "../../helpers/response";
import { ActionRequest, flat } from "adminjs";

/**
 * @param {Model} model Model Object
 * @param {Number} order Order of resource in list
 * @param {Navigation} navigation
 * @param {AccessPermissions} viewPermission
 * @param {AccessPermissions} modifyPermission
 * @returns {Resource}
 */
export const OauthUserResource = (
    id: string,
    model: ModelStatic<Model>,
    order: number = 0,
    navigation: Navigation,
    viewPermission: AccessPermissions = AccessPermissions.VIEW_SYSTEM,
    modifyPermission: AccessPermissions = AccessPermissions.VIEW_SYSTEM
): Resource | false => {
    const resource = DefaultResource(id, model, order, navigation, viewPermission, modifyPermission);
    if (!resource) return false;
    return {
        ...resource,
        resource: model,
        options: {
            ...resource.options,
            actions: {
                ...resource.options?.actions,
                new: {
                    ...resource.options?.actions?.new,
                    /**
                     * Before - Perform validations
                     *
                     * @param {ActionRequest} request
                     * @param {ActionResponse} response
                     * @param {ActionContext} context
                     * @returns {Promise<ActionRequest>}
                     */
                    before: async (request: ActionRequest): Promise<ActionRequest> => {
                        request.payload = flat.unflatten(request.payload);
                        // Validate and hash password if available
                        if (request.payload.newPassword && request.payload.newPassword !== "") {
                            if (!request.payload.confirmPassword || request.payload.confirmPassword === "") {
                                return Response.throwValidationError("Confirm Password is required", {
                                    confirmPassword: {
                                        type: "required",
                                        message: "This field is required required",
                                    },
                                });
                            }
                            if (
                                String(request.payload.newPassword).trim() !==
                                String(request.payload.confirmPassword).trim()
                            ) {
                                return Response.throwValidationError("Password does not match", {
                                    confirmPassword: {
                                        type: "required",
                                        message: "Password does not match",
                                    },
                                });
                            }

                            // Hash password
                            const id = CryptoJS.SHA1(CryptoJS.lib.WordArray.random(128 / 8).toString());
                            const salt = CryptoJS.lib.WordArray.random(128 / 8).toString();
                            const hash = CryptoJS.SHA256(
                                id + ":" + salt + ":" + request.payload.newPassword
                            ).toString();
                            request.payload.password = hash;
                            request.payload.salt = salt;

                            delete request.payload.newPassword;
                            delete request.payload.confirmPassword;
                        } else {
                            delete request.payload.newPassword;
                            delete request.payload.confirmPassword;
                        }

                        return request;
                    },
                },
                edit: {
                    ...resource.options?.actions?.edit,
                    /**
                     * Before - Perform validations
                     *
                     * @param {ActionRequest} request
                     * @param {ActionResponse} response
                     * @param {ActionContext} context
                     * @returns {Promise<ActionRequest>}
                     */
                    before: async (request: ActionRequest): Promise<ActionRequest> => {
                        request.payload = flat.unflatten(request.payload);
                        // Validate and hash password if available
                        if (
                            request.params.recordId &&
                            request.payload.newPassword &&
                            request.payload.newPassword !== ""
                        ) {
                            if (!request.payload.confirmPassword || request.payload.confirmPassword === "") {
                                return Response.throwValidationError("Confirm Password is required", {
                                    confirmPassword: {
                                        type: "required",
                                        message: "This field is required required",
                                    },
                                });
                            }
                            if (
                                String(request.payload.newPassword).trim() !==
                                String(request.payload.confirmPassword).trim()
                            ) {
                                return Response.throwValidationError("Password does not match", {
                                    confirmPassword: {
                                        type: "required",
                                        message: "Password does not match",
                                    },
                                });
                            }

                            // Hash password
                            const salt = CryptoJS.lib.WordArray.random(128 / 8).toString();
                            const hash = CryptoJS.SHA256(
                                request.params.recordId + ":" + salt + ":" + request.payload.newPassword
                            ).toString();
                            request.payload.password = hash;
                            request.payload.salt = salt;

                            delete request.payload.newPassword;
                            delete request.payload.confirmPassword;
                        } else {
                            delete request.payload.newPassword;
                            delete request.payload.confirmPassword;
                        }

                        return request;
                    },
                },
            },
            properties: {
                ...resource.options?.properties,
                newPassword: {
                    type: "password",
                    isRequired: true,
                    isVisible: {
                        show: false,
                        filter: false,
                        list: false,
                        edit: true,
                    },
                    position: 127,
                },
                confirmPassword: {
                    type: "password",
                    isRequired: true,
                    isVisible: {
                        show: false,
                        filter: false,
                        list: false,
                        edit: true,
                    },
                    position: 128,
                },
                scope: {
                    isVisible: {
                        show: true,
                        filter: true,
                        list: false,
                        edit: true,
                    },
                    position: 129,
                },
                credUpdatedAt: {
                    isVisible: {
                        show: true,
                        filter: true,
                        list: false,
                        edit: false,
                    },
                    position: 130,
                },
                dateCreated: {
                    isVisible: {
                        show: true,
                        filter: true,
                        list: false,
                        edit: false,
                    },
                    position: 131,
                },
            },
        },
    };
};
