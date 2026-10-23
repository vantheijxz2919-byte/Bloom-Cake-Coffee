import React from 'react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-on-surface text-surface shadow-[0_12px_32px_rgba(39,24,20,0.3)] transition-all duration-300 transform translate-y-0 opacity-100 border border-outline-variant/20"
        >
          <span
            className={`material-symbols-outlined text-[22px] shrink-0 ${
              toast.type === 'error'
                ? 'text-error'
                : toast.type === 'info'
                ? 'text-primary-fixed'
                : 'text-secondary-fixed'
            }`}
          >
            {toast.type === 'error'
              ? 'error'
              : toast.type === 'info'
              ? 'info'
              : 'check_circle'}
          </span>
          <div className="flex-1 min-w-0">
            {toast.title && (
              <p className="font-label-md text-label-md font-bold text-white truncate">
                {toast.title}
              </p>
            )}
            <p className="font-body-sm text-body-sm text-surface-bright leading-snug">
              {toast.message}
            </p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-surface/60 hover:text-white p-1 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      ))}
    </div>
  );
};
