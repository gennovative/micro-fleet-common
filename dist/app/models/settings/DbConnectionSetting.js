"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const back_lib_common_constants_1 = require("back-lib-common-constants");
const SettingItem_1 = require("./SettingItem");
/**
 * Wraps an array of database connection settings.
 */
class DbConnectionSetting extends Array {
    constructor(opts) {
        super();
        this.push(SettingItem_1.SettingItem.translator.whole({
            name: back_lib_common_constants_1.DbSettingKeys.DB_ENGINE,
            dataType: SettingItem_1.SettingItemDataType.String,
            value: opts.engine
        }));
        if (opts.host) {
            this.push(SettingItem_1.SettingItem.translator.whole({
                name: back_lib_common_constants_1.DbSettingKeys.DB_HOST,
                dataType: SettingItem_1.SettingItemDataType.String,
                value: opts.host
            }));
            this.push(SettingItem_1.SettingItem.translator.whole({
                name: back_lib_common_constants_1.DbSettingKeys.DB_USER,
                dataType: SettingItem_1.SettingItemDataType.String,
                value: opts.username
            }));
            this.push(SettingItem_1.SettingItem.translator.whole({
                name: back_lib_common_constants_1.DbSettingKeys.DB_PASSWORD,
                dataType: SettingItem_1.SettingItemDataType.String,
                value: opts.password
            }));
            this.push(SettingItem_1.SettingItem.translator.whole({
                name: back_lib_common_constants_1.DbSettingKeys.DB_NAME,
                dataType: SettingItem_1.SettingItemDataType.String,
                value: opts.database
            }));
        }
        else if (opts.filePath) {
            this.push(SettingItem_1.SettingItem.translator.whole({
                name: back_lib_common_constants_1.DbSettingKeys.DB_FILE,
                dataType: SettingItem_1.SettingItemDataType.String,
                value: opts.filePath
            }));
        }
        else {
            this.push(SettingItem_1.SettingItem.translator.whole({
                name: back_lib_common_constants_1.DbSettingKeys.DB_CONN_STRING,
                dataType: SettingItem_1.SettingItemDataType.String,
                value: opts.connectionString
            }));
        }
    }
}
exports.DbConnectionSetting = DbConnectionSetting;

//# sourceMappingURL=DbConnectionSetting.js.map
