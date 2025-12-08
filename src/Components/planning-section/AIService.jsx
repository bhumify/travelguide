import axios from "axios";

const API_URL = "https://api.groq.com/openai/v1/chat/completions";
const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export async function getAIRecommendations(prompt) {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful AI travel planner. Provide detailed travel plans based on the user's preferences.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Extract and return AI text
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Groq API error:", error);
    return "Sorry, I couldn’t generate travel suggestions. Please try again.";
  }
}

export default getAIRecommendations;


