import geoip from 'fast-geoip';
import config, { ENV } from '../../configs/app';
import { Models } from '../../bootstrap/database';
import { AccessLog } from '../../models/access/access_log';
import { Details } from 'express-useragent';
import { LogSession } from '../../models/access/log_session';
import { Utils } from '../helpers/utils';

/**
 * Create access log for express session
 * @param sid
 * @param session
 * @param ip
 * @param useragent
 */
export const createExpressSession = async (
    sid: string,
    session?: { [s in string]: any },
    ip?: string,
    useragent?: Details
): Promise<AccessLog> => {
    // Get geo location for IP
    ip = ip || Utils.getIp();
    const geo = await geoip.lookup(ip);
    // Create session
    const access = await Models.access.AccessLog.upsert({
        sessionToken: sid,
        ip: ip,
        city: geo?.city || 'local',
        region: geo?.region || 'local',
        country: geo?.country || 'local',
        timeZone: geo?.timezone || 'local',
        lat: geo?.ll ? geo.ll[0] : 0,
        lng: geo?.ll ? geo.ll[1] : 0,
        lastAccess: new Date(),
        isLive: config.env === ENV.PROD || config.env === ENV.STG ? 1 : 0,
    }, { hooks: false }).then(([access, created]) => {
        if (access && !created) {
            return Models.access.AccessLog.findOne({ where: { sessionToken: sid } });
        }
        return access;
    });
    if (access) {
        // Add device log
        access.logDevice = await Models.access.LogDevice.upsert({
            accessId: access.accessId,
            appName: config.server.name || '',
            appVersion: config.version || '',
            accessAgent: useragent?.browser || '',
            deviceOs: useragent?.os || '',
            deviceBrand: useragent?.platform || '',
            deviceType: useragent?.isMobile ? 'Mobile' : useragent?.isDesktop ? 'Desktop' : 'Browser',
        }, { hooks: false }).then(([device]) => device);

        // Add session data
        if (session) {
            access.logSessions = await Promise.all(Object.entries(session).map(async ([key, value]) => {
                const [log] = await Models.access.LogSession.upsert({
                    accessId: access.accessId,
                    sessionKey: key,
                    sessionValue: JSON.stringify(value),
                }, { hooks: false });
                return log;
            }));
        }
    }
    return access;
};

/**
 * Set access session log for express session
 * @param sid
 * @param session
 */
export const setExpressSession = async (
    sid: string,
    session: { [s in string]: any },
    touch = false
): Promise<AccessLog> => {
    let access = await Models.access.AccessLog.findOne({ where: { sessionToken: sid } });
    if (access) {
        // Update or Create session data
        if (session) {
            access.logSessions = await Promise.all(Object.entries(session).map(async ([key, value]) => {
                const [log] = await Models.access.LogSession.upsert({
                    accessId: access.accessId,
                    sessionKey: key,
                    sessionValue: JSON.stringify(value),
                }, { hooks: false });
                return log;
            }));
        }
        if (touch) {
            // Update last access
            access.update({ lastAccess: new Date() }, { hooks: false })
        }
        return access;
    }
    else return createExpressSession(sid, session)
};

/**
 * Update last access for session
 * @param sid
 */
export const updateLastAccess = async (
    sid: string,
): Promise<any> => {
    return Models.access.AccessLog.update({ lastAccess: new Date() }, { where: { sessionToken: sid }, hooks: false });
};

/**
 * Get access session log for express session
 * @param sid
 */
export const getExpressSession = async (sid: string, maxAge: number): Promise<LogSession[]> => {
    return await Models.access.AccessLog.findOne({ where: { sessionToken: sid } }).then((access) => {
        if (access && !hasExpired(access.lastAccess, maxAge)) {
            return access.getLogSessions()
        }
        return [];
    });
};

/**
 * Remove access session logs for express session
 * @param sid
 */
export const removeExpressSession = async (sid: string): Promise<void> => {
    const access = await Models.access.AccessLog.findOne({ where: { sessionToken: sid } });
    if (access) {
        await Models.access.LogSession.destroy({ where: { accessId: access.accessId }, hooks: false });
    }
    return;
};

/**
 * Get access session instance
 * @param sid
 */
export const getSession = async (sid: string): Promise<AccessLog> => {
    return await Models.access.AccessLog.findOne({ where: { sessionToken: sid } });
};

/**
 * Check session expiry
 * @param lastAccess 
 * @param maxAge 
 * @returns {boolean}
 */
function hasExpired(lastAccess: Date, maxAge: number): boolean {
    return lastAccess.getTime() + maxAge <= Date.now();
}