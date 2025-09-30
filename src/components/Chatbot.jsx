import React, { useState } from "react";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi! 👋 I’m your HR Career Assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // 🔑 Hardcoded Groq API Key (⚠️ visible in frontend bundle!)
  const GROQ_API_KEY =
    "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";
  const MODEL_NAME = "llama-3.1-8b-instant"; // HR bot model choice

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: MODEL_NAME,
            messages: [
              {
                role: "system",
                content:
                  "You are an HR EdTech Career Assistant for Gen Z learners. " +
                  "Your job is to provide short, friendly, and practical advice on career paths, " +
                  "micro-learning, daily engagement, unconventional careers, and mentorship. " +
                  "Keep answers engaging, motivating, and easy to understand.",
              },
              ...messages
                .filter((m) => m.role === "user")
                .map((m) => ({ role: "user", content: m.text })),
              { role: "user", content: input },
            ],
            temperature: 0.7,
          }),
        }
      );

      const data = await response.json();
      console.log("Groq API Response:", data);

      if (data.error) throw new Error(data.error.message);

      const botReply =
        data?.choices?.[0]?.message?.content || "Sorry, I didn’t get that.";

      // Keep replies short → first 2 sentences
      const shortReply = botReply.split(".").slice(0, 2).join(".") + ".";

      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "bot", text: shortReply }]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: `⚠️ Error: ${error.message}` },
      ]);
      setIsTyping(false);
    }
  };

  // Default Q/A when chatbot opens
  const handleOpenChat = () => {
    setIsOpen(true);

    setMessages((prev) => {
      const hasDefaultQA = prev.some(
        (msg) => msg.text === "What is this app about?"
      );
      if (hasDefaultQA) return prev;

      return [
        ...prev,
        { role: "user", text: "What is this app about?" },
        {
          role: "bot",
          text: "I’m your HR Career Assistant 🤝. This platform helps Gen Z learners explore modern career paths with micro-learning, AI-curated content, gamified engagement, and mentor support.",
        },
      ];
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      {/* Toggle Button */}
      <button
        onClick={() => (isOpen ? setIsOpen(false) : handleOpenChat())}
        className="w-14 h-14 bg-orange-500 rounded-full shadow-lg flex items-center justify-center hover:bg-orange-600 transition"
      >
        🤖
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="w-80 h-96 bg-white text-black rounded-lg shadow-2xl flex flex-col"
          style={{
            position: "fixed",
            bottom: "80px",
            right: "16px",
            zIndex: 9999,
          }}
        >
          {/* Header */}
          <div className="bg-orange-500 text-white p-3 rounded-t-lg flex justify-between items-center">
            <span className="font-bold">CodeQuest HR Bot</span>
            <button onClick={() => setIsOpen(false)}>✖️</button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-2 p-2 rounded-lg max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-orange-100 ml-auto text-right"
                    : "bg-gray-200 text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-1 items-center text-gray-500 text-sm">
                <span className="animate-bounce">●</span>
                <span className="animate-bounce delay-200">●</span>
                <span className="animate-bounce delay-400">●</span>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me about careers..."
              className="flex-1 border rounded px-2 py-1 text-sm focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-orange-500 text-white px-4 rounded hover:bg-orange-600"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
