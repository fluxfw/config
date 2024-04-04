import { CONFIG_TYPE_OBJECT } from "../CONFIG_TYPE.mjs";

/** @typedef {import("../FluxConfig.mjs").FluxConfig} FluxConfig */

const CONFIG_KEY = "config";

export class ConfigValueProvider {
    /**
     * @type {{[key: string]: *} | false | null}
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
        if (this.#config === false) {
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
        if (this.#config === null) {
            this.#config = false;

            this.#config = await flux_config.getConfig(
                CONFIG_KEY,
                CONFIG_TYPE_OBJECT,
                {}
            );
        }

        return this.#config;
    }
}
