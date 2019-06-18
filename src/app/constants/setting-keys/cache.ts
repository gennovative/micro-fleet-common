export enum CacheSettingKeys {
    /**
     * Number of cache servers in cluster.
     * Data type: number
     */
    CACHE_NUM_CONN = 'cache_num_conn',

    /**
     * A single string or an array of IP or host name of cache service.
     * Data type: string | string[]
     */
    CACHE_HOST = 'cache_host',

    /**
     * A single value or an array of port number.
     * Data type: number | number[]
     */
    CACHE_PORT = 'cache_port',
}
