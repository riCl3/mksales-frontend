'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  ArrowLeft,
  Loader2,
  AlertCircle,
  FileText,
  Sparkles,
  Menu,
  X,
  Shield,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const SCALE_STEP = 0.25;
const MIN_SCALE = 0.5;
const MAX_SCALE = 3;

const ease = [0.4, 0, 0.2, 1];

export default function PdfViewerClient({
  pdfUrl,
  productName,
  productSlug,
  productImage,
  shortDescription,
}) {
  const [pdf, setPdf] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(0.7);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const containerRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const renderingRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function loadPdf() {
      try {
        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

        const response = await fetch(pdfUrl);
        if (!response.ok) throw new Error('Failed to load PDF');

        const arrayBuffer = await response.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdfDoc = await loadingTask.promise;

        if (!cancelled) {
          setPdf(pdfDoc);
          setTotalPages(pdfDoc.numPages);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Failed to load PDF document');
          setLoading(false);
        }
      }
    }

    loadPdf();
    return () => { cancelled = true; };
  }, [pdfUrl]);

  const renderPage = useCallback(async (pageNum, currentScale) => {
    if (!pdf || renderingRef.current) return;
    renderingRef.current = true;

    try {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: currentScale * (window.devicePixelRatio || 1) });

      const canvasContainer = canvasContainerRef.current;
      if (!canvasContainer) return;

      const existingCanvas = canvasContainer.querySelector(`canvas[data-page="${pageNum}"]`);
      if (existingCanvas) existingCanvas.remove();

      const canvas = document.createElement('canvas');
      canvas.dataset.page = pageNum;
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.width = `${viewport.width / (window.devicePixelRatio || 1)}px`;
      canvas.style.height = `${viewport.height / (window.devicePixelRatio || 1)}px`;
      canvas.className = 'mx-auto shadow-xl rounded-lg ring-1 ring-black/5';
      canvas.draggable = false;
      canvas.oncontextmenu = (e) => e.preventDefault();
      canvas.onselectstart = (e) => e.preventDefault();

      const ctx = canvas.getContext('2d');
      await page.render({ canvasContext: ctx, viewport }).promise;

      canvasContainer.appendChild(canvas);
    } catch (err) {
      // silent
    } finally {
      renderingRef.current = false;
    }
  }, [pdf]);

  useEffect(() => {
    if (pdf) renderPage(currentPage, scale);
  }, [pdf, currentPage, scale, renderPage]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.ctrlKey && (e.key === 'p' || e.key === 's' || e.key === 'u' || e.key === 'a')) {
        e.preventDefault();
        return false;
      }
      if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
        return false;
      }
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      canvasContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      canvasContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + SCALE_STEP, MAX_SCALE));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - SCALE_STEP, MIN_SCALE));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    function onFsChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-[#F0F5FA] to-[#E2EBF3] dark:from-[#020C14] dark:via-[#051A2A] dark:to-[#082638] flex items-center justify-center transition-colors duration-300">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease }}
          className="text-center"
        >
          <div className="relative mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-darkBlue flex items-center justify-center mx-auto shadow-lg shadow-brand-blue/20">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-brand-green rounded-full animate-pulse" />
          </div>
          <p className="text-zinc-600 dark:text-zinc-300 font-medium text-lg">Loading document...</p>
          <p className="text-zinc-400 dark:text-zinc-500 text-sm mt-1">Please wait</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-[#F0F5FA] to-[#E2EBF3] dark:from-[#020C14] dark:via-[#051A2A] dark:to-[#082638] flex items-center justify-center transition-colors duration-300">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="text-center px-6 max-w-md"
        >
          <div className="w-20 h-20 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-brand-darkBlue dark:text-white mb-2 font-display">Unable to Load Document</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8">{error}</p>
          <Link
            href={`/product/${productSlug}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white font-semibold rounded-xl hover:bg-brand-darkBlue transition-colors duration-300 shadow-lg shadow-brand-blue/20"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Product
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-white via-[#F0F5FA] to-[#E2EBF3] dark:from-[#020C14] dark:via-[#051A2A] dark:to-[#082638] transition-colors duration-300 flex flex-col select-none"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease }}
        className="bg-white/80 dark:bg-[#0A1F30]/80 backdrop-blur-md border-b border-[#C7C7C7]/40 dark:border-[#1A3A50]/60 px-4 py-3 flex items-center justify-between gap-4 z-50 shrink-0"
      >
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile sidebar toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-[#1A3A50]/60 transition-colors lg:hidden"
            title="Toggle sidebar"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
            ) : (
              <Menu className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
            )}
          </button>

          <Link
            href={`/product/${productSlug}`}
            className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-brand-blue transition-colors shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </Link>
          <div className="h-6 w-px bg-[#C7C7C7]/40 dark:bg-[#1A3A50]/60 shrink-0 hidden sm:block" />
          <div className="flex items-center gap-2 min-w-0">
            <FileText className="w-4 h-4 text-brand-blue shrink-0" />
            <h1 className="text-sm sm:text-base font-semibold text-brand-darkBlue dark:text-white truncate">{productName}</h1>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Page Navigation */}
          <button
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-[#1A3A50]/60 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Previous page"
          >
            <ChevronLeft className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
          </button>
          <span className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-medium tabular-nums min-w-[52px] text-center">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-[#1A3A50]/60 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Next page"
          >
            <ChevronRight className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
          </button>

          <div className="h-6 w-px bg-[#C7C7C7]/40 dark:bg-[#1A3A50]/60 mx-0.5" />

          {/* Zoom Controls */}
          <button
            onClick={handleZoomOut}
            disabled={scale <= MIN_SCALE}
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-[#1A3A50]/60 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
          </button>
          <span className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-medium tabular-nums min-w-[42px] text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            disabled={scale >= MAX_SCALE}
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-[#1A3A50]/60 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
          </button>

          <div className="h-6 w-px bg-[#C7C7C7]/40 dark:bg-[#1A3A50]/60 mx-0.5 hidden sm:block" />

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-[#1A3A50]/60 transition-colors hidden sm:block"
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
            ) : (
              <Maximize2 className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
            )}
          </button>
        </div>
      </motion.header>

      {/* Body: Sidebar + Canvas */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar - Desktop */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="hidden lg:flex flex-col w-80 shrink-0 bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm border-r border-[#C7C7C7]/30 dark:border-[#1A3A50]/50 overflow-y-auto"
        >
          <SidebarContent
            productName={productName}
            productSlug={productSlug}
            productImage={productImage}
            currentPage={currentPage}
            totalPages={totalPages}
            scale={scale}
            isFullscreen={isFullscreen}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onToggleFullscreen={toggleFullscreen}
          />
        </motion.aside>

        {/* Sidebar - Mobile Overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.aside
                initial={{ x: -320 }}
                animate={{ x: 0 }}
                exit={{ x: -320 }}
                transition={{ duration: 0.3, ease }}
                className="fixed left-0 top-0 bottom-0 w-80 bg-white dark:bg-[#0A1F30] shadow-2xl z-50 lg:hidden overflow-y-auto"
              >
                <div className="flex items-center justify-between p-4 border-b border-[#C7C7C7]/30 dark:border-[#1A3A50]/50">
                  <span className="text-sm font-semibold text-brand-darkBlue dark:text-white">Document Info</span>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-[#1A3A50]/60 transition-colors"
                  >
                    <X className="w-4 h-4 text-zinc-500" />
                  </button>
                </div>
                <SidebarContent
                  productName={productName}
                  productSlug={productSlug}
                  productImage={productImage}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  scale={scale}
                  isFullscreen={isFullscreen}
                  onPrevPage={handlePrevPage}
                  onNextPage={handleNextPage}
                  onZoomIn={handleZoomIn}
                  onZoomOut={handleZoomOut}
                  onToggleFullscreen={toggleFullscreen}
                  onNavigate={() => setSidebarOpen(false)}
                />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* PDF Canvas Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div
            ref={canvasContainerRef}
            className="flex-1 overflow-auto py-8 px-4 relative"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          >
            {/* Watermark Overlay */}
            <div
              className="absolute inset-0 pointer-events-none z-10 overflow-hidden select-none"
              aria-hidden="true"
            >
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute text-[11px] font-semibold tracking-wide text-zinc-900/[0.04] dark:text-white/[0.04] whitespace-nowrap"
                  style={{
                    top: `${(i * 18) - 5}%`,
                    left: '-5%',
                    transform: 'rotate(-35deg)',
                    transformOrigin: 'center',
                  }}
                >
                  {productName} &mdash; For Viewing Only
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarContent({
  productName,
  productSlug,
  productImage,
  currentPage,
  totalPages,
  scale,
  isFullscreen,
  onPrevPage,
  onNextPage,
  onZoomIn,
  onZoomOut,
  onToggleFullscreen,
  onNavigate,
}) {
  return (
    <div className="flex flex-col p-5 gap-5">
      {/* Product Thumbnail */}
      {productImage && (
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-[#F0F5FA] to-[#E2EBF3] dark:from-[#0A1F30] dark:to-[#0E2940] ring-1 ring-[#C7C7C7]/30 dark:ring-[#1A3A50] shadow-md">
          <Image
            src={productImage}
            alt={productName}
            fill
            sizes="320px"
            className="object-cover"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-xl pointer-events-none" />
        </div>
      )}

      {/* Product Name */}
      <div>
        <h2 className="text-base font-bold text-brand-darkBlue dark:text-white font-display leading-tight">{productName}</h2>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">Product Document</p>
      </div>

      <div className="h-px bg-[#C7C7C7]/30 dark:bg-[#1A3A50]/40" />

      {/* Page Navigation */}
      <div>
        <label className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2 block">Page</label>
        <div className="flex items-center gap-2">
          <button
            onClick={onPrevPage}
            disabled={currentPage <= 1}
            className="flex-1 h-9 rounded-lg bg-white/80 dark:bg-white/[0.05] border border-[#C7C7C7]/40 dark:border-[#1A3A50]/60 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
          </button>
          <span className="text-sm text-zinc-700 dark:text-zinc-200 font-semibold tabular-nums min-w-[60px] text-center">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={onNextPage}
            disabled={currentPage >= totalPages}
            className="flex-1 h-9 rounded-lg bg-white/80 dark:bg-white/[0.05] border border-[#C7C7C7]/40 dark:border-[#1A3A50]/60 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
          </button>
        </div>
      </div>

      {/* Zoom Controls */}
      <div>
        <label className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2 block">Zoom</label>
        <div className="flex items-center gap-2">
          <button
            onClick={onZoomOut}
            disabled={scale <= MIN_SCALE}
            className="flex-1 h-9 rounded-lg bg-white/80 dark:bg-white/[0.05] border border-[#C7C7C7]/40 dark:border-[#1A3A50]/60 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ZoomOut className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
          </button>
          <span className="text-sm text-zinc-700 dark:text-zinc-200 font-semibold tabular-nums min-w-[52px] text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={onZoomIn}
            disabled={scale >= MAX_SCALE}
            className="flex-1 h-9 rounded-lg bg-white/80 dark:bg-white/[0.05] border border-[#C7C7C7]/40 dark:border-[#1A3A50]/60 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ZoomIn className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
          </button>
        </div>
      </div>

      {/* Fullscreen */}
      <button
        onClick={onToggleFullscreen}
        className="w-full h-9 rounded-lg bg-white/80 dark:bg-white/[0.05] border border-[#C7C7C7]/40 dark:border-[#1A3A50]/60 flex items-center justify-center gap-2 hover:bg-zinc-50 dark:hover:bg-white/[0.08] transition-colors text-sm text-zinc-600 dark:text-zinc-300"
      >
        {isFullscreen ? (
          <>
            <Minimize2 className="w-4 h-4" />
            Exit Fullscreen
          </>
        ) : (
          <>
            <Maximize2 className="w-4 h-4" />
            Fullscreen
          </>
        )}
      </button>

      <div className="h-px bg-[#C7C7C7]/30 dark:bg-[#1A3A50]/40" />

      {/* Actions */}
      <div className="flex flex-col gap-2.5">
        <Link
          href={`/product/${productSlug}`}
          onClick={onNavigate}
          className="flex items-center justify-center gap-2 h-10 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 font-medium text-sm hover:border-brand-blue hover:text-brand-blue transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Product
        </Link>
        <Link
          href={`/contact?product=${productSlug}`}
          onClick={onNavigate}
          className="relative flex items-center justify-center gap-2 h-10 rounded-xl bg-brand-green text-white font-semibold text-sm shadow-lg shadow-brand-green/25 hover:shadow-xl hover:shadow-brand-green/40 transition-shadow duration-300 overflow-hidden group"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
          <Sparkles className="w-4 h-4" />
          Request Price
        </Link>
      </div>

      <div className="h-px bg-[#C7C7C7]/30 dark:bg-[#1A3A50]/40" />

      {/* Document Notice */}
      <div className="flex items-start gap-2.5 p-3 rounded-lg bg-brand-blue/[0.05] dark:bg-brand-blue/[0.08] border border-brand-blue/10">
        <Shield className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
          This document is for viewing only. Downloading, printing, or copying is restricted.
        </p>
      </div>
    </div>
  );
}
