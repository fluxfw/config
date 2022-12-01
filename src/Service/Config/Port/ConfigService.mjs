/** @typedef {import("../../../Adapter/ValueProviderImplementation/ValueProviderImplementation.mjs").ValueProviderImplementation} ValueProviderImplementation */

export class ConfigService {
    /**
     * @type {ValueProviderImplementation[]}
     */
    #value_provider_implementations;

    /**
     * @param {ValueProviderImplementation[]} value_provider_implementations
     * @returns {ConfigService}
     */
    static new(value_provider_implementations) {
        return new this(
            value_provider_implementations
        );
    }

    /**
     * @param {ValueProviderImplementation[]} value_provider_implementations
     * @private
     */
    constructor(value_provider_implementations) {
        this.#value_provider_implementations = value_provider_implementations;
    }

    /**
     * @param {string} key
     * @param {*} default_value
     * @returns {Promise<*>}
     */
    async getConfig(key, default_value = null) {
        return (await import("../Command/GetConfigCommand.mjs")).GetConfigCommand.new(
            this.#value_provider_implementations
        )
            .getConfig(
                key,
                default_value
            );
    }
}
