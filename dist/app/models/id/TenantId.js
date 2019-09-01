"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IdBase_1 = require("./IdBase");
class TenantId extends IdBase_1.IdBase {
    constructor(id, tenantId) {
        super();
        this.id = id;
        this.tenantId = tenantId;
    }
    /**
     * @override
     * Overriding for better performance.
     */
    equals(target) {
        if (this === target) {
            return true;
        }
        if (!(target instanceof TenantId)) {
            return false;
        }
        return (this.id === target.id && this.tenantId === target.tenantId);
    }
    /**
     * @override
     */
    toArray() {
        return [this.id, this.tenantId];
    }
    /**
     * @override
     * Overriding for better performance.
     */
    toString() {
        return `${this.id},${this.tenantId}`;
    }
}
exports.TenantId = TenantId;
//# sourceMappingURL=TenantId.js.map