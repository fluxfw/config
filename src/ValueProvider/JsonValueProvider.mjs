import { FILE_SUFFIX } from "./FileValueProvider.mjs";

/** @typedef {import("../FluxConfigApi.mjs").FluxConfigApi} FluxConfigApi */

export const JSON_SUFFIX = "-json";

export class JsonValueProvider {
    /**
     * @returns {JsonValueProvider}
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
        if (key.endsWith(FILE_SUFFIX) || key.endsWith(JSON_SUFFIX)) {
            return null;
        }

        const value = await flux_config_api.getConfig(
            `${key}${JSON_SUFFIX}`,
            null,
            false
        );

        if (value === null) {
            return null;
        }

        return JSON.parse(value);
    }
}
