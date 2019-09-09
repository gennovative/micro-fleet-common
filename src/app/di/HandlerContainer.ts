import { IDependencyContainer } from './DependencyContainer'
import { serviceContext } from './ServiceContext'
import { Guard } from '../utils/Guard'


export type ActionFactory = (obj: any, action: string) => Function

export type HandlerDetails = {
    dependencyIdentifier: string;
    actionFactory?: ActionFactory;
}

export class HandlerContainer {
    private static _instance: HandlerContainer

    public static get instance(): HandlerContainer {
        if (!this._instance) {
            this._instance = new HandlerContainer()
        }
        return this._instance
    }


    private _handlers: HandlerDetails[]


    private constructor() {
        this._handlers = []
    }

    public get dependencyContainer(): IDependencyContainer {
        return serviceContext.dependencyContainer
    }

    /**
     * Removes all registered handlers
     */
    public clear(): void {
        this._handlers = []
    }

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
    public register(actions: string | string[], dependencyIdentifier: string, actionFactory?: ActionFactory,
            paramCount: number = 0): Function | Function[] {
        Guard.assertArgDefined('action', actions)
        Guard.assertArgDefined('dependencyIdentifier', dependencyIdentifier)

        const doRegister = function(this: HandlerContainer, act: string, depId: string): Function {
            this._handlers[`${dependencyIdentifier}::${act}`] = { dependencyIdentifier, actionFactory }
            const proxy = (function(pxAction: string, pxDepId: string, context: HandlerContainer) {
                    const resolve = function(this: any) {
                        return context.resolve(pxAction, pxDepId).apply(this, arguments)
                    }
                    Object.defineProperty(resolve, 'length', { value: paramCount })
                    return resolve
                })(act, depId, this)
            return proxy
        }.bind(this)

        if (Array.isArray(actions)) {
            return <any>actions.map(act => doRegister(act, dependencyIdentifier))
        }
        return doRegister(actions, dependencyIdentifier)
    }

    /**
     * Looks up and returns a function that was registered to bind with `action`.
     * @param action Key to look up.
     *
     * @param {string} dependencyIdentifier Key to look up and resolve from dependency container.
     */
    public resolve(action: string, dependencyIdentifier: string): Function {
        Guard.assertIsDefined(this.dependencyContainer, `Dependency container is not set in serviceContext!`)
        const detail: HandlerDetails = this._handlers[`${dependencyIdentifier}::${action}`]
        Guard.assertIsDefined(detail, `Action "${action}" was not registered!`)
        return this.resolveActionFunc(action, detail.dependencyIdentifier, detail.actionFactory)
    }


    private resolveActionFunc(action: string, depId: string, actFactory: ActionFactory): Function {
        // Attempt to resolve object instance
        const instance = this.dependencyContainer.resolve<any>(depId)
        Guard.assertIsDefined(instance, `Cannot resolve dependency "${depId.toString()}"!`)

        // If function factory is specified, then get action from it.
        const actionFnFromFactory = (actFactory ? actFactory(instance, action) : null)

        // If factory returns falsy value, fall back to default function
        const actionFn = actionFnFromFactory || instance[action]

        Guard.assertIsDefined(actionFn, `Action "${action}" does not exist in object "${depId.toString()}"!`)

        return actionFn.bind(instance)
    }
}
