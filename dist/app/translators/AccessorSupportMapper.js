"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelAutoMapper_1 = require("./ModelAutoMapper");
/**
 * Checks if `obj.prop` is a getter.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
 */
function isGetter(obj, prop) {
    // Object.getOwnPropertyDescriptor cannot find getter/setter of object instance.
    // So we must seek in the instance's prototype.
    const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(obj), prop);
    return Boolean(descriptor) && Boolean(descriptor.get);
}
/**
 * Checks if `obj.prop` is a setter.
 */
// function isSetter(obj: object, prop: string): boolean {
//     const descriptor = Object.getOwnPropertyDescriptor(
//         Object.getPrototypeOf(obj),
//         prop,
//     )
//     return Boolean(descriptor) && Boolean(descriptor.set)
// }
function describeAccessor(obj) {
    return (prop) => {
        const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(obj), prop);
        return {
            name: prop,
            isGetter: Boolean(descriptor.get),
            isSetter: Boolean(descriptor.set),
        };
    };
}
/**
 * A model auto mapper which supports getter and setter.
 */
class AccessorSupportMapper extends ModelAutoMapper_1.ModelAutoMapper {
    /**
     * @override
     */
    _createMap() {
        const mapper = automapper.createMap('any', this.ModelClass);
        const thiz = this;
        mapper.convertUsing(function (resolutionContext) {
            const destObj = resolutionContext.destinationValue;
            const srcObj = resolutionContext.sourceValue;
            // Iterates through source properties
            // tslint:disable-next-line: prefer-const
            for (let prop of Object.getOwnPropertyNames(destObj)) {
                thiz._forAllMembers(destObj, prop, srcObj);
            }
            // Iterates through source accessors
            // const accessorNames: string[] = Object
            Object.getOwnPropertyNames(Object.getPrototypeOf(destObj))
                .map(describeAccessor(destObj))
                .forEach(desc => thiz._forAllAccessors(destObj, srcObj, desc));
            // tslint:disable-next-line: prefer-const
            // for (let prop of accessorNames) {
            //     thiz._forAllAccessors(destObj, srcObj, {
            //     })
            // }
            return destObj;
        });
        return mapper;
    }
    /**
     * A replacement for native `AutoMapper.forAllMembers`,
     * working well with our custom converter.
     */
    _forAllMembers(destObj, destPropName, srcObj) {
        if (destPropName.startsWith('_') // Private field (by convention)
            || destPropName.startsWith('#')) { // Native private field (>= Node v12)
            return;
        }
        destObj[destPropName] = srcObj[destPropName];
    }
    _forAllAccessors(destObj, srcObj, desc) {
        if (desc.isSetter) {
            let srcVal;
            if (isGetter(srcObj, desc.name)) {
                srcVal = srcObj[desc.name];
            }
            else { // If src getter isn't available, we try method `getProp()`
                const getFn = srcObj[`get${desc.name.toUpperCase()}`]; // Eg: name => getName
                if (typeof getFn === 'function') {
                    srcVal = getFn.call(srcObj); // Equiv: srcObj.getName()
                }
                else {
                    // Normal property value
                    srcVal = srcObj[desc.name];
                }
            }
            destObj[desc.name] = srcVal;
        }
    }
}
exports.AccessorSupportMapper = AccessorSupportMapper;
//# sourceMappingURL=AccessorSupportMapper.js.map