import { readFile } from "node:fs/promises";
import { ValueProviderImplementation } from "./ValueProviderImplementation.mjs";

/** @typedef {import("../FluxConfigApi.mjs").FluxConfigApi} FluxConfigApi */

const CONFIG_FILE_KEY = "config-file";

export class ConfigFileValueProviderImplementation extends ValueProviderImplementation {
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
        super();
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
                CONFIG_FILE_KEY
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
