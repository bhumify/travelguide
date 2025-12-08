

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faComment, faPencil } from "@fortawesome/free-solid-svg-icons";

function LeftSection({ mode, setMode}) {
  return (
    <div className="w-full md:w-1/3 lg:w-1/4 p-5 rounded-xl border-2 border-gray-400 bg-gradient-to-r from-white to-blue-200 shadow-sm flex flex-col gap-6">

      <div>
        <h1 className="font-medium text-amber-950 flex items-center text-lg">
          <FontAwesomeIcon icon={faLocationDot} className="text-blue-900 mr-2" />
          Planning Mode
        </h1>

        <div className="space-y-3 mt-6">
          <button
            onClick={() => setMode("form")}
            className={`h-10 w-full border-2 border-gray-400 rounded-xl flex items-center justify-center p-2 transition ${
              mode === "form"
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            <FontAwesomeIcon icon={faPencil} className="mr-2" />
            Form Mode
          </button>

          <button
            onClick={() => setMode("ai")}
            className={`h-10 w-full border-2 border-gray-400 rounded-xl flex items-center justify-center p-2 transition ${
              mode === "ai"
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            <FontAwesomeIcon icon={faComment} className="mr-2" />
            AI Mode
          </button>
        </div>
      </div>

  
    </div>
  );
}

export default LeftSection;
