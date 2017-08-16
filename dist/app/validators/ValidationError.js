"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const back_lib_common_util_1 = require("back-lib-common-util");
/**
 * Represents an error when a model does not pass validation.
 */
class ValidationError extends back_lib_common_util_1.Exception {
    constructor(joiDetails) {
        super(null, false, ValidationError);
        this.name = 'ValidationError';
        this.details = this.parseDetails(joiDetails);
    }
    parseDetails(joiDetails) {
        let details = [];
        /* istanbul ignore next */
        if (!joiDetails || !joiDetails.length) {
            return details;
        }
        joiDetails.forEach(d => {
            details.push({
                message: d.message,
                path: d.path,
                value: d.context.value
            });
        });
        return details;
    }
}
exports.ValidationError = ValidationError;

//# sourceMappingURL=ValidationError.js.map
