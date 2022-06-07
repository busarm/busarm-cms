import { CurrentAdmin } from "adminjs";
import { SessionOptions, Store } from "express-session";
import connect from "connect-session-sequelize";
import config from "../../configs/app";
import { Connections } from "../../bootstrap/database";

// Set up db session storate
const SequelizeStore = new (connect(Store))({
    db: Connections.access,
    tableName: 'cms_sessions',
    checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
    expiration: config.session.timeout * 1000, // The maximum age (in milliseconds) of a valid session.
});
SequelizeStore.sync();

// Session storage values
interface SessionValues {
    adminUser: CurrentAdmin;
}

// Overload express session interface to include session vars
declare module "express-session" {
    export interface SessionData extends SessionValues {}
}

// Session Options
export const Options: SessionOptions = {
    name: config.server.name.toLocaleLowerCase().replace(" ", "_"),
    secret: config.session.secret,
    saveUninitialized: true,
    cookie: { maxAge: config.session.timeout * 1000, sameSite: "lax" },
    resave: true,
    store: SequelizeStore,
};
