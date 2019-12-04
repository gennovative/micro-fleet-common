import * as joi from '@hapi/joi'

import { validateProp, string, required } from '../../validators/validate-decorator'
import { Translatable } from '../Translatable'


export enum SettingItemDataType {
    /**
     * Text data type, that is rendered as a text box on UI.
     */
    String = 'string',

    /**
     * Array of strings.
     */
    StringArray = 'string[]',

    /**
     * Numeric data type including integer and float, that is rendered as
     * a numeric box on UI.
     */
    Number = 'number',

    /**
     * Array of numbers.
     */
    NumberArray = 'number[]',

    /**
     * Logical data type (true/false), that is rendered as a checkbox on UI.
     */
    Boolean = 'boolean',
}

/**
 * Represents a setting record.
 */
export class SettingItem extends Translatable {

    /**
     * Gets or sets setting name (aka setting key).
     * This is also the key in `appconfig.json` and the name of environment variable.
     */
    @validateProp(joi.string().token().required())
    public readonly name: string = undefined

    /**
     * Gets or sets data type of setting value.
     * Must be one of: 'string', 'string[]', 'number', 'number[]', 'boolean'.
     */
    @validateProp(
        joi.string().required()
            .valid(SettingItemDataType.String, SettingItemDataType.StringArray,
                SettingItemDataType.Number, SettingItemDataType.NumberArray, SettingItemDataType.Boolean),
    )
    public readonly dataType: SettingItemDataType = undefined

    /**
     * Gets or set value.
     * Whatever `dataType` is, value must always be string.
     */
    @required()
    @string()
    public readonly value: string = undefined
}
