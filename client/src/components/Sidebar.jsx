import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Sidebar = ({ isMenuOpen, setisMenuOpen }) => {
  const { theme, settheme, chats, setselectedChats, navigate, user } = useAppContext();
  const [search, setsearch] = useState("");

  return (
    <aside
      className={`
        fixed md:static
        top-0 left-0
        z-50
        w-72 h-screen
        flex flex-col
        p-5
        transition-transform duration-300 ease-in-out
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        ${
          theme === "dark"
            ? "bg-[#141218] text-white border-r border-gray-800"
            : "bg-white text-black border-r border-gray-200"
        }
      `}
    >
      {/* Close Button (Mobile Only) */}
      <img
        src={assets.close_icon}
        onClick={() => setisMenuOpen(false)}
        className={`absolute top-5 right-5 w-7 cursor-pointer md:hidden ${
          theme === "light" ? "invert" : ""
        }`}
        alt="Close"
      />

      {/* Logo */}
      <img
        src={theme === "dark" ? assets.logo_full : assets.logo_full_dark}
        alt="logo"
        className="w-full"
      />

      {/* Search & New Chat */}
      <div className="flex flex-col gap-4 my-5">
        <button
          className="cursor-pointer bg-[#935DF7] hover:bg-[#7C3AED] text-white rounded-md py-3 transition-colors duration-200"
          onClick={() => {
            setisMenuOpen(false);
          }}
        >
          <span className="mr-2 text-lg">+</span>
          New Chat
        </button>

        <div
          className={`flex items-center gap-2 rounded-md px-3 py-2 transition-colors duration-300 ${
            theme === "dark"
              ? "bg-zinc-800"
              : "bg-gray-100 border border-gray-200"
          }`}
        >
          <img
            src={assets.search_icon}
            className={`w-5 ${theme === "light" ? "invert" : ""}`}
            alt="search"
          />

          <input
            type="text"
            placeholder="Search Conversation"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            className="bg-transparent outline-none flex-1 placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Recent Chats */}
      {chats.length > 0 && (
        <p className="text-sm font-semibold text-gray-500 mb-2">Recent Chats</p>
      )}

      <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
        {chats
          .filter((chat) =>
            chat.messages[0]
              ? chat.messages[0].content
                  .toLowerCase()
                  .includes(search.toLowerCase())
              : chat.name.toLowerCase().includes(search.toLowerCase()),
          )
          .map((chat) => (
            <div
              key={chat._id}
              onClick={()=>{navigate('/'); setselectedChats(chat); setisMenuOpen(false)}}
              className={`group flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                theme === "dark" ? "hover:bg-zinc-800" : "hover:bg-gray-100"
              }`}
            >
              <div className="flex-1 overflow-hidden">
                <p className="font-medium truncate">
                  {chat.messages.length > 0
                    ? chat.messages[0].content.slice(0, 32)
                    : chat.name}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {new Date(chat.updatedAt).toLocaleDateString()}
                </p>
              </div>

              <img
                src={assets.bin_icon}
                alt="Delete"
                className={`w-5 h-5 ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                  theme === "light" ? "invert" : ""
                }`}
              />
            </div>
          ))}
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-3 mt-5">
        {/* Community */}
        <div
          onClick={() => {
            navigate("/community");
            setisMenuOpen(false);
          }}
          className={`flex items-center gap-3 border p-3 rounded-md cursor-pointer transition-colors duration-200 ${
            theme === "dark"
              ? "border-zinc-700 hover:bg-zinc-800"
              : "border-gray-200 hover:bg-gray-100"
          }`}
        >
          <img
            src={assets.gallery_icon}
            className={`w-5 ${theme === "light" ? "invert" : ""}`}
            alt=""
          />
          <p>Community Images</p>
        </div>

        {/* Credits */}
        <div
          onClick={() => {
            navigate("/credits");
            setisMenuOpen(false);
          }}
          className={`flex items-center gap-3 border p-2 rounded-md cursor-pointer transition-colors duration-200 ${
            theme === "dark"
              ? "border-zinc-700 hover:bg-zinc-800"
              : "border-gray-200 hover:bg-gray-100"
          }`}
        >
          <img
            src={assets.diamond_icon}
            className={`w-5 ${theme === "light" ? "" : "invert"}`}
            alt=""
          />
          <p>Credits: {user?.credits}</p>
        </div>

        {/* Theme Toggle */}
        <div
          onClick={() => settheme(theme === "dark" ? "light" : "dark")}
          className={`flex items-center justify-between border p-2 rounded-md cursor-pointer transition-colors duration-200 ${
            theme === "dark"
              ? "border-zinc-700 hover:bg-zinc-800"
              : "border-gray-200 hover:bg-gray-100"
          }`}
        >
          <div className="flex items-center gap-3">
            <img
              src={assets.theme_icon}
              className={`w-5 ${theme === "light" ? "invert" : ""}`}
              alt=""
            />
            <p>{theme === "dark" ? "Dark Mode" : "Light Mode"}</p>
          </div>

          <div
            className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
              theme === "dark" ? "bg-[#935DF7]" : "bg-gray-300"
            }`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
                theme === "dark" ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </div>
        </div>

        {/* User */}
        <div className="flex items-center justify-between group">
          <div className="flex items-center gap-2">
            <img src={assets.user_icon} alt="" />
            <p>{user ? user.name : "Login your account"}</p>
          </div>

          {user && (
            <img
              src={assets.logout_icon}
              alt="Logout"
              className={`w-7 cursor-pointer opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 ${
                theme === "light" ? "invert" : ""
              }`}
            />
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
