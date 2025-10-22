import { useEffect, useState } from "react";

export const Carousel = ({ slides, interval = 5000 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      interval
    );
    return () => clearInterval(id);
  }, [slides, interval]);

  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-purple-900/60 to-transparent flex items-center">
            <div className="container mx-auto px-8">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {slide.title}
                </h2>
                <p className="text-xl text-yellow-400 mb-6">{slide.subtitle}</p>
                <a
                  href="#contact"
                  className="inline-block px-8 py-3 bg-yellow-400 text-purple-900 font-bold rounded-lg hover:bg-yellow-300 transition-colors"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === index ? "bg-yellow-400 w-8" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
