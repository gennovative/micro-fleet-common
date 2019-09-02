"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi = require("joi");
const validate_decorator_1 = require("../../validators/validate-decorator");
const Translatable_1 = require("../Translatable");
/**
 * Represents the request contract for GetSetting endpoint.
 */
class GetSettingRequest extends Translatable_1.Translatable {
    constructor() {
        super(...arguments);
        /**
         * Gets or sets program slug.
         */
        this.slug = undefined;
        /**
         * Gets or sets IP address where the calling program is running.
         */
        this.ipAddress = undefined;
    }
}
__decorate([
    validate_decorator_1.validateProp(joi.string().regex(/^[0-9a-zA-z-]+$/).required().example('SettingSvc').example('setting-svc')),
    __metadata("design:type", String)
], GetSettingRequest.prototype, "slug", void 0);
__decorate([
    validate_decorator_1.validateProp(joi.string().ip().required().example('127.0.0.1').example('192.168.10.23')),
    __metadata("design:type", String)
], GetSettingRequest.prototype, "ipAddress", void 0);
exports.GetSettingRequest = GetSettingRequest;
//# sourceMappingURL=GetSettingRequest.js.map