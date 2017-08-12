import * as joi from 'joi';

import { ModelAutoMapper } from '../translators/ModelAutoMapper';
import { JoiModelValidator } from '../validators/JoiModelValidator';


export enum SettingItemDataType { 
	/**
	 * Text data type, that is rendered as a text box on UI.
	 */
	String = 'string',

	/**
	 * Numeric data type including integer and float, that is rendered as
	 * a numeric box on UI.
	 */
	Number = 'number',

	/**
	 * Logical data type (true/false), that is rendered as a checkbox on UI.
	 */
	Boolean = 'boolean'
}

/**
 * Represents a setting record.
 */
export class SettingItem {

	public static validator: JoiModelValidator<SettingItem>;
	public static translator: ModelAutoMapper<SettingItem>;

	/**
	 * Gets or sets setting name (aka setting key).
	 * This is also the key in `appconfig.json` and the name of environment variable.
	 */
	public name: string = undefined;

	/**
	 * Gets or sets data type of setting value.
	 * Must be one of: 'string', 'number', 'boolean'.
	 */
	public dataType: SettingItemDataType = undefined;

	/**
	 * 
	 */
	public value: any = undefined;
}

SettingItem.validator = JoiModelValidator.create({
	name: joi.string().token().required(),
	dataType: joi.string().required().only(SettingItemDataType.String, SettingItemDataType.Number, SettingItemDataType.Boolean),
	value: joi.string().allow('').required()
});

SettingItem.translator = new ModelAutoMapper(SettingItem, SettingItem.validator);