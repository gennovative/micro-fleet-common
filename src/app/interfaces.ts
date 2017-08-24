import * as joi from 'joi';

import { AtomicSession } from './models/AtomicSession';
import { PagedArray } from './models/PagedArray';

/**
 * Options for repository's operations.
 * Note that different operations care about different option properties.
 */
export type RepositoryOptions = {
	/**
	 * Whether to include records marked as soft-deleted.
	 * Default to `false`.
	 */
	includeDeleted?: boolean,

	/**
	 * A transaction to which this operation is restricted.
	 */
	atomicSession?: AtomicSession,

	/**
	 * Tenant ID.
	 */
	tenantId?: BigSInt
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
export interface IHardDelRepository<TModel extends IModelDTO, TPk = BigSInt>
		extends IRepository<TModel, TPk> {

	/**
	 * Permanently deletes one or many records regardless `isSoftDeletable` is on or off.
	 */
	hardDelete(pk: TPk | TPk[], options?: RepositoryOptions): Promise<number>;
}