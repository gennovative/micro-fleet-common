import isEqual = require('lodash.isequal')

import { ISerializable } from '../../interfaces/misc'

/**
 * Base class for ID type.
 * Models in DDD (domain-driven design) often have ID as a class instance.
 */
export abstract class IdBase implements ISerializable {

    public abstract toArray(): any[]

    public equals(target: any): boolean {
        if (this === target) { return true }
        const MyType = this.constructor
        if (! (target instanceof MyType)) { return false }
        return isEqual(this.toArray(), target['toArray']())
    }

    public toJSON(): object {
        return Object.assign({}, this)
    }

    /**
     * @override
     */
    public toString(): string {
        return this.toArray().join()
    }
}
