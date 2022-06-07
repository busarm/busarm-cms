import {
    ActionContext,
    ActionResponse,
    ListActionResponse,
    NoticeMessage,
    PropertyErrors,
    RecordActionResponse,
} from "adminjs";
import { ValidationError, BaseRecord } from "adminjs";
import app from "../../configs/app";

/**
 * Globol Response helper
 */
export const Response = {
    /**
     * Record action response. This can be user to return SINGLE record item
     *
     * @param {ActionContext} context
     * @param {Object} data
     * @param {NoticeMessage} notice
     * @returns {RecordActionResponse|null}
     */
    record: (
        context: ActionContext,
        data: any,
        notice?: NoticeMessage
    ): RecordActionResponse | null => {
        if (!context.record) return null;
        if (data) {
            context.record.storeParams(data);
        }
        return {
            record: context.record?.toJSON(context.currentAdmin),
            notice,
        };
    },

    /**
     * List action response. This can be user to return MANY record items
     *
     * @param {ActionContext} context
     * @param {Object[]} data
     * @param {{total: Number, perPage: Number, page: Number, direction: 'asc' | 'desc', sortBy: String }} meta
     * @param {NoticeMessage} notice
     * @returns {ListActionResponse}
     */
    records: (
        context: ActionContext,
        data: object[] = [],
        meta: {
            total: number;
            perPage: number;
            page: number;
            direction: "asc" | "desc";
            sortBy: string;
        } = {
            page: 1,
            perPage: app.pagination.per_page,
            total: 0,
            direction: "asc",
            sortBy: "",
        },
        notice?: NoticeMessage
    ): ListActionResponse => {
        return {
            records: data.map((r) =>
                new BaseRecord(r, context.resource).toJSON(context.currentAdmin)
            ),
            meta,
            notice,
        };
    },

    /**
     * Resource action response. This can be user to return CUSTOM resource item(s)
     *
     * @param {Object[]} data
     * @param {NoticeMessage} notice
     * @returns {ActionResponse}
     */
    resource: (data: object[], notice?: NoticeMessage): ActionResponse => {
        return {
            data,
            notice,
        };
    },

    /**
     * Action Response Success Notice
     *
     * @param {ActionContext} context
     * @param {String} message
     * @returns {ActionResponse}
     */
    success: (context: ActionContext, message: string): ActionResponse => {
        return {
            record:
                context.record && context.record.toJSON(context.currentAdmin),
            notice: {
                message,
                type: "success",
            },
        };
    },

    /**
     * Action Response Error Notice
     *
     * @param {ActionContext} context
     * @param {String} message
     * @returns {ActionResponse}
     */
    error: (context: ActionContext, message: string): ActionResponse => {
        return {
            record:
                context.record && context.record.toJSON(context.currentAdmin),
            notice: {
                message,
                type: "error",
            },
        };
    },

    /**
     * Action Response Error Notice
     *
     * @param {ActionContext} context
     * @param {String} url
     * @param {NoticeMessage} notice
     * @returns {ActionResponse}
     */
    redirect: (
        context: ActionContext,
        url: string,
        notice?: NoticeMessage
    ): ActionResponse => {
        return {
            record:
                context.record && context.record.toJSON(context.currentAdmin),
            redirectUrl: url,
            notice,
        };
    },

    /**
     * Action Validation Error
     *
     * @param {String} message
     * @param {PropertyErrors} errors
     * @throws {ValidationError}
     */
    throwValidationError: (message: string, errors?: PropertyErrors) => {
        throw new ValidationError(errors || {}, {
            message,
            type: "error",
        });
    },
};
