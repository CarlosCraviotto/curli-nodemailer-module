export type TYPE_OF_TRANSPORT = 'smtp' | 'ses' | 'sendmail';

export const TRANSPORT_NAMES: {[key: string]: TYPE_OF_TRANSPORT} = {
    SMTP: 'smtp',
    SES: 'ses',
    SENDMAIL: 'sendmail',
};

/**
 * The name of the service we will register into the container.
 */
export const NODEMAILER_SERVICE_NAME = 'email';

/**
 * The name of the configuration of transport type into the service container
 */
export const TRANSPORT_TYPE_PROPERTY_NAME = '@TRANSPORT_TYPE';

/**
 * The name of the configuration of transport configuration into the service container
 */
export const TRANSPORTS_CONFIGURATION_PROPERTY_NAME = '@TRANSPORTS_CONFIGURATION';
