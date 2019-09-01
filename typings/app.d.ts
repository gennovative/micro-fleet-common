/// <reference path="./global.d.ts" />
declare module '@micro-fleet/common/dist/app/setting-keys/DbClient' {
	/**
	 * Db driver names.
	 */
	export enum DbClient {
	    /**
	     * Microsoft SQL Server
	     */
	    MSSQL = "mssql",
	    /**
	     * MySQL
	     */
	    MYSQL = "mysql",
	    /**
	     * PostgreSQL
	     */
	    POSTGRESQL = "pg",
	    /**
	     * SQLite 3
	     */
	    SQLITE3 = "sqlite3"
	}

}
declare module '@micro-fleet/common/dist/app/setting-keys/auth' {
	export enum Auth {
	    /**
	     * Key to verify auth tokens.
	     *
	     * If signing algorithm is RS256, this is the PUBLIC key.
	     * Otherwise the key for verify may also be the key for signing.
	     *
	     * Data type: string
	     */
	    AUTH_KEY_VERIFY = "auth_key_verify",
	    /**
	     * Path to the file containing key to verify auth tokens.
	     * The key must be stored as UTF-8 plain text.
	     *
	     * If signing algorithm is RS256, this is the PUBLIC key.
	     * Otherwise the key for verify may also be the key for signing.
	     *
	     * Data type: string
	     */
	    AUTH_KEY_VERIFY_FILE = "auth_key_verify_file",
	    /**
	     * Key to sign auth tokens.
	     *
	     * If signing algorithm is RS256, this is the PRIVATE key.
	     * Otherwise the key for verify may also be the key for signing.
	     *
	     * Data type: string
	     */
	    AUTH_KEY_SIGN = "auth_key_sign",
	    /**
	     * Path to the file containing key to sign auth tokens.
	     * The key must be stored as UTF-8 plain text.
	     *
	     * If signing algorithm is RS256, this is the PRIVATE key.
	     * Otherwise the key for verify may also be the key for signing.
	     *
	     * Data type: string
	     */
	    AUTH_KEY_SIGN_FILE = "auth_key_signfile",
	    /**
	     * Issuer of auth tokens.
	     * Data type: string
	     */
	    AUTH_ISSUER = "auth_issuer",
	    /**
	     * Access token expiration duration in seconds.
	     * Data type: number
	     */
	    AUTH_EXPIRE_ACCESS = "auth_expire_access",
	    /**
	     * Refresh token expiration duration in seconds.
	     * Data type: number
	     */
	    AUTH_EXPIRE_REFRESH = "auth_expire_refresh"
	}

}
declare module '@micro-fleet/common/dist/app/setting-keys/cache' {
	export enum Cache {
	    /**
	     * Number of cache servers in cluster.
	     * Data type: number
	     */
	    CACHE_NUM_CONN = "cache_num_conn",
	    /**
	     * A single string or an array of IP or host name of cache service.
	     * Data type: string | string[]
	     */
	    CACHE_HOST = "cache_host",
	    /**
	     * A single value or an array of port number.
	     * Data type: number | number[]
	     */
	    CACHE_PORT = "cache_port"
	}

}
declare module '@micro-fleet/common/dist/app/setting-keys/database' {
	export enum Database {
	    /**
	     * Name of database engine.
	     * Data type: enum `DbClient` in `back-lib-persistence`
	     */
	    DB_ENGINE = "db_engine",
	    /**
	     * IP or host name of database.
	     * Must use with connection index: DB_HOST + '0', DB_HOST + '1'
	     * Data type: string
	     */
	    DB_ADDRESS = "db_host",
	    /**
	     * Username to log into database.
	     * Must use with connection index: DB_USER + '0', DB_USER + '1'
	     * Data type: string
	     */
	    DB_USER = "db_user",
	    /**
	     * Password to log into database.
	     * Must use with connection index: DB_PASSWORD + '0', DB_PASSWORD + '1'
	     * Data type: string
	     */
	    DB_PASSWORD = "db_pass",
	    /**
	     * Database name.
	     * Must use with connection index: DB_NAME + '0', DB_NAME + '1'
	     * Data type: string
	     */
	    DB_NAME = "db_name",
	    /**
	     * Path to database file.
	     * Must use with connection index: DB_FILE + '0', DB_FILE + '1'
	     * Data type: string
	     */
	    DB_FILE = "db_file",
	    /**
	     * Database connection string.
	     * Must use with connection index: DB_CONN_STRING + '0', DB_CONN_STRING + '1'
	     * Data type: string
	     */
	    DB_CONN_STRING = "db_connStr"
	}

}
declare module '@micro-fleet/common/dist/app/setting-keys/message-broker' {
	export enum MessageBroker {
	    /**
	     * IP or host name of message broker.
	     * Data type: string
	     */
	    MSG_BROKER_HOST = "msgBroker_host",
	    /**
	     * Exchange name on message broker.
	     * Data type: string
	     */
	    MSG_BROKER_EXCHANGE = "msgBroker_exchange",
	    /**
	     * Default queue name for RPC handler to connect to.
	     * Data type: string
	     */
	    MSG_BROKER_HANDLER_QUEUE = "msgBroker_handler_queue",
	    /**
	     * Number of milliseconds to delay before reconnect to message broker.
	     * Data type: number
	     */
	    MSG_BROKER_RECONN_TIMEOUT = "msgBroker_reconnectTimeout",
	    /**
	     * Username to log into message broker.
	     * Data type: string
	     */
	    MSG_BROKER_USERNAME = "msgBroker_username",
	    /**
	     * Password to log into message broker.
	     * Data type: string
	     */
	    MSG_BROKER_PASSWORD = "msgBroker_password",
	    /**
	     * Number of milliseconds that messages live in queue.
	     * Data type: number
	     */
	    MSG_BROKER_MSG_EXPIRE = "msgBroker_msg_expr"
	}

}
declare module '@micro-fleet/common/dist/app/setting-keys/rpc' {
	export enum RPC {
	    /**
	     * Number of milliseconds after which RPC caller stops waiting for response.
	     * Data type: number
	     */
	    RPC_CALLER_TIMEOUT = "rpc_caller_timeout",
	    /**
	     * Http port to which HTTP RPC handler listens.
	     * Data type: number
	     */
	    RPC_HANDLER_PORT = "rpc_handler_port"
	}

}
declare module '@micro-fleet/common/dist/app/setting-keys/service' {
	export enum Service {
	    /**
	     * Number of milliseconds to wait before actually disposing addons.
	     * Date type: number
	     */
	    DEADLETTER_TIMEOUT = "svc_deadletter_timeout",
	    /**
	     * Number of milliseconds to wait before actually exiting the process.
	     * Date type: number
	     */
	    STOP_TIMEOUT = "svc_stop_timeout",
	    /**
	     * Array of addresses to fetch configuration.
	     * Data type: string[]
	     */
	    CONFIG_SERVICE_ADDRESSES = "svc_config_service_addresses",
	    /**
	     * Number of milliseconds between refetchings.
	     * Date type: number
	     */
	    CONFIG_REFETCH_INTERVAL = "svc_config_refetch_interval",
	    /**
	     * Service URL-safe name.
	     * Data type: string
	     */
	    SERVICE_SLUG = "svc_slug"
	}

}
declare module '@micro-fleet/common/dist/app/setting-keys/web' {
	export enum Web {
	    /**
	     * Configuration for Cross-Origin Resource Sharing.
	     * Type: string | string[]
	     */
	    WEB_CORS = "web_cors",
	    /**
	     * Whether to start HTTPS server.
	     * Type: boolean
	     */
	    WEB_SSL_ENABLED = "web_ssl_enabled",
	    /**
	     * Whether to redirect all HTTP request to HTTPS endpoints.
	     * Type: boolean
	     */
	    WEB_SSL_ONLY = "web_ssl_only",
	    /**
	     * Path to SSL key file.
	     * Type: string
	     */
	    WEB_SSL_KEY_FILE = "web_ssl_key_file",
	    /**
	     * Path to SSL cert file.
	     * Type: string
	     */
	    WEB_SSL_CERT_FILE = "web_ssl_cert_file",
	    /**
	     * HTTPS port listened by webserver.
	     * Type: number
	     */
	    WEB_SSL_PORT = "web_ssl_port",
	    /**
	     * HTTP port listened by webserver.
	     * Type: number
	     */
	    WEB_PORT = "web_port",
	    /**
	     * Prefix to route url.
	     * Type: string
	     */
	    WEB_URL_PREFIX = "web_url_prefix"
	}

}
declare module '@micro-fleet/common/dist/app/constants' {
	import { DbClient } from '@micro-fleet/common/dist/app/setting-keys/DbClient';
	import { Auth } from '@micro-fleet/common/dist/app/setting-keys/auth';
	import { Cache } from '@micro-fleet/common/dist/app/setting-keys/cache';
	import { Database } from '@micro-fleet/common/dist/app/setting-keys/database';
	import { MessageBroker } from '@micro-fleet/common/dist/app/setting-keys/message-broker';
	import { RPC } from '@micro-fleet/common/dist/app/setting-keys/rpc';
	import { Service } from '@micro-fleet/common/dist/app/setting-keys/service';
	import { Web } from '@micro-fleet/common/dist/app/setting-keys/web';
	export type Constants = {
	    DbClient: typeof DbClient;
	    AuthSettingKeys: typeof Auth;
	    CacheSettingKeys: typeof Cache;
	    DbSettingKeys: typeof Database;
	    MbSettingKeys: typeof MessageBroker;
	    RpcSettingKeys: typeof RPC;
	    SvcSettingKeys: typeof Service;
	    WebSettingKeys: typeof Web;
	};
	export const constants: Constants;

}
declare module '@micro-fleet/common/dist/app/interfaces/misc' {
	/**
	 * A data type representing Javascript primitive types.
	 */
	export type PrimitiveType = string | number | boolean;
	/**
	 * A data type representing a class.
	 */
	export type Newable<T = any> = (new (...args: any[]) => T);
	/**
	 * If an object wants to be initialized when microservice proccess starts, it must
	 * implements this interface to be able to add to add-on list.
	 */
	export interface IServiceAddOn {
	    /**
	     * Gets add-on name.
	     */
	    readonly name: string;
	    /**
	     * Initializes this add-on.
	     * @returns A promise that resolves `true` if success, rejects if otherwise.
	     */
	    init(): Promise<void>;
	    /**
	     * Invoked before `dispose` is called.
	     */
	    deadLetter(): Promise<void>;
	    /**
	     * Stops this add-on and cleans all resources.
	     */
	    dispose(): Promise<void>;
	}
	export interface ISerializable {
	    toJSON(): object;
	}

}
declare module '@micro-fleet/common/dist/app/models/Exceptions' {
	export class Exception implements Error {
	    readonly message: string;
	    readonly isCritical: boolean;
	    stack: string;
	    name: string;
	    details: any;
	    /**
	     *
	     * @param message
	     * @param isCritical
	     * @param exceptionClass {class} The exception class to exclude from stacktrace.
	     */
	    constructor(message?: string, isCritical?: boolean, exceptionClass?: Function);
	    toString(): string;
	}
	/**
	 * Represents a serious problem that may cause the system in unstable state
	 * and need restarting.
	 */
	export class CriticalException extends Exception {
	    constructor(message?: string);
	}
	/**
	 * Represents an acceptable problem that can be handled
	 * and the system does not need restarting.
	 */
	export class MinorException extends Exception {
	    constructor(message?: string);
	}
	/**
	 * Represents an error where the provided argument of a function or constructor
	 * is not as expected.
	 */
	export class InvalidArgumentException extends Exception {
	    constructor(argName: string, message?: string);
	}
	/**
	 * Represents an error when an unimplemented method is called.
	 */
	export class NotImplementedException extends Exception {
	    constructor(message?: string);
	}
	/**
	 * Represents an error whose origin is from another system.
	 */
	export class InternalErrorException extends Exception {
	    constructor(message?: string);
	}

}
declare module '@micro-fleet/common/dist/app/utils/Guard' {
	export class Guard {
	    /**
	     * Makes sure the specified `target` is not null or undefined.
	     * @param name {string} Name to include in error message if assertion fails.
	     * @param target {any} Argument to check.
	     * @param message {string} Optional error message.
	     * @throws {InvalidArgumentException} If assertion fails.
	     */
	    static assertArgDefined(name: string, target: any, message?: string): void;
	    /**
	     * Makes sure the specified `target` is an object, array, or string which is not null or undefined.
	     * If `target` is a string or array, it must have `length` greater than 0,
	     * If it is an object, it must have at least one property.
	     * @param name {string} Name to include in error message if assertion fails.
	     * @param target {any} Argument to check.
	     * @param message {string} Optional error message.
	     * @throws {InvalidArgumentException} If assertion fails.
	     */
	    static assertArgNotEmpty(name: string, target: any, message?: string): void;
	    /**
	     * Makes sure the specified `target` is a function.
	     * @param name {string} Name to include in error message if assertion fails.
	     * @param target {any} Argument to check.
	     * @param message {string} Optional error message.
	     * @throws {InvalidArgumentException} If assertion fails.
	     */
	    static assertArgFunction(name: string, target: any, message?: string): void;
	    /**
	     * Makes sure the specified `target` matches Regular Expression `rule`.
	     * @param name {string} Name to include in error message if assertion fails.
	     * @param target {any} Argument to check.
	     * @param message {string} Optional error message.
	     * @throws {InvalidArgumentException} If assertion fails.
	     */
	    static assertArgMatch(name: string, rule: RegExp, target: string, message?: string): void;
	    /**
	     * Makes sure the specified `target` is not null or undefined.
	     * @param target {any} Argument to check.
	     * @param message {string} Optional error message.
	     * @param isCritical {boolean} If true, throws CriticalException. Otherwise, throws MinorException when assertion fails.
	     * @throws {CriticalException} If assertion fails and `isCritical` is true.
	     * @throws {MinorException} If assertion fails and `isCritical` is false.
	     */
	    static assertIsDefined(target: any, message?: string, isCritical?: boolean): void;
	    /**
	     * Makes sure the specified `target` is an object, array, or string which is not null or undefined.
	     * If `target` is a string or array, it must have `length` greater than 0,
	     * If it is an object, it must have at least one property.
	     * @param target {any} Argument to check.
	     * @param message {string} Optional error message.
	     * @param isCritical {boolean} If true, throws CriticalException. Otherwise, throws MinorException when assertion fails.
	     * @throws {CriticalException} If assertion fails and `isCritical` is true.
	     * @throws {MinorException} If assertion fails and `isCritical` is false.
	     */
	    static assertIsNotEmpty(target: any, message?: string, isCritical?: boolean): void;
	    /**
	     * Makes sure the specified `target` is a function.
	     * @param target {any} Argument to check.
	     * @param message {string} Optional error message.
	     * @param isCritical {boolean} If true, throws CriticalException. Otherwise, throws MinorException when assertion fails.
	     * @throws {CriticalException} If assertion fails and `isCritical` is true.
	     * @throws {MinorException} If assertion fails and `isCritical` is false.
	     */
	    static assertIsFunction(target: any, message?: string, isCritical?: boolean): void;
	    /**
	     * Makes sure the specified `target` matches Regular Expression `rule`.
	     * @param target {any} Argument to check.
	     * @param message {string} Optional error message.
	     * @param isCritical {boolean} If true, throws CriticalException. Otherwise, throws MinorException when assertion fails.
	     * @throws {CriticalException} If assertion fails and `isCritical` is true.
	     * @throws {MinorException} If assertion fails and `isCritical` is false.
	     */
	    static assertIsMatch(rule: RegExp, target: string, message?: string, isCritical?: boolean): void;
	    /**
	     * Makes sure the specified `target` is considered "truthy" based on JavaScript rule.
	     * @param target {any} Argument to check.
	     * @param message {string} Error message.
	     * @param isCritical {boolean} If true, throws CriticalException. Otherwise, throws MinorException when assertion fails.
	     * @throws {CriticalException} If assertion fails and `isCritical` is true.
	     * @throws {MinorException} If assertion fails and `isCritical` is false.
	     */
	    static assertIsTruthy(target: any, message: string, isCritical?: boolean): void;
	    /**
	     * Makes sure the specified `target` is considered "falsey" based on JavaScript rule.
	     * @param target {any} Argument to check.
	     * @param message {string} Error message.
	     * @throws {InvalidArgumentException} If assertion fails.
	     */
	    static assertIsFalsey(target: any, message: string, isCritical?: boolean): void;
	}

}
declare module '@micro-fleet/common/dist/app/di/DependencyContainer' {
	import { injectable, inject, decorate, interfaces, unmanaged, optional } from 'inversify';
	import { Newable } from '@micro-fleet/common/dist/app/interfaces/misc';
	export class BindingScope<T> {
	    	    constructor(_binding: interfaces.BindingInWhenOnSyntax<T>);
	    asSingleton(): void;
	    asTransient(): void;
	}
	export { injectable, inject, decorate, unmanaged, optional };
	export interface IDependencyContainer {
	    /**
	     * Registers `constructor` as resolvable with key `identifier`.
	     * @param {string | symbol} identifier - The key used to resolve this dependency.
	     * @param {INewable<T>} constructor - A class that will be resolved with `identifier`.
	     *
	     * @return {BindingScope} - A BindingScope instance that allows settings dependency as singleton or transient.
	     */
	    bind<TInterface>(identifier: string | symbol, constructor: Newable<TInterface>): BindingScope<TInterface>;
	    /**
	     * Registers a constant value with key `identifier`.
	     * @param {string | symbol} identifier - The key used to resolve this dependency.
	     * @param {T} value - The constant value to store.
	     */
	    bindConstant<T>(identifier: string | symbol, value: T): void;
	    /**
	     * Gets rid of all registered dependencies.
	     */
	    dispose(): void;
	    /**
	     * Checks if an identifier is bound with any dependency.
	     */
	    isBound(identifier: string | symbol): boolean;
	    /**
	     * Retrieves an instance of dependency with all its own dependencies resolved.
	     * @param {string | Symbol} - The key that was used to register before.
	     *
	     * @return {T} - An instance of registered type, or null if that type was not registered.
	     */
	    resolve<T>(identifier: string | symbol): T;
	    /**
	     * Gets rid of the dependency related to this identifier.
	     */
	    unbind(identifier: string | symbol): void;
	}
	export class DependencyContainer {
	    	    constructor();
	    /**
	     * @see IDependencyContainer.bind
	     */
	    bind<TInterface>(identifier: string | symbol, constructor: Newable<TInterface>): BindingScope<TInterface>;
	    /**
	     * @see IDependencyContainer.bindConstant
	     */
	    bindConstant<T>(identifier: string | symbol, value: T): void;
	    /**
	     * @see IDependencyContainer.dispose
	     */
	    dispose(): void;
	    /**
	     * @see IDependencyContainer.isBound
	     */
	    isBound(identifier: string | symbol): boolean;
	    /**
	     * @see IDependencyContainer.resolve
	     */
	    resolve<T>(identifier: string | symbol): T;
	    /**
	     * @see IDependencyContainer.unbind
	     */
	    unbind(identifier: string | symbol): void;
	    	    	}

}
declare module '@micro-fleet/common/dist/app/di/ServiceContext' {
	import { IDependencyContainer } from '@micro-fleet/common/dist/app/di/DependencyContainer';
	/**
	 * Serves as a global variables container.
	 */
	export const serviceContext: {
	    /**
	     * Gets dependency container.
	     */
	    readonly dependencyContainer: IDependencyContainer;
	    /**
	     * Sets dependency container. Must be set before add-ons initialization phase.
	     */
	    setDependencyContainer(container: IDependencyContainer): void;
	};

}
declare module '@micro-fleet/common/dist/app/di/HandlerContainer' {
	import { IDependencyContainer } from '@micro-fleet/common/dist/app/di/DependencyContainer';
	export type ActionFactory = (obj: any, action: string) => Function;
	export type HandlerDetails = {
	    dependencyIdentifier: string;
	    actionFactory?: ActionFactory;
	};
	export class HandlerContainer {
	    	    static readonly instance: HandlerContainer;
	    	    	    readonly dependencyContainer: IDependencyContainer;
	    /**
	     * Removes all registered handlers
	     */
	    clear(): void;
	    /**
	     * Binds an action or some actions to a `dependencyIdentifier`, which is resolved to an object instance.
	     * Returns a/some proxy function(s) which when called, will delegates to the actual resolved function.
	     *
	     * @param {string | string[]} actions Function name of the resolved object.
	     * @param {string} dependencyIdentifier Key to look up and resolve from dependency container.
	     * @param {ActionFactory} actionFactory A function that use `actions` name to produce the actual function to be executed.
	     *      If factory returns falsy value, the function is resolved from specified action name.
	     *         Note: No need to bind returned function to any context, as it is done internally.
	     * @param {number} paramCount Number of expected parameters (aka Function.length) of the returned proxy function.
	     *         In some cases, Function.length is important, eg: Express error handler middleware expects Function.length == 4.
	     */
	    register(actions: string | string[], dependencyIdentifier: string, actionFactory?: ActionFactory, paramCount?: number): Function | Function[];
	    /**
	     * Looks up and returns a function that was registered to bind with `action`.
	     * @param action Key to look up.
	     *
	     * @param {string} dependencyIdentifier Key to look up and resolve from dependency container.
	     */
	    resolve(action: string, dependencyIdentifier: string): Function;
	    	}

}
declare module '@micro-fleet/common/dist/app/di/lazyInject' {
	/**
	 * Injects value to the decorated property.
	 * Used to decorate properties of a class that's cannot be resolved by dependency container.
	 */
	export function lazyInject(depIdentifier: symbol | string): Function;

}
declare module '@micro-fleet/common/dist/app/di/Types' {
	export class Types {
	    static readonly CONFIG_PROVIDER = "common.IConfigurationProvider";
	    static readonly DEPENDENCY_CONTAINER = "common.IDependencyContainer";
	}

}
declare module '@micro-fleet/common/dist/app/interfaces/automapper' {
	/**
	 * Interface for returning an object with available 'sub' functions
	 * to enable method chaining (e.g. automapper.createMap().forMember().forMember() ...)
	 */
	export interface ICreateMapFluentFunctions {
	    /**
	     * Customize configuration for an individual destination member.
	     * @param sourceProperty The destination member property name.
	     * @param valueOrFunction The value or function to use for this individual member.
	     * @returns {IAutoMapperCreateMapChainingFunctions}
	     */
	    forMember: (sourceProperty: string, valueOrFunction: any | ((opts: IMemberConfigurationOptions) => any) | ((opts: IMemberConfigurationOptions, cb: IMemberCallback) => void)) => ICreateMapFluentFunctions;
	    /**
	     * Customize configuration for an individual source member.
	     * @param sourceProperty The source member property name.
	     * @param sourceMemberConfigFunction The function to use for this individual member.
	     * @returns {IAutoMapperCreateMapChainingFunctions}
	     */
	    forSourceMember: (sourceProperty: string, sourceMemberConfigFunction: ((opts: ISourceMemberConfigurationOptions) => any) | ((opts: ISourceMemberConfigurationOptions, cb: IMemberCallback) => void)) => ICreateMapFluentFunctions;
	    /**
	     * Customize configuration for all destination members.
	     * @param func The function to use for this individual member.
	     * @returns {IAutoMapperCreateMapChainingFunctions}
	     */
	    forAllMembers: (func: (destinationObject: any, destinationPropertyName: string, value: any) => void) => ICreateMapFluentFunctions;
	    /**
	     * Ignore all members not specified explicitly.
	     */
	    ignoreAllNonExisting: () => ICreateMapFluentFunctions;
	    /**
	     * Skip normal member mapping and convert using a custom type converter (instantiated during mapping).
	     * @param typeConverterClassOrFunction The converter class or function to use when converting.
	     */
	    convertUsing: (typeConverterClassOrFunction: ((resolutionContext: IResolutionContext) => any) | ((resolutionContext: IResolutionContext, callback: IMapCallback) => void) | ITypeConverter | (new () => ITypeConverter)) => void;
	    /**
	     * Specify to which class type AutoMapper should convert. When specified,
	     * AutoMapper will create an instance of the given type, instead of returning a new object literal.
	     * @param typeClass The destination type class.
	     * @returns {IAutoMapperCreateMapChainingFunctions}
	     */
	    convertToType: (typeClass: new () => any) => ICreateMapFluentFunctions;
	    /**
	     * Specify which profile should be used when mapping.
	     * @param {string} profileName The profile name.
	     * @returns {IAutoMapperCreateMapChainingFunctions}
	     */
	    withProfile: (profileName: string) => void;
	}
	/**
	 * Configuration options for forMember mapping function.
	 */
	export interface IMemberConfigurationOptions extends ISourceMemberConfigurationOptions {
	    /**
	     * Map from a custom source property name.
	     * @param sourcePropertyName The source property to map.
	     */
	    mapFrom: (sourcePropertyName: string) => void;
	    /**
	     * If specified, the property will only be mapped when the condition is fulfilled.
	     */
	    condition: (predicate: ((sourceObject: any) => boolean)) => void;
	}
	/**
	 * Configuration options for forSourceMember mapping function.
	 */
	export interface ISourceMemberConfigurationOptions extends IMappingConfigurationOptions {
	    /**
	     * When this configuration function is used, the property is ignored
	     * when mapping.
	     */
	    ignore: () => void;
	}
	export interface IMappingConfigurationOptions {
	    /** The source object to map. */
	    sourceObject: any;
	    /** The source property to map. */
	    sourcePropertyName: string;
	    /**
	     * The intermediate destination property value, used for stacking multiple for(Source)Member calls
	     * while elaborating the intermediate result.
	     */
	    intermediatePropertyValue: any;
	}
	/**
	 * Member callback interface
	 */
	export type IMemberCallback = (callbackValue: any) => void;
	/**
	 * Converts source type to destination type instead of normal member mapping
	 */
	export interface ITypeConverter {
	    /**
	     * Performs conversion from source to destination type.
	     * @param {IResolutionContext} resolutionContext Resolution context.
	     * @returns {any} Destination object.
	     */
	    convert: (resolutionContext: IResolutionContext) => any;
	}
	/**
	 * Context information regarding resolution of a destination value
	 */
	export interface IResolutionContext {
	    /** Source value */
	    sourceValue: any;
	    /** Destination value */
	    destinationValue: any;
	    /** Source property name */
	    sourcePropertyName?: string;
	    /** Destination property name */
	    destinationPropertyName?: string;
	    /** Index of current collection mapping */
	    arrayIndex?: number;
	}
	/**
	 * Member callback interface
	 */
	export type IMapCallback = (result: any) => void;

}
declare module '@micro-fleet/common/dist/app/models/Maybe' {
	import { Exception } from '@micro-fleet/common/dist/app/models/Exceptions';
	/**
	 * Represents an error when attempting to get value from a Maybe.Nothing
	 */
	export class EmptyMaybeException extends Exception {
	    constructor();
	}
	/**
	 * Represents an object which may or may not have a value.
	 * Use this class to avoid assigning `null` to a variable.
	 * Source code inspired by: https://github.com/ramda/ramda-fantasy/blob/master/dist/Maybe.js
	 * and V8 Maybe: https://v8docs.nodesource.com/node-9.3/d9/d4b/classv8_1_1_maybe.html
	 */
	export abstract class Maybe<T = any> {
	    static Nothing(): Maybe;
	    static Just<T>(value: T): Maybe<T>;
	    static isJust(target: any): target is Just<any>;
	    static isNothing(target: any): target is Nothing;
	    static isMaybe(target: any): target is Maybe;
	    /**
	     * Alias of Maybe.Just
	     */
	    static of: typeof Maybe.Just;
	    abstract readonly isJust: boolean;
	    abstract readonly isNothing: boolean;
	    /**
	     * Gets the contained value if Just, or throws an `EmptyMaybeException` if Nothing.
	     * If you want to avoid exception, use `tryGetValue()` instead.
	     */
	    abstract readonly value: T;
	    /**
	     * Alias of Maybe.Just
	     */
	    of: typeof Maybe.Just;
	    /**
	     * Applies the funtion `f` to internal value if Just,
	     * or does nothing if Nothing.
	     */
	    abstract map<TMap>(f: (val: T) => TMap): Maybe<TMap>;
	    /**
	     * Takes another Maybe that wraps a function and applies its `map`
	     * method to this Maybe's value, which must be a function.
	     */
	    abstract ap(m: Maybe): Maybe;
	    /**
	     * `f` must be a function which returns a value of the same Chain
	     *  chain must return a value of the same Chain
	     */
	    abstract chain<TChain>(f: (val: T) => Maybe<TChain>): Maybe<TChain>;
	    /**
	     * Same as `map`, but only executes the callback function if Nothing,
	     * or does nothing if Just.
	     */
	    abstract mapElse(f: () => void): Maybe<T>;
	    /**
	     * Same as `chain`, but only executes the callback function if Nothing,
	     * or does nothing if Just.
	     */
	    abstract chainElse<TChain>(f: () => Maybe<TChain>): Maybe<TChain>;
	    /**
	     * Attempts to get the contained value, if there is not, returns the given default value.
	     * @param defaultVal Value to return in case there is no contained value.
	     */
	    abstract tryGetValue(defaultVal: any): T;
	} class Just<T> extends Maybe {
	    	    /**
	     * @override
	     */
	    readonly isJust: boolean;
	    /**
	     * @override
	     */
	    readonly isNothing: boolean;
	    /**
	     * @override
	     */
	    readonly value: T;
	    constructor(_value: T);
	    /**
	     * @override
	     */
	    map<TMap>(f: (val: T) => TMap): Maybe<TMap>;
	    /**
	     * @override
	     */
	    mapElse: typeof returnThis;
	    /**
	     * @override
	     */
	    chainElse: typeof returnThis;
	    /**
	     * @override
	     */
	    ap(m: Maybe): Maybe;
	    /**
	     * @override
	     */
	    chain<TChain>(f: (val: T) => Maybe<TChain>): Maybe<TChain>;
	    /**
	     * @override
	     */
	    tryGetValue(defaultVal: any): T;
	    /**
	     * @override
	     */
	    toString(): string;
	} function returnThis(this: any): any; class Nothing extends Maybe {
	    /**
	     * @override
	     */
	    readonly isJust: boolean;
	    /**
	     * @override
	     */
	    readonly isNothing: boolean;
	    /**
	     * @override
	     */
	    readonly value: any;
	    constructor();
	    /**
	     * @override
	     */
	    map: typeof returnThis;
	    /**
	     * @override
	     */
	    mapElse(f: () => void): Maybe;
	    chainElse<TChain>(f: () => Maybe<TChain>): Maybe<TChain>;
	    /**
	     * @override
	     */
	    ap: typeof returnThis;
	    /**
	     * @override
	     */
	    chain: typeof returnThis;
	    /**
	     * @override
	     */
	    tryGetValue(defaultVal: any): any;
	    /**
	     * @override
	     */
	    toString(): string;
	}
	export {};

}
declare module '@micro-fleet/common/dist/app/validators/ValidationError' {
	import * as joi from 'joi';
	import { MinorException } from '@micro-fleet/common/dist/app/models/Exceptions';
	/**
	 * Represents a validation error for a property.
	 * UI Form should use this information to highlight the particular input.
	 */
	export type ValidationErrorItem = {
	    /**
	     * Error message for this item.
	     */
	    message: string;
	    /**
	     * Path to the target property in validation schema.
	     */
	    path?: string[];
	    /**
	     * The invalid property value.
	     */
	    value?: any;
	};
	/**
	 * Represents an error when a model does not pass validation.
	 */
	export class ValidationError extends MinorException {
	    readonly details: ValidationErrorItem[];
	    static fromJoi(joiDetails: joi.ValidationErrorItem[]): ValidationError;
	    constructor(details: ValidationErrorItem[]);
	}

}
declare module '@micro-fleet/common/dist/app/validators/IModelValidator' {
	import * as joi from 'joi';
	import { ValidationError } from '@micro-fleet/common/dist/app/validators/ValidationError';
	export interface ValidationOptions extends joi.ValidationOptions {
	}
	export type JoiModelValidatorCreateOptions = {
	    /**
	     * Rules to validate model properties.
	     */
	    schemaMapModel: joi.SchemaMap;
	    /**
	     * Whether the primary key is composite. Default to `false`.
	     * This param is IGNORED if param `schemaMapPk` has value.
	     */
	    isCompositeId?: boolean;
	    /**
	     * Whether to validate PK.
	     * This param is IGNORED if param `schemaMapPk` has value.
	     * Default to be `false`.
	     */
	    requireId?: boolean;
	    /**
	     * Rule to validate model PK.
	     */
	    schemaMapId?: joi.SchemaMap;
	};
	export interface IModelValidator<T> {
	    readonly schemaMap: joi.SchemaMap;
	    readonly schemaMapId: joi.SchemaMap;
	    readonly isCompositeId: boolean;
	    /**
	     * Validates model ID.
	     */
	    id(id: any): [ValidationError, any];
	    /**
	     * Validates model for creation operation, which doesn't need `id` property.
	     */
	    whole(target: any, options?: ValidationOptions): [ValidationError, T];
	    /**
	     * Validates model for modification operation, which requires `id` property.
	     */
	    partial(target: any, options?: ValidationOptions): [ValidationError, Partial<T>];
	    /**
	     * Must call this method before using `whole` or `partial`,
	     * or after `schemaMap` or `schemaMapId` is changed.
	     */
	    compile(): void;
	}

}
declare module '@micro-fleet/common/dist/app/translators/IModelAutoMapper' {
	import { ICreateMapFluentFunctions } from '@micro-fleet/common/dist/app/interfaces/automapper';
	import { IModelValidator } from '@micro-fleet/common/dist/app/validators/IModelValidator';
	import { ValidationError } from '@micro-fleet/common/dist/app/validators/ValidationError';
	export interface MappingOptions {
	    /**
	     * Temporarily turns on or off model validation.
	     * Can only be turned on if validator is provided to constructor.
	     */
	    enableValidation?: boolean;
	    /**
	     * If specified, gives validation error to this callback. Otherwise, throw error.
	     */
	    errorCallback?: (err: ValidationError) => void;
	}
	export interface IModelAutoMapper<T extends Object> {
	    /**
	     * Turns on or off model validation before translating.
	     * Is set to `true` if validator is passed to class constructor.
	     */
	    enableValidation: boolean;
	    /**
	     * Gets the internal AutoMapper instance for advanced configuration.
	     */
	    readonly internalMapper: ICreateMapFluentFunctions;
	    /**
	     * Gets the validator.
	     */
	    readonly validator: IModelValidator<T>;
	    /**
	     * Copies properties from `sources` to dest then optionally validates
	     * the result (depends on `enableValidation`).
	     * If `enableValidation` is turned off, it works just like native `Object.assign()` function,
	     * therefore, use `Object.assign()` for better performance if validation is not needed.
	     * Note that it uses `partial()` internally, hence `required` validation is IGNORED.
	     *
	     * @throws {ValidationError}
	     */
	    merge(dest: Partial<T>, sources: Partial<T> | Partial<T>[], options?: MappingOptions): Partial<T>;
	    /**
	     * Validates then converts an object to type <T>.
	     * but ONLY properties with value are validated and copied.
	     * Note that `required` validation is IGNORED.
	     * @param {object} source The object to be translated.
	     *
	     * @throws {ValidationError} If no `errorCallback` is provided.
	     */
	    partial(source: object, options?: MappingOptions): Partial<T>;
	    /**
	     * Validates then converts a list of objects to type <T>.
	     * but ONLY properties with value are validated and copied.
	     * Note that `required` validation is IGNORED.
	     * @param {object[]} sources A list of objects to be translated.
	     *
	     * @throws {ValidationError} If no `errorCallback` is provided.
	     */
	    partialMany(sources: object[], options?: MappingOptions): Partial<T>[];
	    /**
	     * Validates then converts an object to type <T>.
	     * ALL properties are validated and copied regardless with or without value.
	     * @param {object} source The object to be translated.
	     *
	     * @throws {ValidationError} If no `errorCallback` is provided.
	     */
	    whole(source: object, options?: MappingOptions): T;
	    /**
	     * Validates then converts a list of objects to type <T>.
	     * ALL properties are validated and copied regardless with or without value.
	     * @param {object[]} sources The list of objects to be translated.
	     *
	     * @throws {ValidationError} If no `errorCallback` is provided.
	     */
	    wholeMany(sources: object[], options?: MappingOptions): T[];
	}

}
declare module '@micro-fleet/common/dist/app/translators/ModelAutoMapper' {
	import { ICreateMapFluentFunctions } from '@micro-fleet/common/dist/app/interfaces/automapper';
	import { Newable } from '@micro-fleet/common/dist/app/interfaces/misc';
	import { IModelValidator } from '@micro-fleet/common/dist/app/validators/IModelValidator';
	import { IModelAutoMapper, MappingOptions } from '@micro-fleet/common/dist/app/translators/IModelAutoMapper';
	/**
	 * Provides functions to auto mapping an arbitrary object to model of specific class type.
	 */
	export class ModelAutoMapper<T extends Object> implements IModelAutoMapper<T> {
	    protected ModelClass: Newable;
	    protected _validator?: IModelValidator<T>;
	    /**
	     * @see IModelAutoMapper.enableValidation
	     */
	    enableValidation: boolean;
	    protected _internalMapper: ICreateMapFluentFunctions;
	    /**
	     * @param {class} ModelClass The model class
	     * @param {JoiModelValidator} _validator The model validator. If specified, turn on `enableValidation`
	     */
	    constructor(ModelClass: Newable, _validator?: IModelValidator<T>);
	    /**
	     * @see IModelAutoMapper.internalMapper
	     */
	    readonly internalMapper: ICreateMapFluentFunctions;
	    /**
	     * @see IModelAutoMapper.validator
	     */
	    readonly validator: IModelValidator<T>;
	    /**
	     * @see IModelAutoMapper.merge
	     */
	    merge(dest: Partial<T>, sources: Partial<T> | Partial<T>[], options?: MappingOptions): Partial<T>;
	    /**
	     * @see IModelAutoMapper.partial
	     */
	    partial(source: object, options?: MappingOptions): Partial<T>;
	    /**
	     * @see IModelAutoMapper.partialMany
	     */
	    partialMany(sources: object[], options?: MappingOptions): Partial<T>[];
	    /**
	     * @see IModelAutoMapper.whole
	     */
	    whole(source: object, options?: MappingOptions): T;
	    /**
	     * @see IModelAutoMapper.wholeMany
	     */
	    wholeMany(sources: object[], options?: MappingOptions): T[];
	    /**
	     * Initializes the model mapping engine.
	     */
	    protected _createMap(): ICreateMapFluentFunctions;
	    /**
	     * Is invoked after source object is validated to map source object to target model.
	     */
	    protected _map(source: any): T;
	    protected _tryTranslate(fn: string, source: any | any[], options?: MappingOptions): T | T[];
	    protected _translate(fn: string, source: any, options: MappingOptions): T;
	}

}
declare module '@micro-fleet/common/dist/app/validators/JoiExtended' {
	import * as joi from 'joi';
	export type JoiDateStringOptions = {
	    /**
	     * Whether the input string is in UTC format.
	     * Default: false.
	     */
	    isUTC?: boolean;
	    /**
	     * Function to convert input string to desired data type.
	     * Default function returns native Date object.
	     */
	    translator?: any;
	};
	export type ExtendedJoi = joi.AnySchema & {
	    genn: () => {
	        /**
	         * Makes sure input is native bigint type.
	         *
	         * @example extJoi.genn().bigint().validate('98765443123456');
	         * @example extJoi.genn().bigint().validate(98765443123456n, {convert: false});
	         */
	        bigint: () => joi.AnySchema;
	        /**
	         * Makes sure input is in W3C Date and Time Formats,
	         * but must have at least year, month, and day.
	         *
	         * @example extJoi.genn().dateString().validate('2019-05-15T09:06:02+07:00');
	         * @example extJoi.genn().dateString({ isUTC: true }).validate('2019-05-15T09:06:02Z');
	         * @example extJoi.genn().dateString({ translator: moment }).validate('2019-05-15T09:06:02-07:00');
	         */
	        dateString: (options?: JoiDateStringOptions) => joi.AnySchema;
	    };
	};
	/**
	 * Joi instance with "genn()" extension enabled, including some custom rules.
	 */
	export const extJoi: ExtendedJoi;

}
declare module '@micro-fleet/common/dist/app/validators/JoiModelValidator' {
	import * as joi from 'joi';
	import { IModelValidator, JoiModelValidatorCreateOptions, ValidationOptions } from '@micro-fleet/common/dist/app/validators/IModelValidator';
	import { ValidationError } from '@micro-fleet/common/dist/app/validators/ValidationError';
	export class JoiModelValidator<T> implements IModelValidator<T> {
	    protected _schemaMap: joi.SchemaMap;
	    protected _isCompositeId: boolean;
	    protected _schemaMapId?: joi.SchemaMap;
	    /**
	     * Builds a new instance of ModelValidatorBase.
	     */
	    static create<T>({ schemaMapModel, isCompositeId, requireId, schemaMapId: schemaMapId, }: JoiModelValidatorCreateOptions): JoiModelValidator<T>;
	    /**
	     * Compiled rules for model ID.
	     */
	    protected _compiledId: joi.ObjectSchema;
	    /**
	     * Compiled rules for model properties.
	     */
	    protected _compiledWhole: joi.ObjectSchema;
	    /**
	     * Compiled rules for model properties, but all of them are OPTIONAL.
	     * Used for patch operation.
	     */
	    protected _compiledPartial: joi.ObjectSchema;
	    /**
	     * @param {joi.SchemaMap} _schemaMap Rules to validate model properties.
	     * @param {boolean} _isCompositeId Whether the primary key is made of multiple properties. Default to `false`
	     *     This param is IGNORED if param `schemaMapId` has value.
	     * @param {boolean} requireId Whether to validate ID.
	     *     This param is IGNORED if param `schemaMapId` has value.
	     * @param {joi.SchemaMap} _schemaMapId Rule to validate model ID.
	     */
	    protected constructor(_schemaMap: joi.SchemaMap, _isCompositeId: boolean, requireId: boolean, _schemaMapId?: joi.SchemaMap);
	    readonly schemaMap: joi.SchemaMap;
	    readonly schemaMapId: joi.SchemaMap;
	    readonly isCompositeId: boolean;
	    /**
	     * @see IModelValidator.id
	     */
	    id(id: any): [ValidationError, any];
	    /**
	     * @see IModelValidator.whole
	     */
	    whole(target: any, options?: ValidationOptions): [ValidationError, T];
	    /**
	     * @see IModelValidator.partial
	     */
	    partial(target: any, options?: ValidationOptions): [ValidationError, Partial<T>];
	    /**
	     * @see IModelValidator.compile
	     */
	    compile(): void;
	    protected validate(schema: joi.ObjectSchema, target: any, options?: ValidationOptions): [ValidationError, T];
	}

}
declare module '@micro-fleet/common/dist/app/models/settings/SettingItem' {
	import { ModelAutoMapper } from '@micro-fleet/common/dist/app/translators/ModelAutoMapper';
	import { JoiModelValidator } from '@micro-fleet/common/dist/app/validators/JoiModelValidator';
	export enum SettingItemDataType {
	    /**
	     * Text data type, that is rendered as a text box on UI.
	     */
	    String = "string",
	    /**
	     * Array of strings.
	     */
	    StringArray = "string[]",
	    /**
	     * Numeric data type including integer and float, that is rendered as
	     * a numeric box on UI.
	     */
	    Number = "number",
	    /**
	     * Array of numbers.
	     */
	    NumberArray = "number[]",
	    /**
	     * Logical data type (true/false), that is rendered as a checkbox on UI.
	     */
	    Boolean = "boolean"
	}
	/**
	 * Represents a setting record.
	 */
	export class SettingItem {
	    static validator: JoiModelValidator<SettingItem>;
	    static translator: ModelAutoMapper<SettingItem>;
	    /**
	     * Gets or sets setting name (aka setting key).
	     * This is also the key in `appconfig.json` and the name of environment variable.
	     */
	    readonly name: string;
	    /**
	     * Gets or sets data type of setting value.
	     * Must be one of: 'string', 'string[]', 'number', 'number[]', 'boolean'.
	     */
	    readonly dataType: SettingItemDataType;
	    /**
	     * Gets or set value.
	     * Whatever `dataType` is, value must always be string.
	     */
	    readonly value: string;
	}

}
declare module '@micro-fleet/common/dist/app/interfaces/configurations' {
	import { Maybe } from '@micro-fleet/common/dist/app/models/Maybe';
	import { SettingItemDataType } from '@micro-fleet/common/dist/app/models/settings/SettingItem';
	export interface IConfigurationProvider {
	    /**
	     * Turns on or off remote settings fetching.
	     */
	    enableRemote: boolean;
	    /**
	     * Absolute path to configuration file
	     */
	    configFilePath: string;
	    /**
	     * Attempts to get settings from remote Configuration Service, environmental variables,
	     * and `appconfig.json` file, respectedly.
	     * @param {string} key Setting key
	     * @param {SettingItemDataType} dataType Data type to parse some settings from file or ENV variables.
	     *         Has no effect with remote settings.
	     */
	    get(key: string, dataType?: SettingItemDataType): Maybe<any>;
	    /**
	     * Attempts to fetch settings from remote Configuration Service.
	     */
	    fetch(): Promise<boolean>;
	    /**
	     * Invokes everytime new settings are updated.
	     * The callback receives an array of changed setting keys.
	     */
	    onUpdate(listener: (changedKeys: string[]) => void): void;
	}

}
declare module '@micro-fleet/common/dist/app/models/id/IdBase' {
	import { ISerializable } from '@micro-fleet/common/dist/app/interfaces/misc';
	/**
	 * Base class for ID type.
	 * Models in DDD (domain-driven design) often have ID as a class instance.
	 */
	export abstract class IdBase implements ISerializable {
	    abstract toArray(): any[];
	    equals(target: any): boolean;
	    toJSON(): object;
	    /**
	     * @override
	     */
	    toString(): string;
	}

}
declare module '@micro-fleet/common/dist/app/models/id/SingleId' {
	import { IdBase } from '@micro-fleet/common/dist/app/models/id/IdBase';
	export class SingleId extends IdBase {
	    id: string;
	    constructor(id: string);
	    /**
	     * @override
	     * Overriding for better performance.
	     */
	    equals(target: any): boolean;
	    /**
	     * @override
	     */
	    toArray(): string[];
	    /**
	     * @override
	     * Overriding for better performance.
	     */
	    toString(): string;
	}

}
declare module '@micro-fleet/common/dist/app/models/id/TenantId' {
	import { IdBase } from '@micro-fleet/common/dist/app/models/id/IdBase';
	export class TenantId extends IdBase {
	    id: string;
	    tenantId: string;
	    constructor(id: string, tenantId: string);
	    /**
	     * @override
	     * Overriding for better performance.
	     */
	    equals(target: any): boolean;
	    /**
	     * @override
	     */
	    toArray(): string[];
	    /**
	     * @override
	     * Overriding for better performance.
	     */
	    toString(): string;
	}

}
declare module '@micro-fleet/common/dist/app/models/settings/GetSettingRequest' {
	import { ModelAutoMapper } from '@micro-fleet/common/dist/app/translators/ModelAutoMapper';
	import { JoiModelValidator } from '@micro-fleet/common/dist/app/validators/JoiModelValidator';
	/**
	 * Represents the request contract for GetSetting endpoint.
	 */
	export class GetSettingRequest {
	    static validator: JoiModelValidator<GetSettingRequest>;
	    static translator: ModelAutoMapper<GetSettingRequest>;
	    /**
	     * Gets or sets program slug.
	     */
	    readonly slug: string;
	    /**
	     * Gets or sets IP address where the calling program is running.
	     */
	    readonly ipAddress: string;
	}

}
declare module '@micro-fleet/common/dist/app/models/PagedData' {
	import { ISerializable } from '@micro-fleet/common/dist/app/interfaces/misc';
	/**
	 * An object that contains paged array of items.
	 */
	export class PagedData<T> implements ISerializable {
	    	    	    /**
	     * Gets number of contained items
	     */
	    readonly length: number;
	    /**
	     * Gets total number of items.
	     */
	    readonly total: number;
	    /**
	     * Gets array of items.
	     */
	    readonly items: T[];
	    constructor(items?: T[], total?: number);
	    concat(arr: T[]): PagedData<T>;
	    forEach(callbackFn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
	    map<U>(callbackFn: (value: T, index: number, array: T[]) => U, thisArg?: any): PagedData<U>;
	    /**
	     * Returns a serializable object.
	     */
	    toJSON(): {
	        total: number;
	        items: T[];
	    };
	}

}
declare module '@micro-fleet/common/dist/app/models/Result' {
	import { Exception } from '@micro-fleet/common/dist/app/models/Exceptions';
	import { Newable } from '@micro-fleet/common/dist/app/interfaces/misc'; function returnThis(this: any): any;
	/**
	 * Represents an error when attempting to get value from a Result.Failure
	 */
	export class NoValueFromFailureResultException extends Exception {
	    constructor();
	}
	/**
	 * Represents an error when attempting to get error from a Result.Ok
	 */
	export class NoErrorFromOkResultException extends Exception {
	    constructor();
	}
	/**
	 * Represents an object which can be Ok or Failure.
	 * Use this class to avoid throwing Exception.
	 * Source code inspired by: https://github.com/ramda/ramda-fantasy/blob/master/dist/Either.js
	 */
	export abstract class Result<TOk = any, TFail = any> {
	    static Failure<TO, TF>(reason: TF): Result<TO, TF>;
	    static Ok<TO>(value: TO): Result<TO>;
	    static isOk(target: any): target is Ok<any>;
	    static isFailure(target: any): target is Failure;
	    static isResult(target: any): target is Result;
	    /**
	     * Alias of Result.Ok
	     */
	    static of: typeof Result.Ok;
	    abstract readonly isOk: boolean;
	    abstract readonly isFailure: boolean;
	    /**
	     * Gets the success value if Ok, or throws an `NoValueFromFailureResultException` if Failure.
	     * If you want to avoid exception, use `tryGetValue()` instead.
	     */
	    abstract readonly value: TOk;
	    /**
	     * Gets the error if Failure, or throws an `NoErrorFromOkResultException` if Ok.
	     */
	    abstract readonly error: TFail;
	    /**
	     * Alias of Result.Ok
	     */
	    of: typeof Result.Ok;
	    /**
	     * Applies the funtion `f` to internal value if Ok,
	     * or does nothing if Failure.
	     */
	    abstract map<TMap>(f: (val: TOk) => TMap): Result<TMap>;
	    /**
	     * Takes another Result that wraps a function and applies its `map`
	     * method to this Result's value, which must be a function.
	     */
	    abstract ap(m: Result): Result;
	    /**
	     * `f` must be a function which returns a value of the same Chain
	     *  chain must return a value of the same Chain
	     */
	    abstract chain<TChain>(f: (val: TOk) => Result<TChain>): Result<TChain>;
	    /**
	     * Same as `map`, but only executes the callback function if Failure,
	     * or does nothing if Ok.
	     */
	    abstract mapElse(f: (reason: TFail) => void): Result<TOk>;
	    /**
	     * Same as `chain`, but only executes the callback function if Failure,
	     * or does nothing if Ok.
	     */
	    abstract chainElse<TChain>(f: (reason: TFail) => Result<TChain>): Result<TChain>;
	    /**
	     * Attempts to get the success value, if this is Failure, returns the given default value.
	     * @param defaultVal Value to return in case there is no contained value.
	     */
	    abstract tryGetValue(defaultVal: any): TOk;
	    /**
	     * Throws the error if Failure, or does nothing if Ok.
	     * @param ExceptionClass The class to wrap error
	     */
	    abstract throwError(ExceptionClass?: Newable): void;
	} class Ok<T> extends Result<T, any> {
	    	    /**
	     * @override
	     */
	    readonly isOk: boolean;
	    /**
	     * @override
	     */
	    readonly isFailure: boolean;
	    /**
	     * @override
	     */
	    readonly error: any;
	    /**
	     * @override
	     */
	    readonly value: T;
	    constructor(_value: T);
	    /**
	     * @override
	     */
	    map<TMap>(f: (val: T) => TMap): Result<TMap>;
	    /**
	     * @override
	     */
	    mapElse: typeof returnThis;
	    /**
	     * @override
	     */
	    chainElse: typeof returnThis;
	    /**
	     * @override
	     */
	    ap(m: Result): Result;
	    /**
	     * @override
	     */
	    chain<TChain>(f: (val: T) => Result<TChain>): Result<TChain>;
	    /**
	     * @override
	     */
	    tryGetValue(defaultVal: any): T;
	    /**
	     * @override
	     */
	    throwError(ExceptionClass?: Newable): void;
	    /**
	     * @override
	     */
	    toString(): string;
	} class Failure<T = any> extends Result<any, T> {
	    	    /**
	     * @override
	     */
	    readonly isOk: boolean;
	    /**
	     * @override
	     */
	    readonly isFailure: boolean;
	    /**
	     * @override
	     */
	    readonly error: T;
	    /**
	     * @override
	     */
	    readonly value: any;
	    constructor(_reason: T);
	    /**
	     * @override
	     */
	    map: typeof returnThis;
	    /**
	     * @override
	     */
	    mapElse(f: (reason: T) => void): Result;
	    chainElse<TChain>(f: (reason: T) => Result<TChain>): Result<TChain>;
	    /**
	     * @override
	     */
	    ap: typeof returnThis;
	    /**
	     * @override
	     */
	    chain: typeof returnThis;
	    /**
	     * @override
	     */
	    tryGetValue(defaultVal: any): any;
	    /**
	     * @override
	     */
	    throwError(ExceptionClass?: Newable): void;
	    /**
	     * @override
	     */
	    toString(): string;
	}
	export {};

}
declare module '@micro-fleet/common/dist/app/translators/AccessorSupportMapper' {
	import { ICreateMapFluentFunctions } from '@micro-fleet/common/dist/app/interfaces/automapper';
	import { ModelAutoMapper } from '@micro-fleet/common/dist/app/translators/ModelAutoMapper';
	import { IModelAutoMapper } from '@micro-fleet/common/dist/app/translators/IModelAutoMapper';
	export type AccessorDescription = {
	    name: string;
	    isGetter: boolean;
	    isSetter: boolean;
	};
	/**
	 * A model auto mapper which supports getter and setter.
	 */
	export class AccessorSupportMapper<T extends Object> extends ModelAutoMapper<T> implements IModelAutoMapper<T> {
	    /**
	     * @override
	     */
	    protected _createMap(): ICreateMapFluentFunctions;
	    /**
	     * A replacement for native `AutoMapper.forAllMembers`,
	     * working well with our custom converter.
	     */
	    protected _forAllMembers(destObj: any, destPropName: string, srcObj: any): void;
	    protected _forAllAccessors(destObj: any, srcObj: any, desc: AccessorDescription): void;
	}

}
declare module '@micro-fleet/common/dist/app/utils/ObjectUtil' {
	import { ISerializable } from '@micro-fleet/common/dist/app/interfaces/misc';
	/**
	 * Provides helper methods to manipulate objects.
	 */
	export class ObjectUtil {
	    	    /**
	     * Creates an object composed of the picked object properties.
	     */
	    static pickNotNull(source: object, ...props: string[]): object;
	    /**
	     * Checks if the object implements interface `ISerializable`
	     */
	    static isSerializable(target: object): target is ISerializable;
	    /**
	     * Converts object to string
	     */
	    static serialize(target: any): string;
	}

}
declare module '@micro-fleet/common/dist/app/validators/BusinessInvariantError' {
	import { ValidationError, ValidationErrorItem } from '@micro-fleet/common/dist/app/validators/ValidationError';
	/**
	 * Represents a business rule violation.
	 */
	export class BusinessInvariantError extends ValidationError {
	    constructor(details: ValidationErrorItem[]);
	}

}
declare module '@micro-fleet/common' {
	import constantObj = require('@micro-fleet/common/dist/app/constants');
	export const constants: constantObj.Constants;
	export * from '@micro-fleet/common/dist/app/di/DependencyContainer';
	export * from '@micro-fleet/common/dist/app/di/HandlerContainer';
	export * from '@micro-fleet/common/dist/app/di/lazyInject';
	export * from '@micro-fleet/common/dist/app/di/ServiceContext';
	export * from '@micro-fleet/common/dist/app/di/Types';
	export * from '@micro-fleet/common/dist/app/interfaces/automapper';
	export * from '@micro-fleet/common/dist/app/interfaces/configurations';
	export * from '@micro-fleet/common/dist/app/interfaces/misc';
	export * from '@micro-fleet/common/dist/app/models/id/IdBase';
	export * from '@micro-fleet/common/dist/app/models/id/SingleId';
	export * from '@micro-fleet/common/dist/app/models/id/TenantId';
	export * from '@micro-fleet/common/dist/app/models/settings/GetSettingRequest';
	export * from '@micro-fleet/common/dist/app/models/settings/SettingItem';
	export * from '@micro-fleet/common/dist/app/models/Exceptions';
	export * from '@micro-fleet/common/dist/app/models/Maybe';
	export * from '@micro-fleet/common/dist/app/models/PagedData';
	export * from '@micro-fleet/common/dist/app/models/Result';
	export * from '@micro-fleet/common/dist/app/translators/AccessorSupportMapper';
	export * from '@micro-fleet/common/dist/app/translators/IModelAutoMapper';
	export * from '@micro-fleet/common/dist/app/translators/ModelAutoMapper';
	export * from '@micro-fleet/common/dist/app/utils/ObjectUtil';
	export * from '@micro-fleet/common/dist/app/utils/Guard';
	export * from '@micro-fleet/common/dist/app/validators/BusinessInvariantError';
	export * from '@micro-fleet/common/dist/app/validators/JoiExtended';
	export * from '@micro-fleet/common/dist/app/validators/IModelValidator';
	export * from '@micro-fleet/common/dist/app/validators/JoiModelValidator';
	export * from '@micro-fleet/common/dist/app/validators/ValidationError';

}
declare module '@micro-fleet/common/dist/app/models/IModelAutoMapper' {
	import { ICreateMapFluentFunctions } from '@micro-fleet/common/dist/app/interfaces/automapper';
	import { IModelValidator } from '@micro-fleet/common/dist/app/validators/IModelValidator';
	import { ValidationError } from '@micro-fleet/common/dist/app/validators/ValidationError';
	export interface MappingOptions {
	    /**
	     * Temporarily turns on or off model validation.
	     * Can only be turned on if validator is provided to constructor.
	     */
	    enableValidation?: boolean;
	    /**
	     * If specified, gives validation error to this callback. Otherwise, throw error.
	     */
	    errorCallback?: (err: ValidationError) => void;
	}
	export interface IModelAutoMapper<T extends Object> {
	    /**
	     * Turns on or off model validation before translating.
	     * Is set to `true` if validator is passed to class constructor.
	     */
	    enableValidation: boolean;
	    /**
	     * Gets the internal AutoMapper instance for advanced configuration.
	     */
	    readonly internalMapper: ICreateMapFluentFunctions;
	    /**
	     * Gets the validator.
	     */
	    readonly validator: IModelValidator<T>;
	    /**
	     * Copies properties from `sources` to dest then optionally validates
	     * the result (depends on `enableValidation`).
	     * If `enableValidation` is turned off, it works just like native `Object.assign()` function,
	     * therefore, use `Object.assign()` for better performance if validation is not needed.
	     * Note that it uses `partial()` internally, hence `required` validation is IGNORED.
	     *
	     * @throws {ValidationError}
	     */
	    merge(dest: Partial<T>, sources: Partial<T> | Partial<T>[], options?: MappingOptions): Partial<T>;
	    /**
	     * Validates then converts an object to type <T>.
	     * but ONLY properties with value are validated and copied.
	     * Note that `required` validation is IGNORED.
	     * @param {object} source The object to be translated.
	     *
	     * @throws {ValidationError} If no `errorCallback` is provided.
	     */
	    partial(source: object, options?: MappingOptions): Partial<T>;
	    /**
	     * Validates then converts a list of objects to type <T>.
	     * but ONLY properties with value are validated and copied.
	     * Note that `required` validation is IGNORED.
	     * @param {object[]} sources A list of objects to be translated.
	     *
	     * @throws {ValidationError} If no `errorCallback` is provided.
	     */
	    partialMany(sources: object[], options?: MappingOptions): Partial<T>[];
	    /**
	     * Validates then converts an object to type <T>.
	     * ALL properties are validated and copied regardless with or without value.
	     * @param {object} source The object to be translated.
	     *
	     * @throws {ValidationError} If no `errorCallback` is provided.
	     */
	    whole(source: object, options?: MappingOptions): T;
	    /**
	     * Validates then converts a list of objects to type <T>.
	     * ALL properties are validated and copied regardless with or without value.
	     * @param {object[]} sources The list of objects to be translated.
	     *
	     * @throws {ValidationError} If no `errorCallback` is provided.
	     */
	    wholeMany(sources: object[], options?: MappingOptions): T[];
	}

}
declare module '@micro-fleet/common/dist/app/models/ModelAutoMapper' {
	import { ICreateMapFluentFunctions } from '@micro-fleet/common/dist/app/interfaces/automapper';
	import { Newable } from '@micro-fleet/common/dist/app/interfaces/misc';
	import { IModelValidator } from '@micro-fleet/common/dist/app/validators/IModelValidator';
	import { IModelAutoMapper, MappingOptions } from '@micro-fleet/common/dist/app/models/IModelAutoMapper';
	/**
	 * Provides functions to auto mapping an arbitrary object to model of specific class type.
	 */
	export class ModelAutoMapper<T extends Object> implements IModelAutoMapper<T> {
	    protected ModelClass: Newable;
	    protected _validator?: IModelValidator<T>;
	    /**
	     * @see IModelAutoMapper.enableValidation
	     */
	    enableValidation: boolean;
	    protected _internalMapper: ICreateMapFluentFunctions;
	    /**
	     * @param {class} ModelClass The model class
	     * @param {JoiModelValidator} _validator The model validator. If specified, turn on `enableValidation`
	     */
	    constructor(ModelClass: Newable, _validator?: IModelValidator<T>);
	    /**
	     * @see IModelAutoMapper.internalMapper
	     */
	    readonly internalMapper: ICreateMapFluentFunctions;
	    /**
	     * @see IModelAutoMapper.validator
	     */
	    readonly validator: IModelValidator<T>;
	    /**
	     * @see IModelAutoMapper.merge
	     */
	    merge(dest: Partial<T>, sources: Partial<T> | Partial<T>[], options?: MappingOptions): Partial<T>;
	    /**
	     * @see IModelAutoMapper.partial
	     */
	    partial(source: object, options?: MappingOptions): Partial<T>;
	    /**
	     * @see IModelAutoMapper.partialMany
	     */
	    partialMany(sources: object[], options?: MappingOptions): Partial<T>[];
	    /**
	     * @see IModelAutoMapper.whole
	     */
	    whole(source: object, options?: MappingOptions): T;
	    /**
	     * @see IModelAutoMapper.wholeMany
	     */
	    wholeMany(sources: object[], options?: MappingOptions): T[];
	    /**
	     * Initializes the model mapping engine.
	     */
	    protected _createMap(): ICreateMapFluentFunctions;
	    /**
	     * Is invoked after source object is validated to map source object to target model.
	     */
	    protected _map(source: any): T;
	    protected _tryTranslate(fn: string, source: any | any[], options?: MappingOptions): T | T[];
	    protected _translate(fn: string, source: any, options: MappingOptions): T;
	}

}
declare module '@micro-fleet/common/dist/app/models/AccessorSupportMapper' {
	import { ICreateMapFluentFunctions } from '@micro-fleet/common/dist/app/interfaces/automapper';
	import { ModelAutoMapper } from '@micro-fleet/common/dist/app/models/ModelAutoMapper';
	import { IModelAutoMapper } from '@micro-fleet/common/dist/app/models/IModelAutoMapper';
	export type AccessorDescription = {
	    name: string;
	    isGetter: boolean;
	    isSetter: boolean;
	};
	/**
	 * A model auto mapper which supports getter and setter.
	 */
	export class AccessorSupportMapper<T extends Object> extends ModelAutoMapper<T> implements IModelAutoMapper<T> {
	    /**
	     * @override
	     */
	    protected _createMap(): ICreateMapFluentFunctions;
	    /**
	     * A replacement for native `AutoMapper.forAllMembers`,
	     * working well with our custom converter.
	     */
	    protected _forAllMembers(destObj: any, destPropName: string, srcObj: any): void;
	    protected _forAllAccessors(destObj: any, srcObj: any, desc: AccessorDescription): void;
	}

}
declare module '@micro-fleet/common/dist/app/models/ValidationError' {
	import * as joi from 'joi';
	import { MinorException } from '@micro-fleet/common/dist/app/models/Exceptions';
	/**
	 * Represents a validation error for a property.
	 * UI Form should use this information to highlight the particular input.
	 */
	export type ValidationErrorItem = {
	    /**
	     * Error message for this item.
	     */
	    message: string;
	    /**
	     * Path to the target property in validation schema.
	     */
	    path?: string[];
	    /**
	     * The invalid property value.
	     */
	    value?: any;
	};
	/**
	 * Represents an error when a model does not pass validation.
	 */
	export class ValidationError extends MinorException {
	    readonly details: ValidationErrorItem[];
	    static fromJoi(joiDetails: joi.ValidationErrorItem[]): ValidationError;
	    constructor(details: ValidationErrorItem[]);
	}

}
declare module '@micro-fleet/common/dist/app/models/BusinessInvariantError' {
	import { ValidationError, ValidationErrorItem } from '@micro-fleet/common/dist/app/models/ValidationError';
	/**
	 * Represents a business rule violation.
	 */
	export class BusinessInvariantError extends ValidationError {
	    constructor(details: ValidationErrorItem[]);
	}

}
declare module '@micro-fleet/common/dist/app/models/IModelValidator' {
	import * as joi from 'joi';
	import { ValidationError } from '@micro-fleet/common/dist/app/models/ValidationError';
	export interface ValidationOptions extends joi.ValidationOptions {
	}
	export type JoiModelValidatorCreateOptions = {
	    /**
	     * Rules to validate model properties.
	     */
	    schemaMapModel: joi.SchemaMap;
	    /**
	     * Whether the primary key is composite. Default to `false`.
	     * This param is IGNORED if param `schemaMapPk` has value.
	     */
	    isCompositeId?: boolean;
	    /**
	     * Whether to validate PK.
	     * This param is IGNORED if param `schemaMapPk` has value.
	     * Default to be `false`.
	     */
	    requireId?: boolean;
	    /**
	     * Rule to validate model PK.
	     */
	    schemaMapId?: joi.SchemaMap;
	};
	export interface IModelValidator<T> {
	    readonly schemaMap: joi.SchemaMap;
	    readonly schemaMapId: joi.SchemaMap;
	    readonly isCompositeId: boolean;
	    /**
	     * Validates model ID.
	     */
	    id(id: any): [ValidationError, any];
	    /**
	     * Validates model for creation operation, which doesn't need `id` property.
	     */
	    whole(target: any, options?: ValidationOptions): [ValidationError, T];
	    /**
	     * Validates model for modification operation, which requires `id` property.
	     */
	    partial(target: any, options?: ValidationOptions): [ValidationError, Partial<T>];
	    /**
	     * Must call this method before using `whole` or `partial`,
	     * or after `schemaMap` or `schemaMapId` is changed.
	     */
	    compile(): void;
	}

}
declare module '@micro-fleet/common/dist/app/models/IdBase' {
	import { ISerializable } from '@micro-fleet/common/dist/app/interfaces/misc';
	/**
	 * Base class for ID type.
	 * Models in DDD (domain-driven design) often have ID as a class instance.
	 */
	export abstract class IdBase implements ISerializable {
	    abstract toArray(): any[];
	    equals(target: any): boolean;
	    toJSON(): object;
	    /**
	     * @override
	     */
	    toString(): string;
	}

}
declare module '@micro-fleet/common/dist/app/models/JoiExtended' {
	import * as joi from 'joi';
	export type JoiDateStringOptions = {
	    /**
	     * Whether the input string is in UTC format.
	     * Default: false.
	     */
	    isUTC?: boolean;
	    /**
	     * Function to convert input string to desired data type.
	     * Default function returns native Date object.
	     */
	    translator?: any;
	};
	export type ExtendedJoi = joi.AnySchema & {
	    genn: () => {
	        /**
	         * Makes sure input is native bigint type.
	         *
	         * @example extJoi.genn().bigint().validate('98765443123456');
	         * @example extJoi.genn().bigint().validate(98765443123456n, {convert: false});
	         */
	        bigint: () => joi.AnySchema;
	        /**
	         * Makes sure input is in W3C Date and Time Formats,
	         * but must have at least year, month, and day.
	         *
	         * @example extJoi.genn().dateString().validate('2019-05-15T09:06:02+07:00');
	         * @example extJoi.genn().dateString({ isUTC: true }).validate('2019-05-15T09:06:02Z');
	         * @example extJoi.genn().dateString({ translator: moment }).validate('2019-05-15T09:06:02-07:00');
	         */
	        dateString: (options?: JoiDateStringOptions) => joi.AnySchema;
	    };
	};
	/**
	 * Joi instance with "genn()" extension enabled, including some custom rules.
	 */
	export const extJoi: ExtendedJoi;

}
declare module '@micro-fleet/common/dist/app/models/JoiModelValidator' {
	import * as joi from 'joi';
	import { IModelValidator, JoiModelValidatorCreateOptions, ValidationOptions } from '@micro-fleet/common/dist/app/models/IModelValidator';
	import { ValidationError } from '@micro-fleet/common/dist/app/models/ValidationError';
	export class JoiModelValidator<T> implements IModelValidator<T> {
	    protected _schemaMap: joi.SchemaMap;
	    protected _isCompositeId: boolean;
	    protected _schemaMapId?: joi.SchemaMap;
	    /**
	     * Builds a new instance of ModelValidatorBase.
	     */
	    static create<T>({ schemaMapModel, isCompositeId, requireId, schemaMapId: schemaMapId, }: JoiModelValidatorCreateOptions): JoiModelValidator<T>;
	    /**
	     * Compiled rules for model ID.
	     */
	    protected _compiledId: joi.ObjectSchema;
	    /**
	     * Compiled rules for model properties.
	     */
	    protected _compiledWhole: joi.ObjectSchema;
	    /**
	     * Compiled rules for model properties, but all of them are OPTIONAL.
	     * Used for patch operation.
	     */
	    protected _compiledPartial: joi.ObjectSchema;
	    /**
	     * @param {joi.SchemaMap} _schemaMap Rules to validate model properties.
	     * @param {boolean} _isCompositeId Whether the primary key is made of multiple properties. Default to `false`
	     *     This param is IGNORED if param `schemaMapId` has value.
	     * @param {boolean} requireId Whether to validate ID.
	     *     This param is IGNORED if param `schemaMapId` has value.
	     * @param {joi.SchemaMap} _schemaMapId Rule to validate model ID.
	     */
	    protected constructor(_schemaMap: joi.SchemaMap, _isCompositeId: boolean, requireId: boolean, _schemaMapId?: joi.SchemaMap);
	    readonly schemaMap: joi.SchemaMap;
	    readonly schemaMapId: joi.SchemaMap;
	    readonly isCompositeId: boolean;
	    /**
	     * @see IModelValidator.id
	     */
	    id(id: any): [ValidationError, any];
	    /**
	     * @see IModelValidator.whole
	     */
	    whole(target: any, options?: ValidationOptions): [ValidationError, T];
	    /**
	     * @see IModelValidator.partial
	     */
	    partial(target: any, options?: ValidationOptions): [ValidationError, Partial<T>];
	    /**
	     * @see IModelValidator.compile
	     */
	    compile(): void;
	    protected validate(schema: joi.ObjectSchema, target: any, options?: ValidationOptions): [ValidationError, T];
	}

}
declare module '@micro-fleet/common/dist/app/models/SingleId' {
	import { IdBase } from '@micro-fleet/common/dist/app/models/IdBase';
	export class SingleId extends IdBase {
	    id: string;
	    constructor(id: string);
	    /**
	     * @override
	     * Overriding for better performance.
	     */
	    equals(target: any): boolean;
	    /**
	     * @override
	     */
	    toArray(): string[];
	    /**
	     * @override
	     * Overriding for better performance.
	     */
	    toString(): string;
	}

}
declare module '@micro-fleet/common/dist/app/models/TenantId' {
	import { IdBase } from '@micro-fleet/common/dist/app/models/IdBase';
	export class TenantId extends IdBase {
	    id: string;
	    tenantId: string;
	    constructor(id: string, tenantId: string);
	    /**
	     * @override
	     * Overriding for better performance.
	     */
	    equals(target: any): boolean;
	    /**
	     * @override
	     */
	    toArray(): string[];
	    /**
	     * @override
	     * Overriding for better performance.
	     */
	    toString(): string;
	}

}
declare module '@micro-fleet/common/dist/app/setting-keys/index' {
	export * from '@micro-fleet/common/dist/app/setting-keys/DbClient';
	export * from '@micro-fleet/common/dist/app/setting-keys/auth';
	export * from '@micro-fleet/common/dist/app/setting-keys/cache';
	export * from '@micro-fleet/common/dist/app/setting-keys/database';
	export * from '@micro-fleet/common/dist/app/setting-keys/message-broker';
	export * from '@micro-fleet/common/dist/app/setting-keys/rpc';
	export * from '@micro-fleet/common/dist/app/setting-keys/service';
	export * from '@micro-fleet/common/dist/app/setting-keys/web';

}
