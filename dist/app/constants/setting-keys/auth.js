"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AuthSettingKeys;
(function (AuthSettingKeys) {
    /**
     * Secret key to encrypt auth tokens.
     * Data type: string
     */
    AuthSettingKeys["AUTH_SECRET"] = "auth_secret";
    /**
     * Issuer of auth tokens.
     * Data type: string
     */
    AuthSettingKeys["AUTH_ISSUER"] = "auth_issuer";
    /**
     * Access token expiration duration in seconds.
     * Data type: number
     */
    AuthSettingKeys["AUTH_EXPIRE_ACCESS"] = "auth_expire_access";
    /**
     * Refresh token expiration duration in seconds.
     * Data type: number
     */
    AuthSettingKeys["AUTH_EXPIRE_REFRESH"] = "auth_expire_refresh";
})(AuthSettingKeys = exports.AuthSettingKeys || (exports.AuthSettingKeys = {}));
//# sourceMappingURL=auth.js.map