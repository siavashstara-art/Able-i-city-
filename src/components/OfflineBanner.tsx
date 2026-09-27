import React from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';

export function OfflineBanner() {
  const { state, checkConnection, t } = useApp();

  if (state.isOnline) {
    return null;
  }

  return (
    <aside
      id="offline-banner"
      role="status"
      aria-live="polite"
      className="w-full max-w-md mx-auto mb-3 bg-[#FEF3C7] border-2 border-[#FCD34D] text-[#78350F] rounded-2xl p-3.5 shadow-xs transition-all"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 flex-1">
          <div className="w-8 h-8 rounded-xl bg-[#FDE68A] flex items-center justify-center shrink-0">
            <WifiOff className="w-4 h-4 text-[#B45309]" aria-hidden="true" />
          </div>
          <div className="text-xs sm:text-sm font-bold leading-snug">
            {t.banner.offlineMsg}
          </div>
        </div>

        <button
          id="retry-connection-btn"
          type="button"
          onClick={() => checkConnection()}
          disabled={state.isCheckingConnection}
          className="shrink-0 flex items-center gap-1 text-xs font-black bg-[#FDE68A] hover:bg-[#FCD34D] active:bg-[#FBBF24] text-[#78350F] px-2.5 py-1.5 rounded-xl border border-[#F59E0B] transition-colors cursor-pointer disabled:opacity-50"
          aria-label={t.banner.recheck}
        >
          <RefreshCw
            className={`w-3.5 h-3.5 ${state.isCheckingConnection ? 'animate-spin' : ''}`}
            aria-hidden="true"
          />
          <span>{state.isCheckingConnection ? t.banner.checking : t.banner.recheck}</span>
        </button>
      </div>
    </aside>
  );
}
