import * as joi from 'joi';

import { ModelValidatorBase } from '../../app';


export class SampleModel {
	public theID: number = undefined; // It's IMPORTANT to initialize property with a value.
	public name: string = undefined;
	public address: string = undefined;
	public age: number = undefined;
	public gender: 'male' | 'female' = undefined;
}

export class SampleModelValidator
	extends ModelValidatorBase<SampleModel> {

	protected readonly _schemaMap = {
		name: joi.string().regex(/^[\d\w -]+$/u).max(10).min(3).required(),
		address: joi.string().required(),
		age: joi.number().min(15).max(99).integer().optional(),
		gender: joi.only('male', 'female').optional()
	};

	constructor() {
		super();
		// This is how to override validation rule for model ID.
		this._schemaMapId = { theID: joi.number().min(1).max(Number.MAX_SAFE_INTEGER).required() };
		this.compile();
	}
}