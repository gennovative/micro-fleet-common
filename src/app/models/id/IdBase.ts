import { ISerializable } from '../../interfaces/misc'

/**
 * Base class for ID type.
 * Models in DDD (domain-driven design) often have ID as a class instance.
 */
export abstract class IdBase<T = string> implements ISerializable {

    public abstract toArray(): T[]
    public abstract toString(): string
    public abstract valueOf(): any
    public abstract equals(target: any): boolean

    public toJSON(): object {
        return Object.assign({}, this)
    }
}
