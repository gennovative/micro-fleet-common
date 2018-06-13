"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DtoBase {
    /**
     * @abstract
     */
    static get translator() {
        throw 'This method must be implemented by derived class!';
    }
}
exports.DtoBase = DtoBase;
//# sourceMappingURL=DtoBase.js.map