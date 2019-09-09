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
const joi = require("@hapi/joi");
const validate_decorator_1 = require("../../validators/validate-decorator");
const Translatable_1 = require("../Translatable");
var SettingItemDataType;
(function (SettingItemDataType) {
    /**
     * Text data type, that is rendered as a text box on UI.
     */
    SettingItemDataType["String"] = "string";
    /**
     * Array of strings.
     */
    SettingItemDataType["StringArray"] = "string[]";
    /**
     * Numeric data type including integer and float, that is rendered as
     * a numeric box on UI.
     */
    SettingItemDataType["Number"] = "number";
    /**
     * Array of numbers.
     */
    SettingItemDataType["NumberArray"] = "number[]";
    /**
     * Logical data type (true/false), that is rendered as a checkbox on UI.
     */
    SettingItemDataType["Boolean"] = "boolean";
})(SettingItemDataType = exports.SettingItemDataType || (exports.SettingItemDataType = {}));
/**
 * Represents a setting record.
 */
class SettingItem extends Translatable_1.Translatable {
    constructor() {
        super(...arguments);
        /**
         * Gets or sets setting name (aka setting key).
         * This is also the key in `appconfig.json` and the name of environment variable.
         */
        this.name = undefined;
        /**
         * Gets or sets data type of setting value.
         * Must be one of: 'string', 'string[]', 'number', 'number[]', 'boolean'.
         */
        this.dataType = undefined;
        /**
         * Gets or set value.
         * Whatever `dataType` is, value must always be string.
         */
        this.value = undefined;
    }
}
__decorate([
    validate_decorator_1.validateProp(joi.string().token().required()),
    __metadata("design:type", String)
], SettingItem.prototype, "name", void 0);
__decorate([
    validate_decorator_1.validateProp(joi.string().required()
        .only(SettingItemDataType.String, SettingItemDataType.StringArray, SettingItemDataType.Number, SettingItemDataType.NumberArray, SettingItemDataType.Boolean)),
    __metadata("design:type", String)
], SettingItem.prototype, "dataType", void 0);
__decorate([
    validate_decorator_1.required(),
    validate_decorator_1.string(),
    __metadata("design:type", String)
], SettingItem.prototype, "value", void 0);
exports.SettingItem = SettingItem;
//# sourceMappingURL=SettingItem.js.map