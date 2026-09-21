import React, { useState } from 'react';
import {
  Gamepad2,
  Globe,
  ArrowRight,
  ArrowLeft,
  Heart,
  Check,
  PartyPopper,
  RotateCcw,
  Server,
  FileText,
  Contrast,
  Compass,
  Type,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from './context/AppContext.tsx';
import { OfflineBanner } from './components/OfflineBanner.tsx';
import { WordPressSimulator } from './components/WordPressSimulator.tsx';
import { HostingSimulator } from './components/HostingSimulator.tsx';
import { RealSiteFoundation } from './components/RealSiteFoundation.tsx';
import { LanguageSwitcher } from './components/LanguageSwitcher.tsx';
import { FocusModeGuide } from './components/FocusModeGuide.tsx';
import { triggerProjectZipDownload } from './utils/downloadZip.ts';

export default function App() {
  const {
    state,
    dispatch,
    setStep,
    t,
    direction,
    toggleHighContrast,
    toggleFocusMode,
  } = useApp();
  const [practiceTab, setPracticeTab] = useState<'wordpress' | 'hosting'>('wordpress');
  const [downloadSuccessToast, setDownloadSuccessToast] = useState(false);

  const handleDownloadZip = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    triggerProjectZipDownload('icity-core-source.zip');
    setDownloadSuccessToast(true);
    setTimeout(() => setDownloadSuccessToast(false), 5000);
  };

  const isRtl = direction === 'rtl';
  const NextArrow = isRtl ? ArrowLeft : ArrowRight;
  const BackArrow = isRtl ? ArrowRight : ArrowLeft;

  return (
    <div
      id="icity-app-container"
      dir={direction}
      className={`min-h-[100dvh] w-full flex flex-col items-center justify-between p-3 sm:p-6 transition-all duration-200 ${
        state.highContrast
          ? 'bg-white text-black'
          : 'bg-[#FAF7F2] text-[#292524]'
      } ${state.largeText ? 'text-lg leading-relaxed' : 'text-base leading-normal'}`}
    >
      {/* 1. Skip Navigation Link for Keyboard & Screen Reader Users */}
      <a
        id="skip-navigation-link"
        href="#app-main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[#43281C] focus:text-white focus:font-black focus:rounded-xl focus:shadow-2xl focus:outline-3 focus:outline-[#F59E0B]"
      >
        {t.app.skipToContent}
      </a>

      {/* 2. Accessible ARIA Live Region for dynamic announcements */}
      <div
        id="a11y-live-region"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {state.liveAnnouncement}
      </div>

      {/* Toast Alert for Instant ZIP Download */}
      <AnimatePresence>
        {downloadSuccessToast && (
          <motion.div
            id="zip-download-success-toast"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-4 z-50 max-w-md w-[calc(100%-32px)] bg-[#15803D] text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl border-2 border-[#86EFAC] flex items-center justify-between gap-3"
            role="alert"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-2xl" aria-hidden="true">🎉</span>
              <div>
                <div className="text-xs sm:text-sm font-black">
                  {isRtl ? 'فایل زیپ پروژه دانلود شد!' : 'Project ZIP Downloaded!'}
                </div>
                <div className="text-[11px] sm:text-xs opacity-90">
                  {isRtl
                    ? 'فایل icity-core-source.zip در پوشه دانلودهای شما ذخیره شد.'
                    : 'File icity-core-source.zip saved to your Downloads.'}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setDownloadSuccessToast(false)}
              className="text-white/80 hover:text-white text-xs font-black px-2.5 py-1 bg-white/20 rounded-lg cursor-pointer shrink-0"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Prominent, high-visibility ZIP download bar directly at the very top of every screen */}
      <div
        id="top-zip-download-banner"
        className={`w-full max-w-md mb-2 p-3 rounded-2xl border-2 flex items-center justify-between gap-2.5 shadow-sm transition-all ${
          state.highContrast
            ? 'bg-black text-white border-black'
            : 'bg-[#DCFCE7] text-[#14532D] border-[#22C55E]'
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xl shrink-0" aria-hidden="true">📥</span>
          <div className="min-w-0">
            <span className="text-xs sm:text-sm font-black block truncate leading-tight">
              {isRtl ? 'دانلود کامل سورس‌کد پروژه' : 'Download Complete Project Source'}
            </span>
            <span className="text-[11px] opacity-85 block truncate">
              {isRtl ? 'فایل ZIP بدون نیاز به باز کردن Danger Zone' : 'ZIP archive ready to upload to GitHub'}
            </span>
          </div>
        </div>

        <button
          id="top-banner-download-btn"
          type="button"
          onClick={handleDownloadZip}
          className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs transition-transform active:scale-95 ${
            state.highContrast
              ? 'bg-white text-black hover:bg-stone-200'
              : 'bg-[#15803D] hover:bg-[#166534] text-white'
          }`}
        >
          <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{isRtl ? 'دانلود فایل ZIP' : 'Download ZIP'}</span>
        </button>
      </div>

      {/* Header bar */}
      <header
        id="app-header"
        role="banner"
        className={`w-full max-w-md flex flex-col gap-3 pt-2 pb-3 border-b ${
          state.highContrast ? 'border-black' : 'border-[#E7E0D6]'
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div
              id="brand-avatar"
              className={`w-11 h-11 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-xs ${
                state.highContrast
                  ? 'bg-black text-white border-2 border-black'
                  : 'bg-[#F5EBE1] border-2 border-[#E7D7C8]'
              }`}
              aria-hidden="true"
            >
              🌱
            </div>
            <div>
              <h1
                id="brand-title"
                className={`text-base sm:text-xl font-black tracking-tight flex items-center gap-1.5 ${
                  state.highContrast ? 'text-black' : 'text-[#43281C]'
                }`}
              >
                <span>{t.app.name}</span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    state.highContrast
                      ? 'bg-black text-white'
                      : 'text-[#9A3412] bg-[#FFEDD5]'
                  }`}
                >
                  {t.app.version} 0.1
                </span>
              </h1>
              <p
                id="brand-tagline"
                className={`text-xs font-semibold ${
                  state.highContrast ? 'text-black' : 'text-[#78716C]'
                }`}
              >
                {t.app.tagline}
              </p>
            </div>
          </div>

          {/* Accessibility Controls Toolbar (Large touch targets: min 44px) */}
          <div
            id="a11y-toolbar"
            role="toolbar"
            aria-label="Accessibility options"
            className="flex items-center gap-1.5 shrink-0"
          >
            {/* Focus Mode Toggle */}
            <button
              id="focus-mode-toggle"
              type="button"
              onClick={toggleFocusMode}
              aria-label={t.app.focusModeToggle}
              aria-pressed={state.focusMode}
              className={`min-w-[44px] min-h-[44px] px-2.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer border ${
                state.focusMode
                  ? 'bg-[#F59E0B] text-white border-[#D97706] shadow-xs'
                  : state.highContrast
                  ? 'bg-white text-black border-black hover:bg-stone-100'
                  : 'bg-[#F5EBE1] hover:bg-[#EBDDCF] text-[#57534E] border-[#E7D7C8]'
              }`}
              title={state.focusMode ? t.app.focusModeOn : t.app.focusModeOff}
            >
              <Compass className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="sr-only">{t.app.focusModeToggle}</span>
            </button>

            {/* High Contrast Toggle */}
            <button
              id="high-contrast-toggle"
              type="button"
              onClick={toggleHighContrast}
              aria-label={t.app.highContrastToggle}
              aria-pressed={state.highContrast}
              className={`min-w-[44px] min-h-[44px] px-2.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer border ${
                state.highContrast
                  ? 'bg-black text-white border-black'
                  : 'bg-[#F5EBE1] hover:bg-[#EBDDCF] text-[#57534E] border-[#E7D7C8]'
              }`}
              title={state.highContrast ? t.app.highContrastOn : t.app.highContrastOff}
            >
              <Contrast className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="sr-only">{t.app.highContrastToggle}</span>
            </button>

            {/* Text Scaling Toggle */}
            <button
              id="text-size-toggle"
              type="button"
              onClick={() => dispatch({ type: 'TOGGLE_LARGE_TEXT' })}
              aria-label={t.app.fontSizeToggle}
              aria-pressed={state.largeText}
              className={`min-w-[44px] min-h-[44px] px-2.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer border ${
                state.largeText
                  ? 'bg-[#78350F] text-white border-[#43281C]'
                  : state.highContrast
                  ? 'bg-white text-black border-black hover:bg-stone-100'
                  : 'bg-[#F5EBE1] hover:bg-[#EBDDCF] text-[#57534E] border-[#E7D7C8]'
              }`}
              title={t.app.fontSizeToggle}
            >
              <span className="text-sm font-black tracking-tighter">A{state.largeText ? '+' : ''}</span>
            </button>

            {/* Direct Project ZIP Download Button */}
            <button
              id="download-project-zip-btn"
              type="button"
              onClick={handleDownloadZip}
              aria-label={t.app.downloadZip}
              className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer border shadow-sm ${
                state.highContrast
                  ? 'bg-black text-white border-black hover:bg-stone-800'
                  : 'bg-[#15803D] hover:bg-[#166534] text-white border-[#14532D]'
              }`}
              title={t.app.downloadZip}
            >
              <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="text-xs font-black whitespace-nowrap">{isRtl ? 'دانلود ZIP' : 'ZIP Source'}</span>
            </button>
          </div>
        </div>

        {/* 4-Language Switcher bar */}
        <div className="w-full flex items-center justify-between">
          <LanguageSwitcher />
        </div>
      </header>

      {/* Main View Area */}
      <main
        id="app-main-content"
        role="main"
        tabIndex={-1}
        className="w-full max-w-md flex-1 flex flex-col justify-center py-4 sm:py-6 focus:outline-none"
      >
        {/* Offline Banner when disconnected */}
        <OfflineBanner />

        {/* Focus Mode Guide: Always clearly answering Where am I / What am I doing / What next */}
        <FocusModeGuide />

        <AnimatePresence mode="wait">
          {/* 1. WELCOME STATE */}
          {state.currentStep === 'WELCOME' && (
            <motion.section
              key="welcome-view"
              id="welcome-view"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-6"
            >
              <div
                className={`rounded-3xl p-6 sm:p-8 text-center shadow-xs border-2 ${
                  state.highContrast
                    ? 'bg-white border-black text-black'
                    : 'bg-[#FFFBEB] border-[#FCD34D]'
                }`}
              >
                <div
                  className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center text-4xl mb-4 shadow-xs border-2 ${
                    state.highContrast
                      ? 'bg-black text-white border-black'
                      : 'bg-[#FEF3C7] border-[#FDE68A]'
                  }`}
                >
                  🌱
                </div>
                <h2
                  className={`text-2xl sm:text-3xl font-black mb-3 leading-snug ${
                    state.highContrast ? 'text-black' : 'text-[#78350F]'
                  }`}
                >
                  {t.welcome.title}
                </h2>
                <p
                  className={`text-sm sm:text-base font-medium leading-relaxed mb-6 ${
                    state.highContrast ? 'text-black' : 'text-[#92400E]'
                  }`}
                >
                  {t.welcome.description}
                </p>

                <div
                  className={`rounded-2xl p-4 border text-xs sm:text-sm font-semibold flex flex-col gap-2.5 mb-6 text-start ${
                    state.highContrast
                      ? 'bg-white border-black text-black'
                      : 'bg-[#FAF7F2] border-[#FDE68A] text-[#78350F]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#15803D] shrink-0" aria-hidden="true"></span>
                    <span>{t.welcome.point1}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#15803D] shrink-0" aria-hidden="true"></span>
                    <span>{t.welcome.point2}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#15803D] shrink-0" aria-hidden="true"></span>
                    <span>{t.welcome.point3}</span>
                  </div>
                </div>

                <button
                  id="welcome-start-btn"
                  type="button"
                  onClick={() => setStep('CHOOSE_MODE')}
                  className={`w-full min-h-[48px] py-4 px-6 rounded-2xl font-black text-lg sm:text-xl flex items-center justify-center gap-3 shadow-md transition-all cursor-pointer ${
                    state.highContrast
                      ? 'bg-black text-white hover:bg-stone-800'
                      : 'bg-[#D97706] hover:bg-[#B45309] active:bg-[#92400E] text-white'
                  }`}
                >
                  <span>{t.welcome.startBtn}</span>
                  <NextArrow className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>

              {/* Big, crystal-clear project source backup card */}
              <div
                id="welcome-zip-download-card"
                className={`rounded-2xl p-4 sm:p-5 border-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start shadow-xs ${
                  state.highContrast
                    ? 'bg-white border-black text-black'
                    : 'bg-[#F0FDF4] border-[#86EFAC] text-[#14532D]'
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                      state.highContrast
                        ? 'bg-black text-white border-black'
                        : 'bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]'
                    }`}
                  >
                    <Download className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black mb-0.5">
                      📦 {t.welcome.zipCardTitle}
                    </h3>
                    <p className="text-xs font-semibold opacity-90 leading-snug">
                      {t.welcome.zipCardDesc}
                    </p>
                  </div>
                </div>

                <button
                  id="welcome-zip-download-btn"
                  type="button"
                  onClick={handleDownloadZip}
                  className={`min-h-[44px] px-5 py-2.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 cursor-pointer shrink-0 shadow-xs transition-all ${
                    state.highContrast
                      ? 'bg-black text-white border-2 border-black hover:bg-stone-800'
                      : 'bg-[#15803D] hover:bg-[#166534] active:bg-[#14532D] text-white'
                  }`}
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span>{t.welcome.zipCardBtn}</span>
                </button>
              </div>
            </motion.section>
          )}

          {/* 2. CHOOSE MODE STATE */}
          {state.currentStep === 'CHOOSE_MODE' && (
            <motion.section
              key="choose-mode-view"
              id="choose-mode-view"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-5"
            >
              {/* Welcoming header */}
              <div id="welcome-banner" className="text-center px-2">
                <div
                  className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold px-3 py-1 rounded-full mb-3 shadow-2xs non-essential ${
                    state.highContrast
                      ? 'bg-white border-2 border-black text-black'
                      : 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" aria-hidden="true" />
                  <span>{t.welcome.badge}</span>
                </div>
                <h2
                  id="welcome-headline"
                  className={`${state.largeText ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'} font-extrabold mb-2 leading-relaxed ${
                    state.highContrast ? 'text-black' : 'text-[#292524]'
                  }`}
                >
                  {t.chooseMode.title}
                </h2>
                <p
                  id="welcome-subtext"
                  className={`text-sm sm:text-base font-medium ${
                    state.highContrast ? 'text-black' : 'text-[#57534E]'
                  }`}
                >
                  {t.chooseMode.subtitle}
                </p>
              </div>

              {/* TWO PRIMARY PATHS ONLY */}
              <div id="primary-action-paths" className="flex flex-col gap-4">
                {/* Path 1: بازی و تمرین */}
                <button
                  id="action-btn-games"
                  type="button"
                  onClick={() => setStep('PRACTICE')}
                  className={`group relative w-full min-h-[48px] rounded-2xl p-5 shadow-xs transition-all duration-150 flex items-center justify-between gap-4 cursor-pointer border-2 ${
                    state.highContrast
                      ? 'bg-white border-black text-black hover:bg-stone-100'
                      : 'bg-[#FFFBEB] hover:bg-[#FEF3C7] active:bg-[#FDE68A] border-[#FCD34D]'
                  }`}
                  aria-label={t.chooseMode.practiceTitle}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      id="games-icon-box"
                      className={`w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center text-3xl shadow-xs border ${
                        state.highContrast
                          ? 'bg-black text-white border-black'
                          : 'bg-[#FEF3C7] border-[#FDE68A]'
                      }`}
                    >
                      <Gamepad2 className="w-9 h-9" aria-hidden="true" />
                    </div>
                    <div className="flex-1 text-start">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-xl sm:text-2xl font-black ${
                            state.highContrast ? 'text-black' : 'text-[#78350F]'
                          }`}
                        >
                          🎮 {t.chooseMode.practiceTitle}
                        </span>
                      </div>
                      <p
                        className={`text-xs sm:text-sm font-semibold leading-snug ${
                          state.highContrast ? 'text-black' : 'text-[#92400E]'
                        }`}
                      >
                        {t.chooseMode.practiceDesc}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center ${
                      state.highContrast ? 'bg-black text-white' : 'bg-[#FEF3C7] text-[#B45309]'
                    }`}
                    aria-hidden="true"
                  >
                    <NextArrow className="w-5 h-5" />
                  </div>
                </button>

                {/* Path 2: ساخت سایت واقعی */}
                <button
                  id="action-btn-real-site"
                  type="button"
                  onClick={() => setStep('BUILD')}
                  className={`group relative w-full min-h-[48px] rounded-2xl p-5 shadow-xs transition-all duration-150 flex items-center justify-between gap-4 cursor-pointer border-2 ${
                    state.highContrast
                      ? 'bg-white border-black text-black hover:bg-stone-100'
                      : 'bg-[#F0FDF4] hover:bg-[#DCFCE7] active:bg-[#BBF7D0] border-[#86EFAC]'
                  }`}
                  aria-label={t.chooseMode.buildTitle}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      id="real-site-icon-box"
                      className={`w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center text-3xl shadow-xs border ${
                        state.highContrast
                          ? 'bg-black text-white border-black'
                          : 'bg-[#DCFCE7] border-[#BBF7D0]'
                      }`}
                    >
                      <Globe className="w-9 h-9" aria-hidden="true" />
                    </div>
                    <div className="flex-1 text-start">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-xl sm:text-2xl font-black ${
                            state.highContrast ? 'text-black' : 'text-[#14532D]'
                          }`}
                        >
                          🌐 {t.chooseMode.buildTitle}
                        </span>
                      </div>
                      <p
                        className={`text-xs sm:text-sm font-semibold leading-snug ${
                          state.highContrast ? 'text-black' : 'text-[#166534]'
                        }`}
                      >
                        {t.chooseMode.buildDesc}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center ${
                      state.highContrast ? 'bg-black text-white' : 'bg-[#DCFCE7] text-[#15803D]'
                    }`}
                    aria-hidden="true"
                  >
                    <NextArrow className="w-5 h-5" />
                  </div>
                </button>
              </div>

              {/* Bottom honest persistence notice */}
              <div
                id="auto-save-banner"
                className={`flex items-center justify-center gap-2 text-xs font-semibold py-3 px-4 rounded-xl border non-essential ${
                  state.highContrast
                    ? 'bg-white text-black border-black'
                    : 'text-[#78716C] bg-[#F5EBE1] border-[#E7D7C8]'
                }`}
              >
                <Check className="w-4 h-4 text-[#15803D] shrink-0" aria-hidden="true" />
                <span>{t.chooseMode.autoSaveNotice}</span>
              </div>

              {/* Direct Project ZIP Backup Link in Choose Mode */}
              <div className="w-full flex justify-center">
                <button
                  id="choose-mode-zip-download-link"
                  type="button"
                  onClick={handleDownloadZip}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer border shadow-2xs ${
                    state.highContrast
                      ? 'bg-black text-white border-black hover:bg-stone-800'
                      : 'bg-[#F0FDF4] hover:bg-[#DCFCE7] text-[#15803D] border-[#86EFAC]'
                  }`}
                >
                  <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>📦 {t.welcome.zipCardBtn}</span>
                </button>
              </div>

              <button
                id="back-to-welcome-btn"
                type="button"
                onClick={() => setStep('WELCOME')}
                className={`w-full min-h-[44px] py-2 text-xs font-bold transition-colors cursor-pointer ${
                  state.highContrast
                    ? 'text-black underline'
                    : 'text-[#8C827A] hover:text-[#43281C]'
                }`}
              >
                ← {t.chooseMode.backToWelcome}
              </button>
            </motion.section>
          )}

          {/* 3. PRACTICE STATE (Wordpress Simulator + Hosting Simulator) */}
          {state.currentStep === 'PRACTICE' && (
            <motion.section
              key="practice-view"
              id="practice-view"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="w-full flex flex-col gap-4"
            >
              {/* Simulator Switcher Tab Navigation */}
              <nav
                id="simulator-switcher-tabs"
                aria-label="Simulator Switcher"
                className={`w-full grid grid-cols-2 p-1 rounded-2xl border-2 ${
                  state.highContrast
                    ? 'bg-white border-black'
                    : 'bg-[#EFE4D6] border-[#DFD1C1]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setPracticeTab('wordpress')}
                  aria-pressed={practiceTab === 'wordpress'}
                  className={`min-h-[44px] py-2.5 px-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    practiceTab === 'wordpress'
                      ? state.highContrast
                        ? 'bg-black text-white'
                        : 'bg-white text-[#78350F] shadow-sm'
                      : state.highContrast
                      ? 'text-black'
                      : 'text-[#8C827A] hover:text-[#43281C]'
                  }`}
                >
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  <span>{t.simSwitcher.wpSim}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPracticeTab('hosting')}
                  aria-pressed={practiceTab === 'hosting'}
                  className={`min-h-[44px] py-2.5 px-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    practiceTab === 'hosting'
                      ? state.highContrast
                        ? 'bg-black text-white'
                        : 'bg-white text-[#15803D] shadow-sm'
                      : state.highContrast
                      ? 'text-black'
                      : 'text-[#8C827A] hover:text-[#43281C]'
                  }`}
                >
                  <Server className="w-4 h-4" aria-hidden="true" />
                  <span>{t.simSwitcher.hostingSim}</span>
                </button>
              </nav>

              {practiceTab === 'wordpress' ? (
                <WordPressSimulator onBack={() => setStep('CHOOSE_MODE')} onGoToBuild={() => setStep('BUILD')} />
              ) : (
                <HostingSimulator onBack={() => setStep('CHOOSE_MODE')} />
              )}
            </motion.section>
          )}

          {/* 4. BUILD STATE (Real Site Foundation) */}
          {state.currentStep === 'BUILD' && (
            <motion.section
              key="build-view"
              id="build-view"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <RealSiteFoundation
                onBack={() => setStep('CHOOSE_MODE')}
                onExploreHosting={() => {
                  setPracticeTab('hosting');
                  setStep('PRACTICE');
                }}
                onGoToWordPress={() => {
                  setPracticeTab('wordpress');
                  setStep('PRACTICE');
                }}
              />
            </motion.section>
          )}

          {/* 5. PUBLISH STATE */}
          {state.currentStep === 'PUBLISH' && (
            <motion.section
              key="publish-view"
              id="publish-view"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-6"
            >
              <div
                className={`rounded-3xl p-6 sm:p-8 text-center shadow-xs border-2 ${
                  state.highContrast
                    ? 'bg-white border-black text-black'
                    : 'bg-[#FFFBEB] border-[#FCD34D]'
                }`}
              >
                <div
                  className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl mb-3 border-2 ${
                    state.highContrast
                      ? 'bg-black text-white border-black'
                      : 'bg-[#FEF3C7] border-[#FDE68A]'
                  }`}
                >
                  📦
                </div>
                <h2
                  className={`text-xl sm:text-2xl font-black mb-1 ${
                    state.highContrast ? 'text-black' : 'text-[#78350F]'
                  }`}
                >
                  {t.publish.title}
                </h2>
                <p
                  className={`text-xs sm:text-sm font-medium mb-4 leading-relaxed ${
                    state.highContrast ? 'text-black' : 'text-[#92400E]'
                  }`}
                >
                  {t.publish.desc}
                </p>

                <div
                  className={`rounded-xl p-4 mb-2 border ${
                    state.highContrast
                      ? 'bg-white border-black text-black'
                      : 'bg-[#FAF7F2] border-[#FDE68A]'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-bold mb-2">
                    <Check className="w-4 h-4 text-[#15803D] shrink-0" aria-hidden="true" />
                    <span>{t.chooseMode.autoSaveNotice}</span>
                  </div>
                  {!state.isOnline && (
                    <div
                      className={`text-xs font-medium p-2.5 rounded-lg border ${
                        state.highContrast
                          ? 'bg-black text-white border-black'
                          : 'text-[#B45309] bg-[#FEF3C7] border-[#FCD34D]'
                      }`}
                    >
                      {t.banner.offlineMsg}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  id="confirm-publish-btn"
                  type="button"
                  onClick={() => setStep('DONE')}
                  className={`w-full min-h-[48px] py-4 px-6 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-3 shadow-sm transition-colors cursor-pointer ${
                    state.highContrast
                      ? 'bg-black text-white hover:bg-stone-800'
                      : 'bg-[#D97706] hover:bg-[#B45309] active:bg-[#92400E] text-white'
                  }`}
                >
                  <PartyPopper className="w-5 h-5" aria-hidden="true" />
                  <span>{t.publish.nextBtn}</span>
                </button>

                <button
                  id="back-to-build-btn"
                  type="button"
                  onClick={() => setStep('BUILD')}
                  className={`w-full min-h-[44px] py-3.5 px-6 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2 transition-colors cursor-pointer border ${
                    state.highContrast
                      ? 'bg-white text-black border-black hover:bg-stone-100'
                      : 'bg-[#EFE4D6] hover:bg-[#E3D4C2] active:bg-[#D7C4AF] text-[#43281C] border-[#D5C2AF]'
                  }`}
                >
                  <BackArrow className="w-5 h-5" aria-hidden="true" />
                  <span>{t.publish.backBtn}</span>
                </button>
              </div>
            </motion.section>
          )}

          {/* 6. DONE STATE */}
          {state.currentStep === 'DONE' && (
            <motion.section
              key="done-view"
              id="done-view"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-6 text-center"
            >
              <div
                className={`rounded-3xl p-6 sm:p-8 border-2 ${
                  state.highContrast
                    ? 'bg-white border-black text-black'
                    : 'bg-[#F4F9F4] border-[#86EFAC]'
                }`}
              >
                <div
                  className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center text-4xl mb-4 shadow-xs border-2 ${
                    state.highContrast
                      ? 'bg-black text-white border-black'
                      : 'bg-[#DCFCE7] border-[#BBF7D0]'
                  }`}
                >
                  🎉
                </div>
                <h2
                  className={`text-2xl sm:text-3xl font-black mb-2 leading-snug ${
                    state.highContrast ? 'text-black' : 'text-[#14532D]'
                  }`}
                >
                  {t.done.title}
                </h2>
                <p
                  className={`text-sm sm:text-base font-medium leading-relaxed mb-6 ${
                    state.highContrast ? 'text-black' : 'text-[#166534]'
                  }`}
                >
                  {t.done.desc}
                </p>

                {/* Bridge to the Real Web Educational Summary */}
                <div
                  className={`rounded-2xl p-4 sm:p-5 mb-6 text-right dir-${direction} border-2 ${
                    state.highContrast
                      ? 'bg-white border-black text-black'
                      : 'bg-[#FAF7F2] border-[#E7D7C8] text-[#292524]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl" aria-hidden="true">🌐</span>
                    <h3 className="font-extrabold text-sm sm:text-base text-[#78350F]">
                      {t.done.bridgeTitle}
                    </h3>
                  </div>
                  <p className="text-xs text-[#57534E] mb-3 leading-relaxed">
                    {t.done.bridgeDesc}
                  </p>

                  <div className="flex flex-col gap-2.5 text-xs">
                    <div className="bg-white p-3 rounded-xl border border-[#E7E0D6]">
                      <span className="font-black text-[#B45309] block mb-1">
                        {t.done.bridgeMethod1Title}
                      </span>
                      <span className="text-[#57534E] font-medium leading-relaxed">
                        {t.done.bridgeMethod1Desc}
                      </span>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-[#E7E0D6]">
                      <span className="font-black text-[#15803D] block mb-1">
                        {t.done.bridgeMethod2Title}
                      </span>
                      <span className="text-[#57534E] font-medium leading-relaxed">
                        {t.done.bridgeMethod2Desc}
                      </span>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-[#E7E0D6]">
                      <span className="font-black text-[#1E40AF] block mb-1">
                        {t.done.bridgeMethod3Title}
                      </span>
                      <span className="text-[#57534E] font-medium leading-relaxed">
                        {t.done.bridgeMethod3Desc}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  id="restart-to-choose-btn"
                  type="button"
                  onClick={() => setStep('CHOOSE_MODE')}
                  className={`w-full min-h-[48px] py-4 px-6 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-3 shadow-md transition-colors cursor-pointer ${
                    state.highContrast
                      ? 'bg-black text-white hover:bg-stone-800'
                      : 'bg-[#15803D] hover:bg-[#166534] active:bg-[#14532D] text-white'
                  }`}
                >
                  <RotateCcw className="w-5 h-5" aria-hidden="true" />
                  <span>{t.done.restartBtn}</span>
                </button>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Clean, calm footer with real connectivity status and direct project backup */}
      <footer
        id="app-footer"
        role="contentinfo"
        className={`w-full max-w-md pt-4 pb-2 text-center text-xs font-semibold border-t flex flex-col gap-2 ${
          state.highContrast
            ? 'border-black text-black'
            : 'border-[#E7E0D6] text-[#8C827A]'
        }`}
      >
        <div className="w-full flex items-center justify-between">
          <span id="footer-version">{t.app.footerText}</span>
          <span
            id="footer-status"
            className={`inline-flex items-center gap-1.5 font-bold ${
              state.isOnline
                ? state.highContrast
                  ? 'text-black'
                  : 'text-[#15803D]'
                : state.highContrast
                ? 'text-black'
                : 'text-[#B45309]'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                state.isOnline
                  ? state.highContrast
                    ? 'bg-black'
                    : 'bg-[#22C55E]'
                  : state.highContrast
                  ? 'bg-black border border-white'
                  : 'bg-[#F59E0B]'
              }`}
              aria-hidden="true"
            ></span>
            <span>{state.isOnline ? t.app.online : t.app.offline}</span>
          </span>
        </div>

        <div className="w-full flex items-center justify-center pt-1">
          <button
            id="footer-download-zip-link"
            type="button"
            onClick={handleDownloadZip}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors cursor-pointer border ${
              state.highContrast
                ? 'bg-white text-black border-black hover:bg-stone-100'
                : 'bg-[#FAF7F2] text-[#15803D] hover:bg-[#F0FDF4] border-[#BBF7D0]'
            }`}
          >
            <Download className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.app.downloadZip}</span>
          </button>
        </div>
      </footer>

      {/* Floating Sticky Bottom Download Bar so user NEVER misses it regardless of scroll or view */}
      <div
        id="floating-zip-download-bar"
        className="fixed bottom-3 left-0 right-0 mx-auto z-50 max-w-md w-[calc(100%-24px)]"
      >
        <div
          className={`p-3.5 rounded-2xl shadow-2xl border-2 flex items-center justify-between gap-3 backdrop-blur-md transition-all ${
            state.highContrast
              ? 'bg-black text-white border-white'
              : 'bg-[#15803D] text-white border-[#86EFAC]'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-white/25 flex items-center justify-center shrink-0">
              <Download className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-black truncate leading-tight">
                {isRtl ? 'دانلود مستقیم کدهای پروژه (ZIP)' : 'Download Project Source (ZIP)'}
              </div>
              <div className="text-[11px] text-white/90 truncate">
                {isRtl ? 'برای ذخیره و آپلود در گیت‌هاب' : 'Complete source ready for GitHub'}
              </div>
            </div>
          </div>

          <button
            id="floating-zip-download-btn"
            type="button"
            onClick={handleDownloadZip}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black bg-white text-[#15803D] hover:bg-[#F0FDF4] active:scale-95 transition-all shadow-md shrink-0 cursor-pointer"
          >
            {isRtl ? 'دریافت ZIP 📥' : 'Get ZIP 📥'}
          </button>
        </div>
      </div>
    </div>
  );
}
