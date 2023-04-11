import { readFile } from "node:fs/promises";

/** @typedef {import("../FluxConfigApi.mjs").FluxConfigApi} FluxConfigApi */
/** @typedef {import("./ValueProviderImplementation.mjs").ValueProviderImplementation} ValueProviderImplementation */

const FILE_SUFFIX = "-file";

/**
 * @implements {ValueProviderImplementation}
 */
export class FileValueProviderImplementation {
    /**
     * @returns {FileValueProviderImplementation}
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
        if (key.endsWith(FILE_SUFFIX)) {
            return null;
        }

        const value_file = await flux_config_api.getConfig(
            `${key}${FILE_SUFFIX}`
        );
        if ((value_file ?? null) === null) {
            return null;
        }

        let value = await readFile(value_file, "utf8");

        if (value_file.endsWith(".json")) {
            value = JSON.parse(value) ?? {};
        } else {
            value = value.trimEnd();
        }

        return value;
    }
}
