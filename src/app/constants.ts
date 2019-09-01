import { DbClient } from './setting-keys/DbClient'
import { Auth } from './setting-keys/auth'
import { Cache } from './setting-keys/cache'
import { Database } from './setting-keys/database'
import { MessageBroker } from './setting-keys/message-broker'
import { RPC } from './setting-keys/rpc'
import { Service } from './setting-keys/service'
import { Web } from './setting-keys/web'

export type Constants = {
    DbClient: typeof DbClient,
    AuthSettingKeys: typeof Auth,
    CacheSettingKeys: typeof Cache,
    DbSettingKeys: typeof Database,
    MbSettingKeys: typeof MessageBroker,
    RpcSettingKeys: typeof RPC,
    SvcSettingKeys: typeof Service,
    WebSettingKeys: typeof Web,
}

export const constants: Constants = {
    DbClient,
    AuthSettingKeys: Auth,
    CacheSettingKeys: Cache,
    DbSettingKeys: Database,
    MbSettingKeys: MessageBroker,
    RpcSettingKeys: RPC,
    SvcSettingKeys: Service,
    WebSettingKeys: Web,
}
