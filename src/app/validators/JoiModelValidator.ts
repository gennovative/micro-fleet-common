import * as joi from 'joi'

import { Guard } from '../utils/Guard'
import { IModelValidator, JoiModelValidatorConstructorOptions,
    ValidationOptions } from './IModelValidator'
import { ValidationError } from './ValidationError'


export class JoiModelValidator<T>
        implements IModelValidator<T> {

    /**
     * Compiled rules for model ID.
     */
    private _compiledId: joi.ObjectSchema

    /**
     * Compiled rules for model properties.
     */
    private _compiledWhole: joi.ObjectSchema

    /**
     * Compiled rules for model properties, but all of them are OPTIONAL.
     * Used for patch operation.
     */
    private _compiledPartial: joi.ObjectSchema


    private _schemaMapModel: joi.SchemaMap
    private _schemaMapId: joi.SchemaMap
    private _defaultOpts: ValidationOptions


    constructor(options: JoiModelValidatorConstructorOptions) {
        this._defaultOpts = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
            ...options.joiOptions,
        }
        this._schemaMapId = options.schemaMapId
        this._schemaMapModel = options.schemaMapModel
    }


    public get schemaMapModel(): joi.SchemaMap {
        return this._schemaMapModel
    }

    public get schemaMapId(): joi.SchemaMap {
        return this._schemaMapId
    }



    /**
     * @see IModelValidator.id
     */
    public id(id: any): [ValidationError, any] {
        if (!this._compiledId) {
            this._compileIdSchema()
        }
        const { error, value } = this._compiledId.validate<any>(id)
        return (error) ? [ ValidationError.fromJoi(error.details), null] : [null, value]
    }

    /**
     * @see IModelValidator.whole
     */
    public whole(target: any, options: ValidationOptions = {}): [ValidationError, T] {
        if (!this._compiledWhole) {
            this._compileWholeSchema()
        }
        return this._validate(this._compiledWhole, target, options)
    }

    /**
     * @see IModelValidator.partial
     */
    public partial(target: any, options: ValidationOptions = {}): [ValidationError, Partial<T>] {
        if (!this._compiledPartial) {
            this._compilePartialSchema()
        }
        return this._validate(this._compiledPartial, target, options)
    }


    private _compileIdSchema(): void {
        Guard.assertIsDefined(this._schemaMapId, 'schemaMapId is not specified')
        this._compiledId = joi.object(this._schemaMapId)
    }

    private _compileWholeSchema(): void {
        // Whole validation does not check required ID.
        this._compiledWhole = joi.object(this._schemaMapModel)
    }

    private _compilePartialSchema(): void {
        const wholeSchema = this._schemaMapModel

        // Make all rules optional for partial schema.
        const partialSchema: joi.SchemaMap = {
            ...this._schemaMapId, // Partially validation checks required ID.
        }
        for (const key in wholeSchema) {
            const rule = wholeSchema[key] as joi.Schema
            /* istanbul ignore else */
            if (typeof rule.optional === 'function') {
                partialSchema[key] = rule.optional()
            }
        }
        this._compiledPartial = joi.object(partialSchema)
    }

    private _validate(schema: joi.ObjectSchema, target: any, options: ValidationOptions = {}): [ValidationError, T] {
        const opts = {
            ...this._defaultOpts,
            ...options,
        }

        const { error, value } = schema.validate<T>(target, opts)

        return (error) ? [ ValidationError.fromJoi(error.details), null] : [null, value]
    }
}
