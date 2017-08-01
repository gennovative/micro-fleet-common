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

/**
 * Represents a model that is never really removed from database.
 */
declare interface ISoftDeletable {
	/**
	 * If has value, this model is marked as deleted.
	 * Otherwise, it is still active.
	 */
	deletedAt?: Date;
}

/**
 * Represents a model whose history is tracked.
 */
declare interface IAuditable {
	/**
	 * The time when this model is created.
	 */
	createdAt: Date;

	/**
	 * The time when this model is last edited.
	 */
	updatedAt: Date;
}

/**
 * Represents a model that can be added more properties.
 */
declare interface IExtensible {
	/**
	 * Contains additional properties.
	 */
	attributes?: any; // Should map to JSON type in PostreSQL.
}

