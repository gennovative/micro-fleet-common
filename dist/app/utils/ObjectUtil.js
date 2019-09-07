"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Creates an object composed of the picked object properties.
 */
function pickNotNull(source, ...props) {
    return props.reduce((prev, cur) => (source[cur] == null)
        ? prev
        : ({
            [cur]: source[cur],
            ...prev,
        }), {});
}
exports.pickNotNull = pickNotNull;
/**
 * Checks if the object implements interface `ISerializable`
 */
function isSerializable(target) {
    return (typeof target['toJSON'] === 'function');
}
exports.isSerializable = isSerializable;
/**
 * Converts object to string
 */
function serialize(target) {
    return isSerializable(target)
        ? JSON.stringify(target.toJSON())
        : JSON.stringify(target);
}
exports.serialize = serialize;
/**
 * Checks if the input is null, or empty string/array or object with no property.
 */
function isEmpty(obj) {
    return (obj == null) || obj.length === 0 || Object.keys(obj).length == 0;
}
exports.isEmpty = isEmpty;
//# sourceMappingURL=ObjectUtil.js.map