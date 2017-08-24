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
	    readonly details: IValidationErrorItem[];
	    constructor(joiDetails: joi.ValidationErrorItem[]);
	    	}

}
declare module 'back-lib-common-contracts/dist/app/validators/JoiModelValidator' {
	import * as joi from 'joi';
	import { ValidationError } from 'back-lib-common-contracts/dist/app/validators/ValidationError';
	export interface ValidationOptions extends joi.ValidationOptions {
	    /**
	     * If `true`, validates model PK. Otherwise, excludes model PK from validation.
	     * Default to `false`.
	     */
	    isEdit?: boolean;
	}
	export class JoiModelValidator<T> {
	    protected _schemaMap: joi.SchemaMap;
	    protected _isCompositePk: boolean;
	    protected _schemaMapPk: joi.SchemaMap;
	    /**
	     * Builds a new instance of ModelValidatorBase.
	     * @param {joi.SchemaMap} schemaMapModel Rules to validate model properties.
	     * @param {boolean} isCompoundPk Whether the primary key is compound. Default to `false`.
	     * 	This param is IGNORED if param `schemaMapPk` has value.
	     * @param {joi.SchemaMap} schemaMapPk Rule to validate model PK.
	     */
	    static create<T>(schemaMapModel: joi.SchemaMap, isCompoundPk?: boolean, schemaMapPk?: joi.SchemaMap): JoiModelValidator<T>;
	    /**
	     * Compiled rules for compound model primary key.
	     */
	    protected _compiledPk: joi.ObjectSchema;
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
	     * @param {boolean} _isCompositePk Whether the primary key is compound. Default to `false`
	     * 		This param is IGNORED if param `schemaMapPk` has value.
	     * @param {joi.SchemaMap} _schemaMapId Rule to validate model PK.
	     */
	    protected constructor(_schemaMap: joi.SchemaMap, _isCompositePk?: boolean, _schemaMapPk?: joi.SchemaMap);
	    readonly schemaMap: joi.SchemaMap;
	    readonly schemaMapPk: joi.SchemaMap;
	    readonly isCompoundPk: boolean;
	    /**
	     * Validates model PK.
	     */
	    pk(pk: any): [ValidationError, any];
	    /**
	     * Validates model for creation operation, which doesn't need `pk` property.
	     */
	    whole(target: any, options?: ValidationOptions): [ValidationError, T];
	    /**
	     * Validates model for modification operation, which requires `pk` property.
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
	     * If `true`, validates model PK. Otherwise, excludes model PK from validation.
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
declare module 'back-lib-common-contracts/dist/app/models/settings/SettingItem' {
	import { ModelAutoMapper } from 'back-lib-common-contracts/dist/app/translators/ModelAutoMapper';
	import { JoiModelValidator } from 'back-lib-common-contracts/dist/app/validators/JoiModelValidator';
	export enum SettingItemDataType {
	    /**
	     * Text data type, that is rendered as a text box on UI.
	     */
	    String = "string",
	    /**
	     * Array of strings.
	     */
	    StringArray = "string[]",
	    /**
	     * Numeric data type including integer and float, that is rendered as
	     * a numeric box on UI.
	     */
	    Number = "number",
	    /**
	     * Array of numbers.
	     */
	    NumberArray = "number[]",
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
	    readonly name: string;
	    /**
	     * Gets or sets data type of setting value.
	     * Must be one of: 'string', 'string[]', 'number', 'number[]', 'boolean'.
	     */
	    readonly dataType: SettingItemDataType;
	    /**
	     * Gets or set value.
	     * Whatever `dataType` is, value must always be string.
	     */
	    readonly value: string;
	}

}
declare module 'back-lib-common-contracts/dist/app/models/settings/DbConnectionSetting' {
	import { DbClient } from 'back-lib-common-constants';
	import { SettingItem } from 'back-lib-common-contracts/dist/app/models/settings/SettingItem';
	export type DbConnectionSettingConstructor = {
	    engine: DbClient;
	    host?: string;
	    username?: string;
	    password?: string;
	    database?: string;
	    filePath?: string;
	    connectionString?: string;
	};
	/**
	 * Wraps an array of database connection settings.
	 */
	export class DbConnectionSetting extends Array<SettingItem> {
	    constructor(opts: DbConnectionSettingConstructor);
	}

}
declare module 'back-lib-common-contracts/dist/app/models/settings/DatabaseSettings' {
	import { SettingItem } from 'back-lib-common-contracts/dist/app/models/settings/SettingItem';
	import { DbConnectionSetting } from 'back-lib-common-contracts/dist/app/models/settings/DbConnectionSetting';
	/**
	 * Wraps an array of database settings.
	 */
	export class DatabaseSettings extends Array<SettingItem> {
	    	    constructor(...items: DbConnectionSetting[]);
	    /**
	     * Gets number of connection settings.
	     */
	    readonly total: number;
	    /**
	     * Adds a database connection setting.
	     */
	    pushConnection(conn: DbConnectionSetting): void;
	}

}
declare module 'back-lib-common-contracts/dist/app/models/settings/GetSettingRequest' {
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
	    readonly slug: string;
	    /**
	     * Gets or sets IP address where the calling program is running.
	     */
	    readonly ipAddress: string;
	}

}
declare module 'back-lib-common-contracts/dist/app/interfaces' {
	import { AtomicSession } from 'back-lib-common-contracts/dist/app/models/AtomicSession';
	import { PagedArray } from 'back-lib-common-contracts/dist/app/models/PagedArray';
	/**
	 * Options for repository's operations.
	 * Note that different operations care about different option properties.
	 */
	export type RepositoryOptions = {
	    /**
	     * Whether to include records marked as soft-deleted.
	     * Default to `false`.
	     */
	    includeDeleted?: boolean;
	    /**
	     * A transaction to which this operation is restricted.
	     */
	    atomicSession?: AtomicSession;
	    /**
	     * Tenant ID.
	     */
	    tenantId?: BigSInt;
	};
	/**
	 * Provides common CRUD operations, based on Unit of Work pattern.
	 */
	export interface IRepository<TModel extends IModelDTO, TPk = BigSInt> {
	    /**
	     * Indicates whether `delete` method of this class really removes
	     * records from database, or just marks them as deleted and allows undoing.
	     */
	    readonly isSoftDeletable: boolean;
	    /**
	     * Indicates whether this class should update `createdAt` and `updatedAt` properties.
	     */
	    readonly isAuditable: boolean;
	    /**
	     * Counts all records in a table.
	     */
	    countAll(options?: RepositoryOptions): Promise<number>;
	    /**
	     * Inserts one or more `model` to database.
	     * @param {DTO model} model The model to be inserted.
	     */
	    create(model: TModel | TModel[], options?: RepositoryOptions): Promise<TModel & TModel[]>;
	    /**
	     * Removes one or many records with `pk` from database, or marks it/them as deleted,
	     * depending on `isSoftDelete` value.
	     * @param {PK Type} pk The primary key object.
	     */
	    delete(pk: TPk | TPk[], options?: RepositoryOptions): Promise<number>;
	    /**
	     * Selects only one record with `pk`.
	     * @param {PK Type} pk The primary key object.
	     */
	    findByPk(pk: TPk, options?: RepositoryOptions): Promise<TModel>;
	    /**
	     * Selects `pageSize` number of records at page `pageIndex`.
	     * @param {number} pageIndex Index of the page.
	     * @param {number} pageSize Number of records in a page.
	     * @param {boolean} includeDeleted Whether to count records marked as soft-deleted. Default should be `false`.
	     * @param {AtomicSession} atomicSession A transaction in which this operation is restricted.
	     */
	    page(pageIndex: number, pageSize: number, options?: RepositoryOptions): Promise<PagedArray<TModel>>;
	    /**
	     * Updates new value for specified properties in `model`.
	     */
	    patch(model: Partial<TModel> | Partial<TModel>[], options?: RepositoryOptions): Promise<Partial<TModel> & Partial<TModel>[]>;
	    /**
	     * Replaces a record with `model`.
	     */
	    update(model: TModel | TModel[], options?: RepositoryOptions): Promise<TModel & TModel[]>;
	}
	/**
	 * Provides common CRUD operations with composite primary key that supports multi-tenancy, based on Unit of Work pattern.
	 */
	export interface IHardDelRepository<TModel extends IModelDTO, TPk = BigSInt> extends IRepository<TModel, TPk> {
	    /**
	     * Permanently deletes one or many records regardless `isSoftDeletable` is on or off.
	     */
	    hardDelete(pk: TPk | TPk[], options?: RepositoryOptions): Promise<number>;
	}

}
declare module 'back-lib-common-contracts' {
	export * from 'back-lib-common-contracts/dist/app/models/AtomicSession';
	export * from 'back-lib-common-contracts/dist/app/models/PagedArray';
	export * from 'back-lib-common-contracts/dist/app/models/settings/DatabaseSettings';
	export * from 'back-lib-common-contracts/dist/app/models/settings/DbConnectionSetting';
	export * from 'back-lib-common-contracts/dist/app/models/settings/GetSettingRequest';
	export * from 'back-lib-common-contracts/dist/app/models/settings/SettingItem';
	export * from 'back-lib-common-contracts/dist/app/translators/ModelAutoMapper';
	export * from 'back-lib-common-contracts/dist/app/validators/JoiModelValidator';
	export * from 'back-lib-common-contracts/dist/app/validators/ValidationError';
	export * from 'back-lib-common-contracts/dist/app/interfaces';

}
