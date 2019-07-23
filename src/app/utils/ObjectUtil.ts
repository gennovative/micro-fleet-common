
/**
 * Provides helper methods to manipulate objects.
 */
export class ObjectUtil {
    private constructor() {}

    /**
     * Creates an object composed of the picked object properties.
     */
    public static pickNotNull(source: object, ...props: string[]): object {
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
    public static isSerializable(target: object): target is ISerializable {
        return (typeof target['toJSON'] === 'function')
    }

    /**
     * Converts object to string
     */
    public static serialize(target: any) {
        return this.isSerializable(target)
            ? JSON.stringify(target.toJSON())
            : JSON.stringify(target)
    }

}
