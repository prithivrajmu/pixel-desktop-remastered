import { Desktop } from "@/components/Desktop";
import { InternetExplorer } from "@/components/LazyComponents";
import { useParams } from "react-router-dom";
import React from "react";

const BlogShell: React.FC = () => {
  const { postId } = useParams<{ postId?: string }>();

  // Wrap InternetExplorer to pass the initial page prop
  const IEWrapper: React.FC = () => (
    <InternetExplorer initialPage={postId ?? "home"} />
  );

  const ieWindowConfig = {
    title: "Internet Explorer",
    icon: "/icons/SMALL.ico",
    component: IEWrapper,
    isMinimized: false,
    position: { x: 0, y: 0 },
  } as const;

  return <Desktop autoOpenWindows={[ieWindowConfig]} />;
};

export default BlogShell; 