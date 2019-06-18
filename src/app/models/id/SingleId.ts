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
    public toArray(): string[] {
        return [ this.id ]
    }
}
