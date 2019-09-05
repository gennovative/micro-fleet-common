"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const v = require("./validators/validate-decorator");
exports.decorators = {
    decorate: inversify_1.decorate,
    injectable: inversify_1.injectable,
    inject: inversify_1.inject,
    optional: inversify_1.optional,
    unmanaged: inversify_1.unmanaged,
    array: v.array,
    bigInt: v.bigInt,
    boolean: v.boolean,
    datetime: v.datetime,
    defaultAs: v.defaultAs,
    id: v.id,
    number: v.number,
    only: v.only,
    required: v.required,
    string: v.string,
    validateClass: v.validateClass,
    validateProp: v.validateProp,
};
//# sourceMappingURL=decorators.js.map