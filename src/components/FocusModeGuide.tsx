import React from 'react';
import { Compass, Sparkles, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import type { StepState } from '../types.ts';

export function FocusModeGuide() {
  const { state, t, direction, toggleFocusMode } = useApp();
  const isRtl = direction === 'rtl';

  if (!state.focusMode) {
    return null;
  }

  const stepDetails: Record<
    StepState,
    { index: number; name: string; doing: string; next: string }
  > = {
    WELCOME: {
      index: 1,
      name: t.focusMode.stepWelcome,
      doing: t.focusMode.doingWelcome,
      next: t.focusMode.nextWelcome,
    },
    CHOOSE_MODE: {
      index: 2,
      name: t.focusMode.stepChoose,
      doing: t.focusMode.doingChoose,
      next: t.focusMode.nextChoose,
    },
    PRACTICE: {
      index: 3,
      name: t.focusMode.stepPractice,
      doing: t.focusMode.doingPractice,
      next: t.focusMode.nextPractice,
    },
    BUILD: {
      index: 4,
      name: t.focusMode.stepBuild,
      doing: t.focusMode.doingBuild,
      next: t.focusMode.nextBuild,
    },
    PUBLISH: {
      index: 5,
      name: t.focusMode.stepPublish,
      doing: t.focusMode.doingPublish,
      next: t.focusMode.nextPublish,
    },
    DONE: {
      index: 6,
      name: t.focusMode.stepDone,
      doing: t.focusMode.doingDone,
      next: t.focusMode.nextDone,
    },
  };

  const current = stepDetails[state.currentStep] || stepDetails.WELCOME;
  const totalSteps = 6;

  return (
    <section
      id="focus-mode-guide"
      role="region"
      aria-label={t.focusMode.title}
      className={`w-full mb-5 p-4 sm:p-5 rounded-2xl border-2 transition-all ${
        state.highContrast
          ? 'bg-black text-white border-white'
          : 'bg-[#FEF9EE] border-[#F59E0B] text-[#78350F] shadow-sm'
      }`}
    >
      {/* Header bar of Focus Guide */}
      <div className="flex items-center justify-between pb-3 border-b border-current/15 gap-2">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 shrink-0" aria-hidden="true" />
          <h2 className="text-sm sm:text-base font-black tracking-tight">
            {t.focusMode.title}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-current/10">
            {current.index} / {totalSteps}
          </span>
          <button
            type="button"
            onClick={toggleFocusMode}
            aria-label={t.app.focusModeOff}
            className="text-[11px] font-bold underline opacity-80 hover:opacity-100 cursor-pointer"
          >
            ✕
          </button>
        </div>
      </div>

      {/* The 3 Cardinal Questions for Stress-Free Navigation */}
      <div className="mt-3.5 flex flex-col gap-2.5 text-xs sm:text-sm">
        {/* 1. Where am I? */}
        <div className="flex items-start gap-2">
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold ${
              state.highContrast ? 'bg-white text-black' : 'bg-[#D97706] text-white'
            }`}
            aria-hidden="true"
          >
            1
          </div>
          <div>
            <span className="font-extrabold opacity-90">{t.focusMode.whereAmI} </span>
            <span className="font-bold">{current.name}</span>
          </div>
        </div>

        {/* 2. What am I doing? */}
        <div className="flex items-start gap-2">
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold ${
              state.highContrast ? 'bg-white text-black' : 'bg-[#D97706] text-white'
            }`}
            aria-hidden="true"
          >
            2
          </div>
          <div>
            <span className="font-extrabold opacity-90">{t.focusMode.whatAmIDoing} </span>
            <span className="font-medium">{current.doing}</span>
          </div>
        </div>

        {/* 3. What should I do next? */}
        <div className="flex items-start gap-2">
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold ${
              state.highContrast ? 'bg-white text-black' : 'bg-[#15803D] text-white'
            }`}
            aria-hidden="true"
          >
            →
          </div>
          <div>
            <span className="font-extrabold opacity-90">{t.focusMode.whatNext} </span>
            <span className="font-bold underline decoration-current/30">{current.next}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
