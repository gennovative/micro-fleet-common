import { DbClient } from './setting-keys/DbClient'
import { Auth } from './setting-keys/auth'
import { Cache } from './setting-keys/cache'
import { Database } from './setting-keys/database'
import { IdGenerator } from './setting-keys/id-gen'
import { MessageBroker } from './setting-keys/message-broker'
import { RPC } from './setting-keys/rpc'
import { Service } from './setting-keys/service'
import { Web } from './setting-keys/web'

export type Constants = {
    DbClient: typeof DbClient,
    Auth: typeof Auth,
    Cache: typeof Cache,
    Database: typeof Database,
    IdGenerator: typeof IdGenerator,
    MessageBroker: typeof MessageBroker,
    RPC: typeof RPC,
    Service: typeof Service,
    Web: typeof Web,
}

export const constants: Constants = {
    DbClient,
    Auth,
    Cache,
    Database,
    IdGenerator,
    MessageBroker,
    RPC,
    Service,
    Web,
}
