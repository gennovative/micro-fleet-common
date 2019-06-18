"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CacheSettingKeys;
(function (CacheSettingKeys) {
    /**
     * Number of cache servers in cluster.
     * Data type: number
     */
    CacheSettingKeys["CACHE_NUM_CONN"] = "cache_num_conn";
    /**
     * A single string or an array of IP or host name of cache service.
     * Data type: string | string[]
     */
    CacheSettingKeys["CACHE_HOST"] = "cache_host";
    /**
     * A single value or an array of port number.
     * Data type: number | number[]
     */
    CacheSettingKeys["CACHE_PORT"] = "cache_port";
})(CacheSettingKeys = exports.CacheSettingKeys || (exports.CacheSettingKeys = {}));
//# sourceMappingURL=cache.js.map