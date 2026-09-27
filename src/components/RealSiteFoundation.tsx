import React from 'react';
import {
  BookOpen,
  Gamepad2,
  Hammer,
  Send,
  SlidersHorizontal,
  ArrowRight,
  ArrowLeft,
  Info,
  Server,
  Sparkles,
  Globe,
  FileCode,
  Download,
  Laptop,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';

interface RealSiteFoundationProps {
  onBackToMode?: () => void;
  onOpenHostingSimulator?: () => void;
  onGoToWordPress?: () => void;
  onBack?: () => void;
  onExploreHosting?: () => void;
  largeText?: boolean;
}

export function RealSiteFoundation({
  onBackToMode,
  onOpenHostingSimulator,
  onGoToWordPress,
  onBack,
  onExploreHosting,
}: RealSiteFoundationProps) {
  const { t, direction } = useApp();
  const isRtl = direction === 'rtl';
  const BackArrow = isRtl ? ArrowRight : ArrowLeft;
  const NextArrow = isRtl ? ArrowLeft : ArrowRight;
  const handleBack = onBack || onBackToMode || (() => {});
  const handleHosting = onExploreHosting || onOpenHostingSimulator || (() => {});
  const handleOpenWordPress = onGoToWordPress || (() => {});

  const steps = [
    {
      id: 'step-learn',
      title: t.realSite.stepLearnTitle,
      desc: t.realSite.stepLearnDesc,
      icon: BookOpen,
      color: 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]',
      status: t.realSite.statusActiveSim,
    },
    {
      id: 'step-practice',
      title: t.realSite.stepPracticeTitle,
      desc: t.realSite.stepPracticeDesc,
      icon: Gamepad2,
      color: 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]',
      status: t.realSite.statusActiveSim,
    },
    {
      id: 'step-build',
      title: t.realSite.stepBuildTitle,
      desc: t.realSite.stepBuildDesc,
      icon: Hammer,
      color: 'bg-[#F5EBE1] text-[#78350F] border-[#E7D7C8]',
      status: t.realSite.statusReady,
    },
    {
      id: 'step-publish',
      title: t.realSite.stepPublishTitle,
      desc: t.realSite.stepPublishDesc,
      icon: Send,
      color: 'bg-[#F5EBE1] text-[#78716C] border-[#E7D7C8]',
      status: t.realSite.statusNextVer,
    },
    {
      id: 'step-manage',
      title: t.realSite.stepManageTitle,
      desc: t.realSite.stepManageDesc,
      icon: SlidersHorizontal,
      color: 'bg-[#F5EBE1] text-[#78716C] border-[#E7D7C8]',
      status: t.realSite.statusNextVer,
    },
  ];

  const tutorialSteps = [
    {
      number: '1',
      title: t.realSite.tutorialStep1Title,
      desc: t.realSite.tutorialStep1Desc,
      icon: Hammer,
      badgeColor: 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]',
    },
    {
      number: '2',
      title: t.realSite.tutorialStep2Title,
      desc: t.realSite.tutorialStep2Desc,
      icon: Download,
      badgeColor: 'bg-[#EFF6FF] text-[#1E40AF] border-[#BFDBFE]',
    },
    {
      number: '3',
      title: t.realSite.tutorialStep3Title,
      desc: t.realSite.tutorialStep3Desc,
      icon: Laptop,
      badgeColor: 'bg-[#F0FDF4] text-[#166534] border-[#BBF7D0]',
    },
    {
      number: '4',
      title: t.realSite.tutorialStep4Title,
      desc: t.realSite.tutorialStep4Desc,
      icon: Globe,
      badgeColor: 'bg-[#FAF5FF] text-[#6B21A8] border-[#E9D5FF]',
    },
  ];

  return (
    <div id="real-site-foundation" className="w-full flex flex-col gap-5">
      {/* Header Banner */}
      <div className="bg-[#F4F9F4] border-2 border-[#86EFAC] rounded-3xl p-5 text-center shadow-xs">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-[#DCFCE7] border-2 border-[#BBF7D0] flex items-center justify-center text-3xl mb-3 shadow-2xs">
          🌐
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-[#14532D] mb-1 leading-snug">
          {t.realSite.headerTitle}
        </h2>
        <p className="text-[#166534] text-xs sm:text-sm font-medium leading-relaxed">
          {t.realSite.headerDesc}
        </p>
      </div>

      {/* Honest Transparency Notice */}
      <div
        id="foundation-notice"
        className="bg-[#FFFBEB] border-2 border-[#FCD34D] rounded-2xl p-4 flex items-start gap-3 shadow-2xs"
      >
        <Info className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" aria-hidden="true" />
        <div className="text-xs sm:text-sm text-[#92400E] leading-relaxed">
          <strong>{t.realSite.noticeTitle}</strong>
          <p className="mt-1 font-medium text-[#78350F]">
            {t.realSite.noticeText}
          </p>
        </div>
      </div>

      {/* GUIDED TUTORIAL: How to use "Export Page" to get HTML and connect to the wider web */}
      <section
        id="export-page-tutorial"
        aria-labelledby="tutorial-heading"
        className="bg-white border-2 border-[#D97706] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col gap-4"
      >
        <div className="flex items-start justify-between gap-3 border-b border-[#F5EBE1] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#FEF3C7] border-2 border-[#FCD34D] text-[#B45309] flex items-center justify-center shrink-0 shadow-2xs">
              <Download className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h3 id="tutorial-heading" className="text-base sm:text-lg font-black text-[#78350F]">
                {t.realSite.tutorialTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#78716C] font-medium">
                {t.realSite.tutorialSubtitle}
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-block text-[11px] font-black px-2.5 py-1 rounded-full bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE] shrink-0">
            HTML5 Export
          </span>
        </div>

        {/* 4 Step-by-Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {tutorialSteps.map((s) => {
            const StepIcon = s.icon;
            return (
              <div
                key={s.number}
                className="bg-[#FAF7F2] border border-[#E7D7C8] rounded-2xl p-4 flex flex-col gap-2 relative transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-7 h-7 rounded-xl border font-black text-xs flex items-center justify-center ${s.badgeColor}`}
                    >
                      {s.number}
                    </span>
                    <h4 className="font-black text-xs sm:text-sm text-[#43281C]">
                      {s.title}
                    </h4>
                  </div>
                  <StepIcon className="w-4 h-4 text-[#78716C]" aria-hidden="true" />
                </div>
                <p className="text-xs text-[#57534E] leading-relaxed font-medium">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Emphasis on Connection to the Wider Web */}
        <div className="bg-[#EFF6FF] border-2 border-[#93C5FD] rounded-2xl p-4 flex items-start gap-3 shadow-2xs">
          <Globe className="w-5 h-5 text-[#1D4ED8] shrink-0 mt-0.5" aria-hidden="true" />
          <div className="flex flex-col gap-1">
            <strong className="text-xs sm:text-sm font-black text-[#1E40AF]">
              🌐 {isRtl ? 'چرا خروجی HTML اتصال شما به اینترنت است؟' : 'Why HTML Export Connects You to the Wider Web'}
            </strong>
            <p className="text-xs text-[#1E3A8A] leading-relaxed font-medium">
              {t.realSite.tutorialWebConnectionCallout}
            </p>
          </div>
        </div>

        {/* Action Button to practice right away in Pages Simulator */}
        <button
          id="tutorial-action-btn"
          type="button"
          onClick={handleOpenWordPress}
          className="w-full py-3.5 px-4 rounded-2xl bg-[#D97706] hover:bg-[#B45309] active:bg-[#92400E] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
        >
          <Sparkles className="w-4 h-4" aria-hidden="true" />
          <span>{t.realSite.tutorialActionBtn}</span>
          <NextArrow className="w-4 h-4" aria-hidden="true" />
        </button>
      </section>

      {/* 5-Step Roadmap */}
      <div className="flex flex-col gap-3">
        <div className="text-xs sm:text-sm font-black text-[#43281C] px-1">
          {t.realSite.roadmapTitle}
        </div>

        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.id}
              className="bg-white border-2 border-[#E7E0D6] rounded-2xl p-4 shadow-2xs flex items-start gap-3.5 transition-colors"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${step.color}`}
                aria-hidden="true"
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-black text-sm sm:text-base text-[#292524]">
                    {step.title}
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#78716C] border border-[#E7D7C8]">
                    {step.status}
                  </span>
                </div>
                <p className="text-xs text-[#57534E] leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bridge to the Real Web Educational Card */}
      <div className="bg-[#FAF7F2] border-2 border-[#D5C2AF] rounded-3xl p-5 flex flex-col gap-4 shadow-2xs">
        <div className="flex items-center justify-between gap-2 border-b border-[#E7D7C8] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center border border-[#BFDBFE]">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base text-[#1E3A8A]">
                {t.bridge.title}
              </h3>
              <p className="text-[11px] text-[#64748B] font-medium">
                {t.bridge.subtitle}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-[#DBEAFE] text-[#1E40AF] border border-[#BFDBFE] shrink-0">
            {t.bridge.summaryBadge}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-white border border-[#E7E0D6] rounded-2xl p-3.5 flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-xs font-black text-[#78350F]">
              <FileCode className="w-4 h-4 text-[#D97706]" />
              <span>{t.bridge.step1Title}</span>
            </div>
            <p className="text-[11px] text-[#57534E] leading-relaxed">
              {t.bridge.step1Desc}
            </p>
          </div>

          <div className="bg-white border border-[#E7E0D6] rounded-2xl p-3.5 flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-xs font-black text-[#15803D]">
              <Globe className="w-4 h-4 text-[#16A34A]" />
              <span>{t.bridge.step2Title}</span>
            </div>
            <p className="text-[11px] text-[#57534E] leading-relaxed">
              {t.bridge.step2Desc}
            </p>
          </div>

          <div className="bg-white border border-[#E7E0D6] rounded-2xl p-3.5 flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-xs font-black text-[#1E40AF]">
              <Sparkles className="w-4 h-4 text-[#3B82F6]" />
              <span>{t.bridge.step3Title}</span>
            </div>
            <p className="text-[11px] text-[#57534E] leading-relaxed">
              {t.bridge.step3Desc}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive explore button: Hosting Simulator */}
      <div className="pt-2 flex flex-col gap-2.5">
        <button
          id="open-hosting-sim-btn"
          type="button"
          onClick={handleHosting}
          className="w-full py-4 px-5 rounded-2xl bg-[#D97706] hover:bg-[#B45309] active:bg-[#92400E] text-white font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xs transition-colors cursor-pointer focus-visible:ring-4 focus-visible:ring-[#92400E]"
        >
          <Server className="w-5 h-5" aria-hidden="true" />
          <span>{t.realSite.exploreHostingBtn}</span>
        </button>

        <button
          id="back-to-mode-btn"
          type="button"
          onClick={handleBack}
          className="w-full py-3 px-4 rounded-xl bg-[#FAF7F2] hover:bg-[#F5EBE1] text-[#78716C] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-[#E7D7C8] transition-colors cursor-pointer"
        >
          <BackArrow className="w-4 h-4" aria-hidden="true" />
          <span>{t.realSite.backToModeBtn}</span>
        </button>
      </div>
    </div>
  );
}
