import { CONFIG_TYPE_BOOLEAN } from "../CONFIG_TYPE.mjs";
import { SUFFIXES } from "./SUFFIXES.mjs";
import { PREFIX_NO, PREFIXES } from "./PREFIXES.mjs";

/** @typedef {import("../FluxConfig.mjs").FluxConfig} FluxConfig */

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
        if (PREFIXES.some(prefix => key.startsWith(prefix)) || SUFFIXES.some(suffix => key.endsWith(suffix))) {
            return null;
        }

        const value = await flux_config.getConfig(
            `${PREFIX_NO}${key}`,
            null,
            CONFIG_TYPE_BOOLEAN,
            false,
            false
        );

        if (typeof value !== "boolean") {
            return null;
        }

        return !value;
    }
}
