"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelAutoMapper_1 = require("../translators/ModelAutoMapper");
const validate_internal_1 = require("../validators/validate-internal");
const TRANSLATOR = Symbol();
const VALIDATOR = Symbol();
class Translatable {
    static getTranslator() {
        let translator = Reflect.getMetadata(TRANSLATOR, this);
        if (!translator) {
            translator = this.$createTranslator();
            Reflect.defineMetadata(TRANSLATOR, translator, this);
        }
        return Reflect.getMetadata(TRANSLATOR, this);
    }
    static $createTranslator() {
        return new ModelAutoMapper_1.ModelAutoMapper(this, this.getValidator());
    }
    static getValidator() {
        let validator = Reflect.getMetadata(VALIDATOR, this);
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
/**
 * Used to decorate model class to equip same functionalities as extending class `Translatable`.
 */
function translatable() {
    return function (TargetClass) {
        copyStatic(Translatable, TargetClass, ['getTranslator', '$createTranslator', 'getValidator', '$createValidator', 'from', 'fromMany']);
    };
}
exports.translatable = translatable;
function copyStatic(SrcClass, DestClass, props = []) {
    props.forEach(p => {
        if (!DestClass[p]) {
            DestClass[p] = SrcClass[p].bind(DestClass);
        }
    });
}
//# sourceMappingURL=Translatable.js.map