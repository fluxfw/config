/** @typedef {import("./ValueProviderImplementation.mjs").ValueProviderImplementation} ValueProviderImplementation */

/**
 * @param {string} env_previx
 * @returns {Promise<ValueProviderImplementation[]>}
 */
export async function getValueProviderImplementations(env_previx) {
    return [
        (await import("./CliParamValueProviderImplementation.mjs")).CliParamValueProviderImplementation.new(
            process.argv
        ),
        (await import("./EnvValueProviderImplementation.mjs")).EnvValueProviderImplementation.new(
            process.env,
            env_previx
        ),
        (await import("./ConfigFileValueProviderImplementation.mjs")).ConfigFileValueProviderImplementation.new(),
        (await import("./FileValueProviderImplementation.mjs")).FileValueProviderImplementation.new()
    ];
}
