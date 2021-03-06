"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const lazyInject_1 = require("./di/lazyInject");
const v = require("./validators/validate-decorator");
exports.decorators = {
    decorate: inversify_1.decorate,
    injectable: inversify_1.injectable,
    inject: inversify_1.inject,
    optional: inversify_1.optional,
    unmanaged: inversify_1.unmanaged,
    lazyInject: lazyInject_1.lazyInject,
    array: v.array,
    bigint: v.bigint,
    boolean: v.boolean,
    dateString: v.dateString,
    defaultAs: v.defaultAs,
    id: v.id,
    number: v.number,
    valid: v.valid,
    required: v.required,
    string: v.string,
    validateClass: v.validateClass,
    validateProp: v.validateProp,
    translatable: v.translatable,
};
//# sourceMappingURL=decorators.js.map