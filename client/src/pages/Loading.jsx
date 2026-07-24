import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router";

const Loading = () => {
  const { theme } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 8000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#716BF7]">
      <div
        className={`w-12 h-12 rounded-full border-4 border-t-transparent animate-spin border-white`}
      />
    </div>
  );
};

export default Loading;