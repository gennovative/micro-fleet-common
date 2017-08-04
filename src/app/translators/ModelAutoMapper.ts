/* istanbul ignore else */
if (!global['automapper']) {
	// AutoMapper registers itself as a singleton global variable.
	require('automapper-ts');
}

import { JoiModelValidator } from '../validators/JoiModelValidator';
import { ValidationError } from '../validators/ValidationError';


/**
 * Provides functions to auto mapping an arbitrary object to model of specific class type.
 */
export class ModelAutoMapper<T> {

	/**
	 * Turns on or off model validation before translating.
	 * Is set to `true` if validator is passed to class constructor.
	 */
	public enableValidation: boolean;


	/**
	 * @param {class} ModelClass The model class
	 * @param {JoiModelValidator} _validator The model validator. If specified, turn on `enableValidation`
	 */
	constructor(
		protected ModelClass: new() => any,
		protected _validator?: JoiModelValidator<T>
	) {
		this.enableValidation = (_validator != null);
		this.createMap();
	}


	/**
	 * Gets validator.
	 */
	public get validator(): JoiModelValidator<T> {
		return this._validator;
	}

	/**
	 * Validates then converts an object to type <T>. 
	 * but ONLY properties with value are validated and copied.
	 * @param {any} source
	 * @param {boolean} isEdit If `true`, validates model ID. Otherwise, excludes model ID from validation. Only takes effect when `enableValidation` is `true`.
	 * @param {Function} errorCallback If specified, gives validation error to this callback. Otherwise, throw error.
	 * 
	 * @throws {ValidationError} If no `errorCallback` is provided.
	 */
	public partial(source: any, isEdit: boolean, errorCallback?: (err: ValidationError) => void): Partial<T> {
		return this.translate('partial', source, isEdit, errorCallback);
	}

	/**
	 * Validates then converts an object to type <T>. 
	 * ALL properties are validated and copied regardless with or without value.
	 * @param {any} source
	 * @param {boolean} isEdit If `true`, validates model ID. Otherwise, excludes model ID from validation. Only takes effect when `enableValidation` is `true`.
	 * @param {Function} errorCallback If specified, gives validation error to this callback. Otherwise, throw error.
	 * 
	 * @throws {ValidationError} If no `errorCallback` is provided.
	 */
	public whole(source: any, isEdit: boolean, errorCallback?: (err: ValidationError) => void): T {
		return this.translate('whole', source, isEdit, errorCallback);
	}


	/**
	 * Initializes the model mapping engine.
	 */
	protected createMap(): void {
		automapper.createMap('any', this.ModelClass);
	}
	
	/**
	 * Is invoked after source object is validated to map source object to target model.
	 */
	protected map(source: any): T {
		return automapper.map('any', this.ModelClass, source);
	}


	protected translate(fn: string, source: any, isEdit: boolean, errorCallback?: (err: ValidationError) => void): T {
		if (!this.enableValidation) {
			return this.map(source);
		}

		let [error, model] = this.validator[fn](source, { isEdit });
		if (error) {
			if (!errorCallback) {
				throw error;
			}
			errorCallback(error);
		}

		return this.map(model);
	}
}