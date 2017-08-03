/// <reference types="automapper-ts" />

/* istanbul ignore else */
if (!global['automapper']) {
	// AutoMapper registers itself as a singleton global variable.
	require('automapper-ts');
}
import { NotImplementedException } from 'back-lib-common-util';

import { GetSettingRequest } from '../models/GetSettingRequest';
import { ModelValidatorBase } from '../validators/ModelValidatorBase';
import { ValidationError } from '../validators/ValidationError';
import validator from '../validators/GetSettingRequestValidator';
import { ModelTranslatorBase } from './ModelTranslatorBase';


export class GetSettingRequestTranslator 
	extends ModelTranslatorBase<GetSettingRequest> {

	/**
	 * @override
	 */
	protected get validator(): ModelValidatorBase<GetSettingRequest> {
		return validator;
	}


	/**
	 * This method is unnecessary. Use `whole` instead.
	 * @override
	 * @throws NotImplementedException
	 */
	public partial(source: any, isEdit: boolean, errorCallback?: (err: ValidationError) => void): Partial<GetSettingRequest> {
		throw new NotImplementedException('This method is not supported. Use `whole` instead.');
	}


	/**
	 * @override
	 */
	protected createMap(): void {
		automapper.createMap('any', GetSettingRequest);
	}

	/**
	 * @override
	 */
	protected map(validatedSource: any): GetSettingRequest {
		return automapper.map('any', GetSettingRequest, validatedSource);
	}
}

export default new GetSettingRequestTranslator();