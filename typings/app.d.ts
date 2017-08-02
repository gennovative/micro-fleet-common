/// <reference path="./global.d.ts" />

declare module 'back-lib-common-contracts/models/GetSettingRequest' {
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

}
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
	    	}

}
declare module 'back-lib-common-contracts/validators/ModelValidatorBase' {
	import * as joi from 'joi';
	import { ValidationError } from 'back-lib-common-contracts/validators/ValidationError';
	export type ValidationOptions = joi.ValidationOptions;
	export abstract class ModelValidatorBase<T> {
	    protected readonly abstract _schema: joi.ObjectSchema;
	    	    constructor();
	    /**
	     * Gets schema used for validation the model.
	     */
	    readonly schema: joi.ObjectSchema;
	    /**
	     * Gets schema used for validation the model ID.
	     * By default, all model IDs are of type `BigSInt` (string).
	     * If a derived validator wants to support a model with ID of different type,
	     * it must override this getter method.
	     */
	    readonly schemaId: any;
	    /**
	     * Validates model ID.
	     */
	    forId(id: any): [ValidationError, BigSInt];
	    /**
	     * Validates model for creation operation, which doesn't need `id` property.
	     */
	    forNew(target: any, options?: ValidationOptions): [ValidationError, T];
	    /**
	     * Validates model for modification operation, which requires `id` property.
	     */
	    forEdit(target: any, options?: ValidationOptions): [ValidationError, T];
	}

}
declare module 'back-lib-common-contracts/translators/ModelTranslatorBase' {
	import { ModelValidatorBase } from 'back-lib-common-contracts/validators/ModelValidatorBase';
	export abstract class ModelTranslatorBase<T> {
	    constructor();
	    /**
	     * Gets validator for specific type <T>.
	     */
	    protected readonly abstract validator: ModelValidatorBase<T>;
	    /**
	     * Validates then converts an object to type <T> for modification operation.
	     */
	    forEdit(source: any): T;
	    /**
	     * Validates then converts an object to type <T> for creation operation.
	     */
	    forNew(source: any): T;
	    protected abstract createMap(): void;
	    protected abstract map(validatedSource: any): T;
	}

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
	    constructor(_total: any, source: Array<T>);
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
	export * from 'back-lib-common-contracts/models/GetSettingRequest';
	export * from 'back-lib-common-contracts/translators/ModelTranslatorBase';
	export * from 'back-lib-common-contracts/validators/ModelValidatorBase';
	export * from 'back-lib-common-contracts/interfaces';
	export * from 'back-lib-common-contracts/PagedArray';

}
declare module 'back-lib-common-contracts/validators/GetSettingRequestValidator' {
	import * as joi from 'joi';
	import { GetSettingRequest } from 'back-lib-common-contracts/models/GetSettingRequest';
	import { ValidationError } from 'back-lib-common-contracts/validators/ValidationError';
	import { ModelValidatorBase, ValidationOptions } from 'back-lib-common-contracts/validators/ModelValidatorBase';
	export class GetSettingRequestValidator extends ModelValidatorBase<GetSettingRequest> {
	    protected readonly _schema: joi.ObjectSchema;
	    /**
	     * This method is unnecessary. Use `forNew` instead.
	     * @override
	     * @throws NotImplementedException
	     */
	    forEdit(target: any, options?: ValidationOptions): [ValidationError, GetSettingRequest];
	} const _default: GetSettingRequestValidator;
	export default _default;

}
declare module 'back-lib-common-contracts/translators/GetSettingRequestTranslator' {
	import { GetSettingRequest } from 'back-lib-common-contracts/models/GetSettingRequest';
	import { ModelValidatorBase } from 'back-lib-common-contracts/validators/ModelValidatorBase';
	import { ModelTranslatorBase } from 'back-lib-common-contracts/translators/ModelTranslatorBase';
	export class GetSettingRequestTranslator extends ModelTranslatorBase<GetSettingRequest> {
	    /**
	     * @override
	     */
	    protected readonly validator: ModelValidatorBase<GetSettingRequest>;
	    /**
	     * This method is unnecessary. Use `forNew` instead.
	     * @override
	     * @throws NotImplementedException
	     */
	    forEdit(source: any): GetSettingRequest;
	    /**
	     * @override
	     */
	    protected createMap(): void;
	    /**
	     * @override
	     */
	    protected map(validatedSource: any): GetSettingRequest;
	} const _default: GetSettingRequestTranslator;
	export default _default;

}
