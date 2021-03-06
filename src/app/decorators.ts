import { injectable, inject, decorate, unmanaged, optional } from 'inversify'

import { lazyInject } from './di/lazyInject'
import * as v from './validators/validate-decorator'

export { ArrayDecoratorOptions, BooleanDecoratorOptions, BigIntDecoratorOptions,
    NumberDecoratorOptions, DateStringDecoratorOptions, StringDecoratorOptions,
} from './validators/validate-decorator'


export type Decorators = {
    decorate: typeof decorate,
    injectable: typeof injectable,
    inject: typeof inject,
    optional: typeof optional,
    unmanaged: typeof unmanaged,
    lazyInject: typeof lazyInject,

    /**
     * Used to decorate model class' properties to assert it must be a boolean.
     *
     * ```typescript
     *
     * import * as joi from '@hapi/joi'
     *
     * const ALLOWED = [ 'id', 'name', 'age' ]
     *
     * class ModelA {
     *   @array({
     *     items: joi.string().valid(ALLOWED).required()
     *   })
     *   fields: string[]
     * }
     *
     *
     * class ModelB {
     *   @array({
     *     items: [ joi.string(), joi.number() ]
     *   })
     *   fields: string[]
     * }
     * ```
     */
    array: typeof v.array,

    /**
     * Used to decorate model class' properties to assert it must be a Big Int.
     */
    bigint: typeof v.bigint,

    /**
     * Used to decorate model class' properties to assert it must be a boolean.
     */
    boolean: typeof v.boolean,

    /**
     * Used to decorate model class' properties to assert it must be a number.
     *
     * ```typescript
     * class ModelA {
     *    @dateString()
     *    birthdate: string
     * }
     *
     *
     * class ModelB {
     *    @dateString({ convert: true })
     *    birthdate: Date
     * }
     *
     *
     * import * as moment from 'moment'
     *
     * class ModelC {
     *    @dateString({ isUTC: true, translator: moment, convert: true })
     *    birthdate: moment.Moment
     * }
     * ```
     */
    dateString: typeof v.dateString,

    /**
     * Used to decorate model class' properties to specify default value.
     * @param {any} value The default value.
     */
    defaultAs: typeof v.defaultAs,

    /**
     * Used to decorate model class' properties to assert it must exist and have non-undefined value.
     */
    id: typeof v.id,

    /**
     * Used to decorate model class' properties to assert it must be a number.
     */
    number: typeof v.number,

    /**
     * Used to decorate model class' properties to assert it must be one of the specified.
     *
     * ```typescript
     *
     * import * as joi from '@hapi/joi'
     *
     * enum AccountStatus { ACTIVE = 'active', LOCKED = 'locked' }
     *
     * class Model {
     *   @valid(AccountStatus.ACTIVE, AccountStatus.LOCKED)
     *   status: AccountStatus
     * }
     * ```
     */
    valid: typeof v.valid,

    /**
     * Used to decorate model class' properties to assert it must exist and have non-undefined value.
     * @param {boolean} allowNull Whether or not to allow null value. Default is false.
     */
    required: typeof v.required,

    /**
     * Used to decorate model class' properties to assert it must be a string.
     *
    * ```typescript
    * class ModelA {
    *    @string()
    *    name: string
    * }
    *
    *
    * class ModelB {
    *    @string({ minLength: 1, maxLength: 255 })
    *    name: string
    * }
    *
    *
    * class ModelC {
    *    @string({ uri: true })
    *    url: string
    * }
    *
    *
    * class ModelD {
    *    @string({ uri: ['http', 'https', 'ftp'] })
    *    url: string
    * }
    * ```
    */
    string: typeof v.string,

    /**
     * Used to decorate model class to __exclusively__ declare validation rules,
     * which means it __replaces__ all rules and options from parent class
     * as well as property rules in same class.
     *
     * @param {JoiModelValidatorConstructorOptions} validatorOptions The options for creating `JoiModelValidator` instance.
     */
    validateClass: typeof v.validateClass,

    /**
     * Used to decorate model class' properties to declare complex validation rules.
     * Note that this decorator overrides other ones such as @defaultAs(), @number(), @valid()...
     *
     * @param {joi.SchemaLike} schema A single schema rule for this property.
     *
     * ```typescript
     * class ModelA {
     *   @validateProp(joi.number().positive().precision(2).max(99))
     *   age: number
     * }
     * ```
     * Not complex enough? Hold my beer!
     *
     * ```typescript
     * class ModelB {
     *   @boolean()
     *   hasChildren: boolean
     *
     *   @validateProp(
     *     joi.number().positive()
     *       .when('hasChildren', {
     *         is: true,
     *         then: joi.required(),
     *         otherwise: joi.forbidden(),
     *       })
     *   )
     *   childrenIDs: number[]
     * }
     * ```
     */
    validateProp: typeof v.validateProp,

    /**
     * Used to decorate model class to equip same functionalities as extending class `Translatable`.
     */
    translatable: typeof v.translatable,
}

export const decorators: Decorators = {
    decorate,
    injectable,
    inject,
    optional,
    unmanaged,
    lazyInject,

    array: v.array,
    bigint: v.bigint,
    boolean: v.boolean,
    dateString: v.dateString,
    defaultAs: v.defaultAs,
    id: v.id,
    number: v.number,
    valid: v.valid,
    required: v.required,
    string: v.string,
    validateClass: v.validateClass,
    validateProp: v.validateProp,
    translatable: v.translatable,
}
