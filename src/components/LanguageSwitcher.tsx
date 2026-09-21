import React from 'react';
import { Globe } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { SUPPORTED_LANGUAGES, type LanguageOption } from '../i18n/translations.ts';

export function LanguageSwitcher() {
  const { state, setLanguage, t } = useApp();

  return (
    <div
      id="language-switcher"
      role="region"
      aria-label={t.app.language}
      className="w-full flex items-center justify-between bg-[#F5EBE1] border border-[#E7D7C8] p-1 rounded-2xl"
    >
      <div className="flex items-center gap-1.5 px-2 text-[#78350F]" title={t.app.language}>
        <Globe className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        <span className="text-[11px] font-bold hidden sm:inline">{t.app.language}:</span>
      </div>

      <div className="flex items-center gap-1 flex-1 justify-end">
        {SUPPORTED_LANGUAGES.map((lang: LanguageOption) => {
          const isActive = state.language === lang.code;
          return (
            <button
              key={lang.code}
              id={`lang-btn-${lang.code}`}
              type="button"
              onClick={() => setLanguage(lang.code)}
              aria-pressed={isActive}
              className={`px-2.5 py-1 text-xs font-black rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-[#78350F] shadow-2xs border border-[#FDE68A]'
                  : 'text-[#78716C] hover:text-[#43281C] hover:bg-[#EFE4D6]'
              }`}
            >
              <span>{lang.nativeName}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
