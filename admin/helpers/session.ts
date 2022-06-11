import { CookieOptions, Request, RequestHandler } from 'express';
import session from 'express-session';
import { CurrentAdmin } from 'adminjs';
import { SessionOptions } from 'express-session';
import config from '../../configs/app';
import { AccesSessionStore } from './store';

// Overload express session interface to include session vars
declare module 'express-session' {
  export interface SessionData {
    adminUser?: CurrentAdmin;
  }
}

// Session Options
export const CookieOption: CookieOptions = {
  maxAge: config.session.timeout * 1000,
  sameSite: 'lax',
};

// Session Options
export const getSessionOption = (): SessionOptions => {
  const store = new AccesSessionStore(CookieOption);
  return {
    name: config.server.name.toLocaleLowerCase().replace(' ', '_'),
    secret: config.session.secret,
    saveUninitialized: true,
    resave: true,
    cookie: CookieOption,
    store: store,
    genid: store.generateId,
  }
};

// Access Session Middleware
export const aceessSession = (): RequestHandler => {
  return session(getSessionOption());
};
