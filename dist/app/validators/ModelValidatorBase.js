"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi = require("joi");
const ValidationError_1 = require("./ValidationError");
class ModelValidatorBase {
    constructor() {
        this._schemaId = joi.string().regex(/^\d+$/).required();
    }
    /**
     * Gets schema used for validation the model.
     */
    get schema() {
        return this._schema;
    }
    /**
     * Gets schema used for validation the model ID.
     * By default, all model IDs are of type `BigSInt` (string).
     * If a derived validator wants to support a model with ID of different type,
     * it must override this getter method.
     */
    get schemaId() {
        return this._schemaId;
    }
    /**
     * Validates model ID.
     */
    forId(id) {
        let { error, value } = this.schemaId.validate(id);
        return (error) ? [error, null] : [null, value];
    }
    /**
     * Validates model for creation operation, which doesn't need `id` property.
     */
    forNew(target, options = {}) {
        let opts = Object.assign(options, {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true
        });
        let { error, value } = this.schema.validate(target, opts);
        return (error) ? [new ValidationError_1.ValidationError(error.details), null] : [null, value];
    }
    /**
     * Validates model for modification operation, which requires `id` property.
     */
    forEdit(target, options = {}) {
        let opts = Object.assign(options, {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true
        });
        let { error, value } = this.schema
            .keys({ id: this.schemaId })
            .validate(target, opts);
        return (error) ? [new ValidationError_1.ValidationError(error.details), null] : [null, value];
    }
}
exports.ModelValidatorBase = ModelValidatorBase;

//# sourceMappingURL=ModelValidatorBase.js.map
