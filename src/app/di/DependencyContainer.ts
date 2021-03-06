import { Container, interfaces } from 'inversify'

import { Newable } from '../interfaces/misc'
import { MinorException } from '../models/Exceptions'
import { Guard } from '../utils/Guard'



export type Factory<T> = (...args: any[]) => (((...args: any[]) => T) | T)
export type FactoryCreator<T> = (container: IDependencyContainer, context?: interfaces.Context) => Factory<T>

export class BindingScope<T> {

    constructor(private _binding: interfaces.BindingInWhenOnSyntax<T>) {

    }

    public asSingleton(): void {
        this._binding.inSingletonScope()
    }

    public asTransient(): void {
        this._binding.inTransientScope()
    }
}

export interface IDependencyContainer {
    /**
     * The underlying Inversify container instance.
     */
    readonly container: Container

    /**
     * Registers `constructor` as resolvable with key `identifier`.
     * @param {string | symbol} identifier - The key used to resolve this dependency.
     * @param {INewable<TInterface>} constructor - A class that will be resolved with `identifier`.
     *
     * @return {BindingScope} - A BindingScope instance that allows settings dependency as singleton or transient.
     */
    bindConstructor<TInterface>(identifier: string | symbol, constructor: Newable<TInterface>): BindingScope<TInterface>

    /**
     * Registers a function `factoryCreatorFn` as resolvable with key `identifier`. The function is then used to create
     * new instace of `TInterface`.
     * @param {string | symbol} identifier - The key used to resolve this dependency.
     * @param {FactoryCreator<TInterface>} factoryCreatorFn - The function for creating
     * new instace of `TInterface`.
     *
     * @return {BindingScope} - A BindingScope instance that allows settings dependency as singleton or transient.
     */
    bindFactory<TInterface>(identifier: string | symbol, factoryCreatorFn: FactoryCreator<TInterface>): void

    /**
     * Registers a constant value with key `identifier`.
     * @param {string | symbol} identifier - The key used to resolve this dependency.
     * @param {T} value - The constant value to store.
     */
    bindConstant<T>(identifier: string | symbol, value: T): void

    /**
     * Gets rid of all registered dependencies.
     */
    dispose(): void

    /**
     * Checks if an identifier is bound with any dependency.
     */
    isBound(identifier: string | symbol): boolean

    /**
     * Retrieves an instance of dependency with all its own dependencies resolved.
     * @param {string | Symbol} - The key that was used to register before.
     *
     * @return {T} - An instance of registered type, or null if that type was not registered.
     */
    resolve<T>(identifier: string | symbol): T

    /**
     * Gets rid of the dependency related to this identifier.
     */
    unbind(identifier: string | symbol): void
}

export class DependencyContainer {
    private _container: Container

    /**
     * Gets Inversify's container instance
     */
    public get container(): Container {
        return this._container
    }

    constructor() {
        this._container = new Container()
    }


    /**
     * @see IDependencyContainer.bindConstructor
     */
    public bindConstructor<TInterface>(identifier: string | symbol, constructor: Newable<TInterface>): BindingScope<TInterface> {
        this.assertNotDisposed()
        Guard.assertArgDefined('constructor', constructor)

        let binding, scope

        this.unboundIfDuplicate(identifier)

        binding = this._container.bind<TInterface>(identifier).to(constructor)
        scope = new BindingScope<TInterface>(binding)

        return scope
    }

    /**
     * @see IDependencyContainer.bindFactory
     */
    public bindFactory<TInterface>(identifier: string | symbol, factoryCreatorFn: FactoryCreator<TInterface>): void {
        this.assertNotDisposed()
        Guard.assertArgDefined('constructor', factoryCreatorFn)

        this.unboundIfDuplicate(identifier)

        this._container
            .bind<interfaces.Factory<TInterface>>(identifier)
            .toFactory<TInterface>((context: interfaces.Context) => factoryCreatorFn(this, context))
    }

    /**
     * @see IDependencyContainer.bindConstant
     */
    public bindConstant<T>(identifier: string | symbol, value: T): void {
        this.unboundIfDuplicate(identifier)
        this._container.bind<T>(identifier).toConstantValue(value)
    }

    /**
     * @see IDependencyContainer.dispose
     */
    public dispose(): void {
        this._container.unbindAll()
        this._container = null
    }

    /**
     * @see IDependencyContainer.isBound
     */
    public isBound(identifier: string | symbol): boolean {
        return this._container.isBound(identifier)
    }

    /**
     * @see IDependencyContainer.resolve
     */
    public resolve<T>(identifier: string | symbol): T {
        this.assertNotDisposed()
        try {
            return this._container.get<T>(identifier)
        } catch (ex) {
            console.log('Resolve Error: ' + String(ex))
            return null
        }
    }

    /**
     * @see IDependencyContainer.unbind
     */
    public unbind(identifier: string | symbol): void {
        this._container.unbind(identifier)
    }


    private assertNotDisposed() {
        if (!this._container) {
            throw new MinorException('Container has been disposed!')
        }
    }

    private unboundIfDuplicate(identifier: string | symbol): void {
        if (this._container.isBound(identifier)) {
            this._container.unbind(identifier)
        }
    }
}
