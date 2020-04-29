import {createTransport} from 'nodemailer';
import {DTOType} from 'curli-types';
import {TRANSPORT_NAMES, TYPE_OF_TRANSPORT} from './NodemailerConst';
import Mail from 'nodemailer/lib/mailer';

export const TransportCreator = {
    create (type: TYPE_OF_TRANSPORT, options: DTOType): Mail | never {
        this.checkOptionsForTypeOfTransporter(options, type);
        const optionsTransporter = options[this.getPropertyName(type)];

        let emailService: Mail;

        switch (type) {
            case TRANSPORT_NAMES.SES:
                emailService = this.createSes();
                break;
            case TRANSPORT_NAMES.SENDMAIL:
                emailService = this.createSendmail(optionsTransporter);
                break;
            case TRANSPORT_NAMES.SMTP:
                emailService = this.createSmtp(optionsTransporter);
                break;
            default:
                throw new Error('Unsupported type (' + type + ') of email transporter.');
        }
        return emailService;
    },

    createSes (): Mail | never {
        throw new Error('Unsupported SES for now.');
    },

    createSendmail (options: DTOType): Mail | never {
        return createTransport({
            sendmail: options.sendmail,
            newline: options.newline,
            path: options.path,
        });
    },

    createSmtp (options: DTOType): Mail | never {
        return createTransport({
            pool: options.pool,
            host: options.host,
            port: options.port,
            secure: options.secure, // use TLS
            auth: {
                user: options.user,
                pass: options.pass,
            },
        });
    },

    checkOptionsForTypeOfTransporter (options: DTOType, type: TYPE_OF_TRANSPORT) {
        const propertyName: string = this.getPropertyName(type);
        if (!options.hasOwnProperty(propertyName)) {
            throw new Error('There is not configuration for ' + type + ' transporter (' + propertyName + ')');
        }
    },

    getPropertyName: function (type: TYPE_OF_TRANSPORT) {
        return 'transporter_' + type;
    },
};
