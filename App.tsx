import React from 'react';
import { PaymentLookup } from './components/PaymentLookup';
import { HelpWidget } from './components/HelpWidget';

function App() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 pb-20 overflow-x-hidden relative selection:bg-purple-500/30">
      
      {/* Neon Blur Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Top Left Purple Blob */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"></div>
        {/* Top Right Violet Blob */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>
        {/* Bottom Center Dark Purple Blob */}
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-fuchsia-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob animation-delay-4000"></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      {/* Help Widget */}
      <HelpWidget />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md rounded-2xl shadow-xl shadow-purple-500/10 mb-4 ring-1 ring-white/10">
            <div className="bg-gradient-to-br from-purple-600 to-violet-700 rounded-xl p-3 shadow-lg shadow-purple-600/30">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-sm">
            Consultar Formas de pagamento
          </h1>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Ferramenta exclusiva para integradores Cardápio Web. Obtenha rapidamente os IDs dos métodos de pagamento para configuração de pedidos via API.
          </p>
        </div>

        {/* Main Feature Component */}
        <PaymentLookup />

        {/* Footer info */}
        <div className="mt-16 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Cardápio Web</p>
        </div>
      </div>
    </div>
  );
}

export default App;