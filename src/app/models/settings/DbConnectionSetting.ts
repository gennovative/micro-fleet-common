import { DbSettingKeys as S, DbClient } from 'back-lib-common-constants';
import { Guard } from 'back-lib-common-util';

import { SettingItem, SettingItemDataType } from './SettingItem';


export type DbConnectionSettingConstructor = {
	engine: DbClient,
	host?: string,
	username?: string,
	password?: string,
	database?: string,
	filePath?: string,
	connectionString?: string
};

/**
 * Wraps an array of database connection settings.
 */
export class DbConnectionSetting extends Array<SettingItem> {

	constructor(opts: DbConnectionSettingConstructor) {
		super();
		this.push(SettingItem.translator.whole({
				name: S.DB_ENGINE,
				dataType: SettingItemDataType.String,
				value: opts.engine
			}));

		if (opts.host) {
			this.push(SettingItem.translator.whole({
					name: S.DB_HOST,
					dataType: SettingItemDataType.String,
					value: opts.host
				}));
			this.push(SettingItem.translator.whole({
					name: S.DB_USER,
					dataType: SettingItemDataType.String,
					value: opts.username
				}));
			this.push(SettingItem.translator.whole({
					name: S.DB_PASSWORD,
					dataType: SettingItemDataType.String,
					value: opts.password
			}));
			this.push(SettingItem.translator.whole({
					name: S.DB_NAME,
					dataType: SettingItemDataType.String,
					value: opts.database
			}));
		} else if (opts.filePath) {
			this.push(SettingItem.translator.whole({
					name: S.DB_FILE,
					dataType: SettingItemDataType.String,
					value: opts.filePath
				}));
		} else {
			this.push(SettingItem.translator.whole(
				{
					name: S.DB_CONN_STRING,
					dataType: SettingItemDataType.String,
					value: opts.connectionString
				}));
		}
	}
}