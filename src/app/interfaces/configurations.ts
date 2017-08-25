
/**
 * Stores a database connection detail.
 */
export interface IConnectionDetail {
	/**
	 * Database driver name, should use constants in class DbClient. 
	 * Eg: DbClient.SQLITE3, DbClient.POSTGRESQL, ...
	 */
	clientName: string;

	/**
	 * Connection string for specified `clientName`.
	 */
	connectionString?: string;

	/**
	 * Absolute path to database file name.
	 */
	filePath?: string;

	host?: {
		/**
		 * IP Address or Host name.
		 */
		address: string,

		/**
		 * Username to login database.
		 */
		user: string,

		/**
		 * Password to login database.
		 */
		password: string,

		/**
		 * Database name.
		 */
		database: string
	};
}

export interface IConfigurationProvider extends IServiceAddOn {
	/**
	 * Turns on or off remote settings fetching.
	 */
	enableRemote: boolean;

	/**
	 * Attempts to get settings from cached Configuration Service, environmetal variable,
	 * and `appconfig.json` file, respectedly.
	 */
	get(key: string): number & boolean & string;

	/**
	 * Attempts to fetch settings from remote Configuration Service.
	 */
	fetch(): Promise<boolean>;

	/**
	 * Invokes everytime new settings are updated.
	 * The callback receives an array of changed setting keys.
	 */
	onUpdate(listener: (changedKeys: string[]) => void): void;
}