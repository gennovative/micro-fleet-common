"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ModelTranslatorBase {
    constructor() {
        this.enableValidation = true;
        this.createMap();
    }
    /**
     * Validates then converts an object to type <T>.
     * but ONLY properties with value are validated and copied.
     * @param {any} source
     * @param {boolean} isEdit If `true`, validates model ID. Otherwise, excludes model ID from validation. Only takes effect when `enableValidation` is `true`.
     * @param {Function} errorCallback If specified, gives validation error to this callback. Otherwise, throw error.
     *
     * @throws {ValidationError} If no `errorCallback` is provided.
     */
    partial(source, isEdit, errorCallback) {
        return this.translate(this.validator.partial, source, isEdit, errorCallback);
    }
    /**
     * Validates then converts an object to type <T>.
     * ALL properties are validated and copied regardless with or without value.
     * @param {any} source
     * @param {boolean} isEdit If `true`, validates model ID. Otherwise, excludes model ID from validation. Only takes effect when `enableValidation` is `true`.
     * @param {Function} errorCallback If specified, gives validation error to this callback. Otherwise, throw error.
     *
     * @throws {ValidationError} If no `errorCallback` is provided.
     */
    whole(source, isEdit, errorCallback) {
        return this.translate(this.validator.whole, source, isEdit, errorCallback);
    }
    translate(fn, source, isEdit, errorCallback) {
        if (!this.enableValidation) {
            return this.map(source);
        }
        let [error, model] = fn.call(this.validator, source, { isEdit });
        if (error) {
            if (!errorCallback) {
                throw error;
            }
            errorCallback(error);
        }
        return this.map(model);
    }
}
exports.ModelTranslatorBase = ModelTranslatorBase;

//# sourceMappingURL=ModelTranslatorBase.js.map
