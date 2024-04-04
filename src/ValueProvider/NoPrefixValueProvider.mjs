import { CONFIG_TYPE_BOOLEAN } from "../CONFIG_TYPE.mjs";
import { SUFFIX_FILE, SUFFIX_JSON } from "./SUFFIX.mjs";

/** @typedef {import("../FluxConfig.mjs").FluxConfig} FluxConfig */

const PREFIX_NO = "no-";

export class NoPrefixValueProvider {
    /**
     * @returns {Promise<NoPrefixValueProvider>}
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
        if (key.startsWith(PREFIX_NO) || key.endsWith(SUFFIX_FILE) || key.endsWith(SUFFIX_JSON)) {
            return null;
        }

        const value = await flux_config.getConfig(
            `${PREFIX_NO}${key}`,
            CONFIG_TYPE_BOOLEAN,
            null,
            false
        );

        if (value === null) {
            return null;
        }

        return !value;
    }
}
