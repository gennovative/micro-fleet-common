/// <reference types="automapper-ts" />

/**
 * Workaround to avoid error when external library
 * doesn't have type definition.
 */
//declare module '*';

declare namespace NodeJS {
    export interface Global {
        gennova: any;
    }
}

/**
 * A data type representing Json object.
 */
interface Json {
    [x: string]: string | number | boolean | Date | Json | JsonArray;
}

interface JsonArray extends Array<string | number | boolean | Date | Json | JsonArray> { }

// Based on ES6 native Promise definition
declare type PromiseResolveFn = (value?: any | PromiseLike<any>) => void;
declare type PromiseRejectFn = (reason?: any) => void;

/**
 * A data type representing a class.
 */
declare type Newable<T=any> = (new (...args: any[]) => T);

/**
 * A data type representing Javascript primitive types.
 */
declare type PrimitiveType = string | number | boolean | bigint;

/**
 * A data type representing a single-leveled Json-like object.
 */
declare type PrimitiveFlatJson = {
    [x: string]: PrimitiveType
};

declare type FunctionType<T=void> = (...args: any[]) => T;


/**
 * A datatype that presents composite primary key.
 */
declare type TenantPk = {
    id: string,
    tenantId: string,
};

/**
 * A datatype that presents non-primary unique properties.
 */
declare type NameUk = {
    name: string
}

declare type PkType = string | TenantPk;

/**
 * Represents a domain model object, aka: business model.
 */
declare interface IDomainModel {
    id?: string;
    tenantId?: string;
}

/**
 * Represents a model that is tracked when it is created and last updated.
 */
declare interface IAuditable extends IDomainModel {
    /**
     * The time when this model is created.
     */
    createdAt?: string;

    /**
     * The time when this model is last updated.
     */
    updatedAt?: string;
}

/**
 * Represents a model that is stored in database but isn't
 * included in normal queries.
 */
declare interface IArchivable extends IDomainModel {
    /**
     * If has value, this model is marked as archived.
     * Otherwise, it is still active.
     */
    archivedAt?: string;
}

/**
 * Represents a model that is never really removed from database.
 */
declare interface ISoftDeletable extends IDomainModel {
    /**
     * If has value, this model is marked as deleted.
     * Otherwise, it is still active.
     */
    deletedAt?: string;
}

/**
 * Represents a model that can be added more properties.
 */
declare interface IExtensible extends IDomainModel {
    /**
     * Contains additional properties.
     */
    attributes?: any; // Should map to JSON type in PostreSQL.
}


/**
 * Represents a model whose history is tracked.
 */
declare interface IVersionControlled extends IDomainModel {
    /**
     * The time when this version is created.
     */
    createdAt: string;

    /**
     * Whether this is official version.
     */
    isMain: boolean;

    /**
     * The version of records with same Id.
     */
    version: number;
}


/**
 * If an object wants to be initialized when microservice proccess starts, it must
 * implements this interface to be able to add to add-on list.
 */
declare interface IServiceAddOn {
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