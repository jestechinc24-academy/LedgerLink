import { useEffect } from "react";

export const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  if (!menuOpen) return null;

  return (
    <div className="fixed inset-0 z-30 bg-purple-900/98 backdrop-blur-lg md:hidden">
      <div className="flex flex-col items-center justify-center h-full space-y-8 text-white text-xl">
        <a
          href="#home"
          onClick={() => setMenuOpen(false)}
          className="hover:text-yellow-400 transition-colors"
        >
          Home
        </a>
        <a
          href="#about"
          onClick={() => setMenuOpen(false)}
          className="hover:text-yellow-400 transition-colors"
        >
          About
        </a>
        <a
          href="#services"
          onClick={() => setMenuOpen(false)}
          className="hover:text-yellow-400 transition-colors"
        >
          Services
        </a>
        <a
          href="#contact"
          onClick={() => setMenuOpen(false)}
          className="hover:text-yellow-400 transition-colors"
        >
          Contact
        </a>
      </div>
    </div>
  );
};
