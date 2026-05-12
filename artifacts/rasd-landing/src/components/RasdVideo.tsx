import { useRef, useEffect, useState } from "react";
import videoHtml from "../../public/rasd-video.html?raw";

export default function RasdVideo() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const modalIframeRef = useRef<HTMLIFrameElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // Dispatch resize into the inline iframe when container changes
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const handleResize = () => {
      if (iframe.contentWindow) iframe.contentWindow.dispatchEvent(new Event("resize"));
    };
    const ro = new ResizeObserver(handleResize);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, []);

  // Dispatch resize into the modal iframe when it opens
  useEffect(() => {
    if (!modalOpen) return;
    const iframe = modalIframeRef.current;
    if (!iframe) return;
    const fire = () => {
      if (iframe.contentWindow) iframe.contentWindow.dispatchEvent(new Event("resize"));
    };
    const t = setTimeout(fire, 100); // give iframe time to load
    window.addEventListener("resize", fire, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener("resize", fire); };
  }, [modalOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  return (
    <>
      {/* Inline video (always shown) */}
      <div ref={wrapperRef} style={{ position: "relative", width: "100%", paddingBottom: "56.25%" }}>
        <iframe
          ref={iframeRef}
          srcDoc={videoHtml}
          title="RASD explainer animation"
          scrolling="no"
          allow="autoplay"
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
        {/* Mobile fullscreen button overlay */}
        {isMobile && (
          <button
            onClick={() => setModalOpen(true)}
            style={{
              position: "absolute",
              bottom: "8px",
              right: "8px",
              zIndex: 10,
              background: "rgba(0,0,0,0.7)",
              border: "1px solid rgba(0,212,255,0.6)",
              color: "#00d4ff",
              fontSize: "11px",
              padding: "4px 10px",
              borderRadius: "4px",
              cursor: "pointer",
              letterSpacing: "0.1em",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }}
          >
            ⛶ Watch fullscreen
          </button>
        )}
      </div>

      {/* Full-screen modal (mobile only) */}
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#000",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Top bar */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 12px",
            background: "rgba(0,0,0,0.8)",
            borderBottom: "1px solid rgba(0,212,255,0.2)",
            flexShrink: 0,
          }}>
            <span style={{ color: "#00d4ff", fontSize: "11px", letterSpacing: "0.2em" }}>
              RASD · EXPLAINER
            </span>
            <span style={{ color: "#5a6a78", fontSize: "9px", letterSpacing: "0.15em" }}>
              Rotate for best view
            </span>
            <button
              onClick={() => setModalOpen(false)}
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
                fontSize: "14px",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          </div>

          {/* Video fills remaining space */}
          <div style={{ flex: 1, position: "relative" }}>
            <iframe
              ref={modalIframeRef}
              srcDoc={videoHtml}
              title="RASD explainer animation fullscreen"
              scrolling="no"
              allow="autoplay"
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
          </div>
        </div>
      )}
    </>
  );
}
