import React, { useState, useEffect, useCallback } from 'react';
import {
  FileText,
  Plus,
  Edit3,
  Trash2,
  Eye,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Save,
  Send,
  Download,
  Code2,
  X,
  Heading,
  AlignLeft,
  Image as ImageIcon,
  MousePointerClick,
  Layers,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getItem, setItem } from '../utils/idb.ts';
import type { SimPage, PageBlock, BlockType } from '../types.ts';
import { useApp } from '../context/AppContext.tsx';
import { triggerProjectZipDownload } from '../utils/downloadZip.ts';

const STORAGE_KEY = 'wp_sim_pages';

const INITIAL_PAGES: SimPage[] = [
  {
    id: 'page-1',
    title: 'برگه اول من',
    content: 'سلام! این یک برگه تمرینی است. می‌توانی این متن را ویرایش کنی یا یک برگه تازه بسازی.',
    status: 'published',
    updatedAt: 'امروز',
  },
];

interface WordPressSimulatorProps {
  onBackToMode?: () => void;
  onProceedToBuild?: () => void;
  onBack?: () => void;
  onGoToBuild?: () => void;
  largeText?: boolean;
}

export function WordPressSimulator({
  onBackToMode,
  onProceedToBuild,
  onBack,
  onGoToBuild,
  largeText,
}: WordPressSimulatorProps) {
  const { t, direction, announce } = useApp();
  const isRtl = direction === 'rtl';
  const BackArrow = isRtl ? ArrowRight : ArrowLeft;
  const NextArrow = isRtl ? ArrowLeft : ArrowRight;

  const handleBack = onBack || onBackToMode || (() => {});
  const handleProceed = onGoToBuild || onProceedToBuild || (() => {});

  const [pages, setPages] = useState<SimPage[]>(INITIAL_PAGES);
  const [activePageId, setActivePageId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'edit' | 'preview'>('list');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [inspectingPage, setInspectingPage] = useState<SimPage | null>(null);

  // Edit form state
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editBlocks, setEditBlocks] = useState<PageBlock[]>([]);
  const [editorTab, setEditorTab] = useState<'blocks' | 'classic'>('blocks');

  // Load pages from persistent storage (IndexedDB)
  useEffect(() => {
    async function loadData() {
      try {
        const saved = await getItem<SimPage[]>(STORAGE_KEY);
        if (saved && Array.isArray(saved) && saved.length > 0) {
          setPages(saved);
        } else {
          setPages(INITIAL_PAGES);
          await setItem(STORAGE_KEY, INITIAL_PAGES);
        }
      } catch {
        setPages(INITIAL_PAGES);
      }
    }
    loadData();
  }, []);

  // Save changes helper
  const persistPages = useCallback(async (updatedPages: SimPage[]) => {
    setPages(updatedPages);
    try {
      await setItem(STORAGE_KEY, updatedPages);
    } catch {
      // Fallback handled in idb.ts
    }
  }, []);

  const showFeedback = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => {
      setFeedbackMessage(null);
    }, 4000);
  };

  // Export Real Standalone HTML File
  const handleExportHtml = (page: SimPage) => {
    // Generate HTML from blocks or fallback to content string
    let pageBodyHtml = '';
    if (page.blocks && page.blocks.length > 0) {
      pageBodyHtml = page.blocks
        .map((block) => {
          switch (block.type) {
            case 'heading':
              return `    <h2 class="block-heading">${block.content || ''}</h2>`;
            case 'text':
              return `    <p class="block-text">${block.content || ''}</p>`;
            case 'image':
              return `    <div class="block-image-box">
      <div class="block-image-placeholder">🖼️ ${block.content || 'Image Placeholder'}</div>
    </div>`;
            case 'button':
              return `    <div class="block-button-box">
      <a href="${block.extra || '#'}" class="block-button">${block.content || 'Button'}</a>
    </div>`;
            default:
              return `    <p>${block.content || ''}</p>`;
          }
        })
        .join('\n');
    } else {
      pageBodyHtml = `    <p class="block-text">${page.content || ''}</p>`;
    }

    const htmlContent = `<!DOCTYPE html>
<html lang="${direction === 'rtl' ? 'fa' : 'en'}" dir="${direction}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.title}</title>
  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #FAF7F2;
      color: #292524;
      max-width: 720px;
      margin: 40px auto;
      padding: 24px;
      line-height: 1.75;
    }
    header {
      border-bottom: 3px solid #D97706;
      padding-bottom: 16px;
      margin-bottom: 24px;
    }
    h1 {
      color: #78350F;
      font-size: 2rem;
      margin: 0;
    }
    h2.block-heading {
      color: #43281C;
      font-size: 1.5rem;
      margin: 24px 0 12px 0;
      border-bottom: 1px solid #E7D7C8;
      padding-bottom: 6px;
    }
    p.block-text {
      font-size: 1.125rem;
      margin: 12px 0;
      white-space: pre-wrap;
    }
    .block-image-box {
      margin: 20px 0;
      text-align: center;
    }
    .block-image-placeholder {
      display: inline-block;
      width: 100%;
      max-width: 600px;
      padding: 40px 20px;
      background-color: #F5EBE1;
      border: 2px dashed #D5C2AF;
      border-radius: 16px;
      color: #78350F;
      font-weight: bold;
    }
    .block-button-box {
      margin: 20px 0;
    }
    .block-button {
      display: inline-block;
      padding: 12px 24px;
      background-color: #D97706;
      color: #FFFFFF;
      text-decoration: none;
      font-weight: bold;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    footer {
      margin-top: 60px;
      padding-top: 20px;
      border-top: 1px solid #E7D7C8;
      font-size: 0.875rem;
      color: #78716C;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px;
    }
  </style>
</head>
<body>
  <header>
    <h1>${page.title}</h1>
  </header>
  <main>
${pageBodyHtml}
  </main>
  <footer>
    <span>ICity Core • Website Export</span>
    <span>Status: ${page.status === 'published' ? 'Published' : 'Draft'}</span>
  </footer>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeTitle = page.title.replace(/[^a-zA-Z0-9\u0600-\u06FF_-]/g, '_') || 'page';
    link.href = url;
    link.download = `${safeTitle}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showFeedback(t.wpSim.exportedSuccess);
    announce(t.wpSim.exportedSuccess);
  };

  // 1. Create Page
  const handleCreatePage = async () => {
    const initialBlock: PageBlock = {
      id: `blk-${Date.now()}-1`,
      type: 'text',
      content: t.wpSim.contentPlaceholder,
    };
    const newPage: SimPage = {
      id: `page-${Date.now()}`,
      title: `${t.wpSim.createPage} #${pages.length + 1}`,
      content: t.wpSim.contentPlaceholder,
      blocks: [initialBlock],
      status: 'draft',
      updatedAt: 'recently',
    };
    const updated = [newPage, ...pages];
    await persistPages(updated);
    setActivePageId(newPage.id);
    setEditTitle(newPage.title);
    setEditContent(newPage.content);
    setEditBlocks(newPage.blocks || []);
    setViewMode('edit');
    showFeedback(t.wpSim.createdSuccess);
  };

  // 2. Start editing an existing page
  const handleStartEdit = (page: SimPage) => {
    setActivePageId(page.id);
    setEditTitle(page.title);
    setEditContent(page.content);
    // If page doesn't have blocks yet, generate a default text block from content
    const existingBlocks: PageBlock[] = (page.blocks && page.blocks.length > 0)
      ? page.blocks
      : [
          {
            id: `blk-${Date.now()}`,
            type: 'text',
            content: page.content || '',
          },
        ];
    setEditBlocks(existingBlocks);
    setViewMode('edit');
  };

  // Block manipulation helpers
  const handleAddBlock = (type: BlockType) => {
    const newBlock: PageBlock = {
      id: `blk-${Date.now()}`,
      type,
      content:
        type === 'heading'
          ? t.wpSim.blockHeadingPlaceholder
          : type === 'button'
          ? t.wpSim.blockButtonTextPlaceholder
          : type === 'image'
          ? t.wpSim.blockImagePlaceholder
          : t.wpSim.blockTextPlaceholder,
      extra: type === 'button' ? '#' : '',
    };
    setEditBlocks((prev) => [...prev, newBlock]);
  };

  const handleUpdateBlockContent = (blockId: string, content: string) => {
    setEditBlocks((prev) =>
      prev.map((b) => (b.id === blockId ? { ...b, content } : b))
    );
  };

  const handleUpdateBlockExtra = (blockId: string, extra: string) => {
    setEditBlocks((prev) =>
      prev.map((b) => (b.id === blockId ? { ...b, extra } : b))
    );
  };

  const handleMoveBlock = (index: number, direction: 'up' | 'down') => {
    setEditBlocks((prev) => {
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });
  };

  const handleDeleteBlock = (blockId: string) => {
    setEditBlocks((prev) => prev.filter((b) => b.id !== blockId));
  };

  // 3. Save Edit Page (Draft or keep current status)
  const handleSavePage = async () => {
    if (!activePageId) return;
    const trimmedTitle = editTitle.trim() || t.wpSim.titlePlaceholder;
    // Derive summary content from blocks if blocks are active
    const summaryContent = editBlocks.map((b) => b.content).filter(Boolean).join('\n\n') || editContent;
    const updated = pages.map((p) => {
      if (p.id === activePageId) {
        return {
          ...p,
          title: trimmedTitle,
          content: summaryContent,
          blocks: editBlocks,
          updatedAt: 'saved',
        };
      }
      return p;
    });
    await persistPages(updated);
    showFeedback(t.wpSim.savedSuccess);
    setViewMode('list');
  };

  // 4. Publish in Simulator (Local Published only - never claim internet live!)
  const handlePublishPage = async () => {
    if (!activePageId) return;
    const trimmedTitle = editTitle.trim() || t.wpSim.titlePlaceholder;
    const summaryContent = editBlocks.map((b) => b.content).filter(Boolean).join('\n\n') || editContent;
    const updated = pages.map((p) => {
      if (p.id === activePageId) {
        return {
          ...p,
          title: trimmedTitle,
          content: summaryContent,
          blocks: editBlocks,
          status: 'published' as const,
          updatedAt: 'saved',
        };
      }
      return p;
    });
    await persistPages(updated);
    showFeedback(t.wpSim.publishedSuccess);
    setViewMode('list');
  };

  // Quick toggle publish from list
  const handleTogglePublishFromList = async (pageId: string) => {
    const updated = pages.map((p) => {
      if (p.id === pageId) {
        const nextStatus = p.status === 'published' ? ('draft' as const) : ('published' as const);
        return {
          ...p,
          status: nextStatus,
          updatedAt: 'saved',
        };
      }
      return p;
    });
    await persistPages(updated);
    showFeedback(t.wpSim.statusToggled);
  };

  // 5. Delete Page
  const handleDeletePage = async (pageId: string) => {
    const updated = pages.filter((p) => p.id !== pageId);
    await persistPages(updated);
    if (activePageId === pageId) {
      setActivePageId(null);
      setViewMode('list');
    }
    showFeedback(t.wpSim.deletedSuccess);
  };

  // 6. Reset all pages to initial state
  const handleResetSimulator = async () => {
    await persistPages(INITIAL_PAGES);
    setActivePageId(null);
    setViewMode('list');
    showFeedback(t.wpSim.resetSuccess);
  };

  // Active page object for preview or edit
  const activePage = pages.find((p) => p.id === activePageId);

  return (
    <div id="wordpress-simulator" className="w-full flex flex-col gap-4">
      {/* Simulator top explanation badge */}
      <div className="bg-[#FEF3C7] border border-[#FCD34D] text-[#78350F] rounded-2xl p-3 text-xs sm:text-sm font-semibold flex items-center justify-between gap-2 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-base" aria-hidden="true">🛠️</span>
          <span>{t.wpSim.topBanner}</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            id="wp-sim-zip-download-btn"
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
            onClick={handleResetSimulator}
            title={t.wpSim.reset}
            aria-label={t.wpSim.reset}
            className="flex items-center gap-1 text-[11px] font-bold text-[#92400E] bg-[#FDE68A] hover:bg-[#FCD34D] active:bg-[#FBBF24] px-2.5 py-1 rounded-xl transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" aria-hidden="true" />
            <span>{t.wpSim.reset}</span>
          </button>
        </div>
      </div>

      {/* Gentle feedback banner (No flash) */}
      <AnimatePresence>
        {feedbackMessage && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            role="status"
            className="bg-[#DCFCE7] border border-[#86EFAC] text-[#14532D] text-xs sm:text-sm font-bold p-3 rounded-xl flex items-center gap-2 shadow-2xs"
          >
            <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" aria-hidden="true" />
            <span>{feedbackMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VIEW: LIST MODE */}
      {viewMode === 'list' && (
        <div className="flex flex-col gap-4">
          {/* One Primary Action Button: Create Page */}
          <button
            id="sim-create-page-btn"
            type="button"
            onClick={handleCreatePage}
            className="w-full py-4 px-5 rounded-2xl bg-[#D97706] hover:bg-[#B45309] active:bg-[#92400E] text-white font-black text-base sm:text-lg flex items-center justify-center gap-2.5 shadow-sm transition-all cursor-pointer focus-visible:ring-4 focus-visible:ring-[#92400E]"
            aria-label={t.wpSim.createPage}
          >
            <Plus className="w-6 h-6 stroke-[3]" aria-hidden="true" />
            <span>{t.wpSim.createPage}</span>
          </button>

          {/* List of simulated pages */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs sm:text-sm font-extrabold text-[#78350F]">
                {t.wpSim.listTitle} ({pages.length} {t.wpSim.pagesCount})
              </span>
              <span className="text-[11px] font-semibold text-[#8C827A]">
                {t.wpSim.storageBadge}
              </span>
            </div>

            {pages.length === 0 ? (
              <div className="bg-[#FAF7F2] border-2 border-dashed border-[#D5C2AF] rounded-2xl p-6 text-center text-sm text-[#78716C]">
                {t.wpSim.emptyList}
              </div>
            ) : (
              pages.map((page) => (
                <div
                  key={page.id}
                  className="bg-white border-2 border-[#E7E0D6] hover:border-[#D5C2AF] rounded-2xl p-4 shadow-2xs flex flex-col gap-3 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] text-[#92400E] flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-sm sm:text-base text-[#292524] leading-snug">
                          {page.title}
                        </h3>
                        <p className="text-[11px] text-[#78716C] line-clamp-1 mt-0.5">
                          {page.content}
                        </p>
                      </div>
                    </div>

                    {/* Status Pill */}
                    <span
                      className={`shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                        page.status === 'published'
                          ? 'bg-[#DCFCE7] text-[#14532D] border-[#86EFAC]'
                          : 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
                      }`}
                    >
                      {page.status === 'published' ? t.wpSim.statusPublished : t.wpSim.statusDraft}
                    </span>
                  </div>

                  {/* Actions for this page */}
                  <div className="pt-2 border-t border-[#F5EBE1] flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <button
                          type="button"
                          onClick={() => handleStartEdit(page)}
                          className="flex items-center gap-1 text-xs font-bold bg-[#FAF7F2] hover:bg-[#F5EBE1] active:bg-[#EFE4D6] text-[#43281C] px-2.5 py-1.5 rounded-xl border border-[#D5C2AF] transition-colors cursor-pointer"
                          aria-label={`${t.wpSim.edit}: ${page.title}`}
                        >
                          <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{t.wpSim.edit}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setActivePageId(page.id);
                            setViewMode('preview');
                          }}
                          className="flex items-center gap-1 text-xs font-bold bg-[#FAF7F2] hover:bg-[#F5EBE1] active:bg-[#EFE4D6] text-[#43281C] px-2.5 py-1.5 rounded-xl border border-[#D5C2AF] transition-colors cursor-pointer"
                          aria-label={`${t.wpSim.preview}: ${page.title}`}
                        >
                          <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{t.wpSim.preview}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleExportHtml(page)}
                          className="flex items-center gap-1 text-xs font-bold bg-[#EFF6FF] hover:bg-[#DBEAFE] active:bg-[#BFDBFE] text-[#1D4ED8] px-2.5 py-1.5 rounded-xl border border-[#93C5FD] transition-colors cursor-pointer"
                          title={t.wpSim.exportHtml}
                          aria-label={`${t.wpSim.exportHtml}: ${page.title}`}
                        >
                          <Download className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{t.wpSim.exportHtml}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setInspectingPage(page)}
                          className="flex items-center gap-1 text-xs font-bold bg-[#FAF7F2] hover:bg-[#F5EBE1] text-[#78716C] px-2 py-1.5 rounded-xl border border-[#D5C2AF] transition-colors cursor-pointer"
                          title={t.wpSim.inspect}
                          aria-label={`${t.wpSim.inspect}: ${page.title}`}
                        >
                          <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{t.wpSim.inspect}</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleTogglePublishFromList(page.id)}
                          className={`text-xs font-bold px-2.5 py-1.5 rounded-xl border transition-colors cursor-pointer ${
                            page.status === 'published'
                              ? 'bg-[#FAF7F2] hover:bg-[#F5EBE1] text-[#92400E] border-[#FDE68A]'
                              : 'bg-[#DCFCE7] hover:bg-[#BBF7D0] text-[#14532D] border-[#86EFAC]'
                          }`}
                          aria-label={page.status === 'published' ? t.wpSim.makeDraft : t.wpSim.publishLocal}
                        >
                          {page.status === 'published' ? t.wpSim.makeDraft : t.wpSim.publishLocal}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeletePage(page.id)}
                          className="p-1.5 rounded-xl text-[#B91C1C] hover:bg-[#FEE2E2] active:bg-[#FECACA] border border-transparent hover:border-[#FCA5A5] transition-colors cursor-pointer"
                          title={t.wpSim.deleteTitle}
                          aria-label={`${t.wpSim.deleteTitle}: ${page.title}`}
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Navigation options */}
          <div className="pt-4 border-t border-[#E7E0D6] flex flex-col gap-2.5">
            <button
              id="sim-go-to-build-btn"
              type="button"
              onClick={handleProceed}
              className="w-full py-3.5 px-5 rounded-2xl bg-[#15803D] hover:bg-[#166534] active:bg-[#14532D] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xs transition-colors cursor-pointer"
            >
              <span>{t.wpSim.goToBuild}</span>
              <NextArrow className="w-5 h-5" aria-hidden="true" />
            </button>

            <button
              id="sim-back-to-mode-btn"
              type="button"
              onClick={handleBack}
              className="w-full py-3 px-4 rounded-xl bg-[#FAF7F2] hover:bg-[#F5EBE1] text-[#78716C] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-[#E7D7C8] transition-colors cursor-pointer"
            >
              <BackArrow className="w-4 h-4" aria-hidden="true" />
              <span>{t.wpSim.backToMode}</span>
            </button>
          </div>
        </div>
      )}

      {/* VIEW: EDIT MODE */}
      {viewMode === 'edit' && activePage && (
        <div className="bg-white border-2 border-[#E7E0D6] rounded-2xl p-5 shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F5EBE1]">
            <div className="flex items-center gap-2">
              <span className="text-xl" aria-hidden="true">✏️</span>
              <h3 className="font-black text-base sm:text-lg text-[#292524]">
                {t.wpSim.editModalTitle}
              </h3>
            </div>
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                activePage.status === 'published'
                  ? 'bg-[#DCFCE7] text-[#14532D] border-[#86EFAC]'
                  : 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
              }`}
            >
              {activePage.status === 'published' ? t.wpSim.statusPublished : t.wpSim.statusDraft}
            </span>
          </div>

          {/* Mode Tabs: Visual Builder vs Classic Text */}
          <div className="grid grid-cols-2 gap-2 bg-[#FAF7F2] p-1.5 rounded-xl border border-[#E7E0D6]">
            <button
              type="button"
              onClick={() => setEditorTab('blocks')}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                editorTab === 'blocks'
                  ? 'bg-white text-[#D97706] shadow-xs border border-[#FCD34D]'
                  : 'text-[#78716C] hover:text-[#292524]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.wpSim.tabVisualBuilder}</span>
            </button>
            <button
              type="button"
              onClick={() => setEditorTab('classic')}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                editorTab === 'classic'
                  ? 'bg-white text-[#78350F] shadow-xs border border-[#E7E0D6]'
                  : 'text-[#78716C] hover:text-[#292524]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.wpSim.tabClassicEditor}</span>
            </button>
          </div>

          {/* Form Inputs */}
          <div className="flex flex-col gap-3">
            <div>
              <label htmlFor="sim-page-title" className="block text-xs sm:text-sm font-extrabold text-[#43281C] mb-1.5">
                {t.wpSim.titleLabel}
              </label>
              <input
                id="sim-page-title"
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder={t.wpSim.titlePlaceholder}
                className="w-full px-4 py-3 bg-[#FAF7F2] border-2 border-[#E7E0D6] focus:border-[#D97706] rounded-xl font-bold text-sm sm:text-base text-[#292524] transition-colors"
              />
            </div>

            {/* TAB: VISUAL BUILDER (Title / Text / Image / Button + Add / Delete / Move Up / Move Down) */}
            {editorTab === 'blocks' ? (
              <div id="visual-builder-panel" className="flex flex-col gap-3">
                {/* Block Creation Toolbar */}
                <div className="flex flex-wrap items-center gap-1.5 p-2 bg-[#FFFBEB] border border-[#FDE68A] rounded-xl">
                  <span className="text-[11px] font-black text-[#92400E] w-full mb-1">
                    {t.wpSim.tabVisualBuilder}:
                  </span>
                  <button
                    type="button"
                    onClick={() => handleAddBlock('heading')}
                    className="py-1.5 px-2.5 rounded-lg bg-white hover:bg-[#FEF3C7] text-[#78350F] border border-[#FCD34D] text-xs font-bold flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                  >
                    <Heading className="w-3.5 h-3.5 text-[#D97706]" aria-hidden="true" />
                    <span>{t.wpSim.addBlockHeading}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddBlock('text')}
                    className="py-1.5 px-2.5 rounded-lg bg-white hover:bg-[#FEF3C7] text-[#78350F] border border-[#FCD34D] text-xs font-bold flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                  >
                    <AlignLeft className="w-3.5 h-3.5 text-[#2563EB]" aria-hidden="true" />
                    <span>{t.wpSim.addBlockText}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddBlock('image')}
                    className="py-1.5 px-2.5 rounded-lg bg-white hover:bg-[#FEF3C7] text-[#78350F] border border-[#FCD34D] text-xs font-bold flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-[#16A34A]" aria-hidden="true" />
                    <span>{t.wpSim.addBlockImage}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddBlock('button')}
                    className="py-1.5 px-2.5 rounded-lg bg-white hover:bg-[#FEF3C7] text-[#78350F] border border-[#FCD34D] text-xs font-bold flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                  >
                    <MousePointerClick className="w-3.5 h-3.5 text-[#9333EA]" aria-hidden="true" />
                    <span>{t.wpSim.addBlockButton}</span>
                  </button>
                </div>

                {/* Blocks List */}
                <div className="flex flex-col gap-2.5">
                  {editBlocks.length === 0 ? (
                    <div className="text-center p-6 border-2 border-dashed border-[#E7E0D6] rounded-xl text-xs text-[#78716C]">
                      {t.wpSim.noBlocksPrompt}
                    </div>
                  ) : (
                    editBlocks.map((block, index) => (
                      <div
                        key={block.id}
                        className="bg-[#FAF7F2] border border-[#E7D7C8] rounded-xl p-3 flex flex-col gap-2 shadow-2xs"
                      >
                        <div className="flex items-center justify-between gap-2 border-b border-[#E7E0D6] pb-2">
                          <span className="text-xs font-black text-[#43281C] flex items-center gap-1.5">
                            {block.type === 'heading' && <Heading className="w-3.5 h-3.5 text-[#D97706]" />}
                            {block.type === 'text' && <AlignLeft className="w-3.5 h-3.5 text-[#2563EB]" />}
                            {block.type === 'image' && <ImageIcon className="w-3.5 h-3.5 text-[#16A34A]" />}
                            {block.type === 'button' && <MousePointerClick className="w-3.5 h-3.5 text-[#9333EA]" />}
                            <span className="capitalize">{block.type}</span>
                          </span>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleMoveBlock(index, 'up')}
                              disabled={index === 0}
                              title={t.wpSim.moveUp}
                              aria-label={t.wpSim.moveUp}
                              className="p-1 rounded-lg hover:bg-white text-[#78716C] disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed"
                            >
                              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveBlock(index, 'down')}
                              disabled={index === editBlocks.length - 1}
                              title={t.wpSim.moveDown}
                              aria-label={t.wpSim.moveDown}
                              className="p-1 rounded-lg hover:bg-white text-[#78716C] disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed"
                            >
                              <ArrowDown className="w-3.5 h-3.5" aria-hidden="true" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteBlock(block.id)}
                              title={t.wpSim.removeBlock}
                              aria-label={t.wpSim.removeBlock}
                              className="p-1 rounded-lg hover:bg-[#FEE2E2] text-[#B91C1C] cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        {/* Block-specific input fields */}
                        {block.type === 'heading' && (
                          <input
                            type="text"
                            value={block.content}
                            onChange={(e) => handleUpdateBlockContent(block.id, e.target.value)}
                            placeholder={t.wpSim.blockHeadingPlaceholder}
                            className="w-full px-3 py-2 bg-white border border-[#E7D7C8] rounded-lg text-sm font-bold text-[#43281C] focus:border-[#D97706]"
                          />
                        )}

                        {block.type === 'text' && (
                          <textarea
                            rows={3}
                            value={block.content}
                            onChange={(e) => handleUpdateBlockContent(block.id, e.target.value)}
                            placeholder={t.wpSim.blockTextPlaceholder}
                            className="w-full px-3 py-2 bg-white border border-[#E7D7C8] rounded-lg text-sm font-medium text-[#292524] focus:border-[#D97706] resize-none leading-relaxed"
                          />
                        )}

                        {block.type === 'image' && (
                          <div className="flex flex-col gap-2">
                            <input
                              type="text"
                              value={block.content}
                              onChange={(e) => handleUpdateBlockContent(block.id, e.target.value)}
                              placeholder={t.wpSim.blockImagePlaceholder}
                              className="w-full px-3 py-2 bg-white border border-[#E7D7C8] rounded-lg text-xs font-semibold text-[#43281C] focus:border-[#D97706]"
                            />
                            <div className="h-24 bg-[#FEF3C7] border-2 border-dashed border-[#FCD34D] rounded-xl flex items-center justify-center text-xs font-bold text-[#92400E]">
                              🖼️ {block.content || t.wpSim.blockImagePlaceholder}
                            </div>
                          </div>
                        )}

                        {block.type === 'button' && (
                          <div className="flex flex-col gap-2">
                            <input
                              type="text"
                              value={block.content}
                              onChange={(e) => handleUpdateBlockContent(block.id, e.target.value)}
                              placeholder={t.wpSim.blockButtonTextPlaceholder}
                              className="w-full px-3 py-2 bg-white border border-[#E7D7C8] rounded-lg text-xs font-bold text-[#43281C] focus:border-[#D97706]"
                            />
                            <input
                              type="text"
                              value={block.extra || ''}
                              onChange={(e) => handleUpdateBlockExtra(block.id, e.target.value)}
                              placeholder={t.wpSim.blockButtonUrlPlaceholder}
                              className="w-full px-3 py-1.5 bg-white border border-[#E7D7C8] rounded-lg text-xs font-mono text-[#78716C] focus:border-[#D97706]"
                            />
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              /* TAB: CLASSIC TEXT EDITOR */
              <div>
                <label htmlFor="sim-page-content" className="block text-xs sm:text-sm font-extrabold text-[#43281C] mb-1.5">
                  {t.wpSim.contentLabel}
                </label>
                <textarea
                  id="sim-page-content"
                  rows={4}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  placeholder={t.wpSim.contentPlaceholder}
                  className="w-full px-4 py-3 bg-[#FAF7F2] border-2 border-[#E7E0D6] focus:border-[#D97706] rounded-xl font-medium text-sm sm:text-base text-[#292524] leading-relaxed transition-colors resize-none"
                />
              </div>
            )}

            {/* Clear, accurate honesty note: never claim it is live on the internet! */}
            <div className="bg-[#FAF7F2] border border-[#E7D7C8] rounded-xl p-3 text-[11px] sm:text-xs text-[#78716C] leading-relaxed">
              💡 {t.wpSim.honestyNote}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2.5 pt-2">
            <button
              id="sim-publish-btn"
              type="button"
              onClick={handlePublishPage}
              className="w-full py-3.5 px-4 rounded-xl bg-[#15803D] hover:bg-[#166534] active:bg-[#14532D] text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
              <span>{t.wpSim.publishBtn}</span>
            </button>

            <button
              id="sim-save-draft-btn"
              type="button"
              onClick={handleSavePage}
              className="w-full py-3 px-4 rounded-xl bg-[#D97706] hover:bg-[#B45309] active:bg-[#92400E] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" aria-hidden="true" />
              <span>{t.wpSim.saveDraftBtn}</span>
            </button>

            <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#F5EBE1]">
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className="py-2.5 px-4 rounded-xl bg-[#FAF7F2] hover:bg-[#F5EBE1] text-[#78716C] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <BackArrow className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t.wpSim.cancelBtn}</span>
              </button>

              <button
                type="button"
                onClick={() => handleDeletePage(activePage.id)}
                className="py-2.5 px-3 rounded-xl text-[#B91C1C] hover:bg-[#FEE2E2] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t.wpSim.deleteThisPage}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: PREVIEW MODE */}
      {viewMode === 'preview' && activePage && (
        <div className="bg-white border-2 border-[#E7E0D6] rounded-2xl p-5 shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F5EBE1]">
            <div className="flex items-center gap-2">
              <span className="text-xl" aria-hidden="true">👁️</span>
              <h3 className="font-black text-base sm:text-lg text-[#292524]">
                {t.wpSim.previewModalTitle}
              </h3>
            </div>
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                activePage.status === 'published'
                  ? 'bg-[#DCFCE7] text-[#14532D] border-[#86EFAC]'
                  : 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
              }`}
            >
              {activePage.status === 'published' ? t.wpSim.statusPublished : t.wpSim.statusDraft}
            </span>
          </div>

          {/* Simulated Mobile Reader Screen */}
          <div className="bg-[#FAF7F2] border-2 border-[#E7E0D6] rounded-xl p-5 flex flex-col gap-3">
            <h4 className="text-lg sm:text-xl font-black text-[#43281C]">
              {activePage.title}
            </h4>
            <div className="h-0.5 w-12 bg-[#D97706] rounded-full"></div>

            {activePage.blocks && activePage.blocks.length > 0 ? (
              <div className="flex flex-col gap-3">
                {activePage.blocks.map((block) => (
                  <div key={block.id}>
                    {block.type === 'heading' && (
                      <h5 className="font-extrabold text-base sm:text-lg text-[#43281C] border-b border-[#E7D7C8] pb-1">
                        {block.content}
                      </h5>
                    )}
                    {block.type === 'text' && (
                      <p className="text-sm sm:text-base text-[#44403C] leading-relaxed whitespace-pre-wrap font-medium">
                        {block.content}
                      </p>
                    )}
                    {block.type === 'image' && (
                      <div className="p-5 bg-[#FEF3C7] border border-dashed border-[#FCD34D] rounded-xl text-center text-xs font-bold text-[#92400E]">
                        🖼️ {block.content || 'Image Placeholder'}
                      </div>
                    )}
                    {block.type === 'button' && (
                      <div>
                        <span className="inline-block py-2 px-4 rounded-xl bg-[#D97706] text-white font-bold text-xs shadow-xs">
                          {block.content || 'Button'}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm sm:text-base text-[#44403C] leading-relaxed whitespace-pre-wrap font-medium">
                {activePage.content || t.wpSim.previewEmpty}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleExportHtml(activePage)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-[#EFF6FF] hover:bg-[#DBEAFE] active:bg-[#BFDBFE] text-[#1D4ED8] font-bold text-xs flex items-center justify-center gap-1.5 border border-[#93C5FD] transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span>{t.wpSim.exportHtml}</span>
              </button>

              <button
                type="button"
                onClick={() => setInspectingPage(activePage)}
                className="py-2.5 px-3 rounded-xl bg-[#FAF7F2] hover:bg-[#F5EBE1] text-[#78716C] font-bold text-xs flex items-center justify-center gap-1.5 border border-[#D5C2AF] transition-colors cursor-pointer"
              >
                <Code2 className="w-4 h-4" aria-hidden="true" />
                <span>{t.wpSim.inspect}</span>
              </button>
            </div>

            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleStartEdit(activePage)}
                className="flex-1 py-3 px-4 rounded-xl bg-[#D97706] hover:bg-[#B45309] active:bg-[#92400E] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Edit3 className="w-4 h-4" aria-hidden="true" />
                <span>{t.wpSim.editThisPage}</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('list')}
                className="py-3 px-4 rounded-xl bg-[#FAF7F2] hover:bg-[#F5EBE1] text-[#78716C] font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 border border-[#E7D7C8] transition-colors cursor-pointer"
              >
                <BackArrow className="w-4 h-4" aria-hidden="true" />
                <span>{t.wpSim.backToList}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WEB INSPECTOR MODAL */}
      <AnimatePresence>
        {inspectingPage && (
          <div
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs"
            role="dialog"
            aria-modal="true"
            aria-labelledby="inspector-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border-2 border-[#D97706] flex flex-col gap-4 text-[#292524] max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-[#F5EBE1] pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] text-[#D97706] flex items-center justify-center font-bold">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <h3 id="inspector-modal-title" className="text-base sm:text-lg font-black text-[#78350F]">
                    {t.wpSim.inspectorTitle}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setInspectingPage(null)}
                  className="p-1.5 rounded-xl text-[#78716C] hover:bg-[#FAF7F2] cursor-pointer"
                  aria-label={t.wpSim.inspectorClose}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Technical Inspection Specs */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-[#F0FDF4] border border-[#86EFAC] p-2.5 rounded-xl">
                  <span className="text-[#166534] font-medium block">{t.wpSim.inspectorStatusCode}</span>
                  <strong className="text-[#15803D] text-sm font-black">200 OK</strong>
                </div>

                <div className="bg-[#EFF6FF] border border-[#93C5FD] p-2.5 rounded-xl">
                  <span className="text-[#1E40AF] font-medium block">{t.wpSim.inspectorContentType}</span>
                  <strong className="text-[#1D4ED8] text-xs font-mono font-bold">text/html</strong>
                </div>

                <div className="bg-[#FAF7F2] border border-[#E7D7C8] p-2.5 rounded-xl">
                  <span className="text-[#78716C] font-medium block">{t.wpSim.inspectorEncoding}</span>
                  <strong className="text-[#43281C] text-xs font-mono font-bold">UTF-8</strong>
                </div>

                <div className="bg-[#FAF7F2] border border-[#E7D7C8] p-2.5 rounded-xl">
                  <span className="text-[#78716C] font-medium block">{t.wpSim.inspectorPageSize}</span>
                  <strong className="text-[#43281C] text-xs font-mono font-bold">
                    ~{Math.max(400, (inspectingPage.title.length + inspectingPage.content.length + 620))} B
                  </strong>
                </div>
              </div>

              {/* DOM Structure View */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-extrabold text-[#78350F]">
                  ساختار کد HTML تولیدشده:
                </span>
                <div className="bg-[#1C1917] text-[#A8A29E] rounded-xl p-3 text-[11px] font-mono leading-relaxed overflow-x-auto text-left dir-ltr">
                  <span className="text-[#F59E0B]">&lt;!DOCTYPE html&gt;</span><br />
                  <span className="text-[#38BDF8]">&lt;html&gt;</span><br />
                  &nbsp;&nbsp;<span className="text-[#38BDF8]">&lt;head&gt;</span><br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#38BDF8]">&lt;title&gt;</span><span className="text-white">{inspectingPage.title}</span><span className="text-[#38BDF8]">&lt;/title&gt;</span><br />
                  &nbsp;&nbsp;<span className="text-[#38BDF8]">&lt;/head&gt;</span><br />
                  &nbsp;&nbsp;<span className="text-[#38BDF8]">&lt;body&gt;</span><br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#38BDF8]">&lt;h1&gt;</span><span className="text-white">{inspectingPage.title}</span><span className="text-[#38BDF8]">&lt;/h1&gt;</span><br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#38BDF8]">&lt;p&gt;</span><span className="text-white">{inspectingPage.content.slice(0, 35)}...</span><span className="text-[#38BDF8]">&lt;/p&gt;</span><br />
                  &nbsp;&nbsp;<span className="text-[#38BDF8]">&lt;/body&gt;</span><br />
                  <span className="text-[#38BDF8]">&lt;/html&gt;</span>
                </div>
              </div>

              {/* Direct Export from Inspector */}
              <div className="flex items-center gap-2 pt-2 border-t border-[#F5EBE1]">
                <button
                  type="button"
                  onClick={() => {
                    handleExportHtml(inspectingPage);
                    setInspectingPage(null);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>{t.wpSim.exportHtml}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setInspectingPage(null)}
                  className="py-3 px-4 rounded-xl bg-[#FAF7F2] hover:bg-[#F5EBE1] text-[#78716C] font-bold text-xs sm:text-sm cursor-pointer border border-[#E7D7C8]"
                >
                  {t.wpSim.inspectorClose}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
