export enum AuthSettingKeys {
	/**
	 * Secret key to encrypt auth tokens.
	 * Data type: string
	 */
	AUTH_SECRET = 'auth_secret',

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