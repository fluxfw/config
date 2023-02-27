import { readFile } from "node:fs/promises";
import { ValueProviderImplementation } from "./ValueProviderImplementation.mjs";

/** @typedef {import("../../Service/Config/Command/GetConfigCommand.mjs").GetConfigCommand} GetConfigCommand */

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
     * @param {GetConfigCommand} getConfigCommand
     * @returns {Promise<*>}
     */
    async getConfig(key, getConfigCommand) {
        if (key === CONFIG_FILE_KEY) {
            return null;
        }

        return (await this.#getConfigFile(
            getConfigCommand
        ))[key] ?? null;
    }

    /**
     * @param {GetConfigCommand} getConfigCommand
     * @returns {Promise<{[key: string]: *}>}
     */
    async #getConfigFile(getConfigCommand) {
        if (this.#config === null) {
            const config_file = await getConfigCommand.getConfig(
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
