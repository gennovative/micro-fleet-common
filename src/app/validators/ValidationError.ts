import * as joi from 'joi';

import { Exception } from 'back-lib-common-util';


/**
 * Represents a validation error for a property.
 * UI Form should use this information to highlight the particular input.
 */
export interface IValidationErrorItem {
	/**
	 * Error message for this item.
	 */
	message: string;

	/**
	 * Path to the target property in validation schema.
	 */
	path: string;

	/**
	 * The invalid property value.
	 */
	value: any;
}

/**
 * Represents an error when a model does not pass validation.
 */
export class ValidationError extends Exception {
	
	private _details: IValidationErrorItem[];


	constructor(details: joi.ValidationErrorItem[]) {
		super(null, false, ValidationError);
		this.parseDetails(details);
	}


	public get details(): IValidationErrorItem[] {
		return this._details;
	}


	private parseDetails(joiDetails: joi.ValidationErrorItem[]): void {
		this._details = [];
		/* istanbul ignore next */
		if (!joiDetails || !joiDetails.length) { return; }

		joiDetails.forEach(d => {
			this._details.push({
				message: d.message,
				path: d.path,
				value: d.context.value
			});
		});
	}
}