import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className={`flex flex-col space-y-1.5 ${className}`}>
      <label htmlFor={props.id} className="text-sm font-semibold text-slate-300 ml-1">
        {label}
      </label>
      <input
        {...props}
        className={`
          appearance-none block w-full px-4 py-3 
          bg-slate-950/50 backdrop-blur-sm
          border border-slate-700 rounded-xl shadow-inner
          placeholder-slate-500 text-slate-100
          focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 
          transition-all duration-200
          ${error ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'hover:border-slate-600'}
        `}
      />
      {error && <p className="text-xs text-red-400 ml-1">{error}</p>}
    </div>
  );
};