export enum Service {
    /**
     * Number of milliseconds to wait before actually disposing addons.
     * Date type: number
     */
    DEADLETTER_TIMEOUT = 'svc_deadletter_timeout',

    /**
     * Number of milliseconds to wait before actually exiting the process.
     * Date type: number
     */
    STOP_TIMEOUT = 'svc_stop_timeout',

    /**
     * Array of addresses to fetch configuration.
     * Data type: string[]
     */
    CONFIG_SERVICE_ADDRESSES = 'svc_config_service_addresses',

    /**
     * Number of milliseconds between refetchings.
     * Date type: number
     */
    CONFIG_REFETCH_INTERVAL = 'svc_config_refetch_interval',

    /**
     * Service URL-safe name.
     * Data type: string
     */
    SERVICE_SLUG = 'svc_slug',
}
