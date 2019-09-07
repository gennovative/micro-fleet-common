import { ISerializable } from '../interfaces/misc'


/**
 * Creates an object composed of the picked object properties.
 */
export function pickNotNull(source: object, ...props: string[]): object {
    return props.reduce(
        (prev: object, cur: string) => (source[cur] == null)
            ? prev
            : ({
                [cur]: source[cur],
                ...prev,
                })
    , {})
}

/**
 * Checks if the object implements interface `ISerializable`
 */
export function isSerializable(target: object): target is ISerializable {
    return (typeof target['toJSON'] === 'function')
}

/**
 * Converts object to string
 */
export function serialize(target: any) {
    return isSerializable(target)
        ? JSON.stringify(target.toJSON())
        : JSON.stringify(target)
}

/**
 * Checks if the input is null, or empty string/array or object with no property.
 */
export function isEmpty(obj: any): boolean {
    return (obj == null) || obj.length === 0 || Object.keys(obj).length == 0
}
