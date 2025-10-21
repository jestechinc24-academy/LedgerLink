import { RevealOnScroll } from "../RevealOnScroll";

export const Service = () => {
  const services = [
    {
      title: "Clearing & Forwarding",
      icon: "🚢",
      details: [
        "Custom documentation and clearance",
        "Freight forwarding and consolidation",
        "Import and export support",
        "Logistics coordination",
      ],
    },
    {
      title: "Welding & Fabrication",
      icon: "🔧",
      details: [
        "Structural welding services",
        "Custom metal fabrication",
        "Industrial maintenance",
        "Quality assurance and testing",
      ],
    },
    {
      title: "Real Estate & Survey",
      icon: "📐",
      details: [
        "Land surveying and mapping",
        "Property valuations",
        "Real estate consultancy",
        "Property management",
      ],
    },
    {
      title: "IT Installation & Security",
      icon: "🎥",
      details: [
        "CCTV camera installation",
        "Computer repair services",
        "Network setup and maintenance",
        "Security system integration",
      ],
    },
    {
      title: "General Cargo Handling",
      icon: "📦",
      details: [
        "Cargo storage and warehousing",
        "Local distribution services",
        "Inventory management",
        "Loading and unloading",
      ],
    },
  ];

  return (
    <section
      id="services"
      className="min-h-screen py-20 bg-gradient-to-br from-purple-50 to-red-50"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-purple-900 mb-4">
            Our Services
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-red-500 mx-auto mb-8"></div>
          <p className="text-gray-700 text-lg">
            Comprehensive solutions tailored to your business needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-8 hover:scale-105"
            >
              <div className="text-6xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold text-purple-900 mb-4">
                {service.title}
              </h3>
              <ul className="space-y-2">
                {service.details.map((detail, j) => (
                  <li key={j} className="flex items-start gap-2 text-gray-700">
                    <span className="text-yellow-400 mt-1">✓</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
