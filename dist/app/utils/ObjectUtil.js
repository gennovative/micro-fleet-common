"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Provides helper methods to manipulate objects.
 */
class ObjectUtil {
    constructor() { }
    /**
     * Creates an object composed of the picked object properties.
     */
    static pickNotNull(source, ...props) {
        return props.reduce((prev, cur) => (source[cur] == null)
            ? prev
            : ({
                [cur]: source[cur],
                ...prev,
            }), {});
    }
    /**
     * Checks if the object implements interface `ISerializable`
     */
    static isSerializable(target) {
        return (typeof target['toJSON'] === 'function');
    }
    /**
     * Converts object to string
     */
    static serialize(target) {
        return this.isSerializable(target)
            ? JSON.stringify(target.toJSON())
            : JSON.stringify(target);
    }
}
exports.ObjectUtil = ObjectUtil;
//# sourceMappingURL=ObjectUtil.js.map