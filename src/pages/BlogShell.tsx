import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Desktop } from "@/components/Desktop";
import { InternetExplorer } from "@/components/LazyComponents";

const BlogShell: React.FC = () => {
  const { postId } = useParams<{ postId?: string }>();
  const navigate = useNavigate();

  const ieWindowConfig = {
    title: "Internet Explorer",
    icon: "/icons/SMALL.ico",
    component: () => <InternetExplorer initialPage={postId ?? "home"} />,
    isMinimized: false,
    position: { x: 0, y: 0 },
  } as const;

  return (
    <Desktop 
      autoOpenWindows={[ieWindowConfig]}
      onAllWindowsClosed={() => navigate("/")}
    />
  );
};

export default BlogShell; 