"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi = require("joi");
class ModelIdValidator {
    static validate(id) {
        return ModelIdValidator.schema.validate(id);
    }
}
ModelIdValidator.schema = joi.string().regex(/^\d+$/).optional();
exports.ModelIdValidator = ModelIdValidator;
class GetSettingRequestValidator {
    static validate(target) {
        return GetSettingRequestValidator.schema.validate(target);
    }
}
GetSettingRequestValidator.schema = joi.object({
    slug: joi.string().regex(/^[0-9a-zA-z-]+$/).example('SettingSvc').example('setting-svc'),
    ipAddress: joi.string().ip().required().example('127.0.0.1').example('192.168.10.23')
});
exports.GetSettingRequestValidator = GetSettingRequestValidator;
class GetSettingRequest {
    constructor(from) {
        if (!from) {
            return;
        }
        this.slug = from.slug;
        this.ipAddress = from.ipAddress;
    }
}
exports.GetSettingRequest = GetSettingRequest;

//# sourceMappingURL=models.js.map
