import * as joi from 'joi';
import { NotImplementedException } from 'back-lib-common-util';

import { GetSettingRequest } from '../models/GetSettingRequest';
import { ValidationError } from './ValidationError';
import { ModelValidatorBase, ValidationOptions } from './ModelValidatorBase';


export class GetSettingRequestValidator
	extends ModelValidatorBase<GetSettingRequest> {
	
	protected readonly _schemaMap = {
		slug: joi.string().regex(/^[0-9a-zA-z-]+$/).required().example('SettingSvc').example('setting-svc'),
		ipAddress: joi.string().ip().required().example('127.0.0.1').example('192.168.10.23')
	};


	constructor() {
		super();
		this.compile();
	}


	/**
	 * This method is unnecessary. Use `whole` instead.
	 * @override
	 * @throws NotImplementedException
	 */
	public partial(target: any, options: ValidationOptions = {}): [ValidationError, GetSettingRequest] {
		throw new NotImplementedException('This method is not supported. Use `whole` instead.');
	}
}

export default new GetSettingRequestValidator();