import { IdBase } from './IdBase'


export class SingleId extends IdBase {

    constructor(
        public id: string
    ) {
        super()
    }

    /**
     * @override
     * Overriding for better performance.
     */
    public equals(target: any): boolean {
        if (this === target) { return true }
        if (! (target instanceof SingleId)) { return false }
        return this.id === target.id
    }

    /**
     * @override
     */
    public toArray(): string[] {
        return [ this.id ]
    }

    /**
     * @override
     * Overriding for better performance.
     */
    public toString(): string {
        return this.id
    }
}
