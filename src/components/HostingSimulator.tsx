import React, { useState, useEffect } from 'react';
import {
  Server,
  Database,
  RotateCcw,
  Plus,
  Trash2,
  FileCode,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Send,
  Home,
  DoorOpen,
  DoorClosed,
  FolderOpen,
  KeyRound,
  Download,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getItem, setItem } from '../utils/idb.ts';
import type { HostingSite, SimFile } from '../types.ts';
import { useApp } from '../context/AppContext.tsx';
import { triggerProjectZipDownload } from '../utils/downloadZip.ts';

const HOSTING_STORAGE_KEY = 'icity_hosting_sim_sites';

const DEFAULT_SITE: HostingSite = {
  id: 'site-default',
  name: 'mysite',
  domain: 'mysite.local-sim',
  isPublished: false,
  files: [
    { id: 'f-1', name: 'index.html', size: '2.4 KB' },
    { id: 'f-2', name: 'style.css', size: '1.1 KB' },
  ],
  database: {
    name: 'icity_local_db',
    status: 'active',
    recordsCount: 3,
  },
};

interface HostingSimulatorProps {
  onBack: () => void;
  largeText?: boolean;
}

export function HostingSimulator({ onBack }: HostingSimulatorProps) {
  const { t, direction } = useApp();
  const isRtl = direction === 'rtl';
  const BackArrow = isRtl ? ArrowRight : ArrowLeft;

  const [site, setSite] = useState<HostingSite>(DEFAULT_SITE);
  const [activeTab, setActiveTab] = useState<'overview' | 'digitalHouse' | 'files' | 'database'>('overview');
  const [feedback, setFeedback] = useState<string | null>(null);

  // Load from IndexedDB
  useEffect(() => {
    async function loadData() {
      try {
        const saved = await getItem<HostingSite>(HOSTING_STORAGE_KEY);
        if (saved && saved.id) {
          setSite(saved);
        } else {
          setSite(DEFAULT_SITE);
          await setItem(HOSTING_STORAGE_KEY, DEFAULT_SITE);
        }
      } catch {
        setSite(DEFAULT_SITE);
      }
    }
    loadData();
  }, []);

  const persistSite = async (newSite: HostingSite) => {
    setSite(newSite);
    try {
      await setItem(HOSTING_STORAGE_KEY, newSite);
    } catch {
      // Fallback in idb.ts
    }
  };

  const showNotice = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3500);
  };

  // 1. Create Site (in simulator)
  const handleCreateNewSite = async () => {
    const siteNum = Math.floor(Math.random() * 90 + 10);
    const freshSite: HostingSite = {
      id: `site-${Date.now()}`,
      name: `site-${siteNum}`,
      domain: `site-${Date.now().toString().slice(-4)}.local-sim`,
      isPublished: false,
      files: [
        { id: `f-${Date.now()}-1`, name: 'index.html', size: '1.8 KB' },
      ],
      database: {
        name: 'new_local_db',
        status: 'active',
        recordsCount: 1,
      },
    };
    await persistSite(freshSite);
    showNotice(t.hostingSim.createdSiteNotice);
  };

  // 2. Publish (Local simulation only)
  const handleTogglePublish = async () => {
    const updated: HostingSite = {
      ...site,
      isPublished: !site.isPublished,
    };
    await persistSite(updated);
    if (updated.isPublished) {
      showNotice(t.hostingSim.publishedNotice);
    } else {
      showNotice(t.hostingSim.unpublishedNotice);
    }
  };

  // 3. Add a file to simulated file manager
  const handleAddFile = async () => {
    const fileNames = ['about.html', 'script.js', 'gallery.html', 'notes.txt'];
    const randomName = fileNames[Math.floor(Math.random() * fileNames.length)];
    const newFile: SimFile = {
      id: `f-${Date.now()}`,
      name: `${randomName}`,
      size: `${(Math.random() * 3 + 0.5).toFixed(1)} KB`,
    };
    const updated: HostingSite = {
      ...site,
      files: [...site.files, newFile],
    };
    await persistSite(updated);
    showNotice(t.hostingSim.fileAddedNotice);
  };

  // 4. Delete file
  const handleDeleteFile = async (fileId: string) => {
    const updated: HostingSite = {
      ...site,
      files: site.files.filter((f) => f.id !== fileId),
    };
    await persistSite(updated);
    showNotice(t.hostingSim.fileDeletedNotice);
  };

  // 5. Database action: Add simulated record
  const handleAddDbRecord = async () => {
    const updated: HostingSite = {
      ...site,
      database: {
        ...site.database,
        recordsCount: site.database.recordsCount + 1,
        status: 'active',
      },
    };
    await persistSite(updated);
    showNotice(t.hostingSim.recordAddedNotice);
  };

  // 6. Reset all to initial state
  const handleReset = async () => {
    await persistSite(DEFAULT_SITE);
    setActiveTab('overview');
    showNotice(t.hostingSim.resetSuccess);
  };

  return (
    <div id="hosting-simulator" className="w-full flex flex-col gap-4">
      {/* Top Banner Notice */}
      <div className="bg-[#FEF3C7] border border-[#FCD34D] text-[#78350F] rounded-2xl p-3 text-xs sm:text-sm font-semibold flex items-center justify-between gap-2 shadow-2xs">
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-[#B45309]" aria-hidden="true" />
          <span>{t.hostingSim.topBanner}</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            id="hosting-sim-zip-download-btn"
            type="button"
            onClick={() => triggerProjectZipDownload()}
            className="flex items-center gap-1 text-[11px] font-bold text-white bg-[#15803D] hover:bg-[#166534] px-2.5 py-1 rounded-xl transition-colors cursor-pointer shadow-2xs"
            title="دانلود کل پروژه (ZIP)"
          >
            <Download className="w-3 h-3" aria-hidden="true" />
            <span>ZIP</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 text-[11px] font-bold text-[#92400E] bg-[#FDE68A] hover:bg-[#FCD34D] active:bg-[#FBBF24] px-2.5 py-1 rounded-xl transition-colors cursor-pointer"
            title={t.hostingSim.reset}
          >
            <RotateCcw className="w-3 h-3" aria-hidden="true" />
            <span>{t.hostingSim.reset}</span>
          </button>
        </div>
      </div>

      {/* Gentle notice alert */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="bg-[#DCFCE7] border border-[#86EFAC] text-[#14532D] text-xs sm:text-sm font-bold p-3 rounded-xl flex items-center gap-2 shadow-2xs"
          >
            <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" aria-hidden="true" />
            <span>{feedback}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main card */}
      <div className="bg-white border-2 border-[#E7E0D6] rounded-2xl p-5 shadow-xs flex flex-col gap-4">
        {/* Site Header */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#F5EBE1]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] border border-[#FDE68A] flex items-center justify-center text-2xl shrink-0">
              🖥️
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-[#292524] leading-snug">
                {site.name}
              </h3>
              <p className="text-xs font-mono text-[#78716C] mt-0.5">
                {site.domain}
              </p>
            </div>
          </div>

          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-full border shrink-0 ${
              site.isPublished
                ? 'bg-[#DCFCE7] text-[#14532D] border-[#86EFAC]'
                : 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
            }`}
          >
            {site.isPublished ? t.hostingSim.statusPublished : t.hostingSim.statusOffline}
          </span>
        </div>

        {/* Action Tabs: Overview | Digital House | Files | Database */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-[#FAF7F2] p-1.5 rounded-xl border border-[#E7E0D6]">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-white text-[#78350F] shadow-xs border border-[#E7E0D6]'
                : 'text-[#78716C] hover:text-[#292524]'
            }`}
          >
            {t.hostingSim.tabOverview}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('digitalHouse')}
            className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'digitalHouse'
                ? 'bg-white text-[#92400E] shadow-xs border border-[#FCD34D]'
                : 'text-[#78716C] hover:text-[#292524]'
            }`}
          >
            <Home className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{t.hostingSim.tabDigitalHouse}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('files')}
            className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'files'
                ? 'bg-white text-[#78350F] shadow-xs border border-[#E7E0D6]'
                : 'text-[#78716C] hover:text-[#292524]'
            }`}
          >
            {t.hostingSim.tabFiles} ({site.files.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('database')}
            className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'database'
                ? 'bg-white text-[#78350F] shadow-xs border border-[#E7E0D6]'
                : 'text-[#78716C] hover:text-[#292524]'
            }`}
          >
            {t.hostingSim.tabDatabase}
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-3">
            <div className="bg-[#FAF7F2] border border-[#E7E0D6] rounded-xl p-3.5 flex flex-col gap-2 text-xs text-[#44403C]">
              <div className="flex items-center justify-between font-bold">
                <span>{t.hostingSim.fileCountLabel}</span>
                <span className="font-mono text-[#78350F]">{site.files.length} {t.hostingSim.fileCountUnit}</span>
              </div>
              <div className="flex items-center justify-between font-bold">
                <span>{t.hostingSim.dbStatusLabel}</span>
                <span className="text-[#15803D]">{site.database.recordsCount} {t.hostingSim.dbRecordsUnit}</span>
              </div>
              <div className="flex items-center justify-between font-bold">
                <span>{t.hostingSim.testDomainLabel}</span>
                <span className="font-mono text-xs text-[#92400E]">http://{site.domain}</span>
              </div>
            </div>

            {/* Clear honesty note */}
            <div className="bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] p-3 rounded-xl text-xs leading-relaxed">
              💡 {t.hostingSim.honestyReminder}
            </div>

            {/* Main Action: Publish Toggle */}
            <button
              id="hosting-toggle-publish-btn"
              type="button"
              onClick={handleTogglePublish}
              className={`w-full py-3.5 px-4 rounded-xl font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer ${
                site.isPublished
                  ? 'bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#92400E] border-2 border-[#FCD34D]'
                  : 'bg-[#15803D] hover:bg-[#166534] active:bg-[#14532D] text-white'
              }`}
            >
              <Send className="w-4 h-4" aria-hidden="true" />
              <span>{site.isPublished ? t.hostingSim.unpublishBtn : t.hostingSim.publishBtn}</span>
            </button>

            {/* Create Site Action */}
            <button
              id="hosting-create-site-btn"
              type="button"
              onClick={handleCreateNewSite}
              className="w-full py-3 px-4 rounded-xl bg-[#FAF7F2] hover:bg-[#F5EBE1] text-[#78350F] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-[#E7D7C8] transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              <span>{t.hostingSim.createSiteBtn}</span>
            </button>
          </div>
        )}

        {/* TAB 2: DIGITAL HOUSE (Visual Metaphor) */}
        {activeTab === 'digitalHouse' && (
          <div id="digital-house-metaphor-container" className="flex flex-col gap-3.5">
            <div className="bg-[#FFFBEB] border border-[#FCD34D] rounded-xl p-3.5">
              <h4 className="font-black text-sm text-[#78350F] flex items-center gap-1.5">
                <span>{t.hostingSim.digitalHouseTitle}</span>
              </h4>
              <p className="text-xs text-[#92400E] mt-1 leading-relaxed">
                {t.hostingSim.digitalHouseSubtitle}
              </p>
            </div>

            {/* 4 Interactive Metaphor Rooms/Elements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* 1. Files Room */}
              <div className="bg-[#FAF7F2] border border-[#E7D7C8] rounded-xl p-3.5 flex flex-col gap-1.5 shadow-2xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-black text-[#78350F]">
                    <div className="w-7 h-7 rounded-lg bg-[#FEF3C7] text-[#B45309] flex items-center justify-center">
                      <FolderOpen className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <span>{t.hostingSim.dhRoomFilesTitle}</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#78716C] bg-white px-2 py-0.5 rounded-md border border-[#E7D7C8]">
                    {site.files.length} {t.hostingSim.fileCountUnit}
                  </span>
                </div>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  {t.hostingSim.dhRoomFilesDesc}
                </p>
              </div>

              {/* 2. Database Office */}
              <div className="bg-[#FAF7F2] border border-[#E7D7C8] rounded-xl p-3.5 flex flex-col gap-1.5 shadow-2xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-black text-[#15803D]">
                    <div className="w-7 h-7 rounded-lg bg-[#DCFCE7] text-[#15803D] flex items-center justify-center">
                      <Database className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <span>{t.hostingSim.dhOfficeDbTitle}</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#15803D] bg-white px-2 py-0.5 rounded-md border border-[#BBF7D0]">
                    {site.database.recordsCount} {t.hostingSim.dbRecordsUnit}
                  </span>
                </div>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  {t.hostingSim.dhOfficeDbDesc}
                </p>
              </div>

              {/* 3. House Plaque / Domain */}
              <div className="bg-[#FAF7F2] border border-[#E7D7C8] rounded-xl p-3.5 flex flex-col gap-1.5 shadow-2xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-black text-[#1E3A8A]">
                    <div className="w-7 h-7 rounded-lg bg-[#DBEAFE] text-[#1D4ED8] flex items-center justify-center">
                      <KeyRound className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <span>{t.hostingSim.dhPlateDomainTitle}</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#1E40AF] bg-white px-2 py-0.5 rounded-md border border-[#BFDBFE]">
                    {site.domain}
                  </span>
                </div>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  {t.hostingSim.dhPlateDomainDesc}
                </p>
              </div>

              {/* 4. Front Door / Publish */}
              <div className={`border rounded-xl p-3.5 flex flex-col gap-1.5 shadow-2xs transition-colors ${
                site.isPublished
                  ? 'bg-[#F0FDF4] border-[#86EFAC]'
                  : 'bg-[#FFFBEB] border-[#FDE68A]'
              }`}>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-black text-[#43281C]">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      site.isPublished ? 'bg-[#DCFCE7] text-[#15803D]' : 'bg-[#FEF3C7] text-[#B45309]'
                    }`}>
                      {site.isPublished ? (
                        <DoorOpen className="w-4 h-4" aria-hidden="true" />
                      ) : (
                        <DoorClosed className="w-4 h-4" aria-hidden="true" />
                      )}
                    </div>
                    <span>{t.hostingSim.dhDoorPublishTitle}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    site.isPublished
                      ? 'bg-white text-[#15803D] border-[#86EFAC]'
                      : 'bg-white text-[#92400E] border-[#FDE68A]'
                  }`}>
                    {site.isPublished ? t.hostingSim.statusPublished : t.hostingSim.statusOffline}
                  </span>
                </div>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  {t.hostingSim.dhDoorPublishDesc}
                </p>
                <div className="mt-1 text-xs font-bold flex items-center gap-1.5">
                  <span className={site.isPublished ? 'text-[#15803D]' : 'text-[#B45309]'}>
                    {site.isPublished ? t.hostingSim.dhDoorOpen : t.hostingSim.dhDoorClosed}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FILES */}
        {activeTab === 'files' && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#78350F]">{t.hostingSim.filesFolderTitle}</span>
              <button
                type="button"
                onClick={handleAddFile}
                className="flex items-center gap-1 text-xs font-bold bg-[#DCFCE7] hover:bg-[#BBF7D0] text-[#14532D] px-2.5 py-1.5 rounded-lg border border-[#86EFAC] transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t.hostingSim.addSampleFile}</span>
              </button>
            </div>

            <div className="flex flex-col gap-2 max-h-56 overflow-y-auto">
              {site.files.map((file) => (
                <div
                  key={file.id}
                  className="bg-[#FAF7F2] border border-[#E7E0D6] rounded-xl p-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <FileCode className="w-4 h-4 text-[#B45309]" aria-hidden="true" />
                    <span className="font-mono text-xs font-bold text-[#292524]">{file.name}</span>
                    <span className="text-[10px] text-[#78716C]">({file.size})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteFile(file.id)}
                    className="p-1.5 text-[#B91C1C] hover:bg-[#FEE2E2] rounded-lg transition-colors cursor-pointer"
                    title={t.hostingSim.deleteFile}
                  >
                    <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: DATABASE */}
        {activeTab === 'database' && (
          <div className="flex flex-col gap-3">
            <div className="bg-[#FAF7F2] border border-[#E7E0D6] rounded-xl p-4 flex flex-col gap-2.5 text-xs text-[#44403C]">
              <div className="flex items-center gap-2 font-bold text-sm text-[#78350F] mb-1">
                <Database className="w-4 h-4 text-[#B45309]" aria-hidden="true" />
                <span>{t.hostingSim.dbTitle}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{t.hostingSim.dbNameLabel}</span>
                <span className="font-mono font-bold text-[#292524]">{site.database.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{t.hostingSim.dbRowsLabel}</span>
                <span className="font-bold text-[#15803D]">{site.database.recordsCount} {t.hostingSim.dbRecordsUnit}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{t.hostingSim.dbLocationLabel}</span>
                <span className="text-[#78716C]">{t.hostingSim.dbLocationVal}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddDbRecord}
              className="w-full py-3 px-4 rounded-xl bg-[#DCFCE7] hover:bg-[#BBF7D0] text-[#14532D] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-[#86EFAC] transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              <span>{t.hostingSim.addDbRecordBtn}</span>
            </button>
          </div>
        )}

        {/* Back navigation */}
        <div className="pt-2 border-t border-[#F5EBE1]">
          <button
            type="button"
            onClick={onBack}
            className="w-full py-3 px-4 rounded-xl bg-[#FAF7F2] hover:bg-[#F5EBE1] text-[#78716C] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-[#E7D7C8] transition-colors cursor-pointer"
          >
            <BackArrow className="w-4 h-4" aria-hidden="true" />
            <span>{t.hostingSim.backBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
