import {
    IAuthenticateGeneric,
    ICredentialTestRequest,
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class TinyErpApi implements ICredentialType {
    name = 'tinyErpApi';
    displayName = 'Tiny ERP API';
    // Documentation Link: https://tiny.com.br/api-docs/api
    documentationUrl = 'https://tiny.com.br/api-docs/api';
    properties: INodeProperties[] = [
        {
            displayName: 'API Token',
            name: 'token',
            type: 'string',
            typeOptions: {
                password: true,
            },
            default: '',
            required: true,
            description: 'The API Token for Tiny ERP V2',
        },
    ];

    authenticate: IAuthenticateGeneric = {
        type: 'generic',
        properties: {
            qs: {
                token: '={{$credentials.token}}',
            },
        },
    };

    test: ICredentialTestRequest = {
        request: {
            baseURL: 'https://api.tiny.com.br/api2',
            url: '/info.php',
            qs: {
                // The token is automatically injected by `authenticate` block above
                formato: 'json'
            },
        },
    };
}
