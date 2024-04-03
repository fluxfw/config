export class ArgsValueProvider {
    /**
     * @type {string[] | null}
     */
    #args;
    /**
     * @type {{[key: string]: *} | null}
     */
    #parsed_args = null;

    /**
     * @param {string[] | null} args
     * @returns {Promise<ArgsValueProvider>}
     */
    static async new(args = null) {
        return new this(
            args
        );
    }

    /**
     * @param {string[] | null} args
     * @private
     */
    constructor(args) {
        this.#args = args;
    }

    /**
     * @param {string} key
     * @returns {Promise<*>}
     */
    async getConfig(key) {
        return structuredClone((await this.#parseArgs())[key.replaceAll("_", "-").toLowerCase()] ?? null);
    }

    /**
     * @returns {Promise<{[key: string]: *}>}
     */
    async #parseArgs() {
        this.#parsed_args ??= (await import("node:util")).parseArgs({
            args: this.#args,
            strict: false
        }).values;

        return this.#parsed_args;
    }
}
