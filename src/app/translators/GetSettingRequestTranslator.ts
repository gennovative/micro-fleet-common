/// <reference types="automapper-ts" />

if (!global['automapper']) {
	// AutoMapper registers itself as a singleton global variable.
	require('automapper-ts');
}
import { NotImplementedException } from 'back-lib-common-util';

import { GetSettingRequest } from '../models/GetSettingRequest';
import { ModelValidatorBase } from '../validators/ModelValidatorBase';
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
	 * This method is unnecessary. Use `forNew` instead.
	 * @override
	 * @throws NotImplementedException
	 */
	public forEdit(source: any): GetSettingRequest {
		throw new NotImplementedException('This method is not supported. Use `forNew` instead.');
	}


	/**
	 * @override
	 */
	protected createMap(): void {
		automapper.createMap('any', GetSettingRequest);
			// .convertToType(GetSettingRequest);
	}

	/**
	 * @override
	 */
	protected map(validatedSource: any): GetSettingRequest {
		return automapper.map('any', GetSettingRequest, validatedSource);
	}
}

export default new GetSettingRequestTranslator();