"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Database;
(function (Database) {
    /**
     * Name of database engine.
     *
     * Data type: enum `DbClient`
     */
    Database["DB_ENGINE"] = "db_engine";
    /**
     * IP or host name of database.
     *
     * Data type: string
     */
    Database["DB_HOST"] = "db_host";
    /**
     * Database engine port.
     *
     * Data type: number
     */
    Database["DB_PORT"] = "db_port";
    /**
     * Username to log into database.
     *
     * Data type: string
     */
    Database["DB_USER"] = "db_user";
    /**
     * Password to log into database.
     *
     * Data type: string
     */
    Database["DB_PASSWORD"] = "db_pass";
    /**
     * Database name.
     *
     * Data type: string
     */
    Database["DB_NAME"] = "db_name";
    /**
     * Path to database file.
     *
     * Data type: string
     */
    Database["DB_FILE"] = "db_file";
    /**
     * Database connection string.
     *
     * Data type: string
     */
    Database["DB_CONN_STRING"] = "db_connStr";
    /**
     * Minimum number of connections in pool.
     *
     * Data type: number
     */
    Database["DB_POOL_MIN"] = "db_pool_min";
    /**
     * Maximum number of connections in pool.
     *
     * Data type: number
     */
    Database["DB_POOL_MAX"] = "db_pool_max";
})(Database = exports.Database || (exports.Database = {}));
//# sourceMappingURL=database.js.map