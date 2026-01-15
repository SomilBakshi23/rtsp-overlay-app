import { useState } from "react";

const Controls = ({ onAdd }) => {
  const addText = () => {
    onAdd({
      type: "text",
      content: "LIVE",
      x: 50,
      y: 50,
      width: 150,
      height: 60,
      fontSize: 24,
      color: "#ffffff"
    });
  };

  const addImage = () => {
    const url = prompt("Enter image URL", "https://via.placeholder.com/150");
    if (!url) return;

    onAdd({
      type: "image",
      content: url,
      x: 100,
      y: 100,
      width: 150,
      height: 150,
    });
  };

  return (
    <div className="flex gap-4 bg-gray-800 p-4 rounded-lg shadow-lg">
      <button
        onClick={addText}
        className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded font-semibold transition-colors"
      >
        Add Text
      </button>
      <button
        onClick={addImage}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded font-semibold transition-colors"
      >
        Add Image
      </button>
    </div>
  );
};

export default Controls;
