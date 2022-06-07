import { AccessRoles } from "../../helpers/roles";
import { AccessPermissions } from "../../helpers/permissions";
import { Model, ModelStatic } from "sequelize/types";
import { DefaultResource, Navigation, Resource } from "../../resource";
import { Response } from "../../helpers/response";
import adminjs, {
    ActionRequest,
    flat
} from "adminjs";
import CryptoJS from "crypto-js";

/**
 * @param {Model} model Model Object
 * @param {Number} order Order of resource in list
 * @param {Navigation} navigation
 * @param {AccessPermissions} viewPermission
 * @param {AccessPermissions} modifyPermission
 * @returns {Resource}
 */
export const AccessCredentialsResource = (
    id: string,
    model: ModelStatic<Model>,
    order: number = 0,
    navigation: Navigation,
    viewPermission: AccessPermissions = AccessPermissions.VIEW_SYSTEM,
    modifyPermission: AccessPermissions = AccessPermissions.VIEW_SYSTEM
): Resource | false => {
    const resource = DefaultResource(
        id,
        model,
        order,
        navigation,
        viewPermission,
        modifyPermission
    );
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
                    before: async (
                        request: ActionRequest
                    ): Promise<ActionRequest> => {
                        request.payload = flat.unflatten(request.payload);
                        // Validate and hash password if available
                        if (
                            request.payload.username &&
                            request.payload.username !== "" &&
                            request.payload.newPassword &&
                            request.payload.newPassword !== ""
                        ) {
                            if (
                                !request.payload.confirmPassword ||
                                request.payload.confirmPassword === ""
                            ) {
                                return Response.throwValidationError(
                                    "Confirm Password is required",
                                    {
                                        confirmPassword: {
                                            type: "required",
                                            message:
                                                "This field is required required",
                                        },
                                    }
                                );
                            }
                            if (
                                String(request.payload.newPassword).trim() !==
                                String(request.payload.confirmPassword).trim()
                            ) {
                                return Response.throwValidationError(
                                    "Password does not match",
                                    {
                                        confirmPassword: {
                                            type: "required",
                                            message: "Password does not match",
                                        },
                                    }
                                );
                            }

                            // Hash password
                            const salt = CryptoJS.lib.WordArray.random(
                                128 / 8
                            ).toString();
                            const hash = CryptoJS.SHA256(
                                request.payload.username +
                                    ":" +
                                    salt +
                                    ":" +
                                    request.payload.newPassword
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
                    before: async (
                        request: ActionRequest
                    ): Promise<ActionRequest> => {
                        // Validate and hash password if available
                        request.payload = flat.unflatten(request.payload);
                        if (
                            request.payload.username &&
                            request.payload.username !== "" &&
                            request.payload.newPassword &&
                            request.payload.newPassword !== ""
                        ) {
                            if (
                                !request.payload.confirmPassword ||
                                request.payload.confirmPassword === ""
                            ) {
                                return Response.throwValidationError(
                                    "Confirm Password is required",
                                    {
                                        confirmPassword: {
                                            type: "required",
                                            message:
                                                "This field is required required",
                                        },
                                    }
                                );
                            }
                            if (
                                String(request.payload.newPassword).trim() !==
                                String(request.payload.confirmPassword).trim()
                            ) {
                                return Response.throwValidationError(
                                    "Password does not match",
                                    {
                                        confirmPassword: {
                                            type: "required",
                                            message: "Password does not match",
                                        },
                                    }
                                );
                            }

                            // Hash password
                            const salt = CryptoJS.lib.WordArray.random(
                                128 / 8
                            ).toString();
                            const hash = CryptoJS.SHA256(
                                request.payload.username +
                                    ":" +
                                    salt +
                                    ":" +
                                    request.payload.newPassword
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
                id: {
                    ...resource.options?.properties.id,
                    isRequired: true,
                },
                username: {
                    ...resource.options?.properties.username,
                    isRequired: true,
                },
                newPassword: {
                    type: "password",
                    isRequired: true,
                    isVisible: {
                        show: false,
                        filter: false,
                        list: false,
                        edit: true,
                    },
                    position: 120,
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
                    position: 121,
                },
                role: {
                    isVisible: {
                        show: true,
                        filter: true,
                        list: false,
                        edit: true,
                    },
                    isArray: false,
                    availableValues: Object.entries(AccessRoles).map(
                        ([key, value]) => {
                            return {
                                label: key,
                                value: value,
                            };
                        }
                    ),
                    components: {
                        filter: adminjs.bundle(
                            "../../components/props/FilterText"
                        ),
                    },
                    position: 122,
                },
                permissions: {
                    isVisible: {
                        show: true,
                        filter: true,
                        list: false,
                        edit: true,
                    },
                    isArray: true,
                    availableValues: Object.entries(AccessPermissions).map(
                        ([key, value]) => {
                            return {
                                label: key,
                                value: value,
                            };
                        }
                    ),
                    components: {
                        filter: adminjs.bundle(
                            "../../components/props/FilterText"
                        ),
                    },
                    position: 123,
                },
                isActive: {
                    ...resource.options?.properties.isActive,
                    isVisible: true,
                    position: 124,
                },
                attempts: {
                    ...resource.options?.properties.attempts,
                    isVisible: {
                        show: true,
                        filter: true,
                        list: true,
                        edit: false,
                    },
                },
                attemptedAt: {
                    ...resource.options?.properties.attemptedAt,
                    isVisible: {
                        show: true,
                        filter: true,
                        list: true,
                        edit: false,
                    },
                },
            },
        },
    };
};
