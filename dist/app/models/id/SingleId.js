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
     */
    equals(target) {
        if (!target) {
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
     */
    toString() {
        return this.id;
    }
    /**
     * @override
     */
    valueOf() {
        return this.id;
    }
}
exports.SingleId = SingleId;
//# sourceMappingURL=SingleId.js.map