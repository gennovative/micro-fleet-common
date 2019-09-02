import { Newable } from '../interfaces/misc'
import { IModelAutoMapper } from '../translators/IModelAutoMapper'
import { ModelAutoMapper } from '../translators/ModelAutoMapper'
import { IModelValidator } from '../validators/IModelValidator'
import { createJoiValidator } from '../validators/validate-internal'


// Verbose and ugly workaround for correct typing with static method inheritance
// https://github.com/microsoft/TypeScript/issues/5862

export interface ITranslatable<T = any> {
    getTranslator<TT extends Translatable>(this: TranslatableClass<TT>): IModelAutoMapper<TT>
    getValidator<VT extends Translatable>(this: TranslatableClass<VT>): IModelValidator<VT>
    from?(source: object): T
    fromMany?(source: object[]): T[]
}



type TranslatableClass<U> = Newable<U> & typeof Translatable

const TRANSLATOR = Symbol()
const VALIDATOR = Symbol()

export abstract class Translatable {
    public static getTranslator<TT extends Translatable>(this: TranslatableClass<TT>): IModelAutoMapper<TT> {
        let translator = Reflect.getMetadata(TRANSLATOR, this)
        if (!translator) {
            translator = this.$createTranslator<TT>()
            Reflect.defineMetadata(TRANSLATOR, translator, this)
        }
        return Reflect.getMetadata(TRANSLATOR, this)
    }

    public static $createTranslator<TT extends Translatable>(this: TranslatableClass<TT>): IModelAutoMapper<TT> {
        return new ModelAutoMapper(this, this.getValidator<TT>())
    }

    public static getValidator<VT extends Translatable>(this: TranslatableClass<VT>): IModelValidator<VT> {
        let validator = Reflect.getMetadata(VALIDATOR, this)
        // "validator" may be `null` when class doesn't need validating
        if (validator === undefined) {
            validator = this.$createValidator()
            Reflect.defineMetadata(VALIDATOR, validator, this)
        }
        return validator
    }

    public static $createValidator<VT extends Translatable>(this: TranslatableClass<VT>): IModelValidator<VT> {
        return createJoiValidator(this)
    }

    public static from<FT extends Translatable>(this: TranslatableClass<FT>, source: object): FT {
        return this.getTranslator<FT>().whole(source)
    }

    public static fromMany<FT extends Translatable>(this: TranslatableClass<FT>, source: object[]): FT[] {
        return this.getTranslator<FT>().wholeMany(source)
    }

}
