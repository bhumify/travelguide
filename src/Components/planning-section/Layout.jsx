
import { useState } from "react";
import LeftSection from "./Leftsection";
import RightSection from "./Rightsection";
import AIChat from "./AIChat";

function Layout() {
  const [mode, setMode] = useState("form");
  const [aiResult, setAiResult] = useState("");

  const handleAIResult = (result) => {
    setAiResult(result);
  };

  return (
    <div className="bg-gradient-to-r from-white to-blue-900">
     <h1 className="text-3xl md:text-4xl italic font-bold text-blue-900 flex justify-center p-7 ">Plan Smart And Travel Free.</h1>
      <div className="flex flex-col md:flex-row justify-center gap-6 max-w-6xl items-start mx-auto p-6  w-full">
        <LeftSection mode={mode} setMode={setMode} />
        <RightSection mode={mode} onGenerate={handleAIResult} />
      </div>

      {aiResult && (
        <div className="max-w-4xl mx-auto mt-10 w-full p-4">
          <AIChat travelOverview={aiResult}  />
        </div>
      )}
    </div>
  );
}

export default Layout;


