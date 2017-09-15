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
	import { MinorException } from 'back-lib-common-util';
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
	export class ValidationError extends MinorException {
	    readonly details: IValidationErrorItem[];
	    constructor(joiDetails: joi.ValidationErrorItem[]);
	    	}

}
declare module 'back-lib-common-contracts/dist/app/validators/JoiModelValidator' {
	import * as joi from 'joi';
	import { ValidationError } from 'back-lib-common-contracts/dist/app/validators/ValidationError';
	export interface ValidationOptions extends joi.ValidationOptions {
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
	     * @param {boolean} requirePk Whether to validate PK.
	     * 	This param is IGNORED if param `schemaMapPk` has value.
	     * @param {joi.SchemaMap} schemaMapPk Rule to validate model PK.
	     */
	    static create<T>(schemaMapModel: joi.SchemaMap, isCompoundPk?: boolean, requirePk?: boolean, schemaMapPk?: joi.SchemaMap): JoiModelValidator<T>;
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
	     * @param {joi.SchemaMap} _schemaMap Rules to validate model properties.
	     * @param {boolean} _isCompositePk Whether the primary key is compound. Default to `false`
	     * 	This param is IGNORED if param `schemaMapPk` has value.
	     * @param {boolean} requirePk Whether to validate ID.
	     * 	This param is IGNORED if param `schemaMapPk` has value.
	     * @param {joi.SchemaMap} _schemaMapId Rule to validate model PK.
	     */
	    protected constructor(_schemaMap: joi.SchemaMap, _isCompositePk: boolean, requirePk: boolean, _schemaMapPk?: joi.SchemaMap);
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
declare module 'back-lib-common-contracts/dist/app/interfaces/configurations' {
	import { SettingItemDataType } from 'back-lib-common-contracts/dist/app/models/settings/SettingItem';
	/**
	 * Stores a database connection detail.
	 */
	export interface IConnectionDetail {
	    /**
	     * Database driver name, should use constants in class DbClient.
	     * Eg: DbClient.SQLITE3, DbClient.POSTGRESQL, ...
	     */
	    clientName: string;
	    /**
	     * Connection string for specified `clientName`.
	     */
	    connectionString?: string;
	    /**
	     * Absolute path to database file name.
	     */
	    filePath?: string;
	    host?: {
	        /**
	         * IP Address or Host name.
	         */
	        address: string;
	        /**
	         * Username to login database.
	         */
	        user: string;
	        /**
	         * Password to login database.
	         */
	        password: string;
	        /**
	         * Database name.
	         */
	        database: string;
	    };
	}
	export interface IConfigurationProvider extends IServiceAddOn {
	    /**
	     * Turns on or off remote settings fetching.
	     */
	    enableRemote: boolean;
	    /**
	     * Attempts to get settings from cached Configuration Service, environmetal variable,
	     * and `appconfig.json` file, respectedly.
	     * @param {string} key Setting key
	     * @param {SettingItemDataType} dataType Data type to parse some settings from file or ENV variables.
	     * 		Has no effect with remote settings.
	     */
	    get(key: string, dataType?: SettingItemDataType): number & boolean & string;
	    /**
	     * Attempts to fetch settings from remote Configuration Service.
	     */
	    fetch(): Promise<boolean>;
	    /**
	     * Invokes everytime new settings are updated.
	     * The callback receives an array of changed setting keys.
	     */
	    onUpdate(listener: (changedKeys: string[]) => void): void;
	}

}
declare module 'back-lib-common-contracts/dist/app/models/settings/DatabaseSettings' {
	import { IConfigurationProvider, IConnectionDetail } from 'back-lib-common-contracts/dist/app/interfaces/configurations';
	import { SettingItem } from 'back-lib-common-contracts/dist/app/models/settings/SettingItem';
	/**
	 * Wraps an array of database settings.
	 */
	export class DatabaseSettings extends Array<SettingItem> {
	    static fromProvider(provider: IConfigurationProvider): IConnectionDetail[];
	    	    	    constructor();
	    /**
	     * Gets number of connection settings.
	     */
	    readonly total: number;
	    /**
	     * Parses then adds connection detail to setting item array.
	     */
	    pushConnection(detail: IConnectionDetail): void;
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
declare module 'back-lib-common-contracts/dist/app/interfaces/repositories' {
	import { AtomicSession } from 'back-lib-common-contracts/dist/app/models/AtomicSession';
	import { PagedArray } from 'back-lib-common-contracts/dist/app/models/PagedArray';
	/**
	 * Options for repository's operations.
	 * Note that different operations care about different option properties.
	 * @deprecated
	 */
	export interface RepositoryOptions {
	    /**
	     * A transaction to which this operation is restricted.
	     */
	    atomicSession?: AtomicSession;
	    /**
	     * Account ID.
	     */
	    accountId?: BigSInt;
	}
	export interface RepositoryExistsOptions extends RepositoryOptions {
	    /**
	     * Whether to include records marked as soft-deleted.
	     * Default to `false`.
	     */
	    includeDeleted?: boolean;
	    /**
	     * Tenant ID.
	     */
	    tenantId?: BigSInt;
	}
	export interface RepositoryCountAllOptions extends RepositoryExistsOptions {
	}
	export interface RepositoryCreateOptions extends RepositoryOptions {
	}
	export interface RepositoryDeleteOptions extends RepositoryOptions {
	}
	export interface RepositoryFindOptions extends RepositoryOptions {
	    version?: number;
	}
	export interface RepositoryPageOptions extends RepositoryCountAllOptions {
	}
	export interface RepositoryPatchOptions extends RepositoryOptions {
	}
	export interface RepositoryRecoverOptions extends RepositoryOptions {
	}
	export interface RepositoryUpdateOptions extends RepositoryOptions {
	}
	export interface RepositorySetMainOptions extends RepositoryOptions {
	}
	export interface RepositoryDelVersionOptions extends RepositoryOptions {
	    olderThan?: Date;
	}
	export interface RepositoryRestrictOptions extends RepositoryOptions {
	}
	/**
	 * Provides common CRUD operations, based on Unit of Work pattern.
	 */
	export interface IRepository<TModel extends IModelDTO, TPk extends PkType = BigSInt, TUk = NameUk> {
	    /**
	     * Counts all records in a table.
	     */
	    countAll(options?: RepositoryCountAllOptions): Promise<number>;
	    /**
	     * Inserts one or more `model` to database.
	     * @param {DTO model} model The model to be inserted.
	     */
	    create(model: TModel | TModel[], options?: RepositoryCreateOptions): Promise<TModel & TModel[]>;
	    /**
	     * Permanently deletes one or many records.
	     * @param {PK Type} pk The primary key object.
	     */
	    deleteHard(pk: TPk | TPk[], options?: RepositoryDeleteOptions): Promise<number>;
	    /**
	     * Checks if a record exists or not.
	     * @param {TUk} props An object with non-primary unique properties.
	     */
	    exists(props: TUk, options?: RepositoryExistsOptions): Promise<boolean>;
	    /**
	     * Selects only one record with `pk`.
	     * @param {PK Type} pk The primary key object.
	     */
	    findByPk(pk: TPk, options?: RepositoryFindOptions): Promise<TModel>;
	    /**
	     * Selects `pageSize` number of records at page `pageIndex`.
	     * @param {number} pageIndex Index of the page.
	     * @param {number} pageSize Number of records in a page.
	     */
	    page(pageIndex: number, pageSize: number, options?: RepositoryPageOptions): Promise<PagedArray<TModel>>;
	    /**
	     * Updates new value for specified properties in `model`.
	     */
	    patch(model: Partial<TModel> | Partial<TModel>[], options?: RepositoryPatchOptions): Promise<Partial<TModel> & Partial<TModel>[]>;
	    /**
	     * Replaces a record with `model`.
	     */
	    update(model: TModel | TModel[], options?: RepositoryUpdateOptions): Promise<TModel & TModel[]>;
	}
	/**
	 * Provides common operations to soft-delete and recover models.
	 */
	export interface ISoftDelRepository<TModel extends IModelDTO, TPk extends PkType = BigSInt, TUk = NameUk> extends IRepository<TModel, TPk, TUk> {
	    /**
	     * Marks one or many records with `pk` as deleted.
	     * @param {PK Type} pk The primary key object.
	     */
	    deleteSoft(pk: TPk | TPk[], options?: RepositoryDeleteOptions): Promise<number>;
	    /**
	     * Marks one or many records with `pk` as NOT deleted.
	     * @param {PK Type} pk The primary key object.
	     */
	    recover(pk: TPk | TPk[], options?: RepositoryRecoverOptions): Promise<number>;
	}
	/**
	 * Provides common operations to control models' revisions.
	 */
	export interface IVersionRepository<TModel extends IVersionControlled, TPk extends PkType = BigSInt, TUk = NameUk> extends ISoftDelRepository<TModel, TPk, TUk> {
	    /**
	     * Permanently deletes one or many version of a record.
	     * Can be filtered with `olderThan` option.
	     * @param {PK Type} pk The primary key object.
	     */
	    deleteHardVersions(pk: TPk, versions: number | number[], options?: RepositoryDelVersionOptions): Promise<number>;
	    /**
	     * Selects `pageSize` number of version of a record at page `pageIndex`.
	     * @param {PK Type} pk The primary key object.
	     * @param {number} pageIndex Index of the page.
	     * @param {number} pageSize Number of records in a page.
	     */
	    pageVersions(pk: TPk, pageIndex: number, pageSize: number, options?: RepositoryPageOptions): Promise<number>;
	    /**
	     * Marks a revision as main version of the record with `pk`.
	     * @param {PK Type} pk The primary key object.
	     * @param {number} version The version number.
	     */
	    setAsMain(pk: TPk, version: number, options?: RepositorySetMainOptions): Promise<number>;
	    /**
	     * Removes old versions to keep number of version to be equal or less than `nVersion`.
	     * @param {PK Type} pk The primary key object.
	     * @param {number} nVersion Number of versions to keep.
	     */
	    restrictQuantity(pk: TPk, nVersion: number, options?: RepositoryRestrictOptions): any;
	}

}
declare module 'back-lib-common-contracts/dist/app/Types' {
	export class Types {
	    static readonly CONFIG_PROVIDER: symbol;
	    static readonly DEPENDENCY_CONTAINER: symbol;
	}

}
declare module 'back-lib-common-contracts' {
	export * from 'back-lib-common-contracts/dist/app/models/AtomicSession';
	export * from 'back-lib-common-contracts/dist/app/models/PagedArray';
	export * from 'back-lib-common-contracts/dist/app/models/settings/DatabaseSettings';
	export * from 'back-lib-common-contracts/dist/app/models/settings/GetSettingRequest';
	export * from 'back-lib-common-contracts/dist/app/models/settings/SettingItem';
	export * from 'back-lib-common-contracts/dist/app/translators/ModelAutoMapper';
	export * from 'back-lib-common-contracts/dist/app/validators/JoiModelValidator';
	export * from 'back-lib-common-contracts/dist/app/validators/ValidationError';
	export * from 'back-lib-common-contracts/dist/app/interfaces/configurations';
	export * from 'back-lib-common-contracts/dist/app/interfaces/repositories';
	export * from 'back-lib-common-contracts/dist/app/Types';

}
