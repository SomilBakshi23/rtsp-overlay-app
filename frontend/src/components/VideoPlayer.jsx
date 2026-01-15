import { useEffect, useRef } from "react";
import Hls from "hls.js";
import Overlay from "./Overlay";

const VideoPlayer = ({ overlays, onUpdate, onRemove }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const url = "http://127.0.0.1:5000/hls/stream.m3u8";

    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        debug: false,
      });
      hls.loadSource(url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        video.muted = true;
        video.play().catch(e => console.log("Autoplay blocked", e));
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });
    }
  }, []);

  return (
    <div
      className="relative w-full bg-black rounded-lg overflow-hidden shadow-2xl border border-gray-800"
      style={{ aspectRatio: "16/9" }}
      ref={containerRef}
    >
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
        playsInline
        muted
        autoPlay
      />

      {overlays.map((overlay) => (
        <Overlay
          key={overlay.id}
          overlay={overlay}
          onUpdate={onUpdate}
          onRemove={onRemove}
          containerRef={containerRef}
        />
      ))}

      {/* Optional: Overlay instructional text if empty */}
      {overlays.length === 0 && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
          <p className="text-white text-xl">Add overlays using the controls above</p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
