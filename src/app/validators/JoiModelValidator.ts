import * as joi from 'joi';
import { Guard } from 'back-lib-common-util';

import { ValidationError } from './ValidationError';


export interface ValidationOptions extends joi.ValidationOptions {
	/**
	 * If `true`, this validation is for edit model. Otherwise, for new model.
	 * Default to `false`.
	 */
	isEdit?: boolean;
}

export class JoiModelValidator<T> {

	/**
	 * Builds a new instance of ModelValidatorBase.
	 * @param {joi.SchemaMap} schemaMapModel Rules to validate model properties.
	 * @param {joi.SchemaMap} schemaMapId Rule to validate model ID. Only the first property rule is used.
	 */
	public static create<T>(schemaMapModel: joi.SchemaMap, schemaMapId?: joi.SchemaMap): JoiModelValidator<T> {
		let validator = new JoiModelValidator<T>(schemaMapModel, schemaMapId);
		validator.compile();
		return validator;
	}


	/**
	 * Compiled rules for model ID.
	 */
	protected _compiledId: joi.ObjectSchema;

	/**
	 * Compiled rules for model properties.
	 */
	protected _compiledWhole: joi.ObjectSchema;

	/**
	 * Compiled rules for model properties, but all of them are OPTIONAL.
	 * Used for patch operation.
	 */
	protected _compiledPartial: joi.ObjectSchema;


	/**
	 * 
	 * @param {joi.SchemaMap} _schemaMap Rules to validate model properties.
	 * @param {joi.SchemaMap} _schemaMapId Rule to validate model ID. Only the first property rule is used.
	 */
	protected constructor(
		protected _schemaMap: joi.SchemaMap,
		protected _schemaMapId?: joi.SchemaMap
	) {
		// As default, model ID is a string of 64-bit integer.
		// JS cannot handle 64-bit integer, that's why we must use string.
		// The database will convert to BigInt type when inserting.
		this._schemaMapId = _schemaMapId || { id: joi.string().regex(/^\d+$/).required() };
	}


	public get schemaMap(): joi.SchemaMap {
		return this._schemaMap;
	}

	public get schemaMapId(): joi.SchemaMap {
		return this._schemaMapId;
	}


	/**
	 * Validates model ID.
	 */
	public id(id: any): [ValidationError, any] {
		Guard.assertIsDefined(this._compiledId, 'Must call `compile` before using this function!');
		let{ error, value } = this._compiledId.validate<any>(id);
		return (error) ? [new ValidationError(error.details), null] : [null, value];
	}

	/**
	 * Validates model for creation operation, which doesn't need `id` property.
	 */
	public whole(target: any, options: ValidationOptions = {}): [ValidationError, T] {
		return this.validate(this._compiledWhole, target, options);
	}

	/**
	 * Validates model for modification operation, which requires `id` property.
	 */
	public partial(target: any, options: ValidationOptions = {}): [ValidationError, Partial<T>] {
		return this.validate(this._compiledPartial, target, options);
	}


	protected compile(): void {
		let wholeSchema = this._schemaMap;
		this._compiledWhole = joi.object(wholeSchema);

		// Make all rules optional for partial schema.
		let partialSchema: joi.SchemaMap = {};
		for (let key in wholeSchema) {
			/* istanbul ignore else */
			if (wholeSchema.hasOwnProperty(key)) {
				let rule = wholeSchema[key] as joi.Schema;
				/* istanbul ignore else */
				if (typeof rule.optional === 'function') {
					partialSchema[key] = rule.optional();
				}
			}
		}
		this._compiledPartial = joi.object(partialSchema);

		// Compile rule for id
		let idMap = this._schemaMapId;
		for (let key in idMap) {
			/* istanbul ignore else */
			if (idMap.hasOwnProperty(key)) {
				// key can be `id`, `ID`, `Id`... whatever
				this._compiledId = idMap[key] as joi.ObjectSchema;
				break; // Only get the first rule
			}
		}
	}

	protected validate(schema: joi.ObjectSchema, target: any, options: ValidationOptions = {}): [ValidationError, T] {
		Guard.assertIsDefined(schema, 'Must call `compile` before using this function!');

		let opts = Object.assign({
				abortEarly: false,
				allowUnknown: true,
				stripUnknown: true,
				isEdit: false
			}, options);

		// If edit mode, validate id property.
		schema = opts.isEdit ? schema.keys(this._schemaMapId) : schema;
		delete opts.isEdit;
		let { error, value } = schema.validate<T>(target, opts);

		return (error) ? [new ValidationError(error.details), null] : [null, value];
	}
}