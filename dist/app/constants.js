"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DbClient_1 = require("./setting-keys/DbClient");
const auth_1 = require("./setting-keys/auth");
const cache_1 = require("./setting-keys/cache");
const database_1 = require("./setting-keys/database");
const message_broker_1 = require("./setting-keys/message-broker");
const rpc_1 = require("./setting-keys/rpc");
const service_1 = require("./setting-keys/service");
const web_1 = require("./setting-keys/web");
exports.constants = {
    DbClient: DbClient_1.DbClient,
    AuthSettingKeys: auth_1.Auth,
    CacheSettingKeys: cache_1.Cache,
    DbSettingKeys: database_1.Database,
    MbSettingKeys: message_broker_1.MessageBroker,
    RpcSettingKeys: rpc_1.RPC,
    SvcSettingKeys: service_1.Service,
    WebSettingKeys: web_1.Web,
};
//# sourceMappingURL=constants.js.map