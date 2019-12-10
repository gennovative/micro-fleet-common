"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RPC;
(function (RPC) {
    /**
     * Number of milliseconds after which RPC caller stops waiting for response.
     *
     * Data type: number
     */
    RPC["RPC_CALLER_TIMEOUT"] = "rpc_caller_timeout";
    /**
     * Number of milliseconds that the messages sent by RPC caller can live.
     * This will override `MSG_BROKER_MSG_EXPIRE` setting.
     *
     * Data type: number
     */
    RPC["RPC_CALLER_MSG_EXPIRE"] = "rpc_caller_msg_expr";
    /**
     * Http port to which HTTP RPC handler listens.
     *
     * Data type: number
     */
    RPC["RPC_HANDLER_PORT"] = "rpc_handler_port";
})(RPC = exports.RPC || (exports.RPC = {}));
//# sourceMappingURL=rpc.js.map