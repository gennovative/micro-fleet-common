"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Auth;
(function (Auth) {
    /**
     * Signature algorithm. Could be one of these values :
     * - HS256:    HMAC using SHA-256 hash algorithm (default)
     * - HS384:    HMAC using SHA-384 hash algorithm
     * - HS512:    HMAC using SHA-512 hash algorithm
     * - RS256:    RSASSA using SHA-256 hash algorithm
     * - RS384:    RSASSA using SHA-384 hash algorithm
     * - RS512:    RSASSA using SHA-512 hash algorithm
     * - ES256:    ECDSA using P-256 curve and SHA-256 hash algorithm
     * - ES384:    ECDSA using P-384 curve and SHA-384 hash algorithm
     * - ES512:    ECDSA using P-521 curve and SHA-512 hash algorithm
     * - none:     No digital signature or MAC value included
     *
     * Data type: string
     */
    Auth["AUTH_SIGN_ALGO"] = "auth_sign_algo";
    /**
     * Key to verify auth tokens.
     *
     * If signing algorithm is RSxxx, this is the PUBLIC key.
     * Otherwise this key is used for both signing and verifing.
     *
     * Data type: string
     */
    Auth["AUTH_KEY_VERIFY"] = "auth_key_verify";
    /**
     * Path to the file containing key to verify auth tokens.
     * The key must be stored as UTF-8 plain text.
     *
     * If signing algorithm is RSxxx, this is the PUBLIC key.
     * Otherwise this key is used for both signing and verifing.
     *
     * Data type: string
     */
    Auth["AUTH_KEY_VERIFY_FILE"] = "auth_key_verify_file";
    /**
     * This is the PRIVATE key to sign auth tokens.
     * It is only used when signing algorithm is RSxxx.
     * Otherwise `AUTH_KEY_VERIFY` is used for signing.
     *
     * Data type: string
     */
    Auth["AUTH_KEY_SIGN"] = "auth_key_sign";
    /**
     * Path to the file containing key to sign auth tokens.
     * The key must be stored as UTF-8 plain text.
     * It is only used when signing algorithm is RSxxx.
     * Otherwise `AUTH_KEY_VERIFY` is used for signing.
     *
     * Data type: string
     */
    Auth["AUTH_KEY_SIGN_FILE"] = "auth_key_signfile";
    /**
     * Issuer of auth tokens.
     * Data type: string
     */
    Auth["AUTH_ISSUER"] = "auth_issuer";
    /**
     * Access token expiration duration in seconds.
     * Data type: number
     */
    Auth["AUTH_EXPIRE_ACCESS"] = "auth_expire_access";
    /**
     * Refresh token expiration duration in seconds.
     * Data type: number
     */
    Auth["AUTH_EXPIRE_REFRESH"] = "auth_expire_refresh";
})(Auth = exports.Auth || (exports.Auth = {}));
//# sourceMappingURL=auth.js.map