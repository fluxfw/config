/** @typedef {import("./ValueProviderImplementation/ValueProviderImplementation.mjs").ValueProviderImplementation} ValueProviderImplementation */

/**
 * @param {string} env_previx
 * @param {boolean | null} cli_param
 * @returns {Promise<ValueProviderImplementation[]>}
 */
export async function getValueProviderImplementations(env_previx, cli_param = null) {
    return [
        ...cli_param ?? true ? [
            (await import("./ValueProviderImplementation/CliParamValueProviderImplementation.mjs")).CliParamValueProviderImplementation.new(
                process.argv
            )
        ] : [],
        (await import("./ValueProviderImplementation/EnvValueProviderImplementation.mjs")).EnvValueProviderImplementation.new(
            process.env,
            env_previx
        ),
        (await import("./ValueProviderImplementation/ConfigFileValueProviderImplementation.mjs")).ConfigFileValueProviderImplementation.new(),
        (await import("./ValueProviderImplementation/FileValueProviderImplementation.mjs")).FileValueProviderImplementation.new()
    ];
}
