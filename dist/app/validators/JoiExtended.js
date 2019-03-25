"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi = require("joi");
/**
 * Rule to validate BigInt type.
 */
const bigintRule = {
    name: 'bigint',
    setup(params) {
        this['_flags'].bigint = true; // Set a flag for later use
    },
    validate(params, value, state, options) {
        if (typeof value !== 'bigint') {
            // Generate an error, state and options need to be passed
            return this.createError('genn.bigint', { v: value }, state, options);
        }
        return value; // Everything is OK
    },
};
const joiExtension = {
    name: 'genn',
    language: {
        bigint: 'needs to be a bigint',
    },
    pre(value, state, options) {
        if (options.convert && this['_flags'].bigint) {
            return BigInt(value); // Change the value
        }
        return value; // Keep the value as it was
    },
    rules: [bigintRule],
};
/**
 * @example extJoi.genn().bigint().validate('98765443123456');
 * @example extJoi.genn().bigint().validate(98765443123456n, {convert: false});
 */
exports.extJoi = joi.extend(joiExtension);
//# sourceMappingURL=JoiExtended.js.map