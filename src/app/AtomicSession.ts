/**
 * Wraps a database transaction and provides methods to 
 * end the transaction either succefully or unsuccefully.
 */
export class AtomicSession {

	constructor(
		public knexConnection,
		public knexTransaction
	) {
	}
}