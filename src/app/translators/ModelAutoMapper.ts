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
	 * @param {any | any[]} source An object or array of objects to be translated.
	 * @param {boolean} isEdit If `true`, validates model ID. Otherwise, excludes model ID from validation. Only takes effect when `enableValidation` is `true`.
	 * @param {Function} errorCallback If specified, gives validation error to this callback. Otherwise, throw error.
	 * 
	 * @throws {ValidationError} If no `errorCallback` is provided.
	 */
	public partial(source: any | any[], isEdit: boolean, errorCallback?: (err: ValidationError) => void): Partial<T> & Partial<T>[] {
		return this.tryTranslate('partial', source, isEdit, errorCallback);
	}

	/**
	 * Validates then converts an object to type <T>. 
	 * ALL properties are validated and copied regardless with or without value.
	 * @param {any | any[]} source An object or array of objects to be translated.
	 * @param {boolean} isEdit If `true`, validates model ID. Otherwise, excludes model ID from validation. Only takes effect when `enableValidation` is `true`.
	 * @param {Function} errorCallback If specified, gives validation error to this callback. Otherwise, throw error.
	 * 
	 * @throws {ValidationError} If no `errorCallback` is provided.
	 */
	public whole(source: any | any[], isEdit: boolean, errorCallback?: (err: ValidationError) => void): T & T[] {
		return this.tryTranslate('whole', source, isEdit, errorCallback);
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


	private tryTranslate(fn: string, source: any | any[], isEdit: boolean, errorCallback?: (err: ValidationError) => void): T & T[] {
		if (source == null || typeof source !== 'object') { return null; }
		if (!Array.isArray(source)) {
			return this.translate.apply(this, arguments);
		}
		return <any>source.map(s => this.translate(fn, s, isEdit, errorCallback));
	}

	private translate(fn: string, source: any, isEdit: boolean, errorCallback?: (err: ValidationError) => void): T {
		if (!this.enableValidation) {
			return this.map(source);
		}

		let [error, model] = this.validator[fn](source, { isEdit }),
			handleError = function (err, callback) {
				if (!err) { return false; }
				if (!callback) {
					throw err;
				}
				callback(err);
				return true;
			};

		if (handleError(error, errorCallback)) { // Validation error
			return null;
		}
		try {
			return this.map(model);
		} catch (ex) {
			handleError(ex, errorCallback); // Mapping error
		}
		return null;
	}
}