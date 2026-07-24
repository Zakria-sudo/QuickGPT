import React, { useEffect, useState, useRef } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import Message from "../components/Message";

const Chatbox = () => {
  const { theme, selectedChats } = useAppContext();
  const containerRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("text");
  const [isPublished, setIsPublished] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (selectedChats) {
      setMessages(selectedChats.messages || []);
    } else {
      setMessages([]);
    }
  }, [selectedChats]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col h-full w-full">
      {/* Chat Area */}
      <div className="flex-1 flex overflow-hidden">
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <img
                src={
                  theme === "dark" ? assets.logo_full : assets.logo_full_dark
                }
                className="w-full max-w-56 sm:max-w-68"
                alt=""
              />

              <p className="font-semibold text-2xl md:text-5xl">
                What can I help with?
              </p>
            </div>
          </div>
        ) : (
          <div
            ref={containerRef}
            className="flex-1 overflow-y-auto py-10 px-4 sm:px-8 md:px-20"
          >
            {messages.map((message, index) => (
              <Message key={index} message={message} />
            ))}

            {loading && (
              <div className="loader flex items-center gap-1.5 py-8">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className={`w-1.5 h-1.5 rounded-full animate-bounce ${
                      theme === "dark" ? "bg-white" : "bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Publish */}
      {mode === "image" && (
        <label className="inline-flex gap-3 text-sm mx-auto mb-2">
          <p className="text-xs">Upload image to the Community</p>

          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </label>
      )}

      {/* Input */}
      <div className="w-full flex justify-center p-6">
        <form
          onSubmit={onSubmit}
          className={`flex items-center gap-3 w-full max-w-3xl rounded-full border p-4 shadow-lg ${
            theme === "dark"
              ? "bg-zinc-900 border-zinc-700"
              : "bg-white border-gray-300"
          }`}
        >
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className={`outline-none cursor-pointer ${
              theme === "dark"
                ? "bg-zinc-900 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            <option value="text">Text</option>
            <option value="image">Image</option>
          </select>

          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={
              mode === "image"
                ? "Describe the image you want..."
                : "Ask me anything..."
            }
            className={`flex-1 bg-transparent outline-none ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}
          />

          <button
            disabled={loading}
            className="w-11 h-11 flex items-center justify-center"
          >
            <img
              src={loading ? assets.stop_icon : assets.send_icon}
              className="w-10 h-10"
              alt=""
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbox;
