import { ModelValidatorBase } from '../validators/ModelValidatorBase';


export abstract class ModelTranslatorBase<T> {

	constructor() {
		this.createMap();
	}


	/**
	 * Gets validator for specific type <T>.
	 */
	protected abstract get validator(): ModelValidatorBase<T>;

	/**
	 * Validates then converts an object to type <T> for modification operation.
	 */
	public forEdit(source: any): T {
		let [error, model] = this.validator.forEdit(source);
		if (error) {
			throw error;
		}

		return this.map(model);
	}

	/**
	 * Validates then converts an object to type <T> for creation operation.
	 */
	public forNew(source: any): T {
		let [error, model] = this.validator.forNew(source);
		if (error) {
			throw error;
		}

		return this.map(model);
	}

	protected abstract createMap(): void;
	protected abstract map(validatedSource: any): T;
}
