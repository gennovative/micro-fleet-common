/**
 * A wrapper array that contains paged items.
 */
export class PagedArray<T> extends Array<T> {

	/**
	 * Gets total number of items.
	 */
	public get total(): number {
		return this._total;
	}

	constructor(private _total: number = 0, ...items: T[]) {
		super();
		/* istanbul ignore else */
		if (Array.isArray(items)) {
			Array.prototype.push.apply(this, items);
		}
	}
}
