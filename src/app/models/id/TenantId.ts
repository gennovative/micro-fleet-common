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
     * Overriding for better performance.
     */
    public equals(target: any): boolean {
        if (this === target) { return true }
        if (! (target instanceof TenantId)) { return false }
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
     * Overriding for better performance.
     */
    public toString(): string {
        return `${this.id},${this.tenantId}`
    }
}
