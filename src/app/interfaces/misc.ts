
/**
 * A data type representing Javascript primitive types.
 */
export type PrimitiveType = string | number | boolean | bigint

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

export interface ISerializable {
    toJSON(): object
}
