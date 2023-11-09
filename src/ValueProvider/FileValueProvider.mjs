import { readFile } from "node:fs/promises";

/** @typedef {import("../FluxConfigApi.mjs").FluxConfigApi} FluxConfigApi */

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
     * @param {FluxConfigApi} flux_config_api
     * @returns {Promise<*>}
     */
    async getConfig(key, flux_config_api) {
        if (key.endsWith(FILE_SUFFIX) || key.endsWith("-json")) {
            return null;
        }

        const value = await flux_config_api.getConfig(
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
