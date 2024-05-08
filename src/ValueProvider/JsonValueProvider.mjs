import { CONFIG_TYPE_STRING } from "../CONFIG_TYPE.mjs";
import { SUFFIX_FILE, SUFFIX_JSON } from "./SUFFIX.mjs";

/** @typedef {import("../Config.mjs").Config} Config */

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
     * @param {Config} config
     * @returns {Promise<*>}
     */
    async getConfig(key, config) {
        if (key.endsWith(SUFFIX_FILE) || key.endsWith(SUFFIX_JSON)) {
            return null;
        }

        const value = await config.getConfig(
            `${key}${SUFFIX_JSON}`,
            CONFIG_TYPE_STRING,
            null,
            false
        );

        if (value === null) {
            return null;
        }

        return JSON.parse(value);
    }
}
