import { useState } from "react";
import VideoPlayer from "./components/VideoPlayer";
import Controls from "./components/Controls";

function App() {
  const [overlays, setOverlays] = useState([]);

  const addOverlay = (newOverlay) => {
    setOverlays((prev) => [...prev, { ...newOverlay, id: Date.now() }]);
  };

  const updateOverlay = (updatedOverlay) => {
    setOverlays((prev) =>
      prev.map((o) => (o.id === updatedOverlay.id ? updatedOverlay : o))
    );
  };

  const removeOverlay = (id) => {
    setOverlays((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-teal-400">RTSP Livestream Overlay</h1>

      <div className="w-full max-w-5xl space-y-6">
        <Controls onAdd={addOverlay} />
        <VideoPlayer
          overlays={overlays}
          onUpdate={updateOverlay}
          onRemove={removeOverlay}
        />
      </div>
    </div>
  );
}

export default App;
