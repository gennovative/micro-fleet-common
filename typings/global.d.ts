/**
 * Basically a string, but presents a 64-bit big integer value.
 */
type BigSInt = string;

/**
 * Represents a data transfer object, aka: business model.
 */
declare interface IModelDTO {
	id: BigSInt;
}