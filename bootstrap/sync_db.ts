require("dotenv").config();
import config from "../configs/db";
import { SequelizeAuto } from "sequelize-auto";

/**
 * Sync database models
 */
for (const key in config) {
    const db = config[key];
    const auto = new SequelizeAuto(
        db.name || "",
        db.username || "",
        db.password || "",
        {
            host: db.host,
            port: db.port,
            dialect: "mysql",
            directory: "./models/" + key,
            caseModel: "p",
            caseFile: "l",
            caseProp: "c",
            singularize: true,
            additional: {
                timestamps: false,
            },
            lang: "ts",
            useDefine: true,
            pkSuffixes: [],
            skipFields: [],
            noAlias: true,
            noWrite: false
        }
    );
    auto.run();
}
