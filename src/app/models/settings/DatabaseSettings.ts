import { DbSettingKeys as S } from 'back-lib-common-constants';

import { SettingItem, SettingItemDataType } from './SettingItem';
import { DbConnectionSetting } from './DbConnectionSetting';

/**
 * Wraps an array of database settings.
 */
export class DatabaseSettings extends Array<SettingItem> {
	// private _conns: DbConnectionSettings[];
	private _countSetting: SettingItem;

	constructor(...items: DbConnectionSetting[]) {
		super();
		this._countSetting = SettingItem.translator.whole({
			name: S.DB_NUM_CONN,
			dataType: SettingItemDataType.String,
			value: '0'
		});

		this.push(this._countSetting);
		items.forEach(this.pushConnection.bind(this));
	}

	/**
	 * Gets number of connection settings.
	 */
	public get total(): number {
		return parseInt(this._countSetting.value);
	}

	/**
	 * Adds a database connection setting.
	 */
	public pushConnection(conn: DbConnectionSetting) {
		let total = parseInt(this._countSetting.value);
		conn.forEach((c: any, i) => {
			c.name += total; // 'DB_HOST_' => 'DB_HOST_1'
			this.push(c);
		});

		let setting: any = this._countSetting;
		setting.value = (total + 1) + '';
	}
}