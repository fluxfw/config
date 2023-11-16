import { FILE_SUFFIX } from "./FileValueProvider.mjs";
import { JSON_FILE_SUFFIX } from "./JsonFileValueProvider.mjs";
import { JSON_SUFFIX } from "./JsonValueProvider.mjs";

/** @typedef {import("../FluxConfig.mjs").FluxConfig} FluxConfig */

const CONFIG_KEY = "config";

export class ConfigValueProvider {
    /**
     * @type {{[key: string]: *} | null}
     */
    #config = null;

    /**
     * @returns {ConfigValueProvider}
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
        if (key === CONFIG_KEY || key === `${CONFIG_KEY}${FILE_SUFFIX}` || key === `${CONFIG_KEY}${JSON_SUFFIX}` || key === `${CONFIG_KEY}${JSON_FILE_SUFFIX}`) {
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
            false
        );

        return this.#config;
    }
}
