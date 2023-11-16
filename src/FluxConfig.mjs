/** @typedef {import("./ValueProvider/ValueProvider.mjs").ValueProvider} ValueProvider */

export class FluxConfig {
    /**
     * @type {ValueProvider[]}
     */
    #value_providers;

    /**
     * @param {ValueProvider[]} value_providers
     * @returns {FluxConfig}
     */
    static new(value_providers) {
        return new this(
            value_providers
        );
    }

    /**
     * @param {ValueProvider[]} value_providers
     * @private
     */
    constructor(value_providers) {
        this.#value_providers = value_providers;
    }

    /**
     * @param {string} key
     * @param {*} default_value
     * @param {boolean | null} required
     * @returns {Promise<*>}
     */
    async getConfig(key, default_value = null, required = null) {
        let value;

        for (const value_provider of this.#value_providers) {
            value ??= await value_provider.getConfig(
                key,
                this
            );
        }

        if ((value ?? null) === null) {
            if (required ?? (default_value === null)) {
                throw new Error(`Missing config ${key}`);
            }

            return default_value;
        }

        if (typeof default_value === "number" && typeof value === "string" && /^-?\d+(\.\d+)?$/.test(value) && !isNaN(value)) {
            const _value = parseFloat(value);
            if (!Number.isNaN(_value)) {
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
