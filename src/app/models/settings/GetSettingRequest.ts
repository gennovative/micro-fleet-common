import * as joi from 'joi'

import { ModelAutoMapper } from '../../translators/ModelAutoMapper'
import { JoiModelValidator } from '../../validators/JoiModelValidator'
import { NotImplementedException } from '../Exceptions'


/**
 * Represents the request contract for GetSetting endpoint.
 */
export class GetSettingRequest {

    public static validator: JoiModelValidator<GetSettingRequest>
    public static translator: ModelAutoMapper<GetSettingRequest>

    /**
     * Gets or sets program slug.
     */
    public readonly slug: string = undefined

    /**
     * Gets or sets IP address where the calling program is running.
     */
    public readonly ipAddress: string = undefined
}

const validator = GetSettingRequest.validator = JoiModelValidator.create({
    schemaMapModel: {
        slug: joi.string().regex(/^[0-9a-zA-z-]+$/).required().example('SettingSvc').example('setting-svc'),
        ipAddress: joi.string().ip().required().example('127.0.0.1').example('192.168.10.23'),
    },
    isCompositeId: false,
    requireId: false,
})

validator.partial = function() {
    throw new NotImplementedException('This method is not supported. Use `whole` instead.')
}

GetSettingRequest.translator = new ModelAutoMapper(GetSettingRequest, validator)
