import { Rnd } from "react-rnd";

const Overlay = ({ overlay, onUpdate, onRemove }) => {
  return (
    <Rnd
      bounds="parent"
      position={{ x: overlay.x, y: overlay.y }}
      size={{ width: overlay.width, height: overlay.height }}
      onDragStop={(e, d) => {
        onUpdate({ ...overlay, x: d.x, y: d.y });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        console.log("Resize stop", position);
        onUpdate({
          ...overlay,
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
          ...position,
        });
      }}
      className="group"
      style={{
        zIndex: 50,
      }}
    >
      <div
        className="w-full h-full relative cursor-move group-hover:ring-2 ring-teal-400 ring-opacity-0 group-hover:ring-opacity-100 transition-all duration-200"
      >
        {overlay.type === "text" ? (
          <div
            className="w-full h-full flex items-center justify-center bg-black/50 text-white font-bold tracking-wider select-none"
            style={{ fontSize: overlay.height * 0.5 }} // Dynamic font scaling
          >
            {overlay.content}
          </div>
        ) : (
          <img
            src={overlay.content}
            alt="overlay"
            className="w-full h-full object-contain select-none pointer-events-none"
            draggable={false}
          />
        )}

        {/* Resize Handle Visuals (only visible on hover) */}
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-teal-500 opacity-0 group-hover:opacity-100 cursor-nwse-resize rounded-tl" />

        {/* Remove Button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent drag start
            onRemove(overlay.id);
          }}
          className="absolute -top-3 -right-3 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600 z-50 cursor-pointer"
          title="Remove Overlay"
          onMouseDown={(e) => e.stopPropagation()} // Critical to prevent drag propagation
        >
          <span className="text-xs font-bold">✕</span>
        </button>
      </div>
    </Rnd>
  );
};

export default Overlay;
