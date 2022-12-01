import { ValueProviderImplementation } from "./ValueProviderImplementation.mjs";
import yargsParser from "yargs-parser";

/** @typedef {import("../../Service/Config/Command/GetConfigCommand.mjs").GetConfigCommand} GetConfigCommand */

export class CliParamValueProviderImplementation extends ValueProviderImplementation {
    /**
     * @type {string[]}
     */
    #argv;
    /**
     * @type {{[key: string]: string} | null}
     */
    #cli_params = null;

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
     * @param {GetConfigCommand} getConfigCommand
     * @returns {Promise<*>}
     */
    async getConfig(key, getConfigCommand) {
        return this.#getCliParams()[key] ?? null;
    }

    /**
     * @returns {{[key: string]: string}}
     */
    #getCliParams() {
        this.#cli_params ??= yargsParser(this.#argv.slice(2), {
            configuration: {
                "boolean-negation": false,
                "camel-case-expansion": false,
                "dot-notation": false,
                "duplicate-arguments-array": false
            }
        });

        return this.#cli_params;
    }
}
