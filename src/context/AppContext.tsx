import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import type { AppState, AppAction, StepState, Language, Direction } from '../types.ts';
import { translations, getDirection, type TranslationDictionary } from '../i18n/translations.ts';

const initialLanguage: Language = (() => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const savedLang = window.localStorage.getItem('icity_lang');
    if (savedLang === 'fa' || savedLang === 'en' || savedLang === 'ar' || savedLang === 'es') {
      return savedLang;
    }
  }
  return 'fa';
})();

const initialHighContrast: boolean = (() => {
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage.getItem('icity_high_contrast') === 'true';
  }
  return false;
})();

const initialFocusMode: boolean = (() => {
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage.getItem('icity_focus_mode') === 'true';
  }
  return false;
})();

const initialState: AppState = {
  currentStep: 'WELCOME',
  isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
  isCheckingConnection: false,
  largeText: false,
  highContrast: initialHighContrast,
  focusMode: initialFocusMode,
  language: initialLanguage,
  liveAnnouncement: '',
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'SET_ONLINE_STATUS':
      return { ...state, isOnline: action.payload };
    case 'SET_CHECKING_CONNECTION':
      return { ...state, isCheckingConnection: action.payload };
    case 'TOGGLE_LARGE_TEXT':
      return { ...state, largeText: !state.largeText };
    case 'TOGGLE_HIGH_CONTRAST': {
      const nextVal = !state.highContrast;
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('icity_high_contrast', String(nextVal));
      }
      return { ...state, highContrast: nextVal };
    }
    case 'TOGGLE_FOCUS_MODE': {
      const nextVal = !state.focusMode;
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('icity_focus_mode', String(nextVal));
      }
      return { ...state, focusMode: nextVal };
    }
    case 'SET_LANGUAGE':
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('icity_lang', action.payload);
      }
      return { ...state, language: action.payload };
    case 'ANNOUNCE':
      return { ...state, liveAnnouncement: action.payload };
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  setStep: (step: StepState) => void;
  checkConnection: () => Promise<boolean>;
  setLanguage: (lang: Language) => void;
  toggleHighContrast: () => void;
  toggleFocusMode: () => void;
  announce: (message: string) => void;
  direction: Direction;
  t: TranslationDictionary;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const direction = getDirection(state.language);
  const t = translations[state.language];

  // Keep documentElement dir, lang, and theme attributes in sync
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = direction;
      document.documentElement.lang = state.language;
      if (state.highContrast) {
        document.documentElement.setAttribute('data-contrast', 'high');
      } else {
        document.documentElement.removeAttribute('data-contrast');
      }
      if (state.focusMode) {
        document.documentElement.setAttribute('data-focus', 'active');
      } else {
        document.documentElement.removeAttribute('data-focus');
      }
    }
  }, [direction, state.language, state.highContrast, state.focusMode]);

  const setStep = useCallback((step: StepState) => {
    dispatch({ type: 'SET_STEP', payload: step });
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    dispatch({ type: 'SET_LANGUAGE', payload: lang });
  }, []);

  const toggleHighContrast = useCallback(() => {
    dispatch({ type: 'TOGGLE_HIGH_CONTRAST' });
  }, []);

  const toggleFocusMode = useCallback(() => {
    dispatch({ type: 'TOGGLE_FOCUS_MODE' });
  }, []);

  const announce = useCallback((message: string) => {
    dispatch({ type: 'ANNOUNCE', payload: message });
  }, []);

  // Active network probe: tests genuine connectivity without relying solely on navigator.onLine
  const checkConnection = useCallback(async (): Promise<boolean> => {
    dispatch({ type: 'SET_CHECKING_CONNECTION', payload: true });

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      dispatch({ type: 'SET_ONLINE_STATUS', payload: false });
      dispatch({ type: 'SET_CHECKING_CONNECTION', payload: false });
      return false;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      // Probe lightweight asset with cache-busting
      const response = await fetch(`/icon.svg?probe=${Date.now()}`, {
        method: 'HEAD',
        cache: 'no-store',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const connected = response.ok;
      dispatch({ type: 'SET_ONLINE_STATUS', payload: connected });
      dispatch({ type: 'SET_CHECKING_CONNECTION', payload: false });
      return connected;
    } catch {
      dispatch({ type: 'SET_ONLINE_STATUS', payload: false });
      dispatch({ type: 'SET_CHECKING_CONNECTION', payload: false });
      return false;
    }
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      // Re-verify with active probe
      checkConnection();
    };

    const handleOffline = () => {
      dispatch({ type: 'SET_ONLINE_STATUS', payload: false });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial genuine probe on mount
    checkConnection();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [checkConnection]);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        setStep,
        checkConnection,
        setLanguage,
        toggleHighContrast,
        toggleFocusMode,
        announce,
        direction,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
