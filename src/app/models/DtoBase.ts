import { ModelAutoMapper } from '@micro-fleet/common';

export class DtoBase implements IModelDTO {

	/**
	 * @abstract
	 */
	public static get translator(): ModelAutoMapper<DtoBase> {
		throw 'This method must be implemented by derived class!';
	}

}