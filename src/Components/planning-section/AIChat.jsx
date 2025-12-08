
import InfoCard from "./InfoCard";

function AIChat({ travelOverview }) {
  if (!travelOverview ) {
    return (
      <div className="w-full p-6 bg-gray-300 rounded-lg text-center text-gray-700">
        No AI recommendations yet. Please click "Plan My Trip".
      </div>
    );
  }

  return (
    <div className="w-full border-2 border-gray-400 p-6 flex flex-col gap-4 bg-gradient-to-r from-white to-blue-200 rounded-lg">
      <InfoCard title="Travel Overview" content={travelOverview} />
     
    </div>
  );
}

export default AIChat;
