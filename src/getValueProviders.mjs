/** @typedef {import("./ValueProvider/ValueProvider.mjs").ValueProvider} ValueProvider */

/**
 * @param {string} env_previx
 * @param {boolean | null} cli_param
 * @returns {Promise<ValueProvider[]>}
 */
export async function getValueProviders(env_previx, cli_param = null) {
    return [
        ...cli_param ?? true ? [
            await (await import("./ValueProvider/CliParamValueProvider.mjs")).CliParamValueProvider.new(
                process.argv
            )
        ] : [],
        await (await import("./ValueProvider/EnvValueProvider.mjs")).EnvValueProvider.new(
            process.env,
            env_previx
        ),
        await (await import("./ValueProvider/ConfigValueProvider.mjs")).ConfigValueProvider.new(),
        await (await import("./ValueProvider/JsonValueProvider.mjs")).JsonValueProvider.new(),
        await (await import("./ValueProvider/JsonFileValueProvider.mjs")).JsonFileValueProvider.new(),
        await (await import("./ValueProvider/FileValueProvider.mjs")).FileValueProvider.new()
    ];
}
