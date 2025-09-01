import { useState } from "react";
import React from "react";

export default function App() {
  const [recipeRequest, setRecipeRequest] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("https://primary-production-ac3f.up.railway.app/webhook/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipeRequest }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      console.log(data.recipe);
      setResponse(typeof data === "object" ? data.response || JSON.stringify(data) : String(data));
    } catch (error) {
      console.error(error);
      setResponse("Error: Unable to fetch response from server.");
    } finally {
      setLoading(false);
    }
  };

  if (response) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient">
        <div className="backdrop-blur-lg bg-white/30 p-8 rounded-2xl shadow-2xl max-w-lg w-full text-center border border-white/40">
          <h1 className="text-2xl font-extrabold text-white mb-6 drop-shadow-lg">
            AI Response
          </h1>
          <p className="text-white text-lg mb-6">{response}</p>
          <button
            onClick={() => { setResponse(""); setRecipeRequest(""); }}
            className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 hover:bg-purple-600 hover:text-white"
          >
            Ask Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient">
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-lg bg-white/30 p-8 rounded-2xl shadow-2xl max-w-lg w-full border border-white/40"
      >
        <h1 className="text-2xl font-extrabold text-white mb-6 text-center drop-shadow-lg">
          Ask the AI
        </h1>
        <textarea
          className="w-full p-4 border border-white/50 rounded-xl mb-6 focus:outline-none focus:ring-4 focus:ring-purple-300 bg-white/20 text-white placeholder-gray-200"
          rows="5"
          placeholder="Type your question..."
          value={recipeRequest}
          onChange={(e) => setRecipeRequest(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-purple-600 font-semibold py-3 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 hover:bg-purple-600 hover:text-white disabled:opacity-70"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-2 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"></path>
              </svg>
              Loading...
            </span>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
}
