
import {Module, DependencyInjection} from 'curli-types';
import {TransportCreator} from './TransportCreator';
import {
    TRANSPORT_TYPE_PROPERTY_NAME,
    TRANSPORTS_CONFIGURATION_PROPERTY_NAME,
    NODEMAILER_SERVICE_NAME,
} from './NodemailerConst';

export class NodemailerModule implements Module {

    public getName (): string {
        return 'NodemailerModule';
    }

    public registerServices (container: DependencyInjection) {
        const transportType = container.get(TRANSPORT_TYPE_PROPERTY_NAME);
        const transportConfiguration = container.get(TRANSPORTS_CONFIGURATION_PROPERTY_NAME);

        const mailService = TransportCreator.create(transportType, transportConfiguration);

        container.registerServiceBuilded(NODEMAILER_SERVICE_NAME, mailService);
    }

}
