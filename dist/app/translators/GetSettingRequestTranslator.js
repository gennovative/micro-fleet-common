"use strict";
/// <reference types="automapper-ts" />
Object.defineProperty(exports, "__esModule", { value: true });
/* istanbul ignore else */
if (!global['automapper']) {
    // AutoMapper registers itself as a singleton global variable.
    require('automapper-ts');
}
const back_lib_common_util_1 = require("back-lib-common-util");
const GetSettingRequest_1 = require("../models/GetSettingRequest");
const GetSettingRequestValidator_1 = require("../validators/GetSettingRequestValidator");
const ModelTranslatorBase_1 = require("./ModelTranslatorBase");
class GetSettingRequestTranslator extends ModelTranslatorBase_1.ModelTranslatorBase {
    /**
     * @override
     */
    get validator() {
        return GetSettingRequestValidator_1.default;
    }
    /**
     * This method is unnecessary. Use `whole` instead.
     * @override
     * @throws NotImplementedException
     */
    partial(source, isEdit, errorCallback) {
        throw new back_lib_common_util_1.NotImplementedException('This method is not supported. Use `whole` instead.');
    }
    /**
     * @override
     */
    createMap() {
        automapper.createMap('any', GetSettingRequest_1.GetSettingRequest);
    }
    /**
     * @override
     */
    map(validatedSource) {
        return automapper.map('any', GetSettingRequest_1.GetSettingRequest, validatedSource);
    }
}
exports.GetSettingRequestTranslator = GetSettingRequestTranslator;
exports.default = new GetSettingRequestTranslator();

//# sourceMappingURL=GetSettingRequestTranslator.js.map
