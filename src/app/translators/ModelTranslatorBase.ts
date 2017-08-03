import { ModelValidatorBase } from '../validators/ModelValidatorBase';
import { ValidationError } from '../validators/ValidationError';


export abstract class ModelTranslatorBase<T> {

	/**
	 * Turns on or off model validation before translating.
	 * Default to `true`.
	 */
	public enableValidation: boolean;


	constructor() {
		this.enableValidation = true;
		this.createMap();
	}


	/**
	 * Gets validator for specific type <T>.
	 */
	protected abstract get validator(): ModelValidatorBase<T>;

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
		return this.translate(this.validator.partial, source, isEdit, errorCallback);
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
		return this.translate(this.validator.whole, source, isEdit, errorCallback);
	}


	/**
	 * Initializes the model mapping engine.
	 */
	protected abstract createMap(): void;
	
	/**
	 * Is invoked after source object is validated to map source object to target model.
	 */
	protected abstract map(validatedSource: any): T;


	private translate(fn: Function, source: any, isEdit: boolean, errorCallback?: (err: ValidationError) => void): T {
		if (!this.enableValidation) {
			return this.map(source);
		}

		let [error, model] = fn.call(this.validator, source, { isEdit });
		if (error) {
			if (!errorCallback) {
				throw error;
			}
			errorCallback(error);
		}

		return this.map(model);
	}

}
