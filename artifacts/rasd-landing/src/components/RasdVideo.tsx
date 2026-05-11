import { useRef, useEffect, useState } from "react";
import videoHtml from "../../public/rasd-video.html?raw";

export default function RasdVideo() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const handleResize = () => {
      if (iframe.contentWindow) {
        iframe.contentWindow.dispatchEvent(new Event("resize"));
      }
    };
    const ro = new ResizeObserver(handleResize);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, []);

  const openFullscreen = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    } else if ((iframe as any).webkitRequestFullscreen) {
      (iframe as any).webkitRequestFullscreen();
    }
  };

  return (
    <div ref={wrapperRef} style={{ position: "relative", width: "100%", paddingBottom: "56.25%" }}>
      <iframe
        ref={iframeRef}
        srcDoc={videoHtml}
        title="RASD explainer animation"
        scrolling="no"
        allow="autoplay; fullscreen"
        allowFullScreen
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          border: "none",
          display: "block",
          background: "#000",
        }}
      />
      {isMobile && (
        <button
          onClick={openFullscreen}
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            zIndex: 10,
            background: "rgba(0,0,0,0.65)",
            border: "1px solid rgba(0,212,255,0.5)",
            color: "#00d4ff",
            fontSize: "11px",
            padding: "5px 10px",
            borderRadius: "4px",
            cursor: "pointer",
            letterSpacing: "0.1em",
            backdropFilter: "blur(4px)",
          }}
        >
          ⛶ Fullscreen
        </button>
      )}
    </div>
  );
}
