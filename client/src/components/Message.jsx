import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";
import moment from "moment";
import Markdown from "react-markdown";
import Prism from "prismjs"

const Message = ({ message }) => {
  const { theme } = useAppContext();
    useEffect(() => {
      Prism.highlightAll()
    }, [message.content])
    
  return (
    <div
      className={`flex w-full ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      {message.role === "user" ? (
        <div className="flex max-w-[80%] items-end gap-3 py-10">
          <div
            className={`flex flex-col gap-1 rounded-2xl px-4 py-3 ${
              theme === "dark"
                ? "bg-[#2A2438] text-white"
                : "bg-violet-100 text-black"
            }`}
          >
            <p className="text-sm whitespace-pre-wrap wrap-break-word">
              {message.content}
            </p>

            <span className="self-end text-[11px] text-gray-400">
              {moment(message.timestamp).fromNow()}
            </span>
          </div>

          <img
            src={assets.user_icon}
            className="h-10 w-10 rounded-full object-cover"
            alt=""
          />
        </div>
      ) : (
        <div className="flex max-w-[80%] items-end gap-3">
          <img src={assets.logo_icon} className="h-9 w-9 rounded-full" alt="" />

          <div
            className={`flex flex-col gap-2 rounded-2xl px-4 py-3 ${
              theme === "dark"
                ? "bg-[#1E1B24] text-white"
                : "bg-gray-100 text-black"
            }`}
          >
            {message.isImage ? (
              <img
                src={message.content}
                className="max-w-xs rounded-xl"
                alt=""
              />
            ) : (
              <p className="text-sm whitespace-pre-wrap wrap-break-word">
                <Markdown>{message.content}</Markdown>
              </p>
            )}

            <span className="self-end text-[11px] text-gray-400">
              {moment(message.timestamp).fromNow()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
