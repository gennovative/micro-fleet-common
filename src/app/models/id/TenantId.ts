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
    public toArray(): string[] {
        return [ this.id, this.tenantId ]
    }
}
