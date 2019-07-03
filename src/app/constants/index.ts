import { DbClient } from './DbClient'
import { AuthSettingKeys } from './setting-keys/auth'
import { CacheSettingKeys } from './setting-keys/cache'
import { DbSettingKeys } from './setting-keys/database'
import { MbSettingKeys } from './setting-keys/message-broker'
import { RpcSettingKeys } from './setting-keys/rpc'
import { SvcSettingKeys } from './setting-keys/service'
import { WebSettingKeys } from './setting-keys/web'

export type Constants = {
    DbClient: typeof DbClient,
    AuthSettingKeys: typeof AuthSettingKeys,
    CacheSettingKeys: typeof CacheSettingKeys,
    DbSettingKeys: typeof DbSettingKeys,
    MbSettingKeys: typeof MbSettingKeys,
    RpcSettingKeys: typeof RpcSettingKeys,
    SvcSettingKeys: typeof SvcSettingKeys,
    WebSettingKeys: typeof WebSettingKeys,
}

export const constants: Constants = {
    DbClient,
    AuthSettingKeys,
    CacheSettingKeys,
    DbSettingKeys,
    MbSettingKeys,
    RpcSettingKeys,
    SvcSettingKeys,
    WebSettingKeys,
}
