/** @typedef {import("./ValueProvider/ValueProvider.mjs").ValueProvider} ValueProvider */

/**
 * @param {string} env_previx
 * @param {boolean | null} cli_param
 * @returns {Promise<ValueProvider[]>}
 */
export async function getValueProviders(env_previx, cli_param = null) {
    return [
        ...cli_param ?? true ? [
            (await import("./ValueProvider/CliParamValueProvider.mjs")).CliParamValueProvider.new(
                process.argv
            )
        ] : [],
        (await import("./ValueProvider/EnvValueProvider.mjs")).EnvValueProvider.new(
            process.env,
            env_previx
        ),
        (await import("./ValueProvider/JsonValueProvider.mjs")).JsonValueProvider.new(),
        (await import("./ValueProvider/JsonFileValueProvider.mjs")).JsonFileValueProvider.new(),
        (await import("./ValueProvider/FileValueProvider.mjs")).FileValueProvider.new(),
        (await import("./ValueProvider/ConfigValueProvider.mjs")).ConfigValueProvider.new()
    ];
}
