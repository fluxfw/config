const PARAM_PREFIX = "--";

export class CliParamValueProvider {
    /**
     * @type {string[]}
     */
    #argv;

    /**
     * @param {string[]} argv
     * @returns {Promise<CliParamValueProvider>}
     */
    static async new(argv) {
        return new this(
            argv
        );
    }

    /**
     * @param {string[]} argv
     * @private
     */
    constructor(argv) {
        this.#argv = argv;
    }

    /**
     * @param {string} key
     * @returns {Promise<*>}
     */
    async getConfig(key) {
        const argv = this.#argv.slice(2);

        const param = `${PARAM_PREFIX}${key}`.replaceAll("_", "-").toLowerCase();

        for (const [
            i,
            _param
        ] of argv.entries()) {
            if (_param === param) {
                return argv[i + 1] ?? null;
            }
        }

        return null;
    }
}
