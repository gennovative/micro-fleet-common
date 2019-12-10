export enum MessageBroker {
    /**
     * IP or host name of message broker.
     *
     * Data type: string
     */
    MSG_BROKER_HOST = 'msgBroker_host',

    /**
     * Exchange name on message broker.
     *
     * Data type: string
     */
    MSG_BROKER_EXCHANGE = 'msgBroker_exchange',

    /**
     * Default queue name for RPC handler to connect to.
     *
     * Data type: string
     */
    MSG_BROKER_HANDLER_QUEUE = 'msgBroker_handler_queue',

    /**
     * Number of milliseconds to delay before reconnect to message broker.
     *
     * Data type: number
     */
    MSG_BROKER_RECONN_TIMEOUT = 'msgBroker_reconnectTimeout',

    /**
     * Username to log into message broker.
     *
     * Data type: string
     */
    MSG_BROKER_USERNAME = 'msgBroker_username',

    /**
     * Password to log into message broker.
     *
     * Data type: string
     */
    MSG_BROKER_PASSWORD = 'msgBroker_password',

    /**
     * Number of milliseconds that messages can live.
     * This is the default value for all created connection, unless overriden by
     * other settings, such as `RPC_CALLER_MSG_EXPIRE`.
     *
     * Data type: number
     */
    MSG_BROKER_MSG_EXPIRE = 'msgBroker_msg_expr',
}
