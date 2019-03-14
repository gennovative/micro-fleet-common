import { ModelAutoMapper } from '../translators/ModelAutoMapper'

export class DtoBase implements IModelDTO {

    /**
     * @abstract
     * Function to convert other object to this class type.
     * This method must be implemented by derived class!
     */
    public static readonly translator: ModelAutoMapper<any> = undefined
}
