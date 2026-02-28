import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
    NodeApiError,
} from 'n8n-workflow';

export class TinyErp implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Tiny ERP',
        name: 'tinyErp',
        icon: 'file:tinyerp.svg',
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["operation"] + " " + $parameter["resource"]}}',
        description: 'Consume Tiny ERP API V2',
        defaults: {
            name: 'Tiny ERP',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'tinyErpApi',
                required: true,
            },
        ],
        requestDefaults: {
            baseURL: 'https://api.tiny.com.br/api2',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        },
        properties: [
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                noDataExpression: true,
                options: [
                    { name: 'Conta (Info)', value: 'info' },
                    { name: 'Contato', value: 'contatos' },
                    { name: 'Produto', value: 'produtos' },
                    { name: 'Tag de Produto', value: 'tags' },
                    { name: 'Grupo de Tag de Produto', value: 'gruposTag' },
                    { name: 'Lista de Preços', value: 'listasPrecos' },
                    { name: 'Vendedor', value: 'vendedores' },
                    { name: 'CRM', value: 'crm' },
                    { name: 'Conta a Receber', value: 'contasReceber' },
                    { name: 'Conta a Pagar', value: 'contasPagar' },
                    { name: 'Webhook', value: 'webhooks' },
                    { name: 'Frete', value: 'fretes' },
                    { name: 'Pedido', value: 'pedidos' },
                    { name: 'PDV', value: 'pdv' },
                    { name: 'Nota Fiscal', value: 'notasFiscais' },
                    { name: 'Expedição', value: 'expedicao' },
                    { name: 'Nota Fiscal de Serviço', value: 'notasServico' },
                    { name: 'Contrato', value: 'contratos' },
                    { name: 'Separação', value: 'separacao' },
                    { name: 'Tabelas Vinculadas', value: 'tabelas' },
                ],
                default: 'produtos',
            },
            // ==========================================
            //                 INFO (CONTA)
            // ==========================================
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: { show: { resource: ['info'] } },
                options: [
                    { name: 'Obter Info', value: 'info', description: 'Retorna informações da conta', action: 'Obter info da conta' }
                ],
                default: 'info',
            },

            // ==========================================
            //                 CONTATOS
            // ==========================================
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: { show: { resource: ['contatos'] } },
                options: [
                    { name: 'Pesquisar', value: 'pesquisar', action: 'Pesquisar contatos' },
                    { name: 'Obter', value: 'obter', action: 'Obter um contato' },
                    { name: 'Incluir', value: 'incluir', action: 'Incluir um contato' },
                    { name: 'Alterar', value: 'alterar', action: 'Alterar um contato' },
                ],
                default: 'pesquisar',
            },

            // ==========================================
            //                 PRODUTOS
            // ==========================================
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: { show: { resource: ['produtos'] } },
                options: [
                    { name: 'Pesquisar', value: 'pesquisar', action: 'Pesquisar produtos' },
                    { name: 'Obter', value: 'obter', action: 'Obter um produto' },
                    { name: 'Incluir', value: 'incluir', action: 'Incluir um produto' },
                    { name: 'Alterar', value: 'alterar', action: 'Alterar um produto' },
                    { name: 'Obter Estoque', value: 'estoque', action: 'Obter estoque de um produto' },
                    { name: 'Obter Estrutura', value: 'estrutura', action: 'Obter estrutura de um produto' },
                    { name: 'Obter Tags', value: 'tags', action: 'Obter tags de um produto' },
                    { name: 'Obter Alterados', value: 'alterados', action: 'Lista produtos alterados' },
                    { name: 'Atualizar Estoque', value: 'atualizarEstoque', action: 'Atualizar estoque' },
                    { name: 'Atualizar Preços', value: 'atualizarPrecos', action: 'Atualizar preços' },
                ],
                default: 'pesquisar',
            },

            // ==========================================
            //                 PEDIDOS
            // ==========================================
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: { show: { resource: ['pedidos'] } },
                options: [
                    { name: 'Pesquisar', value: 'pesquisar', action: 'Pesquisar pedidos' },
                    { name: 'Obter', value: 'obter', action: 'Obter um pedido' },
                    { name: 'Incluir', value: 'incluir', action: 'Incluir um pedido' },
                    { name: 'Alterar', value: 'alterar', action: 'Alterar um pedido' },
                    { name: 'Gerar Ordem Produção', value: 'gerarOrdemProducao', action: 'Gerar ordem de produção' },
                    { name: 'Gerar Nota Fiscal', value: 'gerarNotaFiscal', action: 'Gerar nota fiscal' },
                    { name: 'Atualizar Despacho (Rastreio)', value: 'cadastrarCodigoRastreamento', action: 'Cadastrar rastreamento' },
                    { name: 'Atualizar Situação', value: 'alterarSituacao', action: 'Alterar situação' },
                    { name: 'Lançar Estoque', value: 'lancarEstoque', action: 'Lançar estoque' },
                    { name: 'Lançar Contas', value: 'lancarContas', action: 'Lançar contas' },
                ],
                default: 'pesquisar',
            },

            // ==========================================
            //                 NOTAS FISCAIS
            // ==========================================
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: { show: { resource: ['notasFiscais'] } },
                options: [
                    { name: 'Pesquisar', value: 'pesquisar', action: 'Pesquisar notas fiscais' },
                    { name: 'Obter', value: 'obter', action: 'Obter uma nota fiscal' },
                    { name: 'Incluir', value: 'incluir', action: 'Incluir uma nota fiscal' },
                    { name: 'Emitir', value: 'emitir', action: 'Emitir uma nota fiscal' },
                    { name: 'Obter Link', value: 'obterLink', action: 'Obter link da nota fiscal' },
                    { name: 'Obter XML', value: 'obterXml', action: 'Obter XML da nota fiscal' },
                ],
                default: 'pesquisar',
            },

            // ==========================================
            //           COMMON FIELDS (All Configs)
            // ==========================================
            // The JSON Parameters
            {
                displayName: 'JSON Parameters (Request Body / Query)',
                name: 'jsonParameters',
                type: 'json',
                default: '{}',
                description: 'Enter parameters in JSON format. E.g., {"pesquisa": "celular", "id": 123456}. Consult Tiny ERP API Docs for the required fields for your specific Operation.',
            },
            {
                displayName: 'Send as Array (For Incluir/Alterar XML/JSON)',
                name: 'sendAsArray',
                type: 'boolean',
                default: false,
                description: 'Whether some endpoints expect the data wrapped in specific array keys. Often TinyERP expects form-data like "detalhes" or root objects. This node sends standard application/x-www-form-urlencoded mapping the JSON keys you provide.',
            },
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];

        for (let i = 0; i < items.length; i++) {
            try {
                const resource = this.getNodeParameter('resource', i) as string;
                const operation = this.getNodeParameter('operation', i) as string;
                let jsonParametersStr = this.getNodeParameter('jsonParameters', i, '{}') as string;

                let jsonParams = {};
                try {
                    jsonParams = JSON.parse(jsonParametersStr);
                } catch (e) {
                    throw new NodeApiError(this.getNode(), { message: 'Invalid JSON in JSON Parameters field' } as any);
                }

                // TinyERP API V2 Endpoint Structure: /api2/{resource}.{operation}.php
                // Exceptions exist, but generally it's:
                let endpointPrefix = resource;
                if (resource === 'contatos') endpointPrefix = 'contatos';
                if (resource === 'produtos') endpointPrefix = 'produtos';
                if (resource === 'notasFiscais') endpointPrefix = 'notas.fiscais';
                if (resource === 'contasReceber') endpointPrefix = 'contas.receber';
                if (resource === 'contasPagar') endpointPrefix = 'contas.pagar';

                let endpoint = `/${endpointPrefix}.${operation}.php`;

                // Exception: "info" resource
                if (resource === 'info') {
                    endpoint = '/info.php';
                }

                // Prepare request body (usually Tiny ERP accepts POST application/x-www-form-urlencoded)
                // The token is injected automatically by the credential block into the Query String.
                // We add 'formato=json' as a requirement to get JSON responses.
                const qs = { formato: 'json' };

                // Most endpoints in Tiny use POST with URL Encoded body for data.
                const options: any = {
                    method: 'POST',
                    uri: endpoint,
                    qs,
                    form: jsonParams, // Uses application/x-www-form-urlencoded
                    json: true,
                };

                // Some endpoints like `pesquisar` might use GET in restful APIs, but TinyERP usually accepts POST for everything or GET with query params.
                // If the operation is a search or fetch without complex body, passing as form is usually fine, or we move it to qs.
                if (operation === 'pesquisar' || operation === 'obter') {
                    // For pure GET-like requests in Tiny, they also support form variables in POST or QS in GET.
                    // We safely pass them in the form for POST.
                }

                const responseData = await this.helpers.requestWithAuthentication.call(this, 'tinyErpApi', options);

                // TinyERP wraps responses in a `retorno` object. Example: { retorno: { status: 'OK', status_processamento: 3, ... }}
                if (responseData && responseData.retorno && responseData.retorno.status === 'Erro') {
                    throw new NodeApiError(this.getNode(), responseData as any, { message: responseData.retorno.erros?.[0]?.erro || 'Unknown Tiny ERP Error' });
                }

                returnData.push({ json: responseData });
            } catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({ json: { error: error.message } });
                } else {
                    if (error.context) {
                        throw error;
                    }
                    throw new NodeApiError(this.getNode(), error);
                }
            }
        }

        return [returnData];
    }
}
