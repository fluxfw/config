import { CONFIG_TYPE_NONE } from "../CONFIG_TYPE.mjs";
import { PREFIXES } from "./PREFIXES.mjs";
import { SUFFIXES } from "./SUFFIXES.mjs";

/** @typedef {import("../FluxConfig.mjs").FluxConfig} FluxConfig */

const CONFIG_KEY = "config";

export class ConfigValueProvider {
    /**
     * @type {{[key: string]: *} | null}
     */
    #config = null;

    /**
     * @returns {Promise<ConfigValueProvider>}
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
        if (key === CONFIG_KEY || PREFIXES.some(prefix => key === `${prefix}${CONFIG_KEY}`) || SUFFIXES.some(suffix => key === `${CONFIG_KEY}${suffix}`)) {
            return null;
        }

        return structuredClone((await this.#getConfig(
            flux_config
        ))[key.replaceAll("_", "-").toLowerCase()] ?? null);
    }

    /**
     * @param {FluxConfig} flux_config
     * @returns {Promise<{[key: string]: *}>}
     */
    async #getConfig(flux_config) {
        this.#config ??= await flux_config.getConfig(
            CONFIG_KEY,
            {},
            CONFIG_TYPE_NONE
        );

        return this.#config;
    }
}
