"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Service;
(function (Service) {
    /**
     * Number of milliseconds to wait before actually disposing addons.
     * Date type: number
     */
    Service["DEADLETTER_TIMEOUT"] = "svc_deadletter_timeout";
    /**
     * Number of milliseconds to wait before actually exiting the process.
     * Date type: number
     */
    Service["STOP_TIMEOUT"] = "svc_stop_timeout";
    /**
     * Array of addresses to fetch configuration.
     * Data type: string[]
     */
    Service["CONFIG_SERVICE_ADDRESSES"] = "svc_config_service_addresses";
    /**
     * Number of milliseconds between refetchings.
     * Date type: number
     */
    Service["CONFIG_REFETCH_INTERVAL"] = "svc_config_refetch_interval";
    /**
     * Service URL-safe name.
     * Data type: string
     */
    Service["SERVICE_SLUG"] = "svc_slug";
})(Service = exports.Service || (exports.Service = {}));
//# sourceMappingURL=service.js.map