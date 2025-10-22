import { RevealOnScroll } from "../RevealOnScroll";

export const About = () => {
  return (
    <section id="about" className="min-h-screen py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-purple-900 mb-4">
            About Graceland
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-red-500 mx-auto mb-8"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80"
              alt="About Graceland"
              className="rounded-2xl shadow-2xl"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-purple-900 mb-6">
              Your Trusted Partner in Liberia
            </h3>
            <p className="text-gray-700 mb-4">
              Graceland Handling Cargo Inc. is a leading multi-service company
              based in Lower Margibi County, Liberia. We specialize in clearing
              and forwarding, welding and fabrication, real estate and survey,
              IT installation of CCTV cameras, and general cargo handling.
            </p>
            <p className="text-gray-700 mb-4">
              With years of experience and a dedicated team of professionals, we
              deliver reliable, efficient, and cost-effective solutions tailored
              to meet the unique needs of our clients across various industries.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-red-600">500+</div>
                <div className="text-sm text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-red-600">100%</div>
                <div className="text-sm text-gray-600">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
