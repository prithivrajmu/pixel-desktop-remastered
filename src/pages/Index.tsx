import React, { useMemo, useCallback } from "react";
import { Desktop } from "@/components/Desktop";
import { InternetExplorer } from "@/components/LazyComponents";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ModernPortfolio from "./ModernPortfolio";
import { Win95ModeDialog, useWin95ModePreference } from "@/components/Win95ModeDialog";

const Index: React.FC = () => {
  // Initialize router hooks first - these must be called unconditionally
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Then initialize our custom hook
  const { mode, showDialog, setShowDialog, handleModeSelect } = useWin95ModePreference();
  
  // Check URL parameter for mode override
  const urlMode = searchParams.get('mode') as 'modern' | 'win95' | null;
  const currentMode = urlMode || mode || 'modern';

  // Determine if the current path is /blog or /blog/:id
  const blogInfo = useMemo(() => {
    const match = location.pathname.match(/^\/blog(?:\/(.*))?$/);
    if (match) {
      return {
        isBlog: true,
        postId: match[1] || "home",
      } as const;
    }
    return { isBlog: false, postId: null } as const;
  }, [location.pathname]);

  // Build auto-open windows array
  const autoWindows = useMemo(() => {
    if (!blogInfo.isBlog) return [];

    return [
      {
        title: "Internet Explorer",
        icon: "/icons/SMALL.ico",
        component: () => (
          <InternetExplorer initialPage={blogInfo.postId ?? "home"} />
        ),
        isMinimized: false,
        position: { x: 0, y: 0 },
      } as const,
    ];
  }, [blogInfo]);

  // When all windows are closed, if we are on a blog path, navigate back to root
  const handleAllClosed = useCallback(() => {
    if (blogInfo.isBlog) {
      navigate("/", { replace: true });
    }
  }, [blogInfo.isBlog, navigate]);

  // Show Win95 mode for blog routes or if explicitly set to win95
  const shouldShowWin95 = currentMode === 'win95' || blogInfo.isBlog;

  return (
    <>
      <Win95ModeDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        onSelectMode={handleModeSelect}
      />
      {shouldShowWin95 ? (
        <Desktop
          autoOpenWindows={autoWindows}
          onAllWindowsClosed={handleAllClosed}
        />
      ) : (
        <ModernPortfolio />
      )}
    </>
  );
};

export default Index;
