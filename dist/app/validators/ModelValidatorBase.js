"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi = require("joi");
const back_lib_common_util_1 = require("back-lib-common-util");
const ValidationError_1 = require("./ValidationError");
class ModelValidatorBase {
    constructor() {
        // As default, model ID is a string of 64-bit integer.
        // JS cannot handle 64-bit integer, that's why we must use string.
        // The database will convert to BigInt type when inserting.
        this._schemaMapId = { id: joi.string().regex(/^\d+$/).required() };
    }
    /**
     * Validates model ID.
     */
    id(id) {
        back_lib_common_util_1.Guard.assertIsDefined(this._compiledId, 'Must call `compile` before using this function!');
        let { error, value } = this._compiledId.validate(id);
        return (error) ? [new ValidationError_1.ValidationError(error.details), null] : [null, value];
    }
    /**
     * Validates model for creation operation, which doesn't need `id` property.
     */
    whole(target, options = {}) {
        return this.validate(this._compiledWhole, target, options);
    }
    /**
     * Validates model for modification operation, which requires `id` property.
     */
    partial(target, options = {}) {
        return this.validate(this._compiledPartial, target, options);
    }
    compile() {
        let wholeSchema = this._schemaMap;
        this._compiledWhole = joi.object(wholeSchema);
        // Make all rules optional for partial schema.
        let partialSchema = {};
        for (let key in wholeSchema) {
            /* istanbul ignore else */
            if (wholeSchema.hasOwnProperty(key)) {
                let rule = wholeSchema[key];
                /* istanbul ignore else */
                if (typeof rule.optional === 'function') {
                    partialSchema[key] = rule.optional();
                }
            }
        }
        this._compiledPartial = joi.object(partialSchema);
        // Compile rule for id
        let idMap = this._schemaMapId;
        for (let key in idMap) {
            /* istanbul ignore else */
            if (idMap.hasOwnProperty(key)) {
                // key can be `id`, `ID`, `Id`... whatever
                this._compiledId = idMap[key];
                break; // Only get the first rule
            }
        }
    }
    validate(schema, target, options = {}) {
        back_lib_common_util_1.Guard.assertIsDefined(schema, 'Must call `compile` before using this function!');
        let opts = Object.assign({
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
            isEdit: false
        }, options);
        // If edit mode, validate id property.
        schema = opts.isEdit ? schema.keys(this._schemaMapId) : schema;
        delete opts.isEdit;
        let { error, value } = schema.validate(target, opts);
        return (error) ? [new ValidationError_1.ValidationError(error.details), null] : [null, value];
    }
}
exports.ModelValidatorBase = ModelValidatorBase;

//# sourceMappingURL=ModelValidatorBase.js.map
