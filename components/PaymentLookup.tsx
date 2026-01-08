import React, { useState, useCallback } from 'react';
import { PaymentMethod } from '../types';
import { fetchPaymentMethods } from '../services/cardapioService';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

// Mock/Demo Key constant
const DEMO_API_KEY = "7nSyGq49NVXuyZfgEQNPg3TdUqLNXTMNMNJwckvE";

export const PaymentLookup: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [partnerKey, setPartnerKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [methods, setMethods] = useState<PaymentMethod[] | null>(null);
  const [rawData, setRawData] = useState<any | null>(null); // State for raw JSON
  const [requestHeaders, setRequestHeaders] = useState<any | null>(null); // State for request headers
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleDemoFill = () => {
    setApiKey(DEMO_API_KEY);
    setPartnerKey('DEMO_PARTNER_KEY'); 
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey || !partnerKey) {
      setError("Por favor, preencha ambas as chaves para continuar.");
      return;
    }

    setLoading(true);
    setError(null);
    setMethods(null);
    setRawData(null);
    
    // Set headers for display
    setRequestHeaders({
      "Content-Type": "application/json",
      "X-API-KEY": apiKey,
      "X-PARTNER-KEY": partnerKey
    });

    setCurrentPage(1);

    try {
      const data = await fetchPaymentMethods(apiKey, partnerKey);
      
      if (data.length === 0) {
        if (apiKey === DEMO_API_KEY) {
           const mockData = [
             { id: 101, name: 'Dinheiro (Demo)', kind: 'Money', active: true },
             { id: 102, name: 'Cartão de Crédito Visa', kind: 'CreditCard', active: true },
             { id: 103, name: 'PIX Online', kind: 'Online', active: true },
             { id: 104, name: 'Mastercard', kind: 'CreditCard', active: true },
             { id: 105, name: 'Elo', kind: 'CreditCard', active: true },
             { id: 106, name: 'Amex', kind: 'CreditCard', active: true },
             { id: 107, name: 'Alelo', kind: 'Voucher', active: true },
             { id: 108, name: 'Sodexo', kind: 'Voucher', active: true },
             { id: 109, name: 'Ticket Restaurante', kind: 'Voucher', active: true },
             { id: 110, name: 'VR Refeição', kind: 'Voucher', active: true },
             { id: 111, name: 'Dinheiro (Extra)', kind: 'Money', active: true },
             { id: 112, name: 'PIX (Extra)', kind: 'Online', active: true },
           ];
           setMethods(mockData);
           setRawData({ success: true, data: mockData, message: "Demo Data Loaded" });
           setError("Nota: Exibindo dados de demonstração (Erro de conexão real/CORS).");
        } else {
            setMethods([]);
            setRawData({ data: [] });
        }
      } else {
        setMethods(data);
        setRawData({ data: data }); // Store real data
      }
    } catch (err: any) {
      if (apiKey === DEMO_API_KEY) {
          const mockData = [
             { id: 101, name: 'Dinheiro (Demo)', kind: 'Money', active: true },
             { id: 102, name: 'Cartão de Crédito Visa', kind: 'CreditCard', active: true },
             { id: 103, name: 'PIX Online', kind: 'Online', active: true },
             { id: 104, name: 'Mastercard', kind: 'CreditCard', active: true },
             { id: 105, name: 'Elo', kind: 'CreditCard', active: true },
             { id: 106, name: 'Amex', kind: 'CreditCard', active: true },
             { id: 107, name: 'Alelo', kind: 'Voucher', active: true },
             { id: 108, name: 'Sodexo', kind: 'Voucher', active: true },
             { id: 109, name: 'Ticket Restaurante', kind: 'Voucher', active: true },
             { id: 110, name: 'VR Refeição', kind: 'Voucher', active: true },
             { id: 111, name: 'Dinheiro (Extra)', kind: 'Money', active: true },
             { id: 112, name: 'PIX (Extra)', kind: 'Online', active: true },
          ];
          setMethods(mockData);
          setRawData({ success: true, data: mockData, error_simulated: true });
          setError("Nota: Exibindo dados de demonstração (Erro de conexão real/CORS).");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = useCallback((id: number) => {
    navigator.clipboard.writeText(id.toString());
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMethods = methods ? methods.slice(indexOfFirstItem, indexOfLastItem) : [];
  const totalPages = methods ? Math.ceil(methods.length / itemsPerPage) : 0;

  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // Layout Logic: If we have results, use a grid. If not, center the form.
  const containerClass = methods 
    ? "grid grid-cols-1 lg:grid-cols-3 gap-8 items-start transition-all duration-500" 
    : "max-w-2xl mx-auto transition-all duration-500";

  return (
    <div className={containerClass}>
      
      {/* Left Column: Form and Table */}
      <div className={`space-y-8 ${methods ? 'lg:col-span-2' : 'w-full'}`}>
        {/* Form Card */}
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-black/20 p-8 md:p-10 border border-white/10 relative overflow-hidden">
          {/* Subtle sheen */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
          
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Credenciais de Acesso</h2>
            <button 
              type="button"
              onClick={handleDemoFill}
              className="text-xs font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded-full hover:bg-purple-500/20 transition-colors"
            >
              Usar Demo
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input 
              label="X-API-KEY (Token do Estabelecimento)" 
              id="api-key"
              type="text"
              placeholder="Cole o token do estabelecimento aqui"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            
            <Input 
              label="X-PARTNER-KEY (Token da Integradora)" 
              id="partner-key"
              type="text"
              placeholder="Cole o token da integradora aqui"
              value={partnerKey}
              onChange={(e) => setPartnerKey(e.target.value)}
            />

            <Button type="submit" className="w-full" isLoading={loading}>
              Consultar Métodos de Pagamento
            </Button>

            {error && (
              <div className={`p-4 rounded-xl text-sm flex items-start space-x-2 ${error.includes('Nota:') ? 'bg-yellow-500/10 text-yellow-200 border border-yellow-500/20' : 'bg-red-500/10 text-red-200 border border-red-500/20'}`}>
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}
          </form>
        </div>

        {/* Results Section */}
        {loading ? (
          <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/5 animate-pulse space-y-4">
            <div className="h-6 bg-slate-800 rounded w-1/3 mb-6"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-slate-800/50 rounded-xl w-full"></div>
              ))}
            </div>
          </div>
        ) : methods && methods.length > 0 ? (
          <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl shadow-xl shadow-black/20 overflow-hidden border border-white/10">
             <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                <h3 className="font-bold text-white text-lg">Métodos Encontrados</h3>
                <div className="flex gap-2">
                  <span className="bg-white/10 text-slate-300 text-xs font-semibold px-3 py-1 rounded-full border border-white/5">
                    Pág {currentPage} de {totalPages}
                  </span>
                  <span className="bg-purple-500/20 text-purple-300 text-xs font-bold px-3 py-1 rounded-full border border-purple-500/20">
                    {methods.length} Resultados
                  </span>
                </div>
             </div>
             
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="bg-black/20 text-slate-400 text-xs uppercase tracking-wider font-semibold border-b border-white/5">
                     <th className="px-8 py-4">ID</th>
                     <th className="px-8 py-4">Nome</th>
                     <th className="px-8 py-4">Tipo (Kind)</th>
                     <th className="px-8 py-4 text-right">Ação</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                   {currentMethods.map((method) => (
                     <tr 
                        key={method.id} 
                        onClick={() => copyToClipboard(method.id)}
                        className="
                          group relative 
                          transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                          hover:bg-white/5 
                          cursor-pointer z-0 hover:z-20 transform
                        "
                     >
                       <td className="px-8 py-5 font-mono text-slate-400 font-medium group-hover:text-purple-400 group-hover:font-bold transition-all">
                          #{method.id}
                       </td>
                       <td className="px-8 py-5 text-slate-200 font-medium">
                          {method.name}
                       </td>
                       <td className="px-8 py-5">
                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 group-hover:border-purple-500/30 group-hover:bg-purple-500/10 group-hover:text-purple-300 transition-colors">
                           {method.kind}
                         </span>
                       </td>
                       <td className="px-8 py-5 text-right">
                         <span className={`
                           text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-300
                           ${copiedId === method.id 
                             ? 'bg-green-500/20 text-green-400 opacity-100 translate-y-0' 
                             : 'opacity-0 group-hover:opacity-100 text-purple-300 bg-purple-500/10 -translate-y-1 group-hover:translate-y-0'}
                         `}>
                           {copiedId === method.id ? 'Copiado!' : 'Copiar ID'}
                         </span>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>

             {/* Pagination Controls */}
             {totalPages > 1 && (
               <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-t border-white/5">
                 <button
                   onClick={goToPrevPage}
                   disabled={currentPage === 1}
                   className="flex items-center px-4 py-2 text-sm font-medium text-slate-300 bg-transparent border border-white/10 rounded-lg hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                 >
                   <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                   </svg>
                   Anterior
                 </button>
                 
                 <div className="text-sm font-medium text-slate-400">
                   Página <span className="text-white font-bold">{currentPage}</span> de <span className="text-white font-bold">{totalPages}</span>
                 </div>

                 <button
                   onClick={goToNextPage}
                   disabled={currentPage === totalPages}
                   className="flex items-center px-4 py-2 text-sm font-medium text-slate-300 bg-transparent border border-white/10 rounded-lg hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                 >
                   Próxima
                   <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                   </svg>
                 </button>
               </div>
             )}
          </div>
        ) : methods !== null && (
          <div className="text-center py-12 text-slate-400 bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-white/5 shadow-sm">
             <p>Nenhum método de pagamento encontrado para este estabelecimento.</p>
          </div>
        )}
      </div>

      {/* Right Column: JSON Viewer & Headers (Only appears when there is data or headers) */}
      {(rawData || requestHeaders) && (
        <div className="lg:col-span-1 space-y-6 animate-fade-in-up sticky top-8">
           {/* JSON Viewer */}
           {rawData && (
             <div className="bg-black/40 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10">
               <div className="flex items-center justify-between px-5 py-4 bg-white/5 border-b border-white/5">
                 <div className="flex items-center space-x-2">
                   <div className="flex space-x-1.5">
                     <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                     <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                     <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                   </div>
                   <span className="text-xs font-mono text-slate-400 ml-2">response.json</span>
                 </div>
                 <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded uppercase tracking-wider">
                   200 OK
                 </span>
               </div>
               <div className="p-5 overflow-auto max-h-[40vh]">
                 <pre className="text-xs font-mono text-blue-300 leading-relaxed whitespace-pre-wrap break-all">
                   {JSON.stringify(rawData, null, 2)}
                 </pre>
               </div>
               <div className="px-5 py-3 bg-white/5 border-t border-white/5 text-[10px] text-slate-500 font-mono text-center">
                 Raw API Output
               </div>
             </div>
           )}

           {/* Request Headers Viewer */}
           {requestHeaders && (
             <div className="bg-black/40 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10">
                <div className="flex items-center justify-between px-5 py-4 bg-white/5 border-b border-white/5">
                   <div className="flex items-center space-x-2">
                     <div className="flex space-x-1.5">
                       <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                       <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                       <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                     </div>
                     <span className="text-xs font-mono text-slate-400 ml-2">request.headers</span>
                   </div>
                   <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded uppercase tracking-wider">
                     GET
                   </span>
                </div>
                <div className="p-5 overflow-auto max-h-[30vh]">
                   <pre className="text-xs font-mono text-purple-300 leading-relaxed whitespace-pre-wrap break-all">
                     {JSON.stringify(requestHeaders, null, 2)}
                   </pre>
                </div>
                <div className="px-5 py-3 bg-white/5 border-t border-white/5 text-[10px] text-slate-500 font-mono text-center">
                   Sent Headers
                </div>
             </div>
           )}
        </div>
      )}
    </div>
  );
};