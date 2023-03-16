/** @typedef {import("./ValueProviderImplementation/ValueProviderImplementation.mjs").ValueProviderImplementation} ValueProviderImplementation */

export class FluxConfigApi {
    /**
     * @type {ValueProviderImplementation[]}
     */
    #value_provider_implementations;

    /**
     * @param {ValueProviderImplementation[]} value_provider_implementations
     * @returns {FluxConfigApi}
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
        let value;

        for (const value_provider_implementation of this.#value_provider_implementations) {
            value ??= await value_provider_implementation.getConfig(
                key,
                this
            );
        }

        if ((value ?? null) === null) {
            return default_value;
        }

        if (typeof default_value === "number" && typeof value === "string" && /^[0-9.]+$/.test(value) && !isNaN(value)) {
            const _value = parseFloat(value);
            if (!isNaN(_value)) {
                value = _value;
            }
        }

        if (typeof default_value === "boolean") {
            if (value === "true" || value === 1 || value === "1") {
                value = true;
            } else {
                if (value === "false" || value === 0 || value === "0") {
                    value = false;
                }
            }
        }

        return value;
    }
}
