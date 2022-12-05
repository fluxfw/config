import { readFile } from "node:fs/promises";
import { ValueProviderImplementation } from "./ValueProviderImplementation.mjs";

/** @typedef {import("../../Service/Config/Command/GetConfigCommand.mjs").GetConfigCommand} GetConfigCommand */

const FILE_SUFFIX = "_file";

export class FileValueProviderImplementation extends ValueProviderImplementation {
    /**
     * @returns {FileValueProviderImplementation}
     */
    static new() {
        return new this();
    }

    /**
     * @private
     */
    constructor() {
        super();
    }

    /**
     * @param {string} key
     * @param {GetConfigCommand} getConfigCommand
     * @returns {Promise<*>}
     */
    async getConfig(key, getConfigCommand) {
        if (key.endsWith(FILE_SUFFIX)) {
            return null;
        }

        const value_file = await getConfigCommand.getConfig(
            `${key}${FILE_SUFFIX}`
        );
        if ((value_file ?? null) === null) {
            return null;
        }

        let value = (await readFile(value_file, "utf8")).replaceAll("\r\n", "\n").replaceAll("\r", "\n");

        while (value.endsWith("\n")) {
            value = value.substring(0, value.length - 1);
        }

        if (value_file.endsWith(".json")) {
            value = JSON.parse(value.trim());
        }

        return value;
    }
}
