import { AccessPermissions } from "../../helpers/permissions";
import { Model, ModelStatic } from "sequelize/types";
import { DefaultResource, Navigation, Resource, SequelizeResource } from "../../resource";
import adminjs, { RecordActionResponse } from "adminjs";
import { AuditAction } from "../../helpers/audit";
import { Connections } from "../../../bootstrap/database";
import { Utils } from "../../helpers/utils";

/**
 * @param {Model} model Model Object
 * @param {Number} order Order of resource in list
 * @param {Navigation} navigation
 * @param {AccessPermissions} viewPermission
 * @param {AccessPermissions} modifyPermission
 * @returns {Resource}
 */
export const AccessAuditResource = (
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
        resource: new SequelizeResource(model),
        options: {
            ...resource.options,
            actions: {
                ...resource.options?.actions,
                show: {
                    ...resource.options?.actions?.show,
                    after: async (response: RecordActionResponse): Promise<RecordActionResponse> => {
                        if (response.record.params.data) {
                            response.record.params.data = Utils.fromJsonOrString(response.record.params.data);
                        }
                        if (response.record.params.user) {
                            response.record.params.user = Utils.fromJsonOrString(response.record.params.user);
                        }
                        if (response.record.params.session) {
                            response.record.params.session = Utils.fromJsonOrString(response.record.params.session);
                        }
                        return response;
                    },
                },
                new: {
                    ...resource.options?.actions?.new,
                    isAccessible: false,
                    isVisible: false,
                },
                edit: {
                    ...resource.options?.actions?.edit,
                    isAccessible: false,
                    isVisible: false,
                },
                delete: {
                    ...resource.options?.actions?.delete,
                    isAccessible: false,
                    isVisible: false,
                },
            },
            properties: {
                ...resource.options?.properties,
                action: {
                    ...resource.options?.properties.action,
                    availableValues: Object.entries(AuditAction).map(([key, value]) => {
                        return {
                            label: key,
                            value: value
                        }
                    })
                },
                database: {
                    ...resource.options?.properties.action,
                    availableValues: Object.entries(Connections).map(([key, value]) => {
                        return {
                            label: Utils.camelize(key),
                            value: value.getDatabaseName()
                        }
                    })
                },
                data: {
                    ...resource.options?.properties.data,
                    isVisible: {
                        show: true,
                        filter: true,
                        list: false,
                        edit: false,
                    },
                    isArray: false,
                    components: {
                        show: adminjs.bundle("../../components/props/ViewJSON"),
                    },
                },
                user: {
                    ...resource.options?.properties.user,
                    isVisible: {
                        show: true,
                        filter: true,
                        list: false,
                        edit: false,
                    },
                    isArray: false,
                    components: {
                        show: adminjs.bundle("../../components/props/ViewJSON"),
                    },
                },
                session: {
                    ...resource.options?.properties.session,
                    isVisible: {
                        show: true,
                        filter: true,
                        list: false,
                        edit: false,
                    },
                    isArray: false,
                    components: {
                        show: adminjs.bundle("../../components/props/ViewJSON"),
                    },
                },
            },
        },
    };
};
