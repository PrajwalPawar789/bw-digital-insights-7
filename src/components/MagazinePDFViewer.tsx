import React, {useEffect} from 'react';
import {
  MinimalButton,
  ScrollMode,
  SpecialZoomLevel,
  Viewer,
  ViewMode,
  Worker,
} from '@react-pdf-viewer/core';
import {
  pageNavigationPlugin,
} from '@react-pdf-viewer/page-navigation';
import {
  ThumbnailDirection,
  thumbnailPlugin,
} from '@react-pdf-viewer/thumbnail';
import { fullScreenPlugin } from '@react-pdf-viewer/full-screen';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/full-screen/lib/styles/index.css';
import { Button } from '@/components/ui/button';
import { FileWarning, Loader2, RefreshCw, Maximize2 } from 'lucide-react';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import '@react-pdf-viewer/thumbnail/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';

interface MagazinePDFViewerProps {
  fileUrl: string;
  title: string;
  onDownload?: () => void;
  onFullScreen?: () => void;
  fullScreen?: boolean;
  initialPage?: number;
}

const MagazinePDFViewer: React.FC<MagazinePDFViewerProps> = ({
  fileUrl,
  title,
  onDownload,
  onFullScreen,
  fullScreen = false,
  initialPage,
}) => {
  const [pdfError, setPdfError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [viewerData, setViewerData] = React.useState<string | null>(null);

  useEffect(() => {
    let objectUrl: string | null = null;
    const loadPdf = async () => {
      if (!fileUrl) {
        setPdfError("No file URL provided.");
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        setPdfError(null);
        
        const response = await fetch(fileUrl);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch PDF: ${response.status} ${response.statusText}`);
        }
        
        const arrayBuffer = await response.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
        objectUrl = URL.createObjectURL(blob);
        setViewerData(objectUrl);
        
      } catch (error) {
        setPdfError(error instanceof Error ? error.message : "An unknown error occurred while loading the PDF.");
      } finally {
        setIsLoading(false);
      }
    };

    loadPdf();

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [fileUrl]);

  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { jumpToNextPage, jumpToPreviousPage, jumpToPage } =
    pageNavigationPluginInstance;

  const thumbnailPluginInstance = thumbnailPlugin();
  const { Thumbnails } = thumbnailPluginInstance;

  const zoomPluginInstance = zoomPlugin();
  const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;
  const fullScreenPluginInstance = fullScreenPlugin();
  const { EnterFullScreen } = fullScreenPluginInstance;

  const handleDocumentLoad = () => {
    setPdfError(null);
    try {
      if (
        typeof initialPage === 'number' &&
        initialPage >= 1 &&
        typeof jumpToPage === 'function'
      ) {
        jumpToPage(Math.max(0, initialPage - 1));
      }
    } catch (e) {
      console.warn('Failed to jump to initial page', e);
    }
  };

  // Keyboard nav (← →)
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        try {
          jumpToNextPage();
        } catch (_) {}
      } else if (e.key === 'ArrowLeft') {
        try {
          jumpToPreviousPage();
        } catch (_) {}
      } else if (e.key === 'f' || e.key === 'F') {
        if (onFullScreen) onFullScreen();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [jumpToNextPage, jumpToPreviousPage, onFullScreen]);

  const pdfjsVersion = '3.11.174';

  if (!fileUrl || fileUrl.trim() === '') {
    return (
      <div className="text-center py-16 bg-yellow-50 rounded-lg border border-yellow-200">
        <FileWarning className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
        <p className="text-yellow-700 font-medium mb-2 text-lg">
          No PDF Available
        </p>
        <p className="text-yellow-600 text-sm">
          This magazine doesn't have a PDF file uploaded yet.
        </p>
      </div>
    );
  }

  return (
    <div className="pdf-viewer-container">
      {/* Header */}
      <div className="pdf-viewer-toolbar">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-insightRed rounded-full flex items-center justify-center">
              <FileWarning className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                {fullScreen
                  ? 'Premium Reading Mode'
                  : 'Interactive Magazine Preview'}
              </h2>
              <p className="text-sm text-gray-300">{title}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <ZoomOutButton />
            <ZoomPopover />
            <ZoomInButton />
            <EnterFullScreen>
              {(props) => (
                <Button
                  onClick={props.onClick}
                  variant="outline"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                >
                  <Maximize2 className="h-4 w-4 mr-2" />
                  Full screen
                </Button>
              )}
            </EnterFullScreen>
          </div>
        </div>
      </div>

      <div className="relative bg-gray-50 h-[calc(100vh-200px)]">
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50/80 z-10">
            <Loader2 className="h-12 w-12 animate-spin text-insightRed mb-4" />
            <p className="text-lg font-medium text-gray-700">Loading magazine content...</p>
            <p className="text-sm text-gray-500">0% Complete</p>
          </div>
        ) : pdfError || !viewerData ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center py-16 mx-4">
              <div className="premium-card p-8 max-w-md mx-auto">
                <FileWarning className="h-16 w-16 text-insightRed mx-auto mb-4" />
                <h3 className="text-insightBlack font-bold text-xl mb-2">
                  Could Not Load Magazine
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  {pdfError || "An unexpected error occurred."}
                </p>
                <Button
                  onClick={() => window.location.reload()} // Simple retry
                  className="bg-insightRed hover:bg-insightBlack text-white"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full grid grid-cols-[220px_1fr] gap-4">
            <div className="hidden lg:block overflow-y-auto border-r bg-gray-100">
              <Thumbnails />
            </div>
            <div className="h-full">
              <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}>
            <Viewer
              fileUrl={viewerData as string}
              plugins={[
                pageNavigationPluginInstance,
                thumbnailPluginInstance,
                zoomPluginInstance,
                fullScreenPluginInstance,
              ]}
                  onDocumentLoad={handleDocumentLoad}
                  renderError={(_error) => (
                    <div className="text-center py-16">
                      <p className="text-red-600">Failed to render PDF.</p>
                    </div>
                  )}
                  theme={{
                    theme: 'dark',
                  }}
                  viewMode={ViewMode.DualPage}
                  scrollMode={ScrollMode.Vertical}
                  defaultScale={SpecialZoomLevel.PageFit}
                />
              </Worker>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MagazinePDFViewer;
