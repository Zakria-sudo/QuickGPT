import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { dummyPublishedImages } from "../assets/assets";
import Loading from "./Loading";

const Community = () => {
  const { theme } = useAppContext();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    setImages(dummyPublishedImages);
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (loading) return <Loading />;

  return (
    <div
      className={`min-h-screen px-6 py-8 transition-colors duration-300 ${
        theme === "dark" ? "bg-[#0f0f0f] text-white" : "bg-gray-50 text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-2">
          Community Images
        </h2>
        <p
          className={`text-center mb-10 ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Explore images created by the community.
        </p>

        {images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((image, index) => (
              <a
                key={index}
                href={image.imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl shadow-lg"
              >
                <img
                  src={image.imageUrl}
                  alt=""
                  className="w-full h-72 object-cover transition duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-end">
                  <div className="w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-semibold text-lg">
                      Created by
                    </p>
                    <p className="text-gray-200">{image.userName}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <p className="text-center text-xl mt-20">No images available.</p>
        )}
      </div>
    </div>
  );
};

export default Community;
