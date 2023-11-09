export class EnvValueProvider {
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
     * @returns {EnvValueProvider}
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
        this.#env = env;
        this.#prefix = prefix;
    }

    /**
     * @param {string} key
     * @returns {Promise<*>}
     */
    async getConfig(key) {
        return this.#env[`${this.#prefix}${key}`.replaceAll("-", "_").toUpperCase()] ?? null;
    }
}
