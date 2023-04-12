import { readFile } from "node:fs/promises";

/** @typedef {import("../FluxConfigApi.mjs").FluxConfigApi} FluxConfigApi */
/** @typedef {import("./ValueProviderImplementation.mjs").ValueProviderImplementation} ValueProviderImplementation */

const CONFIG_FILE_KEY = "config-file";

/**
 * @implements {ValueProviderImplementation}
 */
export class ConfigFileValueProviderImplementation {
    /**
     * @type {{[key: string]: *} | null}
     */
    #config = null;

    /**
     * @returns {ConfigFileValueProviderImplementation}
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
        if (key === CONFIG_FILE_KEY) {
            return null;
        }

        return (await this.#getConfigFile(
            flux_config_api
        ))[key] ?? null;
    }

    /**
     * @param {FluxConfigApi} flux_config_api
     * @returns {Promise<{[key: string]: *}>}
     */
    async #getConfigFile(flux_config_api) {
        if (this.#config === null) {
            const config_file = await flux_config_api.getConfig(
                CONFIG_FILE_KEY,
                null,
                false
            );

            if ((config_file ?? null) !== null) {
                this.#config = JSON.parse(await readFile(config_file, "utf8")) ?? {};
            } else {
                this.#config = {};
            }
        }

        return this.#config;
    }
}
