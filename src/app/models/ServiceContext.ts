import { IDependencyContainer } from '../DependencyContainer';


/**
 * Serves as a global variables container.
 */
export class ServiceContext {

	private _depContainer: IDependencyContainer;

	/**
	 * Gets dependency container.
	 */
	public get dependencyContainer(): IDependencyContainer {
		return this._depContainer;
	}

	/**
	 * Sets dependency container. Must be set before add-ons initialization phase.
	 */
	public setDependencyContainer(container: IDependencyContainer): void {
		this._depContainer = container;
	}
}

export const serviceContext = new ServiceContext();