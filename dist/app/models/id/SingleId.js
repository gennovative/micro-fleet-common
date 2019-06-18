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
    toArray() {
        return [this.id];
    }
}
exports.SingleId = SingleId;
//# sourceMappingURL=SingleId.js.map