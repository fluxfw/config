/** @typedef {import("../FluxConfigApi.mjs").FluxConfigApi} FluxConfigApi */

/**
 * @interface
 */
export class ValueProviderImplementation {
    /**
     * @param {string} key
     * @param {FluxConfigApi} flux_config_api
     * @returns {Promise<*>}
     * @abstract
     */
    getConfig(key, flux_config_api) { }
}
