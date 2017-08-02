"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ModelTranslatorBase {
    constructor() {
        this.createMap();
    }
    /**
     * Validates then converts an object to type <T> for modification operation.
     */
    forEdit(source) {
        let [error, model] = this.validator.forEdit(source);
        if (error) {
            throw error;
        }
        return this.map(model);
    }
    /**
     * Validates then converts an object to type <T> for creation operation.
     */
    forNew(source) {
        let [error, model] = this.validator.forNew(source);
        if (error) {
            throw error;
        }
        return this.map(model);
    }
}
exports.ModelTranslatorBase = ModelTranslatorBase;

//# sourceMappingURL=ModelTranslatorBase.js.map
