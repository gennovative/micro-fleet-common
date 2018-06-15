import { ModelAutoMapper } from '@micro-fleet/common';

export class DtoBase implements IModelDTO {

	/**
	 * @abstract
	 * Function to convert other object to this class type.
	 * This method must be implemented by derived class!
	 */
	public static readonly translator: ModelAutoMapper<any> = undefined;
}