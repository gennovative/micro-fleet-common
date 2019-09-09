"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const Exceptions_1 = require("../models/Exceptions");
const Guard_1 = require("../utils/Guard");
class BindingScope {
    constructor(_binding) {
        this._binding = _binding;
    }
    asSingleton() {
        this._binding.inSingletonScope();
    }
    asTransient() {
        this._binding.inTransientScope();
    }
}
exports.BindingScope = BindingScope;
class DependencyContainer {
    constructor() {
        this._container = new inversify_1.Container();
    }
    /**
     * @see IDependencyContainer.bind
     */
    bind(identifier, constructor) {
        this.assertNotDisposed();
        Guard_1.Guard.assertArgDefined('constructor', constructor);
        let binding, scope;
        this.unboundIfDuplicate(identifier);
        binding = this._container.bind(identifier).to(constructor);
        scope = new BindingScope(binding);
        return scope;
    }
    /**
     * @see IDependencyContainer.bindConstant
     */
    bindConstant(identifier, value) {
        this.unboundIfDuplicate(identifier);
        this._container.bind(identifier).toConstantValue(value);
    }
    /**
     * @see IDependencyContainer.dispose
     */
    dispose() {
        this._container.unbindAll();
        this._container = null;
    }
    /**
     * @see IDependencyContainer.isBound
     */
    isBound(identifier) {
        return this._container.isBound(identifier);
    }
    /**
     * @see IDependencyContainer.resolve
     */
    resolve(identifier) {
        this.assertNotDisposed();
        try {
            return this._container.get(identifier);
        }
        catch (ex) {
            console.log('Resolve Error: ' + String(ex));
            return null;
        }
    }
    /**
     * @see IDependencyContainer.unbind
     */
    unbind(identifier) {
        this._container.unbind(identifier);
    }
    assertNotDisposed() {
        if (!this._container) {
            throw new Exceptions_1.MinorException('Container has been disposed!');
        }
    }
    unboundIfDuplicate(identifier) {
        if (this._container.isBound(identifier)) {
            this._container.unbind(identifier);
        }
    }
}
exports.DependencyContainer = DependencyContainer;
//# sourceMappingURL=DependencyContainer.js.map