"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const back_lib_common_util_1 = require("back-lib-common-util");
/**
 * Represents an error when a model does not pass validation.
 */
class ValidationError extends back_lib_common_util_1.Exception {
    constructor(details) {
        super(null, false, ValidationError);
        this.parseDetails(details);
    }
    get details() {
        return this._details;
    }
    parseDetails(joiDetails) {
        this._details = [];
        /* istanbul ignore next */
        if (!joiDetails || !joiDetails.length) {
            return;
        }
        joiDetails.forEach(d => {
            this._details.push({
                message: d.message,
                path: d.path,
                value: d.context.value
            });
        });
    }
}
exports.ValidationError = ValidationError;

//# sourceMappingURL=ValidationError.js.map
