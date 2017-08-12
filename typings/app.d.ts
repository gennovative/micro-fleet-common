/// <reference path="./global.d.ts" />

declare module 'back-lib-common-contracts/dist/app/models/AtomicSession' {
	/**
	 * Wraps a database connection and transaction.
	 */
	export class AtomicSession {
	    knexConnection: any;
	    knexTransaction: any;
	    constructor(knexConnection: any, knexTransaction: any);
	}

}
declare module 'back-lib-common-contracts/dist/app/validators/ValidationError' {
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
declare module 'back-lib-common-contracts/dist/app/validators/JoiModelValidator' {
	import * as joi from 'joi';
	import { ValidationError } from 'back-lib-common-contracts/dist/app/validators/ValidationError';
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
	    /**
	     * Must call this method before using `whole` or `partial`,
	     * or after `schemaMap` or `schemaMapId` is changed.
	     */
	    compile(): void;
	    protected validate(schema: joi.ObjectSchema, target: any, options?: ValidationOptions): [ValidationError, T];
	}

}
declare module 'back-lib-common-contracts/dist/app/translators/ModelAutoMapper' {
	import { JoiModelValidator } from 'back-lib-common-contracts/dist/app/validators/JoiModelValidator';
	import { ValidationError } from 'back-lib-common-contracts/dist/app/validators/ValidationError';
	export interface MappingOptions {
	    /**
	     * Temporarily turns on or off model validation.
	     * Can only be turned on if validator is provided to constructor.
	     */
	    enableValidation?: boolean;
	    /**
	     * If `true`, validates model ID. Otherwise, excludes model ID from validation.
	     * Only takes effect when `enableValidation` is `true`.
	     * Default is `false`.
	     */
	    isEdit?: boolean;
	    /**
	     * If specified, gives validation error to this callback. Otherwise, throw error.
	     */
	    errorCallback?: (err: ValidationError) => void;
	}
	/**
	 * Provides functions to auto mapping an arbitrary object to model of specific class type.
	 */
	export class ModelAutoMapper<T extends Object> {
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
	     * Copies properties from `sources` to dest then optionally validates
	     * the result (depends on `enableValidation`).
	     * If `enableValidation` is turned off, it works just like native `Object.assign()` function,
	     * therefore, use `Object.assign()` for better performance if validation is not needed.
	     * Note that it uses `partial()` internally, hence `required` validation is IGNORED.
	     *
	     * @throws {ValidationError}
	     */
	    merge(dest: Partial<T>, sources: Partial<T> | Partial<T>[], options?: MappingOptions): Partial<T>;
	    /**
	     * Validates then converts an object to type <T>.
	     * but ONLY properties with value are validated and copied.
	     * Note that `required` validation is IGNORED.
	     * @param {any | any[]} source An object or array of objects to be translated.
	     *
	     * @throws {ValidationError} If no `errorCallback` is provided.
	     */
	    partial(source: any | any[], options?: MappingOptions): Partial<T> & Partial<T>[];
	    /**
	     * Validates then converts an object to type <T>.
	     * ALL properties are validated and copied regardless with or without value.
	     * @param {any | any[]} source An object or array of objects to be translated.
	     *
	     * @throws {ValidationError} If no `errorCallback` is provided.
	     */
	    whole(source: any | any[], options?: MappingOptions): T & T[];
	    /**
	     * Initializes the model mapping engine.
	     */
	    protected createMap(): void;
	    /**
	     * Is invoked after source object is validated to map source object to target model.
	     */
	    protected map(source: any): T;
	    	    	}

}
declare module 'back-lib-common-contracts/dist/app/models/GetSettingRequest' {
	import { ModelAutoMapper } from 'back-lib-common-contracts/dist/app/translators/ModelAutoMapper';
	import { JoiModelValidator } from 'back-lib-common-contracts/dist/app/validators/JoiModelValidator';
	/**
	 * Represents the request contract for GetSetting endpoint.
	 */
	export class GetSettingRequest {
	    static validator: JoiModelValidator<GetSettingRequest>;
	    static translator: ModelAutoMapper<GetSettingRequest>;
	    /**
	     * Gets or sets program slug.
	     */
	    slug: string;
	    /**
	     * Gets or sets IP address where the calling program is running.
	     */
	    ipAddress: string;
	}

}
declare module 'back-lib-common-contracts/dist/app/models/SettingItem' {
	import { ModelAutoMapper } from 'back-lib-common-contracts/dist/app/translators/ModelAutoMapper';
	import { JoiModelValidator } from 'back-lib-common-contracts/dist/app/validators/JoiModelValidator';
	export enum SettingItemDataType {
	    /**
	     * Text data type, that is rendered as a text box on UI.
	     */
	    String = "string",
	    /**
	     * Numeric data type including integer and float, that is rendered as
	     * a numeric box on UI.
	     */
	    Number = "number",
	    /**
	     * Logical data type (true/false), that is rendered as a checkbox on UI.
	     */
	    Boolean = "boolean",
	}
	/**
	 * Represents a setting record.
	 */
	export class SettingItem {
	    static validator: JoiModelValidator<SettingItem>;
	    static translator: ModelAutoMapper<SettingItem>;
	    /**
	     * Gets or sets setting name (aka setting key).
	     * This is also the key in `appconfig.json` and the name of environment variable.
	     */
	    name: string;
	    /**
	     * Gets or sets data type of setting value.
	     * Must be one of: 'string', 'number', 'boolean'.
	     */
	    dataType: SettingItemDataType;
	    /**
	     *
	     */
	    value: any;
	}

}
declare module 'back-lib-common-contracts/dist/app/models/PagedArray' {
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
declare module 'back-lib-common-contracts/dist/app/interfaces' {
	import { AtomicSession } from 'back-lib-common-contracts/dist/app/models/AtomicSession';
	import { PagedArray } from 'back-lib-common-contracts/dist/app/models/PagedArray';
	/**
	 * Provides common CRUD operations, based on Unit of Work pattern.
	 */
	export interface IRepository<TModel extends IModelDTO> {
	    /**
	     * Indicates whether `delete` method of this class really removes
	     * records from database, or just marks them as deleted and allows undoing.
	     */
	    isSoftDeletable: boolean;
	    /**
	     * Indicates whether this class should update `createdAt` and `updatedAt` properties.
	     */
	    isAuditable: boolean;
	    /**
	     * Counts all records in a table.
	     */
	    countAll(atomicSession?: AtomicSession): Promise<number>;
	    /**
	     * Inserts specified `model` to database.
	     */
	    create(model: TModel, atomicSession?: AtomicSession): Promise<TModel>;
	    /**
	     * Removes record with `id` from database, or marks it as deleted,
	     * depending on `isSoftDelete` value.
	     */
	    delete(id: BigSInt, atomicSession?: AtomicSession): Promise<number>;
	    /**
	     * Selects only one record with `id`.
	     */
	    find(id: BigSInt, atomicSession?: AtomicSession): Promise<TModel>;
	    /**
	     * Selects `pageSize` number of records at page `pageIndex`.
	     */
	    page(pageIndex: number, pageSize: number, atomicSession?: AtomicSession): Promise<PagedArray<TModel>>;
	    /**
	     * Updates new value for specified properties in `model`.
	     */
	    patch(model: Partial<TModel>, atomicSession?: AtomicSession): Promise<number>;
	    /**
	     * Replaces a record with `model`.
	     */
	    update(model: TModel, atomicSession?: AtomicSession): Promise<number>;
	}

}
declare module 'back-lib-common-contracts' {
	export * from 'back-lib-common-contracts/dist/app/models/AtomicSession';
	export * from 'back-lib-common-contracts/dist/app/models/GetSettingRequest';
	export * from 'back-lib-common-contracts/dist/app/models/SettingItem';
	export * from 'back-lib-common-contracts/dist/app/models/PagedArray';
	export * from 'back-lib-common-contracts/dist/app/translators/ModelAutoMapper';
	export * from 'back-lib-common-contracts/dist/app/validators/JoiModelValidator';
	export * from 'back-lib-common-contracts/dist/app/validators/ValidationError';
	export * from 'back-lib-common-contracts/dist/app/interfaces';

}
