import { IDependencyContainer } from './DependencyContainer'


/**
 * Serves as a global variables container.
 */
export const serviceContext = {

    /**
     * Gets dependency container.
     */
    get dependencyContainer(): IDependencyContainer {
        return process['microfleetDepCon']
    },

    /**
     * Sets dependency container. Must be set before add-ons initialization phase.
     */
    setDependencyContainer(container: IDependencyContainer): void {
        // Store in process instance to make sure this function works
        // even when multiple @micro-fleet/common versions being used by diffrent packages.
        process['microfleetDepCon'] = container
    },
}
