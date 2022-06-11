import { AccessPermissions } from "../../helpers/permissions";
import { Model, ModelStatic } from "sequelize/types";
import { DefaultResource, Navigation, Resource, SequelizeResource } from "../../resource";
import adminjs, { RecordActionResponse } from "adminjs";

/**
 * @param {Model} model Model Object
 * @param {Number} order Order of resource in list
 * @param {Navigation} navigation
 * @param {AccessPermissions} viewPermission
 * @param {AccessPermissions} modifyPermission
 * @returns {Resource}
 */
export const LogSessionResource = (
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
                        try {
                            if (response.record.params.sessionValue) {
                                response.record.params.sessionValue = JSON.parse(response.record.params.sessionValue);
                            }
                        } catch (error) {
                            console.log(error);
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
            },
            properties: {
                ...resource.options?.properties,
                sessionValue: {
                    ...resource.options?.properties.sessionValue,
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
