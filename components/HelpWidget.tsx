import React, { useState, useRef, useEffect } from 'react';

export const HelpWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" ref={widgetRef}>
      {/* Popup Content */}
      <div 
        className={`
          mb-4 w-80 md:w-96 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-purple-900/20 overflow-hidden transition-all duration-300 origin-bottom-right
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'}
        `}
      >
        <div className="p-5 border-b border-white/5 bg-gradient-to-r from-purple-600/10 to-transparent">
          <h3 className="font-bold text-white flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Central de Ajuda
          </h3>
        </div>
        
        <div className="p-5 space-y-6 text-sm">
          {/* Section 1: X-API-KEY */}
          <div className="space-y-2">
            <h4 className="font-semibold text-purple-300 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2"></span>
              Onde encontrar o X-API-KEY?
            </h4>
            <p className="text-slate-400 leading-relaxed pl-3.5 border-l border-white/5 ml-0.5">
              O token do estabelecimento pode ser encontrado no portal em:
              <br/>
              <span className="text-slate-200 font-medium block mt-1">Configurações &gt; Integrações &gt; API de Integração</span>
            </p>
            <a 
              href="https://portal.cardapioweb.com/configuracoes/integracao/api" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 px-4 py-2.5 rounded-lg transition-all shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 mt-1 ml-3.5"
            >
              Acessar Portal Agora
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          <div className="w-full h-px bg-white/5"></div>

          {/* Section 2: X-PARTNER-KEY */}
          <div className="space-y-2">
            <h4 className="font-semibold text-purple-300 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2"></span>
              Onde encontrar o X-PARTNER-KEY?
            </h4>
            <p className="text-slate-400 leading-relaxed pl-3.5 border-l border-white/5 ml-0.5">
              Caso você não saiba seu token de integrador, ele deve ser solicitado exclusivamente via e-mail.
            </p>
            <a 
              href="mailto:integracao@cardapioweb.com" 
              className="inline-flex items-center text-purple-400 hover:text-white transition-colors font-medium break-all pl-3.5 group"
            >
              <div className="bg-purple-500/10 p-1.5 rounded-md mr-2 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              integracao@cardapioweb.com
            </a>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-center w-14 h-14 rounded-full shadow-lg shadow-purple-600/40 backdrop-blur-sm border border-white/10
          transition-all duration-300 hover:scale-110 active:scale-95 z-50
          ${isOpen ? 'bg-slate-800 text-slate-300 rotate-90' : 'bg-gradient-to-r from-purple-600 to-violet-600 text-white rotate-0'}
        `}
        aria-label="Ajuda"
        title="Ajuda sobre as chaves"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
          </div>
        )}
      </button>
    </div>
  );
};