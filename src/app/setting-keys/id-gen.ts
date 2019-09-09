export enum IdGenerator {
    /**
     * Datacenter identifier. It is used for big int generation and
     * can have values from 0 to 31 (5 bits).
     *
     * Data type: number
     */
    ID_DATACENTER = 'id_datacenter',

    /**
     * Worker identifier. It is used for both big int as well as short id generation and
     * can have values from 0 to 31 (5 bits).
     *
     * Data type: number
     */
    ID_WORKER = 'id_worker',

    /**
     * A Unix timestamp used to generate smaller ids.
     * This number should neither be bigger than current timestamp
     * nor smaller than exceed number of milliseconds elapsed
     * since 1 January 1970 00:00:00 UTC.
     *
     * Data type: number
     */
    ID_EPOCH = 'id_epoch',

}
