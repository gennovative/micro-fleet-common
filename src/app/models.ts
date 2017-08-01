import * as joi from 'joi';

export class ModelIdValidator {
	public static readonly schema = joi.string().regex(/^\d+$/).optional();

	public static validate(id): joi.ValidationResult<BigSInt> {
		return ModelIdValidator.schema.validate(id);
	}
}

export class GetSettingRequestValidator {
	public static readonly schema = joi.object({
		slug: joi.string().regex(/^[0-9a-zA-z-]+$/).example('SettingSvc').example('setting-svc'),
		ipAddress: joi.string().ip().required().example('127.0.0.1').example('192.168.10.23')
	});

	public static validate(target: GetSettingRequest): joi.ValidationResult<GetSettingRequest> {
		return GetSettingRequestValidator.schema.validate(target);
	}
}

export class GetSettingRequest {
	public slug: string;
	public ipAddress: string;

	constructor(from?) {
		if (!from) { return; }
		this.slug = from.slug;
		this.ipAddress = from.ipAddress;
	}
}