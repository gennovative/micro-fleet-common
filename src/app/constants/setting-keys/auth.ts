export enum AuthSettingKeys {
    /**
     * Key to verify auth tokens.
     *
     * If signing algorithm is RS256, this is the PUBLIC key.
     * Otherwise the key for verify may also be the key for signing.
     *
     * Data type: string
     */
    AUTH_KEY_VERIFY = 'auth_key_verify',

    /**
     * Path to the file containing key to verify auth tokens.
     * The key must be stored as UTF-8 plain text.
     *
     * If signing algorithm is RS256, this is the PUBLIC key.
     * Otherwise the key for verify may also be the key for signing.
     *
     * Data type: string
     */
    AUTH_KEY_VERIFY_FILE = 'auth_key_verify_file',

    /**
     * Key to sign auth tokens.
     *
     * If signing algorithm is RS256, this is the PRIVATE key.
     * Otherwise the key for verify may also be the key for signing.
     *
     * Data type: string
     */
    AUTH_KEY_SIGN = 'auth_key_sign',

    /**
     * Path to the file containing key to sign auth tokens.
     * The key must be stored as UTF-8 plain text.
     *
     * If signing algorithm is RS256, this is the PRIVATE key.
     * Otherwise the key for verify may also be the key for signing.
     *
     * Data type: string
     */
    AUTH_KEY_SIGN_FILE = 'auth_key_signfile',

    /**
     * Issuer of auth tokens.
     * Data type: string
     */
    AUTH_ISSUER = 'auth_issuer',

    /**
     * Access token expiration duration in seconds.
     * Data type: number
     */
    AUTH_EXPIRE_ACCESS = 'auth_expire_access',

    /**
     * Refresh token expiration duration in seconds.
     * Data type: number
     */
    AUTH_EXPIRE_REFRESH = 'auth_expire_refresh',
}
