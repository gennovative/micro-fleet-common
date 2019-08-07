import { IdBase } from './IdBase'


export class TenantId extends IdBase {

    constructor(
        public id: string,
        public tenantId: string
    ) {
        super()
    }

    /**
     * @override
     */
    public equals(target: any): boolean {
        if (!target) { return false }
        return (this.id === target.id && this.tenantId === target.tenantId)
    }

    /**
     * @override
     */
    public toArray(): string[] {
        return [ this.id, this.tenantId ]
    }

    /**
     * @override
     */
    public toString(): string {
        return `${this.id},${this.tenantId}`
    }

    /**
     * Returns a JSON { id: '', tenantId: '' }
     */
    public valueOf(): any {
        return this.toJSON()
    }
}
