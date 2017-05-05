"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A wrapper array that contains paged items.
 */
class PagedArray extends Array {
    constructor(_total, source) {
        super();
        this._total = _total;
        Array.prototype.push.apply(this, source);
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
