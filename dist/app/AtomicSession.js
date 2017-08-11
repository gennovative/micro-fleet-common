"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Wraps a database transaction and provides methods to
 * end the transaction either succefully or unsuccefully.
 */
class AtomicSession {
    constructor(knexConnection, knexTransaction) {
        this.knexConnection = knexConnection;
        this.knexTransaction = knexTransaction;
    }
}
exports.AtomicSession = AtomicSession;

//# sourceMappingURL=AtomicSession.js.map
