
/**
 * A data type representing a class.
 */
export type Newable<T = any> = (new (...args: any[]) => T)

/**
 * If an object wants to be initialized when microservice proccess starts, it must
 * implements this interface to be able to add to add-on list.
 */
export interface IServiceAddOn {
    /**
     * Gets add-on name.
     */
    readonly name: string

    /**
     * Initializes this add-on.
     * @returns A promise that resolves `true` if success, rejects if otherwise.
     */
    init(): Promise<void>

    /**
     * Invoked before `dispose` is called.
     */
    deadLetter(): Promise<void>

    /**
     * Stops this add-on and cleans all resources.
     */
    dispose(): Promise<void>

}

/**
 * Represents a state object
 */
export interface IDomainState {

    [key: string]: any

    /**
     * Checks if any of its properties has been changed
     */
    isDirty(): boolean

    /**
     * Checks if the given property name has its value changed.
     */
    isPropDirty(prop: string): boolean

    /**
     * Gets an object containing modified properties
     */
    getChanges(): object
}

/**
 * Represents an object backed by a state
 */
export interface IStateBacked {
    readonly state: IDomainState
}

export interface ISerializable {
    toJSON(): object
}
