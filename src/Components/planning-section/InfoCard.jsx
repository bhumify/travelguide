import { useState } from "react";

function InfoCard({ title, content }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full bg-gradient-to-r from-white to-blue-300 rounded-lg shadow-md overflow-hidden">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center p-4 cursor-pointer bg-gray-100"
      >
        <h2 className="font-semibold text-lg text-gray-800">{title}</h2>
        <span className="text-gray-600">{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <div className="p-4 text-gray-700 whitespace-pre-line">
          {content}
        </div>
      )}
    </div>
  );
}

export default InfoCard;


