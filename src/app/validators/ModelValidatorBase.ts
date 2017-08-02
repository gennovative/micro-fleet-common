import * as joi from 'joi';

import { ValidationError, IValidationErrorItem } from './ValidationError';


export type ValidationOptions = joi.ValidationOptions;

export abstract class ModelValidatorBase<T> {

	protected abstract readonly _schema: joi.ObjectSchema;

	private readonly _schemaId: joi.StringSchema;


	constructor() {
		this._schemaId = joi.string().regex(/^\d+$/).required();
	}


	/**
	 * Gets schema used for validation the model.
	 */
	public get schema(): joi.ObjectSchema {
		return this._schema;
	}

	/**
	 * Gets schema used for validation the model ID.
	 * By default, all model IDs are of type `BigSInt` (string).
	 * If a derived validator wants to support a model with ID of different type,
	 * it must override this getter method.
	 */
	public get schemaId(): any {
		return this._schemaId;
	}

	/**
	 * Validates model ID.
	 */
	public forId(id: any): [ValidationError, BigSInt] {
		let{ error, value } = this.schemaId.validate(id);
		return (error) ? [error, null] : [null, value];
	}

	/**
	 * Validates model for creation operation, which doesn't need `id` property.
	 */
	public forNew(target: any, options: ValidationOptions = {}): [ValidationError, T] {
		let opts = Object.assign(options, {
				abortEarly: false,
				allowUnknown: true,
				stripUnknown: true
			});

		let{ error, value } = this.schema.validate<T>(target, opts);

		return (error) ? [new ValidationError(error.details), null] : [null, value];
	}

	/**
	 * Validates model for modification operation, which requires `id` property.
	 */
	public forEdit(target: any, options: ValidationOptions = {}): [ValidationError, T] {
		let opts = Object.assign(options, {
				abortEarly: false,
				allowUnknown: true,
				stripUnknown: true
			});

		let{ error, value } = this.schema
			.keys({ id: this.schemaId })
			.validate<T>(target, opts);

		return (error) ? [new ValidationError(error.details), null] : [null, value];
	}
}