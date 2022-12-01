import { ValueProviderImplementation } from "./ValueProviderImplementation.mjs";

/** @typedef {import("../../Service/Config/Command/GetConfigCommand.mjs").GetConfigCommand} GetConfigCommand */

export class EnvValueProviderImplementation extends ValueProviderImplementation {
    /**
     * @type {{[key: string]: string}}
     */
    #env;
    /**
     * @type {string}
     */
    #prefix;

    /**
     * @param {{[key: string]: string}} env
     * @param {string} prefix
     * @returns {EnvValueProviderImplementation}
     */
    static new(env, prefix) {
        return new this(
            env,
            prefix
        );
    }

    /**
     * @param {{[key: string]: string}} env
     * @param {string} prefix
     * @private
     */
    constructor(env, prefix) {
        super();

        this.#env = env;
        this.#prefix = prefix;
    }

    /**
     * @param {string} key
     * @param {GetConfigCommand} getConfigCommand
     * @returns {Promise<*>}
     */
    async getConfig(key, getConfigCommand) {
        return (
            this.#env[`${this.#prefix}${key}`.replaceAll("-", "_").toUpperCase()]
        );
    }
}
