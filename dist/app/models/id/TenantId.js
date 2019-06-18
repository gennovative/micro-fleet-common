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
    toArray() {
        return [this.id, this.tenantId];
    }
}
exports.TenantId = TenantId;
//# sourceMappingURL=TenantId.js.map