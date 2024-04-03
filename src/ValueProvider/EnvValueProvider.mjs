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
     * @param {string} key
     * @returns {Promise<*>}
     */
    async getConfig(key) {
        return this.#env[`${this.#prefix ?? ""}${key}`.replaceAll("-", "_").toUpperCase()] ?? null;
    }
}
