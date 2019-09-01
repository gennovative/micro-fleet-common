"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Serves as a global variables container.
 */
exports.serviceContext = {
    /**
     * Gets dependency container.
     */
    get dependencyContainer() {
        return process['microfleetDepCon'];
    },
    /**
     * Sets dependency container. Must be set before add-ons initialization phase.
     */
    setDependencyContainer(container) {
        // Store in process instance to make sure this function works
        // even when multiple @micro-fleet/common versions being used by diffrent packages.
        process['microfleetDepCon'] = container;
    },
};
//# sourceMappingURL=ServiceContext.js.map