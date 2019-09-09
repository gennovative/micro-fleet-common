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
    return Boolean(descriptor) && (typeof descriptor.get === 'function');
}
function capitalize(source) {
    source = source.replace(/[_#]/g, '');
    return `${source.charAt(0).toUpperCase()}${source.substr(1)}`;
}
function setFunc(obj, prop) {
    const setName = `set${capitalize(prop)}`;
    return (typeof obj[setName] === 'function') ? obj[setName] : null;
}
function getFunc(obj, prop) {
    const getName = `get${capitalize(prop)}`;
    return (typeof obj[getName] === 'function') ? obj[getName] : null;
}
function describeAccessor(obj) {
    return (prop) => {
        const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(obj), prop);
        return {
            name: prop,
            isGetter: (typeof descriptor.get === 'function'),
            isSetter: (typeof descriptor.set === 'function'),
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
    $createMap() {
        const mapper = automapper.createMap('any', this.ModelClass);
        const thiz = this;
        mapper.convertUsing(function (resolutionContext) {
            const destObj = resolutionContext.destinationValue;
            const srcObj = resolutionContext.sourceValue;
            // Iterates through source properties
            // tslint:disable-next-line: prefer-const
            for (let prop of Object.getOwnPropertyNames(destObj)) {
                thiz.$forAllMembers(destObj, prop, srcObj);
            }
            // Iterates through source accessors
            // const accessorNames: string[] = Object
            Object.getOwnPropertyNames(Object.getPrototypeOf(destObj))
                .map(describeAccessor(destObj))
                .forEach(desc => thiz.$forAllAccessors(destObj, srcObj, desc));
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
    $forAllMembers(destObj, destPropName, srcObj) {
        const setFn = setFunc(destObj, destPropName);
        if (!setFn &&
            (destPropName.startsWith('_') // Private field (by convention)
                || destPropName.startsWith('#') // Native private field (>= Node v12)
            )) {
            return;
        }
        if (setFn) {
            setFn.call(destObj, srcObj[destPropName], srcObj);
        }
        else {
            destObj[destPropName] = srcObj[destPropName];
        }
    }
    $forAllAccessors(destObj, srcObj, desc) {
        if (desc.isSetter) {
            let srcVal;
            if (isGetter(srcObj, desc.name)) {
                srcVal = srcObj[desc.name];
            }
            else { // If src getter isn't available, we try method `getProp()`
                const getFn = getFunc(srcObj, desc.name); // Eg: name => getName
                if (getFn) {
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