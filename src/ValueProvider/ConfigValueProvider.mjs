import { CONFIG_TYPE_OBJECT } from "../CONFIG_TYPE.mjs";

/** @typedef {import("../Config.mjs").Config} Config */

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
     * @param {Config} config
     * @returns {Promise<*>}
     */
    async getConfig(key, config) {
        if (this.#config === false) {
            return null;
        }

        return structuredClone((await this.#getConfig(
            config
        ))[key.replaceAll("_", "-").toLowerCase()] ?? null);
    }

    /**
     * @param {Config} config
     * @returns {Promise<{[key: string]: *}>}
     */
    async #getConfig(config) {
        if (this.#config === null) {
            this.#config = false;

            this.#config = await config.getConfig(
                CONFIG_KEY,
                CONFIG_TYPE_OBJECT,
                {}
            );
        }

        return this.#config;
    }
}
