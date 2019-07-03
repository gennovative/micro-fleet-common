"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SvcSettingKeys;
(function (SvcSettingKeys) {
    /**
     * Number of milliseconds to wait before actually disposing addons.
     * Date type: number
     */
    SvcSettingKeys["DEADLETTER_TIMEOUT"] = "svc_deadletter_timeout";
    /**
     * Number of milliseconds to wait before actually exiting the process.
     * Date type: number
     */
    SvcSettingKeys["STOP_TIMEOUT"] = "svc_stop_timeout";
    /**
     * Array of addresses to fetch configuration.
     * Data type: string[]
     */
    SvcSettingKeys["CONFIG_SERVICE_ADDRESSES"] = "svc_config_service_addresses";
    /**
     * Number of milliseconds between refetchings.
     * Date type: number
     */
    SvcSettingKeys["CONFIG_REFETCH_INTERVAL"] = "svc_config_refetch_interval";
    /**
     * Service URL-safe name.
     * Data type: string
     */
    SvcSettingKeys["SERVICE_SLUG"] = "svc_slug";
})(SvcSettingKeys = exports.SvcSettingKeys || (exports.SvcSettingKeys = {}));
//# sourceMappingURL=service.js.map