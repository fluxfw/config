import { CONFIG_TYPE_BOOLEAN, CONFIG_TYPE_NUMBER } from "../CONFIG_TYPE.mjs";

export class EnvValueProvider {
    /**
     * @type {{[key: string]: string}}
     */
    #env;
    /**
     * @type {string | null}
     */
    #prefix;

    /**
     * @param {{[key: string]: string}} env
     * @param {string | null} prefix
     * @returns {Promise<EnvValueProvider>}
     */
    static async new(env, prefix = null) {
        return new this(
            env,
            prefix
        );
    }

    /**
     * @param {{[key: string]: string}} env
     * @param {string | null} prefix
     * @private
     */
    constructor(env, prefix) {
        this.#env = env;
        this.#prefix = prefix;
    }

    /**
     * @returns {string[]}
     */
    get cast_types() {
        return [
            CONFIG_TYPE_BOOLEAN,
            CONFIG_TYPE_NUMBER
        ];
    }

    /**
     * @param {string} key
     * @returns {Promise<*>}
     */
    async getConfig(key) {
        return this.#env[`${this.#prefix ?? ""}${key}`.replaceAll("-", "_").toUpperCase()] ?? null;
    }
}
