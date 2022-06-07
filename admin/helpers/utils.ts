import fs from "fs";
import util from "util";
import config from "../../configs/app";

/**
 * Globol Utilities
 */
export const Utils = {
    /**
     * Write file to storage
     * @param path
     * @param data
     * @param options
     * @returns {Promise<void>}
     */
    writeFile: util.promisify(fs.writeFile),

    /**
     * Read file from storage
     * @param path
     * @param options
     * @param encoding
     * @param flag
     * @returns {Promise<Buffer>}
     */
    readFile: util.promisify(fs.readFileSync),

    /**
     * @param {String} s
     * @returns {String}
     */
    capitalizeString: (s: string): string => {
        return s && s[0].toUpperCase() + s.slice(1);
    },
    /**
     * @param {String} s
     * @returns {String}
     */
    stripDash: (s: string): string => {
        return s.replace(/[-]|[_]/, " ").trim();
    },

    /**
     *
     * @param {import('express').Request} req
     * @returns {string}
     */
    getIp: (req: import("express").Request): string => {
        if (!req) return "127.0.0.1:" + config.server.port;
        return (
            req.socket.remoteAddress ||
            req.ip ||
            "127.0.0.1:" + config.server.port
        );
    },

    /**
     * Lighten Color
     * @param {String} colorCode The hex color code (with or without # prefix).
     * @param {Number} amount
     */
    lightenColor(colorCode: string, amount: number): string {
        var usePound = false;
        if (colorCode[0] == "#") {
            colorCode = colorCode.slice(1);
            usePound = true;
        }
        var num = parseInt(colorCode, 16);

        var r = (num >> 16) + amount;
        if (r > 255) {
            r = 255;
        } else if (r < 0) {
            r = 0;
        }
        var b = ((num >> 8) & 0x00ff) + amount;
        if (b > 255) {
            b = 255;
        } else if (b < 0) {
            b = 0;
        }
        var g = (num & 0x0000ff) + amount;
        if (g > 255) {
            g = 255;
        } else if (g < 0) {
            g = 0;
        }
        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
    },

    /**
     * Darken Color
     * @param {String} colorCode The hex color code (with or without # prefix).
     * @param {Number} amount
     */
    darkenColor(colorCode: string, amount: number): string {
        var usePound = false;
        if (colorCode[0] == "#") {
            colorCode = colorCode.slice(1);
            usePound = true;
        }
        var num = parseInt(colorCode, 16);

        var r = (num >> 16) - amount;
        if (r > 255) {
            r = 255;
        } else if (r < 0) {
            r = 0;
        }
        var b = ((num >> 8) & 0x00ff) - amount;
        if (b > 255) {
            b = 255;
        } else if (b < 0) {
            b = 0;
        }
        var g = (num & 0x0000ff) - amount;
        if (g > 255) {
            g = 255;
        } else if (g < 0) {
            g = 0;
        }
        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
    },

    /**
     * String to camel case
     * @param str
     * @returns {string}
     */
    camelize(str: string): string {
        return str
            .toLowerCase()
            .replace(new RegExp(/[-_]+/, "g"), " ")
            .replace(new RegExp(/[^\w\s]/, "g"), "")
            .replace(
                new RegExp(/\s+(.)(\w*)/, "g"),
                ($1, $2, $3) => `${$2.toUpperCase() + $3}`
            )
            .replace(new RegExp(/\w/), (s) => s.toUpperCase());
    },
};

