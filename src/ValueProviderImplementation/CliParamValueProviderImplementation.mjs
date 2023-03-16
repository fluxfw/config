import { ValueProviderImplementation } from "./ValueProviderImplementation.mjs";

const PARAM_PREFIX = "--";

export class CliParamValueProviderImplementation extends ValueProviderImplementation {
    /**
     * @type {string[]}
     */
    #argv;

    /**
     * @param {string[]} argv
     * @returns {CliParamValueProviderImplementation}
     */
    static new(argv) {
        return new this(
            argv
        );
    }

    /**
     * @param {string[]} argv
     * @private
     */
    constructor(argv) {
        super();

        this.#argv = argv;
    }

    /**
     * @param {string} key
     * @returns {Promise<*>}
     */
    async getConfig(key) {
        const argv = this.#argv.slice(2);

        for (const [
            i,
            param
        ] of argv.entries()) {
            if (param === `${PARAM_PREFIX}${key}`) {
                return argv[i + 1] ?? null;
            }
        }

        return null;
    }
}
