import { Maybe } from '../models/Maybe'
import { SettingItemDataType } from '../models/settings/SettingItem'

export interface IConfigurationProvider {
    /**
     * Turns on or off remote settings fetching.
     */
    enableRemote: boolean

    /**
     * Absolute path to configuration file
     */
    configFilePath: string

    /**
     * Attempts to get settings from remote Configuration Service, environmental variables,
     * and `appconfig.json` file, respectedly.
     * @param {string} key Setting key
     * @param {SettingItemDataType} dataType Data type to parse some settings from file or ENV variables.
     *         Has no effect with remote settings.
     */
    get(key: string, dataType?: SettingItemDataType): Maybe<any>

    /**
     * Attempts to fetch settings from remote Configuration Service.
     */
    fetch(): Promise<boolean>

    /**
     * Invokes everytime new settings are updated.
     * The callback receives an array of changed setting keys.
     */
    onUpdate(listener: (changedKeys: string[]) => void): void
}
