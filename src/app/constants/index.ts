import { DbClient } from './DbClient'
import { ServicePorts } from './ports'
import { ActionNames } from './names/actions'
import { ModuleNames } from './names/modules'
import { AuthSettingKeys } from './setting-keys/auth'
import { CacheSettingKeys } from './setting-keys/cache'
import { DbSettingKeys } from './setting-keys/database'
import { MbSettingKeys } from './setting-keys/message-broker'
import { RpcSettingKeys } from './setting-keys/rpc'
import { SvcSettingKeys } from './setting-keys/service'
import { WebSettingKeys } from './setting-keys/web'

export type Constants = {
    DbClient: typeof DbClient,
    ServicePorts: typeof ServicePorts,
    ActionNames: typeof ActionNames,
    ModuleNames: typeof ModuleNames,
    AuthSettingKeys: typeof AuthSettingKeys,
    CacheSettingKeys: typeof CacheSettingKeys,
    DbSettingKeys: typeof DbSettingKeys,
    MbSettingKeys: typeof MbSettingKeys,
    RpcSettingKeys: typeof RpcSettingKeys,
    SvcSettingKeys: typeof SvcSettingKeys,
    WebSettingKeys: typeof WebSettingKeys,
}

export const constants: Constants = {
    ActionNames,
    DbClient,
    ServicePorts,
    ModuleNames,
    AuthSettingKeys,
    CacheSettingKeys,
    DbSettingKeys,
    MbSettingKeys,
    RpcSettingKeys,
    SvcSettingKeys,
    WebSettingKeys,
}
