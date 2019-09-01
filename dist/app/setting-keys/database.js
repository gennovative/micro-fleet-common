"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Database;
(function (Database) {
    /**
     * Name of database engine.
     * Data type: enum `DbClient` in `back-lib-persistence`
     */
    Database["DB_ENGINE"] = "db_engine";
    /**
     * IP or host name of database.
     * Must use with connection index: DB_HOST + '0', DB_HOST + '1'
     * Data type: string
     */
    Database["DB_ADDRESS"] = "db_host";
    /**
     * Username to log into database.
     * Must use with connection index: DB_USER + '0', DB_USER + '1'
     * Data type: string
     */
    Database["DB_USER"] = "db_user";
    /**
     * Password to log into database.
     * Must use with connection index: DB_PASSWORD + '0', DB_PASSWORD + '1'
     * Data type: string
     */
    Database["DB_PASSWORD"] = "db_pass";
    /**
     * Database name.
     * Must use with connection index: DB_NAME + '0', DB_NAME + '1'
     * Data type: string
     */
    Database["DB_NAME"] = "db_name";
    /**
     * Path to database file.
     * Must use with connection index: DB_FILE + '0', DB_FILE + '1'
     * Data type: string
     */
    Database["DB_FILE"] = "db_file";
    /**
     * Database connection string.
     * Must use with connection index: DB_CONN_STRING + '0', DB_CONN_STRING + '1'
     * Data type: string
     */
    Database["DB_CONN_STRING"] = "db_connStr";
})(Database = exports.Database || (exports.Database = {}));
//# sourceMappingURL=database.js.map