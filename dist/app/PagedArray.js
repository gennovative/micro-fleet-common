"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A wrapper array that contains paged items.
 */
class PagedArray extends Array {
    constructor(_total = 0, ...items) {
        super();
        this._total = _total;
        /* istanbul ignore else */
        if (Array.isArray(items)) {
            Array.prototype.push.apply(this, items);
        }
    }
    /**
     * Gets total number of items.
     */
    get total() {
        return this._total;
    }
}
exports.PagedArray = PagedArray;

//# sourceMappingURL=PagedArray.js.map
