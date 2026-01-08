import { PaymentMethod, ApiError } from '../types';

const API_URL = 'https://integracao.cardapioweb.com/api/partner/v1/merchant/payment_methods';

export const fetchPaymentMethods = async (apiKey: string, partnerKey: string): Promise<PaymentMethod[]> => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
        'X-PARTNER-KEY': partnerKey,
      },
    });

    if (!response.ok) {
      switch (response.status) {
        case 400:
          throw new Error('Requisição inválida (400). Verifique se os dados estão corretos.');
        case 401:
          throw new Error('Credenciais inválidas (401). Verifique seu X-API-KEY e X-PARTNER-KEY.');
        case 403:
          throw new Error('Acesso negado (403). Verifique as permissões do seu token.');
        case 404:
          throw new Error('Recurso não encontrado (404). Verifique se a URL da API mudou.');
        case 429:
          throw new Error('Limite de requisições excedido (429). Aguarde um momento.');
        case 500:
          throw new Error('Erro interno no servidor da Cardápio Web (500). Tente novamente mais tarde.');
        case 502:
        case 503:
        case 504:
          throw new Error('Serviço indisponível temporariamente (503). O servidor pode estar em manutenção.');
        default:
          throw new Error(`Erro na API (${response.status}): ${response.statusText}`);
      }
    }

    const data = await response.json();
    
    // Adjust logic based on actual API response structure. 
    // Assuming data is an array or data.data is the array.
    if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray(data.data)) {
      return data.data;
    }
    
    return [];
  } catch (error: any) {
    // If it's a network error (like CORS) in this preview environment, we might want to show a specific message
    // implying the need for a proxy server in a real production Next.js app, but here we just pass the error.
    console.error("Fetch error:", error);
    throw new Error(error.message || 'Falha ao conectar com o serviço. Verifique sua conexão.');
  }
};