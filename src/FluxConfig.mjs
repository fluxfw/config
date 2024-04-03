import { CONFIG_TYPE_BOOLEAN, CONFIG_TYPE_NONE, CONFIG_TYPE_NUMBER, CONFIG_TYPE_STRING } from "./CONFIG_TYPE.mjs";

/** @typedef {import("./ValueProvider/ValueProvider.mjs").ValueProvider} ValueProvider */

export class FluxConfig {
    /**
     * @type {ValueProvider[]}
     */
    #value_providers;

    /**
     * @param {ValueProvider[]} value_providers
     * @returns {Promise<FluxConfig>}
     */
    static async new(value_providers) {
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
     * @param {string | null} type
     * @param {boolean | null} required
     * @param {boolean | null} type_strict
     * @returns {Promise<*>}
     */
    async getConfig(key, default_value = null, type = null, required = null, type_strict = null) {
        let value;

        for (const value_provider of this.#value_providers) {
            value ??= await value_provider.getConfig(
                key,
                this
            ) ?? null;
        }

        value ??= typeof default_value === "function" ? await default_value() ?? null : default_value;

        if (value === null) {
            if (required ?? true) {
                throw new Error(`Missing config ${key}!`);
            } else {
                return null;
            }
        }

        switch (type ?? CONFIG_TYPE_STRING) {
            case CONFIG_TYPE_BOOLEAN:
                if (typeof value === "boolean") {
                    return value;
                }

                if ([
                    "true",
                    "yes",
                    1,
                    "1",
                    ""
                ].includes(typeof value === "string" ? value.toLowerCase() : value)) {
                    return true;
                }

                if ([
                    "false",
                    "no",
                    0,
                    "0"
                ].includes(typeof value === "string" ? value.toLowerCase() : value)) {
                    return false;
                }

                if (type_strict ?? true) {
                    throw new Error(`Invalid boolean config ${key}=${value}!`);
                }

                return value;

            case CONFIG_TYPE_NONE:
                return value;

            case CONFIG_TYPE_NUMBER:
                if (Number.isFinite(value)) {
                    return value;
                }

                if (typeof value === "string" && /^-?\d+(\.\d+)?$/.test(value)) {
                    const number = parseFloat(value);

                    if (Number.isFinite(number)) {
                        return number;
                    }
                }

                if (type_strict ?? true) {
                    throw new Error(`Invalid number config ${key}=${value}!`);
                }

                return value;

            case CONFIG_TYPE_STRING:
                if (typeof value === "string") {
                    return value;
                }

                if (type_strict ?? true) {
                    throw new Error(`Invalid string config ${key}=${value}!`);
                }

                return value;

            default:
                return value;
        }
    }
}
