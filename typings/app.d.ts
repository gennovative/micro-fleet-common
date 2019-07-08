/// <reference path="./global.d.ts" />
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
declare module '@micro-fleet/common/dist/app/Guard' {
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
declare module '@micro-fleet/common/dist/app/DependencyContainer' {
	import { injectable, inject, decorate, interfaces, unmanaged, optional } from 'inversify';
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
declare module '@micro-fleet/common/dist/app/models/ServiceContext' {
	import { IDependencyContainer } from '@micro-fleet/common/dist/app/DependencyContainer';
	/**
	 * Serves as a global variables container.
	 */
	export class ServiceContext {
	    	    /**
	     * Gets dependency container.
	     */
	    readonly dependencyContainer: IDependencyContainer;
	    /**
	     * Sets dependency container. Must be set before add-ons initialization phase.
	     */
	    setDependencyContainer(container: IDependencyContainer): void;
	}
	export const serviceContext: ServiceContext;

}
declare module '@micro-fleet/common/dist/app/HandlerContainer' {
	import { IDependencyContainer } from '@micro-fleet/common/dist/app/DependencyContainer';
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
declare module '@micro-fleet/common/dist/app/Types' {
	export class Types {
	    static readonly CONFIG_PROVIDER = "common.IConfigurationProvider";
	    static readonly DEPENDENCY_CONTAINER = "common.IDependencyContainer";
	}

}
declare module '@micro-fleet/common/dist/app/constants/DbClient' {
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
declare module '@micro-fleet/common/dist/app/constants/setting-keys/auth' {
	export enum AuthSettingKeys {
	    /**
	     * Secret key to encrypt auth tokens.
	     * Data type: string
	     */
	    AUTH_SECRET = "auth_secret",
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
declare module '@micro-fleet/common/dist/app/constants/setting-keys/cache' {
	export enum CacheSettingKeys {
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
declare module '@micro-fleet/common/dist/app/constants/setting-keys/database' {
	export enum DbSettingKeys {
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
declare module '@micro-fleet/common/dist/app/constants/setting-keys/message-broker' {
	export enum MbSettingKeys {
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
	     * Default queue name to connect to.
	     * Data type: string
	     */
	    MSG_BROKER_QUEUE = "msgBroker_queue",
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
declare module '@micro-fleet/common/dist/app/constants/setting-keys/rpc' {
	export enum RpcSettingKeys {
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
declare module '@micro-fleet/common/dist/app/constants/setting-keys/service' {
	export enum SvcSettingKeys {
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
declare module '@micro-fleet/common/dist/app/constants/setting-keys/web' {
	export enum WebSettingKeys {
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
declare module '@micro-fleet/common/dist/app/constants/index' {
	import { DbClient } from '@micro-fleet/common/dist/app/constants/DbClient';
	import { AuthSettingKeys } from '@micro-fleet/common/dist/app/constants/setting-keys/auth';
	import { CacheSettingKeys } from '@micro-fleet/common/dist/app/constants/setting-keys/cache';
	import { DbSettingKeys } from '@micro-fleet/common/dist/app/constants/setting-keys/database';
	import { MbSettingKeys } from '@micro-fleet/common/dist/app/constants/setting-keys/message-broker';
	import { RpcSettingKeys } from '@micro-fleet/common/dist/app/constants/setting-keys/rpc';
	import { SvcSettingKeys } from '@micro-fleet/common/dist/app/constants/setting-keys/service';
	import { WebSettingKeys } from '@micro-fleet/common/dist/app/constants/setting-keys/web';
	export type Constants = {
	    DbClient: typeof DbClient;
	    AuthSettingKeys: typeof AuthSettingKeys;
	    CacheSettingKeys: typeof CacheSettingKeys;
	    DbSettingKeys: typeof DbSettingKeys;
	    MbSettingKeys: typeof MbSettingKeys;
	    RpcSettingKeys: typeof RpcSettingKeys;
	    SvcSettingKeys: typeof SvcSettingKeys;
	    WebSettingKeys: typeof WebSettingKeys;
	};
	export const constants: Constants;

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
	    static isJust: (maybe: Maybe<any>) => boolean;
	    static isNothing: (maybe: Maybe<any>) => boolean;
	    static of: typeof Maybe.Just;
	    abstract readonly isJust: boolean;
	    abstract readonly isNothing: boolean;
	    /**
	     * Gets the contained value if Just, or throws an `EmptyMaybeException` if Nothing.
	     * If you want to avoid exception, use `tryGetValue()` instead.
	     */
	    abstract readonly value: T;
	    constructor();
	    of: typeof Maybe.Just;
	    /**
	     * Applies the funtion `f` to internal value if Just,
	     * or does nothing if Nothing.
	     */
	    abstract map<TMap>(f: (val: T) => TMap): Maybe<TMap>;
	    /**
	     * Execute the callback function if Nothing,
	     * or does nothing if Just.
	     */
	    abstract orElse(f: () => void): Maybe<T>;
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
	     * Attempts to get the contained value, if there is not, returns the given default value.
	     * @param defaultVal Value to return in case there is no contained value.
	     */
	    abstract tryGetValue(defaultVal: any): T;
	}

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
	    path: string[];
	    /**
	     * The invalid property value.
	     */
	    value: any;
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
	    isCompositePk?: boolean;
	    /**
	     * Whether to validate PK.
	     * This param is IGNORED if param `schemaMapPk` has value.
	     * Default to be `false`.
	     */
	    requirePk?: boolean;
	    /**
	     * Rule to validate model PK.
	     */
	    schemaMapPk?: joi.SchemaMap;
	};
	export interface IModelValidator<T> {
	    readonly schemaMap: joi.SchemaMap;
	    readonly schemaMapPk: joi.SchemaMap;
	    readonly isCompositePk: boolean;
	    /**
	     * Validates model PK.
	     */
	    pk(pk: any): [ValidationError, any];
	    /**
	     * Validates model for creation operation, which doesn't need `pk` property.
	     */
	    whole(target: any, options?: ValidationOptions): [ValidationError, T];
	    /**
	     * Validates model for modification operation, which requires `pk` property.
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
	import { IModelValidator } from '@micro-fleet/common/dist/app/validators/IModelValidator';
	import { ICreateMapFluentFunctions } from '@micro-fleet/common/dist/app/interfaces/automapper';
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
	    protected _isCompositePk: boolean;
	    protected _schemaMapPk?: joi.SchemaMap;
	    /**
	     * Builds a new instance of ModelValidatorBase.
	     */
	    static create<T>({ schemaMapModel, isCompositePk, requirePk, schemaMapPk, }: JoiModelValidatorCreateOptions): JoiModelValidator<T>;
	    /**
	     * Compiled rules for model primary key.
	     */
	    protected _compiledPk: joi.ObjectSchema;
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
	     * @param {boolean} _isCompositePk Whether the primary key is made of multiple properties. Default to `false`
	     *     This param is IGNORED if param `schemaMapPk` has value.
	     * @param {boolean} requirePk Whether to validate ID.
	     *     This param is IGNORED if param `schemaMapPk` has value.
	     * @param {joi.SchemaMap} _schemaMapId Rule to validate model PK.
	     */
	    protected constructor(_schemaMap: joi.SchemaMap, _isCompositePk: boolean, requirePk: boolean, _schemaMapPk?: joi.SchemaMap);
	    readonly schemaMap: joi.SchemaMap;
	    readonly schemaMapPk: joi.SchemaMap;
	    readonly isCompositePk: boolean;
	    /**
	     * @see IModelValidator.pk
	     */
	    pk(pk: any): [ValidationError, any];
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
	/**
	 * Stores a database connection detail.
	 */
	export type DbConnectionDetail = {
	    /**
	     * Database driver name, should use constants in class DbClient.
	     * Eg: DbClient.SQLITE3, DbClient.POSTGRESQL, ...
	     */
	    clientName: string;
	    /**
	     * Connection string for specified `clientName`.
	     */
	    connectionString?: string;
	    /**
	     * Absolute path to database file name.
	     */
	    filePath?: string;
	    host?: {
	        /**
	         * IP Address or Host name.
	         */
	        address: string;
	        /**
	         * Username to login database.
	         */
	        user: string;
	        /**
	         * Password to login database.
	         */
	        password: string;
	        /**
	         * Database name.
	         */
	        database: string;
	    };
	};
	export type CacheConnectionDetail = {
	    /**
	         * Address of remote cache service.
	         */
	    host?: string;
	    /**
	     * Port of remote cache service.
	     */
	    port?: number;
	};
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
	    get(key: string, dataType?: SettingItemDataType): Maybe<PrimitiveType | any[]>;
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
	/**
	 * Base class for ID type.
	 * Models in DDD (domain-driven design) often have ID as a class instance.
	 */
	export abstract class IdBase<T = string> {
	    abstract toArray(): T[];
	    toJSON(): PrimitiveFlatJson;
	}

}
declare module '@micro-fleet/common/dist/app/models/id/SingleId' {
	import { IdBase } from '@micro-fleet/common/dist/app/models/id/IdBase';
	export class SingleId extends IdBase {
	    id: string;
	    constructor(id: string);
	    /**
	     * @override
	     */
	    toArray(): string[];
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
	     */
	    toArray(): string[];
	}

}
declare module '@micro-fleet/common/dist/app/models/settings/CacheSettings' {
	import { CacheConnectionDetail } from '@micro-fleet/common/dist/app/interfaces/configurations';
	import { SettingItem } from '@micro-fleet/common/dist/app/models/settings/SettingItem';
	/**
	 * Represents an array of cache settings.
	 */
	export class CacheSettings extends Array<SettingItem> {
	    	    constructor();
	    /**
	     * Gets number of connection settings.
	     */
	    readonly total: number;
	    /**
	     * Parses then adds a server detail to setting item array.
	     */
	    pushServer(detail: CacheConnectionDetail): void;
	}

}
declare module '@micro-fleet/common/dist/app/models/settings/DatabaseSettings' {
	import { /*IConfigurationProvider,*/ DbConnectionDetail } from '@micro-fleet/common/dist/app/interfaces/configurations';
	import { Maybe } from '@micro-fleet/common/dist/app/models/Maybe';
	import { SettingItem } from '@micro-fleet/common/dist/app/models/settings/SettingItem';
	/**
	 * Represents an array of database settings.
	 */
	export class DatabaseSettings extends Array<SettingItem> {
	    /**
	     * Parses from configuration provider.
	     * @param {IConfigurationProvider} provider.
	     */
	    /**
	     * Parses from connection detail.
	     * @param {DbConnectionDetail} detail Connection detail loaded from JSON data source.
	     */
	    static fromConnectionDetail(detail: DbConnectionDetail): Maybe<DatabaseSettings>;
	    constructor();
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
declare module '@micro-fleet/common/dist/app/models/DomainModelBase' {
	import { IModelAutoMapper } from '@micro-fleet/common/dist/app/translators/IModelAutoMapper';
	export class DomainModelBase implements IDomainModel {
	    /**
	     * @abstract
	     * Function to convert other object to this class type.
	     * This method must be implemented by derived class!
	     */
	    static readonly translator: IModelAutoMapper<any>;
	}

}
declare module '@micro-fleet/common/dist/app/models/PagedArray' {
	/**
	 * A wrapper array that contains paged items.
	 */
	export class PagedArray<T> extends Array<T> {
	    	    /**
	     * Gets total number of items.
	     */
	    readonly total: number;
	    constructor(total?: number, ...items: T[]);
	    /**
	     * Returns a serializable object.
	     */
	    asObject(): {
	        total: number;
	        data: any[];
	    };
	}

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
declare module '@micro-fleet/common/dist/app/lazyInject' {
	/**
	 * Injects value to the decorated property.
	 * Used to decorate properties of a class that's cannot be resolved by dependency container.
	 */
	export function lazyInject(depIdentifier: symbol | string): Function;

}
declare module '@micro-fleet/common' {
	import constantObj = require('@micro-fleet/common/dist/app/constants/index');
	export const constants: constantObj.Constants;
	export * from '@micro-fleet/common/dist/app/interfaces/automapper';
	export * from '@micro-fleet/common/dist/app/interfaces/configurations';
	export * from '@micro-fleet/common/dist/app/models/id/IdBase';
	export * from '@micro-fleet/common/dist/app/models/id/SingleId';
	export * from '@micro-fleet/common/dist/app/models/id/TenantId';
	export * from '@micro-fleet/common/dist/app/models/settings/CacheSettings';
	export * from '@micro-fleet/common/dist/app/models/settings/DatabaseSettings';
	export * from '@micro-fleet/common/dist/app/models/settings/GetSettingRequest';
	export * from '@micro-fleet/common/dist/app/models/settings/SettingItem';
	export * from '@micro-fleet/common/dist/app/models/DomainModelBase';
	export * from '@micro-fleet/common/dist/app/models/Exceptions';
	export * from '@micro-fleet/common/dist/app/models/Maybe';
	export * from '@micro-fleet/common/dist/app/models/PagedArray';
	export * from '@micro-fleet/common/dist/app/models/ServiceContext';
	export * from '@micro-fleet/common/dist/app/translators/AccessorSupportMapper';
	export * from '@micro-fleet/common/dist/app/translators/IModelAutoMapper';
	export * from '@micro-fleet/common/dist/app/translators/ModelAutoMapper';
	export * from '@micro-fleet/common/dist/app/validators/JoiExtended';
	export * from '@micro-fleet/common/dist/app/validators/IModelValidator';
	export * from '@micro-fleet/common/dist/app/validators/JoiModelValidator';
	export * from '@micro-fleet/common/dist/app/validators/ValidationError';
	export * from '@micro-fleet/common/dist/app/DependencyContainer';
	export * from '@micro-fleet/common/dist/app/HandlerContainer';
	export * from '@micro-fleet/common/dist/app/Guard';
	export * from '@micro-fleet/common/dist/app/lazyInject';
	export * from '@micro-fleet/common/dist/app/Types';

}
