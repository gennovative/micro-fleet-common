import { IdBase } from './IdBase'


export class SingleId extends IdBase {

    constructor(
        public id: string
    ) {
        super()
    }

    /**
     * @override
     */
    public equals(target: any): boolean {
        if (!target) { return false }
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
     */
    public toString(): string {
        return this.id
    }

    /**
     * @override
     */
    public valueOf(): any {
        return this.id
    }
}
