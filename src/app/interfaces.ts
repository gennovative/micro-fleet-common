import * as joi from 'joi';

import { AtomicSession } from './models/AtomicSession';
import { PagedArray } from './models/PagedArray';

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