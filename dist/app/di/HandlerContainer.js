"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceContext_1 = require("./ServiceContext");
const Guard_1 = require("../utils/Guard");
class HandlerContainer {
    static get instance() {
        if (!this._instance) {
            this._instance = new HandlerContainer();
        }
        return this._instance;
    }
    constructor() {
        this._handlers = [];
    }
    get dependencyContainer() {
        return ServiceContext_1.serviceContext.dependencyContainer;
    }
    /**
     * Removes all registered handlers
     */
    clear() {
        this._handlers = [];
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
    register(actions, dependencyIdentifier, actionFactory, paramCount = 0) {
        Guard_1.Guard.assertArgDefined('action', actions);
        Guard_1.Guard.assertArgDefined('dependencyIdentifier', dependencyIdentifier);
        const doRegister = function (act, depId) {
            this._handlers[`${dependencyIdentifier}::${act}`] = { dependencyIdentifier, actionFactory };
            const proxy = (function (pxAction, pxDepId, context) {
                const resolve = function () {
                    return context.resolve(pxAction, pxDepId).apply(this, arguments);
                };
                Object.defineProperty(resolve, 'length', { value: paramCount });
                return resolve;
            })(act, depId, this);
            return proxy;
        }.bind(this);
        if (Array.isArray(actions)) {
            return actions.map(act => doRegister(act, dependencyIdentifier));
        }
        else {
            return doRegister(actions, dependencyIdentifier);
        }
    }
    /**
     * Looks up and returns a function that was registered to bind with `action`.
     * @param action Key to look up.
     *
     * @param {string} dependencyIdentifier Key to look up and resolve from dependency container.
     */
    resolve(action, dependencyIdentifier) {
        Guard_1.Guard.assertIsDefined(this.dependencyContainer, `Dependency container is not set in serviceContext!`);
        const detail = this._handlers[`${dependencyIdentifier}::${action}`];
        Guard_1.Guard.assertIsDefined(detail, `Action "${action}" was not registered!`);
        return this.resolveActionFunc(action, detail.dependencyIdentifier, detail.actionFactory);
    }
    resolveActionFunc(action, depId, actFactory) {
        // Attempt to resolve object instance
        const instance = this.dependencyContainer.resolve(depId);
        Guard_1.Guard.assertIsDefined(instance, `Cannot resolve dependency "${depId.toString()}"!`);
        // If function factory is specified, then get action from it.
        const actionFnFromFactory = (actFactory ? actFactory(instance, action) : null);
        // If factory returns falsy value, fall back to default function
        const actionFn = actionFnFromFactory || instance[action];
        Guard_1.Guard.assertIsDefined(actionFn, `Action "${action}" does not exist in object "${depId.toString()}"!`);
        return actionFn.bind(instance);
    }
}
exports.HandlerContainer = HandlerContainer;
//# sourceMappingURL=HandlerContainer.js.map