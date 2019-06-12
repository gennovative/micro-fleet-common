/* istanbul ignore else */
if (!global['automapper']) {
    // AutoMapper registers itself as a singleton global variable.
    require('automapper-ts')
}

import { IModelValidator } from '../validators/IModelValidator'
import { ValidationError } from '../validators/ValidationError'
import { ICreateMapFluentFunctions } from '../interfaces/automapper'
import { IModelAutoMapper, MappingOptions } from './IModelAutoMapper'


/**
 * Provides functions to auto mapping an arbitrary object to model of specific class type.
 */
export class ModelAutoMapper<T extends Object>
        implements IModelAutoMapper<T> {

    /**
     * @see IModelAutoMapper.enableValidation
     */
    public enableValidation: boolean


    protected _internalMapper: ICreateMapFluentFunctions

    /**
     * @param {class} ModelClass The model class
     * @param {JoiModelValidator} _validator The model validator. If specified, turn on `enableValidation`
     */
    constructor(
        protected ModelClass: Newable,
        protected _validator?: IModelValidator<T>
    ) {
        this.enableValidation = (_validator != null)
        this._internalMapper = this._createMap()
    }


    /**
     * @see IModelAutoMapper.internalMapper
     */
    public get internalMapper(): ICreateMapFluentFunctions {
        return this._internalMapper
    }

    /**
     * @see IModelAutoMapper.validator
     */
    public get validator(): IModelValidator<T> {
        return this._validator
    }

    /**
     * @see IModelAutoMapper.merge
     */
    public merge(dest: Partial<T>, sources: Partial<T> | Partial<T>[], options?: MappingOptions): Partial<T> {
        if (dest == null || typeof dest !== 'object') { return dest }
        dest = Object.assign.apply(null, Array.isArray(sources) ? [dest, ...sources] : [dest, sources])
        return this.partial(dest, options) as Partial<T>
    }

    /**
     * @see IModelAutoMapper.partial
     */
    public partial(source: object, options?: MappingOptions): Partial<T> {
        return this._tryTranslate('partial', source, options) as Partial<T>
    }

    /**
     * @see IModelAutoMapper.partialMany
     */
    public partialMany(sources: object[], options?: MappingOptions): Partial<T>[] {
        return this._tryTranslate('partial', sources, options) as Partial<T>[]
    }

    /**
     * @see IModelAutoMapper.whole
     */
    public whole(source: object, options?: MappingOptions): T {
        return this._tryTranslate('whole', source, options) as T
    }

    /**
     * @see IModelAutoMapper.wholeMany
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
