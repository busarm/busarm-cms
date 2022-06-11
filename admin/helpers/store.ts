import { Cookie } from 'express-session';
import { SessionData, Store } from 'express-session';
import { Utils } from './utils';
import { CookieOptions, Request } from 'express';
import CryptoJS from "crypto-js";

import {
    createExpressSession,
    getExpressSession,
    removeExpressSession,
    setExpressSession,
} from '../services/SessionService';

// Custom session store
export class AccesSessionStore extends Store {

    constructor(private cookieOptions: CookieOptions) {
        super();
    }

    /**
     * 
     * @param req Generate Session ID
     * @returns 
     */
    generateId?(req: Request): string {
        const salt = CryptoJS.lib.WordArray.random(
            128 / 8
        ).toString();
        return CryptoJS.SHA256(req.ip + req.originalUrl + salt).toString();
    }

    /**
     * Create Session
     * @param req
     * @param session
     */
    createSession(req: Request, session: SessionData = null): any {
        createExpressSession(req.sessionID, session, Utils.getIp(req), req.useragent);
        session.cookie = this.cookieOptions as Cookie;
        return super.createSession(req, session);
    }

    /**
     * Touches a given session, resetting the idle timer
     * @param sid 
     * @param data 
     * @param callback 
     */
    touch(sid: string, data: any, callback?: (err: any) => void): void {
        console.error("TOUCH SESSION", data);
        setExpressSession(sid, data, true)
            .catch(callback || console.log);
    }

    /**
     * Get Session Data
     * @param sid 
     * @param callback 
     */
    get(sid: string, callback: (err: any, session?: SessionData | null) => void): void {
        getExpressSession(sid, this.cookieOptions.maxAge)
            .then((sessions) => {
                if (sessions) {
                    let list: { [s in string]: any } = {};
                    if (sessions.length > 0) {
                        sessions.forEach((log) => {
                            list[log.sessionKey] = Utils.fromJsonOrString(log.sessionValue);
                        });
                    }
                    return callback(false, list as SessionData);
                }
                return callback(false);
            })
            .catch(callback);
    }

    /**
     * Get Session Data* 
     * @param sid 
     * @param session 
     * @param callback 
     */
    set(sid: string, session: SessionData, callback?: (err?: any) => void): void {
        setExpressSession(sid, session)
            .then(() => callback())
            .catch(callback || console.log);
    }

    /**
     * Destroy Session Data
     * @param sid 
     * @param callback 
     */
    destroy(sid: string, callback?: (err?: any) => void): void {
        removeExpressSession(sid)
            .then(callback)
            .catch(callback || console.log);
    }
}