export enum Web {

    /**
     * Configuration for Cross-Origin Resource Sharing.
     * Type: string | string[]
     */
    WEB_CORS = 'web_cors',

    /**
     * Whether to start HTTPS server.
     * Type: boolean
     */
    WEB_SSL_ENABLED = 'web_ssl_enabled',

    /**
     * Whether to redirect all HTTP request to HTTPS endpoints.
     * Type: boolean
     */
    WEB_SSL_ONLY = 'web_ssl_only',

    /**
     * Path to SSL key file.
     * Type: string
     */
    WEB_SSL_KEY_FILE = 'web_ssl_key_file',

    /**
     * Path to SSL cert file.
     * Type: string
     */
    WEB_SSL_CERT_FILE = 'web_ssl_cert_file',

    /**
     * HTTPS port listened by webserver.
     * Type: number
     */
    WEB_SSL_PORT = 'web_ssl_port',

    /**
     * HTTP port listened by webserver.
     * Type: number
     */
    WEB_PORT = 'web_port',

    /**
     * Prefix to route url.
     * Type: string
     */
    WEB_URL_PREFIX = 'web_url_prefix',
}
