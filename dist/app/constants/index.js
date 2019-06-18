"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DbClient_1 = require("./DbClient");
const ports_1 = require("./ports");
const auth_1 = require("./setting-keys/auth");
const cache_1 = require("./setting-keys/cache");
const database_1 = require("./setting-keys/database");
const message_broker_1 = require("./setting-keys/message-broker");
const rpc_1 = require("./setting-keys/rpc");
const service_1 = require("./setting-keys/service");
const web_1 = require("./setting-keys/web");
exports.constants = {
    DbClient: DbClient_1.DbClient,
    ServicePorts: ports_1.ServicePorts,
    AuthSettingKeys: auth_1.AuthSettingKeys,
    CacheSettingKeys: cache_1.CacheSettingKeys,
    DbSettingKeys: database_1.DbSettingKeys,
    MbSettingKeys: message_broker_1.MbSettingKeys,
    RpcSettingKeys: rpc_1.RpcSettingKeys,
    SvcSettingKeys: service_1.SvcSettingKeys,
    WebSettingKeys: web_1.WebSettingKeys,
};
//# sourceMappingURL=index.js.map