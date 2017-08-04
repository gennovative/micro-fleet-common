/// <reference path="./global.d.ts" />

declare module 'back-lib-common-contracts/validators/ValidationError' {
	import * as joi from 'joi';
	import { Exception } from 'back-lib-common-util';
	/**
	 * Represents a validation error for a property.
	 * UI Form should use this information to highlight the particular input.
	 */
	export interface IValidationErrorItem {
	    /**
	     * Error message for this item.
	     */
	    message: string;
	    /**
	     * Path to the target property in validation schema.
	     */
	    path: string;
	    /**
	     * The invalid property value.
	     */
	    value: any;
	}
	/**
	 * Represents an error when a model does not pass validation.
	 */
	export class ValidationError extends Exception {
	    	    constructor(details: joi.ValidationErrorItem[]);
	    readonly details: IValidationErrorItem[];
	    	}

}
declare module 'back-lib-common-contracts/validators/JoiModelValidator' {
	import * as joi from 'joi';
	import { ValidationError } from 'back-lib-common-contracts/validators/ValidationError';
	export interface ValidationOptions extends joi.ValidationOptions {
	    /**
	     * If `true`, this validation is for edit model. Otherwise, for new model.
	     * Default to `false`.
	     */
	    isEdit?: boolean;
	}
	export class JoiModelValidator<T> {
	    protected _schemaMap: joi.SchemaMap;
	    protected _schemaMapId: joi.SchemaMap;
	    /**
	     * Builds a new instance of ModelValidatorBase.
	     * @param {joi.SchemaMap} schemaMapModel Rules to validate model properties.
	     * @param {joi.SchemaMap} schemaMapId Rule to validate model ID. Only the first property rule is used.
	     */
	    static create<T>(schemaMapModel: joi.SchemaMap, schemaMapId?: joi.SchemaMap): JoiModelValidator<T>;
	    /**
	     * Compiled rules for model ID.
	     */
	    protected _compiledId: joi.ObjectSchema;
	    /**
	     * Compiled rules for model properties.
	     */
	    protected _compiledWhole: joi.ObjectSchema;
	    /**
	     * Compiled rules for model properties, but all of them are OPTIONAL.
	     * Used for patch operation.
	     */
	    protected _compiledPartial: joi.ObjectSchema;
	    /**
	     *
	     * @param {joi.SchemaMap} _schemaMap Rules to validate model properties.
	     * @param {joi.SchemaMap} _schemaMapId Rule to validate model ID. Only the first property rule is used.
	     */
	    protected constructor(_schemaMap: joi.SchemaMap, _schemaMapId?: joi.SchemaMap);
	    readonly schemaMap: joi.SchemaMap;
	    readonly schemaMapId: joi.SchemaMap;
	    /**
	     * Validates model ID.
	     */
	    id(id: any): [ValidationError, any];
	    /**
	     * Validates model for creation operation, which doesn't need `id` property.
	     */
	    whole(target: any, options?: ValidationOptions): [ValidationError, T];
	    /**
	     * Validates model for modification operation, which requires `id` property.
	     */
	    partial(target: any, options?: ValidationOptions): [ValidationError, Partial<T>];
	    protected compile(): void;
	    protected validate(schema: joi.ObjectSchema, target: any, options?: ValidationOptions): [ValidationError, T];
	}

}
declare module 'back-lib-common-contracts/translators/ModelAutoMapper' {
	import { JoiModelValidator } from 'back-lib-common-contracts/validators/JoiModelValidator';
	import { ValidationError } from 'back-lib-common-contracts/validators/ValidationError';
	/**
	 * Provides functions to auto mapping an arbitrary object to model of specific class type.
	 */
	export class ModelAutoMapper<T> {
	    protected ModelClass: new () => any;
	    protected _validator: JoiModelValidator<T>;
	    /**
	     * Turns on or off model validation before translating.
	     * Is set to `true` if validator is passed to class constructor.
	     */
	    enableValidation: boolean;
	    /**
	     * @param {class} ModelClass The model class
	     * @param {JoiModelValidator} _validator The model validator. If specified, turn on `enableValidation`
	     */
	    constructor(ModelClass: new () => any, _validator?: JoiModelValidator<T>);
	    /**
	     * Gets validator.
	     */
	    readonly validator: JoiModelValidator<T>;
	    /**
	     * Validates then converts an object to type <T>.
	     * but ONLY properties with value are validated and copied.
	     * @param {any} source
	     * @param {boolean} isEdit If `true`, validates model ID. Otherwise, excludes model ID from validation. Only takes effect when `enableValidation` is `true`.
	     * @param {Function} errorCallback If specified, gives validation error to this callback. Otherwise, throw error.
	     *
	     * @throws {ValidationError} If no `errorCallback` is provided.
	     */
	    partial(source: any, isEdit: boolean, errorCallback?: (err: ValidationError) => void): Partial<T>;
	    /**
	     * Validates then converts an object to type <T>.
	     * ALL properties are validated and copied regardless with or without value.
	     * @param {any} source
	     * @param {boolean} isEdit If `true`, validates model ID. Otherwise, excludes model ID from validation. Only takes effect when `enableValidation` is `true`.
	     * @param {Function} errorCallback If specified, gives validation error to this callback. Otherwise, throw error.
	     *
	     * @throws {ValidationError} If no `errorCallback` is provided.
	     */
	    whole(source: any, isEdit: boolean, errorCallback?: (err: ValidationError) => void): T;
	    /**
	     * Initializes the model mapping engine.
	     */
	    protected createMap(): void;
	    /**
	     * Is invoked after source object is validated to map source object to target model.
	     */
	    protected map(source: any): T;
	    protected translate(fn: string, source: any, isEdit: boolean, errorCallback?: (err: ValidationError) => void): T;
	}

}
declare module 'back-lib-common-contracts/models/GetSettingRequest' {
	import { ModelAutoMapper } from 'back-lib-common-contracts/translators/ModelAutoMapper';
	import { JoiModelValidator } from 'back-lib-common-contracts/validators/JoiModelValidator';
	/**
	 * Represents the request contract for GetSetting endpoint.
	 */
	export class GetSettingRequest {
	    /**
	     * Gets or sets program slug.
	     */
	    slug: string;
	    /**
	     * Gets or sets IP address where the calling program is running.
	     */
	    ipAddress: string;
	}
	export let validator: JoiModelValidator<GetSettingRequest>;
	export let translator: ModelAutoMapper<GetSettingRequest>;

}
declare module 'back-lib-common-contracts/PagedArray' {
	/**
	 * A wrapper array that contains paged items.
	 */
	export class PagedArray<T> extends Array<T> {
	    	    /**
	     * Gets total number of items.
	     */
	    readonly total: number;
	    constructor(_total?: number, ...items: T[]);
	}

}
declare module 'back-lib-common-contracts/interfaces' {
	import { PagedArray } from 'back-lib-common-contracts/PagedArray';
	/**
	 * Provides common CRUD operations, based on Unit of Work pattern.
	 */
	export interface IRepository<TModel extends IModelDTO> {
	    /**
	     * Indicates whether `delete` method of this class really removes
	     * records from database, or just marks them as deleted and allows undoing.
	     */
	    isSoftDelete: boolean;
	    /**
	     * Counts all records in a table.
	     */
	    countAll(): Promise<number>;
	    /**
	     * Inserts specified `model` to database.
	     */
	    create(model: TModel): Promise<TModel>;
	    /**
	     * Removes record with `id` from database, or marks it as deleted,
	     * depending on `isSoftDelete` value.
	     */
	    delete(id: BigSInt): Promise<number>;
	    /**
	     * Selects only one record with `id`.
	     */
	    find(id: BigSInt): Promise<TModel>;
	    /**
	     * Selects `pageSize` number of records at page `pageIndex`.
	     */
	    page(pageIndex: number, pageSize: number): Promise<PagedArray<TModel>>;
	    /**
	     * Updates new value for specified properties in `model`.
	     */
	    patch(model: Partial<TModel>): Promise<number>;
	    /**
	     * Replaces a record with `model`.
	     */
	    update(model: TModel): Promise<number>;
	}

}
declare module 'back-lib-common-contracts' {
	export { GetSettingRequest } from 'back-lib-common-contracts/models/GetSettingRequest';
	export * from 'back-lib-common-contracts/translators/ModelAutoMapper';
	export * from 'back-lib-common-contracts/validators/JoiModelValidator';
	export * from 'back-lib-common-contracts/interfaces';
	export * from 'back-lib-common-contracts/PagedArray';

}
