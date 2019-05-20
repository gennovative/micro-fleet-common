/* istanbul ignore else */
if (!global['automapper']) {
    // AutoMapper registers itself as a singleton global variable.
    require('automapper-ts')
}

import { JoiModelValidator } from '../validators/JoiModelValidator'
import { ValidationError } from '../validators/ValidationError'
import { ICreateMapFluentFunctions } from '../interfaces/automapper'


export interface MappingOptions {
    /**
     * Temporarily turns on or off model validation.
     * Can only be turned on if validator is provided to constructor.
     */
    enableValidation?: boolean

    /**
     * If specified, gives validation error to this callback. Otherwise, throw error.
     */
    errorCallback?: (err: ValidationError) => void
}

/**
 * Provides functions to auto mapping an arbitrary object to model of specific class type.
 */
export class ModelAutoMapper<T extends Object> {

    /**
     * Turns on or off model validation before translating.
     * Is set to `true` if validator is passed to class constructor.
     */
    public enableValidation: boolean


    protected _internalMapper: ICreateMapFluentFunctions

    /**
     * @param {class} ModelClass The model class
     * @param {JoiModelValidator} _validator The model validator. If specified, turn on `enableValidation`
     */
    constructor(
        protected ModelClass: Newable,
        protected _validator?: JoiModelValidator<T>
    ) {
        this.enableValidation = (_validator != null)
        this._internalMapper = this._createMap()
    }


    /**
     * Gets the internal AutoMapper instance for advanced configuration.
     */
    public get internalMapper(): ICreateMapFluentFunctions {
        return this._internalMapper
    }

    /**
     * Gets the validator.
     */
    public get validator(): JoiModelValidator<T> {
        return this._validator
    }

    /**
     * Copies properties from `sources` to dest then optionally validates
     * the result (depends on `enableValidation`).
     * If `enableValidation` is turned off, it works just like native `Object.assign()` function,
     * therefore, use `Object.assign()` for better performance if validation is not needed.
     * Note that it uses `partial()` internally, hence `required` validation is IGNORED.
     *
     * @throws {ValidationError}
     */
    public merge(dest: Partial<T>, sources: Partial<T> | Partial<T>[], options?: MappingOptions): Partial<T> {
        if (dest == null || typeof dest !== 'object') { return dest }
        dest = Object.assign.apply(null, Array.isArray(sources) ? [dest, ...sources] : [dest, sources])
        return this.partial(dest, options) as Partial<T>
    }

    /**
     * Validates then converts an object to type <T>.
     * but ONLY properties with value are validated and copied.
     * Note that `required` validation is IGNORED.
     * @param {object} source The object to be translated.
     *
     * @throws {ValidationError} If no `errorCallback` is provided.
     */
    public partial(source: object, options?: MappingOptions): Partial<T> {
        return this._tryTranslate('partial', source, options) as Partial<T>
    }

    /**
     * Validates then converts a list of objects to type <T>.
     * but ONLY properties with value are validated and copied.
     * Note that `required` validation is IGNORED.
     * @param {object[]} sources A list of objects to be translated.
     *
     * @throws {ValidationError} If no `errorCallback` is provided.
     */
    public partialMany(sources: object[], options?: MappingOptions): Partial<T>[] {
        return this._tryTranslate('partial', sources, options) as Partial<T>[]
    }

    /**
     * Validates then converts an object to type <T>.
     * ALL properties are validated and copied regardless with or without value.
     * @param {object} source The object to be translated.
     *
     * @throws {ValidationError} If no `errorCallback` is provided.
     */
    public whole(source: object, options?: MappingOptions): T {
        return this._tryTranslate('whole', source, options) as T
    }

    /**
     * Validates then converts a list of objects to type <T>.
     * ALL properties are validated and copied regardless with or without value.
     * @param {object[]} sources The list of objects to be translated.
     *
     * @throws {ValidationError} If no `errorCallback` is provided.
     */
    public wholeMany(sources: object[], options?: MappingOptions): T[] {
        return this._tryTranslate('whole', sources, options) as T[]
    }


    /**
     * Initializes the model mapping engine.
     */
    protected _createMap(): ICreateMapFluentFunctions {
        return automapper.createMap('any', this.ModelClass)
    }

    /**
     * Is invoked after source object is validated to map source object to target model.
     */
    protected _map(source: any): T {
        return automapper.map('any', this.ModelClass, source)
    }


    protected _tryTranslate(fn: string, source: any | any[], options?: MappingOptions): T | T[] {
        if (source == null || typeof source !== 'object') { return source }

        options = Object.assign(<MappingOptions>{
            enableValidation: this.enableValidation,
        }, options)

        // Translate an array or single item
        if (Array.isArray(source)) {
            return source.map(s => this._translate(fn, s, options))
        }
        return this._translate(fn, source, options)
    }

    protected _translate(fn: string, source: any, options: MappingOptions): T {
        if (!options.enableValidation) {
            return this._map(source)
        }

        const [error, model] = this.validator[fn](source),
            handleError = function (err: ValidationError, callback: Function) {
                if (!err) { return false }
                if (!callback) {
                    throw err
                }
                callback(err)
                return true
            }

        if (handleError(error, options.errorCallback)) { // Validation error
            return null
        }
        try {
            return this._map(model)
        } catch (ex) {
            handleError(ex, options.errorCallback) // Mapping error
        }
        return null
    }
}
