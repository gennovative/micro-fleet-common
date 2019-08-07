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
     */
    equals(target) {
        if (!target) {
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
     */
    toString() {
        return `${this.id},${this.tenantId}`;
    }
    /**
     * Returns a JSON { id: '', tenantId: '' }
     */
    valueOf() {
        return this.toJSON();
    }
}
exports.TenantId = TenantId;
//# sourceMappingURL=TenantId.js.map