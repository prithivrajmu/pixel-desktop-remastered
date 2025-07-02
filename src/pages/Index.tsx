import React, { useMemo, useCallback } from "react";
import { Desktop } from "@/components/Desktop";
import { InternetExplorer } from "@/components/LazyComponents";
import { useLocation, useNavigate } from "react-router-dom";

const Index: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

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

  return (
    <Desktop
      autoOpenWindows={autoWindows}
      onAllWindowsClosed={handleAllClosed}
    />
  );
};

export default Index;
