"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Serves as a global variables container.
 */
class ServiceContext {
    /**
     * Gets dependency container.
     */
    get dependencyContainer() {
        return this._depContainer;
    }
    /**
     * Sets dependency container. Must be set before add-ons initialization phase.
     */
    setDependencyContainer(container) {
        this._depContainer = container;
    }
}
exports.ServiceContext = ServiceContext;
exports.serviceContext = new ServiceContext();
//# sourceMappingURL=ServiceContext.js.map