import { FILE_SUFFIX } from "./FileValueProvider.mjs";

/** @typedef {import("../FluxConfig.mjs").FluxConfig} FluxConfig */

export const JSON_SUFFIX = "-json";

export class JsonValueProvider {
    /**
     * @returns {Promise<JsonValueProvider>}
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
