import { Request, RequestHandler } from "express";
import { Model, Sequelize } from "sequelize/types";
import { Utils } from "./utils";
import { getSession } from "../services/SessionService";
import { createAudit } from "../services/Audit";
import { EventEmitter } from "events";
import CryptoJS from "crypto-js";

// TODO Add audit pruning - delete audits after sometime

export enum AuditAction {
    BULK_CREATE = "bulk_create",
    CREATE = "create",
    UPDATE = "update",
    DELETE = "delete"
}

export const AuditEvent = new EventEmitter();

export interface AuditOptions {
    databases: Sequelize[],
    pruneAfterDays?: number
}

/**
 * Add audit
 * 
 * @param req 
 * @param action 
 * @param model 
 */
export async function addAudit(req: Request, action: AuditAction, model: Model) {
    const name = model.constructor.name ?? model.constructor['tableName'] ?? model['tableName'];
    const database = model.sequelize.getDatabaseName();
    const data = Utils.toJsonOrString(model.toJSON());
    const hash = CryptoJS.MD5(action + req.session?.adminUser?.id + req.sessionID + database + name + data).toString()
    return createAudit({
        action,
        data,
        hash,
        database,
        model: name,
        user: Utils.toJsonOrString(req.session?.adminUser),
        session: Utils.toJsonOrString((await getSession(req.sessionID))?.toJSON()),
    })
}

/**
 * Initialize Auditing
 * @param databases 
 */
export function initAuditEvents(databases: Sequelize[]) {
    databases.forEach((sequelize) => {
        // Create Action Audit Event
        sequelize.afterCreate('audit_create', async (model) => {
            AuditEvent.emit(AuditAction.CREATE, model);
        })
        sequelize.afterBulkCreate('audit_bulk_create', (models) => {
            AuditEvent.emit(AuditAction.BULK_CREATE, models);
        })
        // Update Action Audit Event
        sequelize.afterUpdate('audit_update', async (model) => {
            AuditEvent.emit(AuditAction.UPDATE, model);
        })
        // Delete Action Audit Event
        sequelize.afterDestroy('audit_delete', async (model) => {
            AuditEvent.emit(AuditAction.DELETE, model);
        })
    })
}

// Access Audit Middleware
export const aceessAudit = (options: AuditOptions): RequestHandler => {
    // Start Events 
    initAuditEvents(options.databases);
    return (req, res, next) => {
        // Set up listeners
        const listeners = {
            [AuditAction.CREATE]: (model: Model) => {
                addAudit(req, AuditAction.CREATE, model);
            },
            [AuditAction.BULK_CREATE]: (models: Model[]) => {
                models.forEach((model) => {
                    addAudit(req, AuditAction.CREATE, model);
                });
            },
            [AuditAction.UPDATE]: (model: Model) => {
                addAudit(req, AuditAction.UPDATE, model);
            },
            [AuditAction.DELETE]: (model: Model) => {
                addAudit(req, AuditAction.DELETE, model);
            },
        }

        // Listen to events
        AuditEvent
            // Create Action Audit
            .on(AuditAction.CREATE, listeners[AuditAction.CREATE])
            // Bulk Create Action Audit
            .on(AuditAction.BULK_CREATE, listeners[AuditAction.BULK_CREATE])
            // Update Action Audit
            .on(AuditAction.UPDATE, listeners[AuditAction.UPDATE])
            // Delete Action Audit
            .on(AuditAction.DELETE, listeners[AuditAction.DELETE])

        // Clean up on finish
        res.on('finish', () => {
            AuditEvent
                // Create Action Audit
                .removeListener(AuditAction.CREATE, listeners[AuditAction.CREATE])
                // Bulk Create Action Audit
                .removeListener(AuditAction.BULK_CREATE, listeners[AuditAction.BULK_CREATE])
                // Update Action Audit
                .removeListener(AuditAction.UPDATE, listeners[AuditAction.UPDATE])
                // Delete Action Audit
                .removeListener(AuditAction.DELETE, listeners[AuditAction.DELETE])
        })
        return next();
    }
};