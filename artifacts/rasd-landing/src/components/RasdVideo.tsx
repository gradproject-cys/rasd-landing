import { useRef, useEffect } from "react";

export default function RasdVideo() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

  const src = `${import.meta.env.BASE_URL}rasd-video.html`;

  return (
    <div
      ref={wrapperRef}
      style={{ position: "relative", width: "100%", paddingBottom: "56.25%" }}
    >
      <iframe
        ref={iframeRef}
        src={src}
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
        }}
      />
    </div>
  );
}
