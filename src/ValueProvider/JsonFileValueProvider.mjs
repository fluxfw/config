import { FILE_SUFFIX } from "./FileValueProvider.mjs";
import { JSON_SUFFIX } from "./JsonValueProvider.mjs";
import { readFile } from "node:fs/promises";

/** @typedef {import("../FluxConfig.mjs").FluxConfig} FluxConfig */

export const JSON_FILE_SUFFIX = `${JSON_SUFFIX}${FILE_SUFFIX}`;

export class JsonFileValueProvider {
    /**
     * @returns {Promise<JsonFileValueProvider>}
     */
    static async new() {
        return new this();
    }

    /**
     * @private
     */
    constructor() {

    }

    /**
     * @param {string} key
     * @param {FluxConfig} flux_config
     * @returns {Promise<*>}
     */
    async getConfig(key, flux_config) {
        if (key.endsWith(FILE_SUFFIX) || key.endsWith(JSON_SUFFIX)) {
            return null;
        }

        const value = await flux_config.getConfig(
            `${key}${JSON_FILE_SUFFIX}`,
            null,
            false
        );

        if (value === null) {
            return null;
        }

        return JSON.parse(await readFile(value, "utf8"));
    }
}
