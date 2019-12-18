"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelAutoMapper_1 = require("../translators/ModelAutoMapper");
const validate_internal_1 = require("../validators/validate-internal");
const TRANSLATOR = Symbol();
const VALIDATOR = Symbol();
class Translatable {
    static getTranslator() {
        let translator = Reflect.getOwnMetadata(TRANSLATOR, this);
        if (!translator) {
            translator = this.$createTranslator();
            Reflect.defineMetadata(TRANSLATOR, translator, this);
        }
        return translator;
    }
    static $createTranslator() {
        return new ModelAutoMapper_1.ModelAutoMapper(this, this.getValidator());
    }
    static getValidator() {
        let validator = Reflect.getOwnMetadata(VALIDATOR, this);
        // "validator" may be `null` when class doesn't need validating
        if (validator === undefined) {
            validator = this.$createValidator();
            Reflect.defineMetadata(VALIDATOR, validator, this);
        }
        return validator;
    }
    static $createValidator(options) {
        return validate_internal_1.createJoiValidator(this, options);
    }
    /**
     * Converts arbitrary object into instance of this class type.
     *
     * If no class property is marked for validation, all properties are copied.
     *
     * If just some class properties are marked for validation, they are validated then copied, the rest are ignored.
     */
    static from(source) {
        return this.getTranslator().whole(source);
    }
    /**
     * Converts array of arbitrary objects into array of instances of this class type.
     * Conversion rule is same as `from()` method.
     */
    static fromMany(source) {
        return this.getTranslator().wholeMany(source);
    }
}
exports.Translatable = Translatable;
//# sourceMappingURL=Translatable.js.map