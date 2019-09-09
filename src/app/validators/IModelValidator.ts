import * as joi from '@hapi/joi'

import { ValidationError } from './ValidationError'


// tslint:disable-next-line:interface-name
export interface ValidationOptions extends joi.ValidationOptions {
    // Re-brand this interface
}

export type JoiModelValidatorConstructorOptions = {
    /**
     * Rules to validate model properties.
     */
    schemaMapModel: joi.SchemaMap,

    /**
     * Rule to validate model ID.
     */
    schemaMapId?: joi.SchemaMap,

    /**
     * Default options which can be override by passing "options" parameter
     * to "whole()" and "partial()"
     */
    joiOptions?: ValidationOptions,
}

export interface IModelValidator<T> {

    readonly schemaMapModel: joi.SchemaMap

    readonly schemaMapId: joi.SchemaMap

    /**
     * Validates model ID.
     */
    id(id: any): [ValidationError, any]

    /**
     * Validates model for creation operation, which doesn't need `id` property.
     */
    whole(target: any, options?: ValidationOptions): [ValidationError, T]

    /**
     * Validates model for modification operation, which requires `id` property.
     */
    partial(target: any, options?: ValidationOptions): [ValidationError, Partial<T>]

}
