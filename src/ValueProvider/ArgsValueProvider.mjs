import { parseArgs } from "node:util";
import { CONFIG_TYPE_BOOLEAN, CONFIG_TYPE_NUMBER } from "../CONFIG_TYPE.mjs";

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
        return structuredClone((await this.#parseArgs())[key.replaceAll("_", "-").toLowerCase()] ?? null);
    }

    /**
     * @returns {Promise<{[key: string]: *}>}
     */
    async #parseArgs() {
        this.#parsed_args ??= parseArgs({
            args: this.#args,
            strict: false
        }).values;

        return this.#parsed_args;
    }
}
