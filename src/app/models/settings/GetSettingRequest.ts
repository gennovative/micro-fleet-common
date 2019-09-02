import * as joi from 'joi'

import { validateProp } from '../../validators/validate-decorator'
import { Translatable } from '../Translatable'



/**
 * Represents the request contract for GetSetting endpoint.
 */
export class GetSettingRequest extends Translatable {

    /**
     * Gets or sets program slug.
     */
    @validateProp(
        joi.string().regex(/^[0-9a-zA-z-]+$/).required().example('SettingSvc').example('setting-svc'),
    )
    public readonly slug: string = undefined

    /**
     * Gets or sets IP address where the calling program is running.
     */
    @validateProp(
        joi.string().ip().required().example('127.0.0.1').example('192.168.10.23'),
    )
    public readonly ipAddress: string = undefined
}
