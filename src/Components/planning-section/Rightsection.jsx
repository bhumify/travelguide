


import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBowlFood,
  faBusinessTime,
  faGopuram,
  faLeaf,
  faPersonHiking,
} from "@fortawesome/free-solid-svg-icons";
import { getAIRecommendations } from "./AIService";

function RightSection({ mode, onGenerate }) {
  // Form mode states
  const [destination, setDestination] = useState("");
  const [purpose, setPurpose] = useState([]);
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("");

  // AI mode states
  const [aiInput, setAiInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle purpose selection
  function handlePurpose(text) {
    if (purpose.includes(text)) {
      setPurpose(purpose.filter((item) => item !== text));
    } else {
      setPurpose([...purpose, text]);
    }
  }

  // 🔹 Handle AI mode request
  async function handleAIRequest() {
    if (!aiInput.trim()) return alert("Please describe your travel preferences!");
    setLoading(true);
    const aiText = await getAIRecommendations(aiInput);
    setLoading(false);
    onGenerate(aiText);
  }

  // 🔹 Handle FORM mode request — generates AI prompt from user selections
  async function handleFormSubmit() {
    if (!destination || purpose.length === 0 || !budget || !duration) {
      return alert("Please fill out all fields before planning your trip!");
    }

    setLoading(true);

    // Create a natural-language prompt dynamically
    const prompt = `Plan a ${duration} trip to ${destination}. 
    The purpose of travel is ${purpose.join(", ")}. 
    My budget is ${budget === "low" ? "under $500" : budget === "medium" ? "$500–$1000" : "above $1000"}.
    Suggest travel plans, best attractions, accommodations, and experiences based on these details.`;

    const aiText = await getAIRecommendations(prompt);
    setLoading(false);
    onGenerate(aiText); // send AI response to Layout
  }

  return (
    <div className="w-full md:w-2/3 lg:w-3/4 border-2 border-gray-400 rounded-xl p-7 bg-gradient-to-r from-white to-blue-300 shadow-sm">
      {mode === "form" ? (
        <>
          <h2 className="font-medium text-lg">Plan your Trip</h2>
          <h3 className="mt-1 text-sm text-gray-700">
            Fill out the details below to get personalized travel recommendations.
          </h3>

          {/* Destination */}
          <h2 className="font-medium mt-3">Destination</h2>
          <input
            type="text"
            className="w-full h-10 bg-gray-200 rounded mt-1 p-2 text-sm"
            placeholder="e.g. Norway, Paris, Tokyo, Nepal"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />

          {/* Purpose */}
          <h2 className="font-medium mt-3">Purpose of Travel</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
            <li>
              <Label
                icon={faBowlFood}
                text="Food"
                selected={purpose.includes("Food")}
                handlePurpose={handlePurpose}
              />
            </li>
            <li>
              <Label
                icon={faPersonHiking}
                text="Adventure"
                selected={purpose.includes("Adventure")}
                handlePurpose={handlePurpose}
              />
            </li>
            <li>
              <Label
                icon={faGopuram}
                text="Architecture"
                selected={purpose.includes("Architecture")}
                handlePurpose={handlePurpose}
              />
            </li>
            <li>
              <Label
                icon={faBusinessTime}
                text="Trade"
                selected={purpose.includes("Trade")}
                handlePurpose={handlePurpose}
              />
            </li>
            <li>
              <Label
                icon={faLeaf}
                text="Nature"
                selected={purpose.includes("Nature")}
                handlePurpose={handlePurpose}
              />
            </li>
          </ul>

          {/* Budget */}
          <h2 className="font-medium mt-3">Budget</h2>
          <select
            className="w-full h-10 bg-gray-200 rounded mt-1 p-2 text-sm"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            <option value="">Select your budget range</option>
            <option value="low">Low (&lt;$500)</option>
            <option value="medium">$500–$1000</option>
            <option value="high">&gt;$1000</option>
          </select>

          {/* Duration */}
          <h2 className="font-medium mt-3">Duration of Stay (days)</h2>
          <select
            className="w-full h-10 bg-gray-200 rounded mt-1 p-2 text-sm"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option value="">Select number of days</option>
            <option value="short">Less than 5 days</option>
            <option value="long">More than 5 days</option>
          </select>

          {/* Submit Button */}
          <button
            onClick={handleFormSubmit}
            disabled={loading}
            className="w-full p-2 bg-blue-900 rounded text-white mt-4 hover:bg-blue-950 transition disabled:opacity-60"
          >
            {loading ? "Generating..." : "Plan My Trip"}
          </button>
        </>
      ) : (
        <>
          {/* AI Mode */}
          <h2 className="font-medium text-lg">Plan your Trip</h2>
          <h3 className="mt-2 text-sm text-gray-700">
            Describe your travel preferences in natural language.
          </h3>

          <textarea
            className="w-full h-40 bg-gray-200 rounded mt-4 p-2"
            placeholder="I have $1000 to spend for a 7-day trip. I enjoy beaches, hiking, and local food experiences. I prefer family-friendly activities and a relaxed pace."
            onChange={(e) => setAiInput(e.target.value)}
          ></textarea>

          <button
            onClick={handleAIRequest}
            disabled={loading}
            className="w-full p-2 bg-blue-900 rounded text-white mt-4 hover:bg-blue-950 transition disabled:opacity-60"
          >
            {loading ? "Generating..." : "Get AI Recommendations"}
          </button>
        </>
      )}
    </div>
  );
}

// Label component for checkboxes
const Label = ({ icon, text, selected, handlePurpose }) => (
  <label className="flex items-center space-x-1 cursor-pointer">
    <input
      type="checkbox"
      onChange={() => handlePurpose(text)}
      checked={selected}
      className="w-4 h-4"
    />
    <FontAwesomeIcon icon={icon} className="text-blue-800" />
    <span>{text}</span>
  </label>
);

export default RightSection;
