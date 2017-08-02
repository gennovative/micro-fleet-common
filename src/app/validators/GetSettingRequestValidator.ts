import * as joi from 'joi';
import { NotImplementedException } from 'back-lib-common-util';

import { GetSettingRequest } from '../models/GetSettingRequest';
import { ValidationError } from './ValidationError';
import { ModelValidatorBase, ValidationOptions } from './ModelValidatorBase';


export class GetSettingRequestValidator
	extends ModelValidatorBase<GetSettingRequest> {
	
	protected readonly _schema = joi.object({
		slug: joi.string().regex(/^[0-9a-zA-z-]+$/).required().example('SettingSvc').example('setting-svc'),
		ipAddress: joi.string().ip().required().example('127.0.0.1').example('192.168.10.23')
	});

	/**
	 * This method is unnecessary. Use `forNew` instead.
	 * @override
	 * @throws NotImplementedException
	 */
	public forEdit(target: any, options: ValidationOptions = {}): [ValidationError, GetSettingRequest] {
		throw new NotImplementedException('This method is not supported. Use `forNew` instead.');
	}
}

export default new GetSettingRequestValidator();