import * as joi from 'joi';
import { NotImplementedException } from 'back-lib-common-util';

import { ModelAutoMapper } from '../translators/ModelAutoMapper';
import { JoiModelValidator } from '../validators/JoiModelValidator';


/**
 * Represents the request contract for GetSetting endpoint.
 */
export class GetSettingRequest {
	/**
	 * Gets or sets program slug.
	 */
	public slug: string = undefined;

	/**
	 * Gets or sets IP address where the calling program is running.
	 */
	public ipAddress: string = undefined;
}

export let validator = JoiModelValidator.create<GetSettingRequest>({
	slug: joi.string().regex(/^[0-9a-zA-z-]+$/).required().example('SettingSvc').example('setting-svc'),
	ipAddress: joi.string().ip().required().example('127.0.0.1').example('192.168.10.23')
});

validator.partial = function() {
	throw new NotImplementedException('This method is not supported. Use `whole` instead.');
};

export let translator = new ModelAutoMapper<GetSettingRequest>(GetSettingRequest, validator);