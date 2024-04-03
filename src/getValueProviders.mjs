/** @typedef {import("./ValueProvider/ValueProvider.mjs").ValueProvider} ValueProvider */

/**
 * @param {boolean | string[] | null} args
 * @param {string | {[key: string]: string} | null} env
 * @returns {Promise<ValueProvider[]>}
 */
export async function getValueProviders(args = null, env = null) {
    return [
        ...(args ?? false) !== false ? [
            await (await import("./ValueProvider/ArgsValueProvider.mjs")).ArgsValueProvider.new(
                args !== true ? args : null
            )
        ] : [],
        ...(env ?? null) !== null ? [
            await (await import("./ValueProvider/EnvValueProvider.mjs")).EnvValueProvider.new(
                ...typeof env === "string" ? [
                    process.env,
                    env
                ] : [
                    env
                ]
            )
        ] : [],
        await (await import("./ValueProvider/ConfigValueProvider.mjs")).ConfigValueProvider.new(),
        await (await import("./ValueProvider/JsonValueProvider.mjs")).JsonValueProvider.new(),
        await (await import("./ValueProvider/JsonFileValueProvider.mjs")).JsonFileValueProvider.new(),
        await (await import("./ValueProvider/FileValueProvider.mjs")).FileValueProvider.new(),
        await (await import("./ValueProvider/NoPrefixValueProvider.mjs")).NoPrefixValueProvider.new()
    ];
}
