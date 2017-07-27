import { PagedArray } from './PagedArray';

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
