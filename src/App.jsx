import { useState } from "react";
import React from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    // --- SEND POST REQUEST TO YOUR N8N WEBHOOK HERE ---
    // Example using fetch:
    // const res = await fetch("YOUR_N8N_WEBHOOK_URL", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ query: input }),
    // });
    // const data = await res.json();
    // setResponse(data.answer);

    // TEMPORARY MOCK RESPONSE (remove after connecting backend)
    setTimeout(() => {
      setResponse("This is a sample AI response.");
      setLoading(false);
    }, 1500);
  };

  if (response) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full text-center">
          <h1 className="text-xl font-bold mb-4">AI Response</h1>
          <p className="text-gray-700 mb-6">{response}</p>
          <button
            onClick={() => { setResponse(""); setInput(""); }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Ask Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full"
      >
        <h1 className="text-xl font-bold mb-4 text-center">Ask the AI</h1>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
