"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* istanbul ignore else */
if (!global['automapper']) {
    // AutoMapper registers itself as a singleton global variable.
    require('automapper-ts');
}
/**
 * Provides functions to auto mapping an arbitrary object to model of specific class type.
 */
class ModelAutoMapper {
    /**
     * @param {class} ModelClass The model class
     * @param {JoiModelValidator} _validator The model validator. If specified, turn on `enableValidation`
     */
    constructor(ModelClass, _validator) {
        this.ModelClass = ModelClass;
        this._validator = _validator;
        this.enableValidation = (_validator != null);
        this.createMap();
    }
    /**
     * Gets validator.
     */
    get validator() {
        return this._validator;
    }
    /**
     * Validates then converts an object to type <T>.
     * but ONLY properties with value are validated and copied.
     * @param {any | any[]} source An object or array of objects to be translated.
     * @param {boolean} isEdit If `true`, validates model ID. Otherwise, excludes model ID from validation. Only takes effect when `enableValidation` is `true`.
     * @param {Function} errorCallback If specified, gives validation error to this callback. Otherwise, throw error.
     *
     * @throws {ValidationError} If no `errorCallback` is provided.
     */
    partial(source, isEdit, errorCallback) {
        return this.tryTranslate('partial', source, isEdit, errorCallback);
    }
    /**
     * Validates then converts an object to type <T>.
     * ALL properties are validated and copied regardless with or without value.
     * @param {any | any[]} source An object or array of objects to be translated.
     * @param {boolean} isEdit If `true`, validates model ID. Otherwise, excludes model ID from validation. Only takes effect when `enableValidation` is `true`.
     * @param {Function} errorCallback If specified, gives validation error to this callback. Otherwise, throw error.
     *
     * @throws {ValidationError} If no `errorCallback` is provided.
     */
    whole(source, isEdit, errorCallback) {
        return this.tryTranslate('whole', source, isEdit, errorCallback);
    }
    /**
     * Initializes the model mapping engine.
     */
    createMap() {
        automapper.createMap('any', this.ModelClass);
    }
    /**
     * Is invoked after source object is validated to map source object to target model.
     */
    map(source) {
        return automapper.map('any', this.ModelClass, source);
    }
    tryTranslate(fn, source, isEdit, errorCallback) {
        if (source == null || typeof source !== 'object') {
            return null;
        }
        if (!Array.isArray(source)) {
            return this.translate.apply(this, arguments);
        }
        return source.map(s => this.translate(fn, s, isEdit, errorCallback));
    }
    translate(fn, source, isEdit, errorCallback) {
        if (!this.enableValidation) {
            return this.map(source);
        }
        let [error, model] = this.validator[fn](source, { isEdit }), handleError = function (err, callback) {
            if (!err) {
                return false;
            }
            if (!callback) {
                throw err;
            }
            callback(err);
            return true;
        };
        if (handleError(error, errorCallback)) {
            return null;
        }
        try {
            return this.map(model);
        }
        catch (ex) {
            handleError(ex, errorCallback); // Mapping error
        }
        return null;
    }
}
exports.ModelAutoMapper = ModelAutoMapper;

//# sourceMappingURL=ModelAutoMapper.js.map
