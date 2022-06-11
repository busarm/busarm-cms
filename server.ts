require("dotenv").config();
import express from "express";
import useragent from "express-useragent";
import compression from "compression";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import admin from "./admin";
import config from "./configs/app";
import { aceessSession } from "./admin/helpers/session";

// Init Express
const app = express();

app.set('trust proxy', 1); // Trust proxy
app.use(useragent.express());
app.use(compression());
app.use(cors({ origin: "*" }));
app.use(helmet.frameguard({ action: "DENY" }));
app.use(helmet.hidePoweredBy());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cookieParser(config.session.secret));
app.use(aceessSession());
app.use(express.static("public")); // Serve static files from /public

// Add route middleware to prevent caching admin API in browser, which could lead to issues
app.use("/api/*", function (_, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
    res.header("Pragma", "no-cache"); // HTTP 1.0.
    res.header("Expires", "0"); // Proxies.
    next();
});

// Setup Adminjs
// Should be defined after expressSession and before express.json & express.urlencoded
admin("/", app)
    .then((app) => {
        app.use(express.json({ limit: '50mb', type: 'application/json' }));
        app.use(
            express.urlencoded({
                limit: "50mb",
                extended: true,
                parameterLimit: 50000,
            })
        );
        // Start server
        app.listen(config.server.port);
        console.log(
            config.server.name + " Running on port: " + config.server.port
        );
    })
    .catch((err: any) => {
        console.error("Failed to start server", err);
    });
