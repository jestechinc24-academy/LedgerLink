import { RevealOnScroll } from "../RevealOnScroll";
import { Carousel } from "../Carousel";

export const Home = () => {
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80",
      title: "Clearing & Forwarding Excellence",
      subtitle:
        "Streamlined customs clearance and freight solutions for your business",
    },
    {
      image:
        "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1600&q=80",
      title: "Professional Welding & Fabrication",
      subtitle: "Quality metalwork and industrial fabrication services",
    },
    {
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80",
      title: "Real Estate & Survey Solutions",
      subtitle: "Comprehensive property services and land surveys",
    },
    {
      image:
        "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=1600&q=80",
      title: "IT & Security Systems",
      subtitle: "CCTV installation and computer repair services",
    },
  ];

  return (
    <section
      id="home"
      className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-purple-900 via-red-900 to-purple-900"
    >
      <div className="container mx-auto px-4 py-12">
        <Carousel slides={slides} />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: "📦",
              title: "Clearing & Forwarding",
              desc: "Expert customs and freight services",
            },
            {
              icon: "⚙️",
              title: "Welding & Fabrication",
              desc: "Industrial metalwork solutions",
            },
            {
              icon: "🏘️",
              title: "Real Estate & Survey",
              desc: "Property and land services",
            },
            {
              icon: "📹",
              title: "IT & Security",
              desc: "CCTV and IT installations",
            },
          ].map((service, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-all hover:scale-105"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-yellow-400 mb-2">
                {service.title}
              </h3>
              <p className="text-white/80">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
