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
    static $createValidator() {
        return validate_internal_1.createJoiValidator(this);
    }
    static from(source) {
        return this.getTranslator().whole(source);
    }
    static fromMany(source) {
        return this.getTranslator().wholeMany(source);
    }
}
exports.Translatable = Translatable;
//# sourceMappingURL=Translatable.js.map