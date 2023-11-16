import { readFile } from "node:fs/promises";

/** @typedef {import("../FluxConfig.mjs").FluxConfig} FluxConfig */

export const FILE_SUFFIX = "-file";

export class FileValueProvider {
    /**
     * @returns {FileValueProvider}
     */
    static new() {
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
        if (key.endsWith(FILE_SUFFIX) || key.endsWith("-json")) {
            return null;
        }

        const value = await flux_config.getConfig(
            `${key}${FILE_SUFFIX}`,
            null,
            false
        );

        if (value === null) {
            return null;
        }

        return (await readFile(value, "utf8")).trimEnd();
    }
}
