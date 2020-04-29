import chai = require('chai');
import {ImportMock} from 'ts-mock-imports';

import {NodemailerModule} from '../../NodemailerModule';
import * as nodemailerModuleLibrary from 'nodemailer';

import {DependencyInjectionMock} from 'curli-types';
import * as sinon from 'sinon';

let nodemailerModule: NodemailerModule,
    createTransport: any;

describe('NodemailerModule class tests', function () {

    beforeEach(() => {
        nodemailerModule = new NodemailerModule();
    });

    before(() => {
        createTransport = ImportMock.mockFunction(nodemailerModuleLibrary, 'createTransport');
        createTransport.returns({});
    });

    after(() => {
        ImportMock.restore();
    });

    it('Should return the name', function () {
        chai.assert.deepEqual('NodemailerModule', nodemailerModule.getName());
    });

    it('Should create a service for smtp', function () {

        const smtpConfig = {
            'transporter_smtp': {
                'host': 'smtp.gmail.com',
                'port': 587,
                'secure': false,
                'user': 'one@gmail.com',
                'pass': 'abababab',
            }
        };

        const servicesToBeRegistered: Array<string> = [];

        const stubGetContainer = sinon.stub((DependencyInjectionMock.prototype), 'get');
        stubGetContainer.withArgs('@TRANSPORT_TYPE').returns('smtp');
        stubGetContainer.withArgs('@TRANSPORTS_CONFIGURATION').returns(smtpConfig);

        const container = new DependencyInjectionMock();

        container.registerServiceBuilded = (serviceName, _service) => {
            servicesToBeRegistered.push(serviceName);
        };

        nodemailerModule.registerServices(container);
        chai.assert.deepEqual(['email'], servicesToBeRegistered);
        stubGetContainer.restore();
    });

    it('Should throw an error when try to send no configuration for the transport type.', function () {
        const stubGetContainer = sinon.stub((DependencyInjectionMock.prototype), 'get');
        stubGetContainer.withArgs('@TRANSPORT_TYPE').returns('smtp');
        stubGetContainer.withArgs('@TRANSPORTS_CONFIGURATION').returns({});

        const container = new DependencyInjectionMock();

        chai.assert.throws(function () {
            nodemailerModule.registerServices(container);
        }, 'There is not configuration for smtp transporter (transporter_smtp)');
        stubGetContainer.restore();
    });

    it('Should throw an error when send wrong transport type.', function () {
        const smtpConfig = {transporter_notExist: {}};

        const stubGetContainer = sinon.stub((DependencyInjectionMock.prototype), 'get');
        stubGetContainer.withArgs('@TRANSPORT_TYPE').returns('notExist');
        stubGetContainer.withArgs('@TRANSPORTS_CONFIGURATION').returns(smtpConfig);

        const container = new DependencyInjectionMock();

        chai.assert.throws(function () {
            nodemailerModule.registerServices(container);
        }, 'Unsupported type (notExist) of email transporter');
        stubGetContainer.restore();
    });

});
