import { AccessAuditAttributes } from "../../models/access/access_audit";
import { Models } from "../../bootstrap/database";

/**
 * Create Audit record
 * @param params 
 */
export const createAudit = async (params: Partial<AccessAuditAttributes>) => {
    // [IMPORTANT] - set `hook` option to false to prevent infitite audit loops
    return Models.access.AccessAudit.findOrCreate({ where: { hash: params.hash }, defaults: params, hooks: false, ignoreDuplicates: true });
}