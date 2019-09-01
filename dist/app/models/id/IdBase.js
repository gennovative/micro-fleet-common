"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isEqual = require("lodash/isEqual");
/**
 * Base class for ID type.
 * Models in DDD (domain-driven design) often have ID as a class instance.
 */
class IdBase {
    equals(target) {
        if (this === target) {
            return true;
        }
        const MyType = this.constructor;
        if (!(target instanceof MyType)) {
            return false;
        }
        return isEqual(this.toArray(), target['toArray']());
    }
    toJSON() {
        return Object.assign({}, this);
    }
    /**
     * @override
     */
    toString() {
        return this.toArray().join();
    }
}
exports.IdBase = IdBase;
//# sourceMappingURL=IdBase.js.map