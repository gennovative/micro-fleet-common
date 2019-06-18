
/**
 * Base class for ID type.
 * Models in DDD (domain-driven design) often have ID as a class instance.
 */
export abstract class IdBase<T = string> {
    public abstract toArray(): T[]

    public toJSON(): PrimitiveFlatJson {
        return Object.assign({}, this)
    }
}
