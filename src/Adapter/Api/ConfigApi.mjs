/** @typedef {import("../../Service/Config/Port/ConfigService.mjs").ConfigService} ConfigService */
/** @typedef {import("../ValueProviderImplementation/ValueProviderImplementation.mjs").ValueProviderImplementation} ValueProviderImplementation */

export class ConfigApi {
    /**
     * @type {ConfigService | null}
     */
    #config_service = null;
    /**
     * @type {ValueProviderImplementation[]}
     */
    #value_provider_implementations;

    /**
     * @param {ValueProviderImplementation[]} value_provider_implementations
     * @returns {ConfigApi}
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
        return (await this.#getConfigService()).getConfig(
            key,
            default_value
        );
    }

    /**
     * @returns {Promise<ConfigService>}
     */
    async #getConfigService() {
        this.#config_service ??= (await import("../../Service/Config/Port/ConfigService.mjs")).ConfigService.new(
            this.#value_provider_implementations
        );

        return this.#config_service;
    }
}
