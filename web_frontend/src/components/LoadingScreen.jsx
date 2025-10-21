import { useEffect, useState } from "react";
import Image from "../images/graceland-logo.png";

export const LoadingScreen = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => onComplete(), 500);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-900 via-red-800 to-purple-900 transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-6">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>

          {/* Inner rotating ring - opposite direction */}
          <div className="absolute inset-3 border-4 border-red-400 border-b-transparent rounded-full animate-spin-slow"></div>

          {/* Logo in center with pulse animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={Image}
              alt="Graceland Logo"
              className="w-16 h-16 object-contain animate-pulse"
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white animate-fade-in">
          Graceland Handling Cargo Inc.
        </h2>
        <p className="text-yellow-400 mt-2 animate-fade-in-delay">
          Loading Excellence...
        </p>
      </div>
    </div>
  );
};
