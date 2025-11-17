import React, { useState } from "react";
import "./PawFectChatbot.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const PawFectChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [recent, setRecent] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    if (!recent.includes(input.trim().toLowerCase())) {
      setRecent([input.trim(), ...recent]);
    }

    const userMessage = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=" +
          import.meta.env.VITE_GEMINI_API_KEY,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userMessage.content }] }],
          }),
        }
      );

      const data = await res.json();

      const petReply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "🐾 Sorry, I couldn't find an answer for that about your pets.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: petReply },
      ]);
    } catch (err) {
      console.error("API error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "❌ Oops! There was an issue connecting to the pet knowledge service.",
        },
      ]);
    }
  };

  // Clear recent searches
  const handleDeleteHistory = () => setRecent([]);
  // Populate input on recent click
  const handleRecentClick = (item) => setInput(item);

  return (
    <div className="pawfect-chatbot-bg">
      <div className="pawfect-chat-layout">
        {/* Sidebar with Recent Searches */}
        <aside className="pawfect-sidebar">
          <div className="sidebar-header">
            <span>Recent Dog & Cat Queries</span>
            <span
              className="delete-icon"
              role="button"
              aria-label="Delete recent"
              title="Clear Recent Searches"
              onClick={handleDeleteHistory}
            >
              <img
                src="https://img.icons8.com/?size=100&id=102350&format=png&color=000000"
                alt="Clear History"
                className="stats-icon-img"
              />
            </span>
          </div>
          <ul className="recent-search-list">
            {recent.length === 0 ? (
              <li className="empty-history">No recent queries</li>
            ) : (
              recent.map((r, idx) => (
                <li key={idx} onClick={() => handleRecentClick(r)}>
                  {r}
                </li>
              ))
            )}
          </ul>
        </aside>

        {/* Main Chat Area */}
        <main className="pawfect-main-chat-area">
          <div className="chatbot-header">
            <span role="img" aria-label="wave" style={{ fontSize: "1.8rem" }}>
              🐶🐱
            </span>
            <span className="headline-gradient">
              Welcome to PawFect Pet Assistant!
            </span>
            <div className="subtext">
              Ask me anything about dog and cat products, care & health!
            </div>
          </div>
          <div className="chatbot-container">
            <div className="chat-messages">
              {messages.map((msg, idx) => (
                <div key={idx} className={`message ${msg.role}`}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.content}
                  </ReactMarkdown>
                </div>
              ))}
            </div>
            <div className="input-bar">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your PawFect question"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button onClick={handleSend} disabled={!input.trim()}>
                Send
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PawFectChatbot;
