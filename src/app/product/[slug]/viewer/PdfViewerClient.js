'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Minimize2, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const SCALE_STEP = 0.25;
const MIN_SCALE = 0.5;
const MAX_SCALE = 3;

export default function PdfViewerClient({ pdfUrl, productName, productSlug }) {
  const [pdf, setPdf] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1.2);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
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
      canvas.className = 'mx-auto shadow-lg rounded-sm';

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
      if (e.ctrlKey && (e.key === 'p' || e.key === 's' || e.key === 'u')) {
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
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-brand-blue animate-spin mx-auto mb-4" />
          <p className="text-zinc-600 dark:text-zinc-300 font-medium">Loading document...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-[#F0F5FA] to-[#E2EBF3] dark:from-[#020C14] dark:via-[#051A2A] dark:to-[#082638] flex items-center justify-center transition-colors duration-300">
        <div className="text-center px-6 max-w-md">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-brand-darkBlue dark:text-white mb-2">Unable to Load Document</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6">{error}</p>
          <Link
            href={`/product/${productSlug}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white font-semibold rounded-lg hover:bg-brand-darkBlue transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Product
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-white via-[#F0F5FA] to-[#E2EBF3] dark:from-[#020C14] dark:via-[#051A2A] dark:to-[#082638] transition-colors duration-300 flex flex-col select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Header */}
      <header className="bg-white/80 dark:bg-[#0A1F30]/80 backdrop-blur-md border-b border-[#C7C7C7]/40 dark:border-[#1A3A50]/60 px-4 py-3 flex items-center justify-between gap-4 z-50 shrink-0">
        <div className="flex items-center gap-4 min-w-0">
          <Link
            href={`/product/${productSlug}`}
            className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-brand-blue transition-colors shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </Link>
          <div className="h-6 w-px bg-[#C7C7C7]/40 dark:bg-[#1A3A50]/60 shrink-0" />
          <h1 className="text-sm sm:text-base font-semibold text-brand-darkBlue dark:text-white truncate">{productName}</h1>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Page Navigation */}
          <button
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-[#1A3A50]/60 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Previous page"
          >
            <ChevronLeft className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
          </button>
          <span className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-medium tabular-nums min-w-[60px] text-center">
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

          <div className="h-6 w-px bg-[#C7C7C7]/40 dark:bg-[#1A3A50]/60 mx-1" />

          {/* Zoom Controls */}
          <button
            onClick={handleZoomOut}
            disabled={scale <= MIN_SCALE}
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-[#1A3A50]/60 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
          </button>
          <span className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-medium tabular-nums min-w-[45px] text-center">
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

          <div className="h-6 w-px bg-[#C7C7C7]/40 dark:bg-[#1A3A50]/60 mx-1 hidden sm:block" />

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
      </header>

      {/* PDF Canvas Area */}
      <div
        ref={canvasContainerRef}
        className="flex-1 overflow-auto py-8 px-4"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  );
}
