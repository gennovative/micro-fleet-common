import * as joi from 'joi';

import { JoiModelValidator } from '../../app';


export class SampleModel {
	public theID: number = undefined; // It's IMPORTANT to initialize property with a value.
	public name: string = undefined;
	public address: string = undefined;
	public age: number = undefined;
	public gender: 'male' | 'female' = undefined;
}

export let validator = JoiModelValidator.create<SampleModel>(
	{
		name: joi.string().regex(/^[\d\w -]+$/u).max(10).min(3).required(),
		address: joi.string().required(),
		age: joi.number().min(15).max(99).integer().optional(),
		gender: joi.only('male', 'female').optional()
	},
	{ 
		theID: joi.number().min(1).max(Number.MAX_SAFE_INTEGER).required() 
	}
);