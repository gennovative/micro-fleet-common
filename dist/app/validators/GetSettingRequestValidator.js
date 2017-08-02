"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi = require("joi");
const back_lib_common_util_1 = require("back-lib-common-util");
const ModelValidatorBase_1 = require("./ModelValidatorBase");
class GetSettingRequestValidator extends ModelValidatorBase_1.ModelValidatorBase {
    constructor() {
        super(...arguments);
        this._schema = joi.object({
            slug: joi.string().regex(/^[0-9a-zA-z-]+$/).required().example('SettingSvc').example('setting-svc'),
            ipAddress: joi.string().ip().required().example('127.0.0.1').example('192.168.10.23')
        });
    }
    /**
     * This method is unnecessary. Use `forNew` instead.
     * @override
     * @throws NotImplementedException
     */
    forEdit(target, options = {}) {
        throw new back_lib_common_util_1.NotImplementedException('This method is not supported. Use `forNew` instead.');
    }
}
exports.GetSettingRequestValidator = GetSettingRequestValidator;
exports.default = new GetSettingRequestValidator();

//# sourceMappingURL=GetSettingRequestValidator.js.map
