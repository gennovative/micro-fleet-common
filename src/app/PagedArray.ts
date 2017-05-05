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

	constructor(private _total, source: Array<T>) {
		super();
		Array.prototype.push.apply(this, source);
	}
}
