import { PagedArray } from './PagedArray';

export interface IRepository<TModel extends IModelDTO> {
	countAll(): Promise<number>;
	create(model: TModel): Promise<TModel>;
	delete(id: number): Promise<number>;
	find(id: number): Promise<TModel>;
	page(pageIndex: number, pageSize: number): Promise<PagedArray<TModel>>;
	patch(model: Partial<TModel>): Promise<number>;
	update(model: TModel): Promise<number>;
}
