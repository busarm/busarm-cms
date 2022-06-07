import {
    ActionContext,
    ActionRequest,
    ActionResponse,
    BulkActionResponse,
    ListActionResponse,
    RecordActionResponse,
} from "adminjs";
import flat from "flat";

/**
 * AdminJs Global Actions
 * Overrides CREATE, LIST, SHOW, EDIT, DELETE actions for all resources
 * Use to create global customizations
 */
export const Action = {
    /**
     * @type {After<RecordActionResponse>}
     * @param {ActionResponse} response
     * @param {ActionRequest} request
     * @param {ActionContext} context
     * @returns {Promise<RecordActionResponse>}
     */
    after_record_log: async (
        response: RecordActionResponse,
        request: ActionRequest,
        context: ActionContext
    ): Promise<RecordActionResponse> => {
        // If modification request
        if (
            request.method === "post" ||
            String(context.action.name).toLowerCase() === "delete"
        ) {
            /**
             * Remove sensitive info from log data.
             *
             * @param {any} data
             * @returns {object}
             */
            const clean = (data: any): object => {
                if (data && typeof data === "object") {
                    data = flat.unflatten(data);
                    delete data.password;
                    delete data.confirmPassword;
                    delete data.secret;
                    delete data.client_secret;
                    delete data.access_key;
                    delete data.access_token;
                }
                return data;
            };

            /**
             * @param {ActionRequest} req
             * @returns {any}
             */
            const cleanRequest = (req: ActionRequest): any => {
                return {
                    params: flat.unflatten(clean(req.params)),
                    query: flat.unflatten(clean(req.query)),
                    payload: flat.unflatten(clean(req.payload)),
                };
            };

            /**
             * @param {ActionResponse | RecordActionResponse | ListActionResponse | BulkActionResponse} res
             * @returns {any}
             */
            const cleanResponse = (
                res:
                    | ActionResponse
                    | RecordActionResponse
                    | ListActionResponse
                    | BulkActionResponse
            ): any => {
                // If single record response
                if (res.record) {
                    res.record = {
                        ...flat.unflatten(res.record),
                        params: clean(res.record.params),
                    };
                }
                // If multiple records response
                if (res.records) {
                    if (Array.isArray(res.records)) {
                        res.records = res.records.map((record) => {
                            return {
                                ...Object(flat.unflatten(record)),
                                params: clean(record.params),
                            };
                        });
                    } else {
                        res.records = clean(res.records);
                    }
                }
                // If custom response
                if (res.data) {
                    if (Array.isArray(res.data)) {
                        res.data = res.data.map((d) => clean(d));
                    } else {
                        res.data = clean(res.data);
                    }
                }

                return flat.unflatten(res);
            };

            // Log action
            // TODO Add logging to db
        }

        return response;
    },

    /**
     * @type {After<BulkActionResponse>}
     * @param {ActionResponse} response
     * @param {ActionRequest} request
     * @param {ActionContext} context
     * @returns {Promise<BulkActionResponse>}
     */
    after_bulk_log: async (
        response: BulkActionResponse,
        request: ActionRequest,
        context: ActionContext
    ): Promise<BulkActionResponse> => {
        // If modification request
        if (
            request.method === "post" ||
            String(context.action.name).toLowerCase() === "delete"
        ) {
            /**
             * Remove sensitive info from log data.
             *
             * @param {any} data
             * @returns {object}
             */
            const clean = (data: any): object => {
                if (data && typeof data === "object") {
                    data = flat.unflatten(data);
                    delete data.password;
                    delete data.confirmPassword;
                    delete data.secret;
                    delete data.client_secret;
                    delete data.access_key;
                    delete data.access_token;
                }
                return data;
            };

            /**
             * @param {ActionRequest} req
             * @returns {any}
             */
            const cleanRequest = (req: ActionRequest): any => {
                return {
                    params: flat.unflatten(clean(req.params)),
                    query: flat.unflatten(clean(req.query)),
                    payload: flat.unflatten(clean(req.payload)),
                };
            };

            /**
             * @param {ActionResponse | RecordActionResponse | ListActionResponse | BulkActionResponse} res
             * @returns {any}
             */
            const cleanResponse = (
                res:
                    | ActionResponse
                    | RecordActionResponse
                    | ListActionResponse
                    | BulkActionResponse
            ): any => {
                // If single record response
                if (res.record) {
                    res.record = {
                        ...flat.unflatten(res.record),
                        params: clean(res.record.params),
                    };
                }
                // If multiple records response
                if (res.records) {
                    if (Array.isArray(res.records)) {
                        res.records = res.records.map((record) => {
                            return {
                                ...Object(flat.unflatten(record)),
                                params: clean(record.params),
                            };
                        });
                    } else {
                        res.records = clean(res.records);
                    }
                }
                // If custom response
                if (res.data) {
                    if (Array.isArray(res.data)) {
                        res.data = res.data.map((d) => clean(d));
                    } else {
                        res.data = clean(res.data);
                    }
                }

                return flat.unflatten(res);
            };

            // Log action
            // TODO Add logging to db
        }

        return response;
    },

    /**
     * @param {String} userId
     * @param {any} info
     */
    auth_success_log: async (userId: string, info: any = null) => {
        // TODO Add logging
    },

    /**
     * @param {String} userId
     * @param {any} info
     */
    auth_failed_log: async (userId: string, info: any = null) => {
        // TODO Add logging
    },

    /**
     * @param {String} userId
     * @param {any} info
     */
    auth_user_blocked: async (userId: string, info: any = null) => {
        // TODO Add logging
    },

    /**
     * @param {String} userId
     * @param {any} info
     */
    access_denied_log: async (userId: string, info: any = null) => {
        // TODO Add logging
    },
};
