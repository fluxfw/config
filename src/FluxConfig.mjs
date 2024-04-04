import { CONFIG_TYPE_ARRAY, CONFIG_TYPE_BOOLEAN, CONFIG_TYPE_NUMBER, CONFIG_TYPE_OBJECT, CONFIG_TYPE_STRING } from "./CONFIG_TYPE.mjs";

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
     * @param {string} type
     * @param {*} default_value
     * @param {boolean | null} required
     * @returns {Promise<*>}
     */
    async getConfig(key, type, default_value = null, required = null) {
        let value, value_provider;

        for (value_provider of [
            ...this.#value_providers,
            {
                getConfig: async () => typeof default_value === "function" ? await default_value() ?? null : default_value
            }
        ]) {
            value ??= await value_provider.getConfig(
                key,
                this
            ) ?? null;

            if (value !== null) {
                break;
            }
        }

        if (value === null) {
            if (required ?? true) {
                throw new Error(`Missing config "${key}"!`);
            } else {
                return null;
            }
        }

        const cast = (value_provider.cast_types ?? []).includes(type);

        switch (type) {
            case CONFIG_TYPE_ARRAY:
                if (Array.isArray(value)) {
                    return value;
                }

                throw new TypeError(`Config "${key}" needs to be an array!`);

            case CONFIG_TYPE_BOOLEAN:
                if (typeof value === "boolean") {
                    return value;
                }

                if (cast) {
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
                }

                throw new TypeError(`Config "${key}" needs to be a boolean!`);

            case CONFIG_TYPE_NUMBER:
                if (Number.isFinite(value)) {
                    return value;
                }

                if (cast && typeof value === "string" && /^-?\d+(\.\d+)?$/.test(value)) {
                    const number = parseFloat(value);

                    if (Number.isFinite(number)) {
                        return number;
                    }
                }

                throw new TypeError(`Config "${key}" needs to be a number!`);

            case CONFIG_TYPE_OBJECT:
                if (Object.prototype.toString.call(value) === "[object Object]") {
                    return value;
                }

                throw new TypeError(`Config "${key}" needs to be an object!`);

            case CONFIG_TYPE_STRING:
                if (typeof value === "string") {
                    return value;
                }

                throw new TypeError(`Config "${key}" needs to be a string!`);

            default:
                throw new Error(`Invalid type "${key}"!`);
        }
    }
}
