"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Base class for ID type.
 * Models in DDD (domain-driven design) often have ID as a class instance.
 */
class IdBase {
    toJSON() {
        return Object.assign({}, this);
    }
}
exports.IdBase = IdBase;
//# sourceMappingURL=IdBase.js.map