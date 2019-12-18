import { Newable } from '../interfaces/misc'
import { IModelAutoMapper } from '../translators/IModelAutoMapper'
import { ModelAutoMapper } from '../translators/ModelAutoMapper'
import { IModelValidator, ValidationOptions } from '../validators/IModelValidator'
import { createJoiValidator } from '../validators/validate-internal'


// Verbose and ugly workaround for correct typing with static method inheritance
// https://github.com/microsoft/TypeScript/issues/5862

export interface ITranslatable<T = any> {
    new (...args: any[]): T
    getTranslator(): IModelAutoMapper<T>
    getValidator(): IModelValidator<T>
    from(source: object): T
    fromMany(source: object[]): T[]
}



type TranslatableClass<U> = Newable<U> & typeof Translatable

const TRANSLATOR = Symbol()
const VALIDATOR = Symbol()

export abstract class Translatable {
    public static getTranslator<TT extends Translatable>(this: TranslatableClass<TT>): IModelAutoMapper<TT> {
        let translator = Reflect.getOwnMetadata(TRANSLATOR, this)
        if (!translator) {
            translator = this.$createTranslator<TT>()
            Reflect.defineMetadata(TRANSLATOR, translator, this)
        }
        return translator
    }

    protected static $createTranslator<TT extends Translatable>(this: TranslatableClass<TT>): IModelAutoMapper<TT> {
        return new ModelAutoMapper(this, this.getValidator<TT>())
    }

    public static getValidator<VT extends Translatable>(this: TranslatableClass<VT>): IModelValidator<VT> {
        let validator = Reflect.getOwnMetadata(VALIDATOR, this)
        // "validator" may be `null` when class doesn't need validating
        if (validator === undefined) {
            validator = this.$createValidator()
            Reflect.defineMetadata(VALIDATOR, validator, this)
        }
        return validator
    }

    protected static $createValidator<VT extends Translatable>(
        this: TranslatableClass<VT>,
        options?: ValidationOptions,
    ): IModelValidator<VT> {
        return createJoiValidator(this, options)
    }

    /**
     * Converts arbitrary object into instance of this class type.
     *
     * If no class property is marked for validation, all properties are copied.
     *
     * If just some class properties are marked for validation, they are validated then copied, the rest are ignored.
     */
    public static from<FT extends Translatable>(this: TranslatableClass<FT>, source: object): FT {
        return this.getTranslator<FT>().whole(source)
    }

    /**
     * Converts array of arbitrary objects into array of instances of this class type.
     * Conversion rule is same as `from()` method.
     */
    public static fromMany<FT extends Translatable>(this: TranslatableClass<FT>, source: object[]): FT[] {
        return this.getTranslator<FT>().wholeMany(source)
    }

}
