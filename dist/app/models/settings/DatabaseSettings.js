"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const back_lib_common_constants_1 = require("back-lib-common-constants");
const SettingItem_1 = require("./SettingItem");
/**
 * Wraps an array of database settings.
 */
class DatabaseSettings extends Array {
    constructor(...items) {
        super();
        this._countSetting = SettingItem_1.SettingItem.translator.whole({
            name: back_lib_common_constants_1.DbSettingKeys.DB_NUM_CONN,
            dataType: SettingItem_1.SettingItemDataType.String,
            value: '0'
        });
        this.push(this._countSetting);
        items.forEach(this.pushConnection.bind(this));
    }
    /**
     * Gets number of connection settings.
     */
    get total() {
        return parseInt(this._countSetting.value);
    }
    /**
     * Adds a database connection setting.
     */
    pushConnection(conn) {
        let total = parseInt(this._countSetting.value);
        conn.forEach((c, i) => {
            c.name += total; // 'DB_HOST_' => 'DB_HOST_1'
            this.push(c);
        });
        let setting = this._countSetting;
        setting.value = (total + 1) + '';
    }
}
exports.DatabaseSettings = DatabaseSettings;

//# sourceMappingURL=DatabaseSettings.js.map
