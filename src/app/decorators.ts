import { injectable, inject, decorate, unmanaged, optional } from 'inversify'
import * as v from './validators/validate-decorator'

export type Decorators = {
    decorate: typeof decorate,
    injectable: typeof injectable,
    inject: typeof inject,
    optional: typeof optional,
    unmanaged: typeof unmanaged,

    array: typeof v.array,
    bigInt: typeof v.bigInt,
    boolean: typeof v.boolean,
    datetime: typeof v.datetime,
    defaultAs: typeof v.defaultAs,
    id: typeof v.id,
    number: typeof v.number,
    only: typeof v.only,
    required: typeof v.required,
    string: typeof v.string,
    validateClass: typeof v.validateClass,
    validateProp: typeof v.validateProp,
}

export const decorators: Decorators = {
    decorate,
    injectable,
    inject,
    optional,
    unmanaged,

    array: v.array,
    bigInt: v.bigInt,
    boolean: v.boolean,
    datetime: v.datetime,
    defaultAs: v.defaultAs,
    id: v.id,
    number: v.number,
    only: v.only,
    required: v.required,
    string: v.string,
    validateClass: v.validateClass,
    validateProp: v.validateProp,
}
