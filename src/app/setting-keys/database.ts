export enum Database {
    /**
     * Name of database engine.
     * Data type: enum `DbClient`
     */
    DB_ENGINE = 'db_engine',

    /**
     * IP or host name of database.
     * Data type: string
     */
    DB_HOST = 'db_host',

    /**
     * Database engine port.
     * Data type: number
     */
    DB_PORT = 'db_port',

    /**
     * Username to log into database.
     * Data type: string
     */
    DB_USER = 'db_user',

    /**
     * Password to log into database.
     * Data type: string
     */
    DB_PASSWORD = 'db_pass',

    /**
     * Database name.
     * Data type: string
     */
    DB_NAME = 'db_name',

    /**
     * Path to database file.
     * Data type: string
     */
    DB_FILE = 'db_file',

    /**
     * Database connection string.
     * Data type: string
     */
    DB_CONN_STRING = 'db_connStr',

    /**
     * Minimum number of connections in pool.
     * Data type: number
     */
    DB_POOL_MIN = 'db_pool_min',

    /**
     * Maximum number of connections in pool.
     * Data type: number
     */
    DB_POOL_MAX = 'db_pool_max',
}
