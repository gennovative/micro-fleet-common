/// <reference path="./global.d.ts" />

declare module 'back-lib-common-contracts/PagedArray' {
	/**
	 * A wrapper array that contains paged items.
	 */
	export class PagedArray<T> extends Array<T> {
	    private _total;
	    /**
	     * Gets total number of items.
	     */
	    readonly total: number;
	    constructor(_total: any, source: Array<T>);
	}

}
declare module 'back-lib-common-contracts/interfaces' {
	import { PagedArray } from 'back-lib-common-contracts/PagedArray';
	export interface IRepository<TModel extends IModelDTO> {
	    countAll(): Promise<number>;
	    create(model: TModel): Promise<TModel>;
	    delete(id: number): Promise<number>;
	    find(id: number): Promise<TModel>;
	    page(pageIndex: number, pageSize: number): Promise<PagedArray<TModel>>;
	    patch(model: Partial<TModel>): Promise<number>;
	    update(model: TModel): Promise<number>;
	}

}
declare module 'back-lib-common-contracts' {
	export * from 'back-lib-common-contracts/interfaces';
	export * from 'back-lib-common-contracts/PagedArray';

}
