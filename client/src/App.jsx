import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router";
import Sidebar from "./components/Sidebar";
import Chatbox from "./pages/Chatbox";
import Community from "./pages/Community";
import Credits from "./pages/Credits";
import { assets } from "./assets/assets";
import { useAppContext } from "./context/AppContext";
import './assets/prism.css'
import Loading from "./pages/Loading";
import Login from "./pages/Login";

const App = () => {
  const { theme,user } = useAppContext();
  const [isMenuOpen, setisMenuOpen] = useState(false);

  const {pathname} = useLocation()
  if(pathname === "/loading") return <Loading/>

  return (
    <>
      {/* Mobile Menu Button */}
      {!isMenuOpen && (
        <img
          src={assets.menu_icon}
          onClick={() => setisMenuOpen(true)}
          className={`fixed top-5 left-5 z-40 w-8 cursor-pointer md:hidden ${
            theme === "light" ? "invert" : ""
          }`}
          alt="Menu"
        />
      )}

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0  z-40 md:hidden"
          onClick={() => setisMenuOpen(false)}
        />
      )}

      {user ? (
      <div className="flex h-screen w-screen overflow-hidden bg-white text-black dark:bg-[#141218] dark:text-white transition-colors duration-300">
        <Sidebar isMenuOpen={isMenuOpen} setisMenuOpen={setisMenuOpen} />

        <main className="flex-1 flex overflow-hidden transition-colors duration-300">
          <Routes>
            <Route path="/" element={<Chatbox />} />
            <Route path="/community" element={<Community />} />
            <Route path="/credits" element={<Credits />} />
          </Routes>
        </main>
      </div>
      ):(
        <div className={`flex justify-center items-center h-screen w-screen`}><Login/></div>
      )}
    </>
  );
};

export default App;
