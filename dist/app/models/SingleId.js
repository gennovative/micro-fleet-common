"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IdBase_1 = require("./IdBase");
class SingleId extends IdBase_1.IdBase {
    constructor(id) {
        super();
        this.id = id;
    }
    /**
     * @override
     * Overriding for better performance.
     */
    equals(target) {
        if (this === target) {
            return true;
        }
        if (!(target instanceof SingleId)) {
            return false;
        }
        return this.id === target.id;
    }
    /**
     * @override
     */
    toArray() {
        return [this.id];
    }
    /**
     * @override
     * Overriding for better performance.
     */
    toString() {
        return this.id;
    }
}
exports.SingleId = SingleId;
//# sourceMappingURL=SingleId.js.map