/** @typedef {import("../../Service/Config/Command/GetConfigCommand.mjs").GetConfigCommand} GetConfigCommand */

/**
 * @interface
 */
export class ValueProviderImplementation {
    /**
     * @param {string} key
     * @param {GetConfigCommand} getConfigCommand
     * @returns {Promise<*>}
     * @abstract
     */
    getConfig(key, getConfigCommand) { }
}
