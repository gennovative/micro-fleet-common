import { ModelAutoMapper } from '../translators/ModelAutoMapper'

export class DomainModelBase implements IDomainModel {

    /**
     * @abstract
     * Function to convert other object to this class type.
     * This method must be implemented by derived class!
     */
    public static readonly translator: ModelAutoMapper<any> = undefined
}
