import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Fade, Slide } from "react-awesome-reveal";
import { Typewriter } from "react-simple-typewriter";
import useAxios from "../../../hooks/useAxios";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Home = () => {
  const axios = useAxios();
  const [latestVisas, setLatestVisas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestVisas = async () => {
      try {
        const response = await axios.get("/visas?limit=6&sort=createdAt");
        setLatestVisas(response.data);
      } catch (error) {
        console.error("Error fetching latest visas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestVisas();
  }, [axios]);

  const banners = [
    {
      id: 1,
      title: "Explore the World with Ease",
      description: "Find visa requirements for any country and simplify your travel plans.",
      image: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    },
    {
      id: 2,
      title: "Apply Online, Travel Globally",
      description: "Submit your visa applications online and track their status in real-time.",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    },
    {
      id: 3,
      title: "Visa Navigator - Your Travel Companion",
      description: "Get expert guidance and support throughout your visa application journey.",
      image: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    },
  ];

  const renderLatestVisaCards = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (latestVisas.length === 0) {
      return (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600">No visas found. Be the first to add one!</p>
          <Link
            to="/add-visa"
            className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Visa
          </Link>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestVisas.map((visa, index) => (
          <Fade
            key={visa._id}
            direction="up"
            delay={index * 100}
            triggerOnce
            className="h-full"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
              <img
                src={visa.country_image}
                alt={visa.country}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 flex-grow">
                <h3 className="text-xl font-semibold mb-2">{visa.country}</h3>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <span className="font-medium">Visa Type:</span> {visa.visa_type}
                  </p>
                  <p>
                    <span className="font-medium">Processing Time:</span>{" "}
                    {visa.processing_time}
                  </p>
                  <p>
                    <span className="font-medium">Fee:</span> ${visa.fee}
                  </p>
                  <p>
                    <span className="font-medium">Validity:</span> {visa.validity}
                  </p>
                  <p>
                    <span className="font-medium">Application Method:</span>{" "}
                    {visa.application_method}
                  </p>
                </div>
              </div>
              <div className="px-5 pb-5">
                <Link
                  to={`/visa/${visa._id}`}
                  className="w-full block text-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  See Details
                </Link>
              </div>
            </div>
          </Fade>
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* Banner/Slider */}
      <section className="relative">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="w-full"
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div className="relative h-[60vh] bg-black">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
                  <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                      {banner.title}
                    </h1>
                    <p className="text-xl text-white mb-8">{banner.description}</p>
                    <Link
                      to="/all-visas"
                      className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-lg"
                    >
                      Explore Visas
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Latest Visas Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Slide direction="left" triggerOnce>
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Latest Visa Opportunities
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover the most recent visa options added to our platform,
                updated regularly to provide you with the latest travel
                opportunities.
              </p>
            </div>
          </Slide>

          {renderLatestVisaCards()}

          <div className="text-center mt-12">
            <Link
              to="/all-visas"
              className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              See All Visas
            </Link>
          </div>
        </div>
      </section>

      {/* Extra Section 1: How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Slide direction="right" triggerOnce>
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How Visa Navigator Works
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We simplify the visa application process in just a few easy
                steps.
              </p>
            </div>
          </Slide>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Fade direction="up" delay={100} triggerOnce>
              <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3">Find Your Visa</h3>
                <p className="text-gray-600">
                  Browse through our comprehensive database of visa requirements
                  for countries around the world.
                </p>
              </div>
            </Fade>

            <Fade direction="up" delay={200} triggerOnce>
              <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3">Apply Online</h3>
                <p className="text-gray-600">
                  Complete and submit your visa application through our
                  user-friendly online platform.
                </p>
              </div>
            </Fade>

            <Fade direction="up" delay={300} triggerOnce>
              <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
                <p className="text-gray-600">
                  Monitor the status of your visa application in real-time and
                  receive updates throughout the process.
                </p>
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* Extra Section 2: Newsletter/Statistics */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Slide direction="left" triggerOnce>
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Your Journey Starts with{" "}
                  <span className="text-yellow-300">
                    <Typewriter
                      words={["Visa Navigator", "Easy Applications", "Fast Processing", "Expert Support"]}
                      loop={0}
                      cursor
                      cursorStyle="_"
                      typeSpeed={70}
                      deleteSpeed={50}
                      delaySpeed={1000}
                    />
                  </span>
                </h2>
                <p className="text-xl mb-8">
                  Join thousands of travelers who have simplified their visa
                  application process with Visa Navigator.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-4xl font-bold">150+</div>
                    <div className="text-blue-200">Countries</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold">50k+</div>
                    <div className="text-blue-200">Applications</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold">98%</div>
                    <div className="text-blue-200">Success Rate</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold">24/7</div>
                    <div className="text-blue-200">Support</div>
                  </div>
                </div>
              </div>
            </Slide>

            <Slide direction="right" triggerOnce>
              <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">
                  Subscribe to Our Newsletter
                </h3>
                <p className="mb-6">
                  Stay updated with the latest visa requirements, travel tips,
                  and special offers.
                </p>
                <form className="space-y-4">
                  <div>
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition-colors"
                  >
                    Subscribe Now
                  </button>
                </form>
                <p className="text-sm text-gray-500 mt-4">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </Slide>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 