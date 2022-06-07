require("dotenv").config();
import express from "express";
import session from "express-session";
import compression from "compression";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import admin from "./admin";
import config from "./configs/app";
import { Options } from "./admin/helpers/session";

// Init Express
const app = express();

app.use(session(Options));
app.use(compression());
app.use(cors({ origin: "*" }));
app.use(helmet.frameguard({ action: "DENY" }));
app.use(helmet.hidePoweredBy());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cookieParser(config.session.secret));
app.use(express.static("public")); // Serve static files from /public

// Setup Adminjs
// Should be defined after expressSession and before express.json & express.urlencoded
admin("/", app)
    .then((app) => {
        app.use(express.json({ limit: "8mb", type: "application/json" }));
        app.use(
            express.urlencoded({
                limit: "8mb",
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
