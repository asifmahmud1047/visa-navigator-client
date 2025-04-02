import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import useFetch from "../../../hooks/useFetch";

const AllVisas = () => {
  const fetch = useFetch();
  const [visas, setVisas] = useState([]);
  const [filteredVisas, setFilteredVisas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("all");

  const visaTypes = [
    { value: "all", label: "All Visas" },
    { value: "Tourist visa", label: "Tourist Visa" },
    { value: "Student visa", label: "Student Visa" },
    { value: "Business visa", label: "Business Visa" },
    { value: "Work visa", label: "Work Visa" },
    { value: "Transit visa", label: "Transit Visa" },
  ];

  useEffect(() => {
    const fetchAllVisas = async () => {
      try {
        const response = await fetch.get("/visas");
        setVisas(response);
        setFilteredVisas(response);
      } catch (error) {
        console.error("Error fetching visas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllVisas();
  }, [fetch]);

  useEffect(() => {
    if (selectedType === "all") {
      setFilteredVisas(visas);
    } else {
      const filtered = visas.filter((visa) => visa.visa_type === selectedType);
      setFilteredVisas(filtered);
    }
  }, [selectedType, visas]);

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Explore All Visas
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover visa requirements for countries around the world. Filter by
            visa type to find the perfect match for your travel needs.
          </p>
        </div>

        {/* Filter */}
        <div className="mb-8 flex justify-center">
          <div className="w-full max-w-md">
            <label htmlFor="visa-type" className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Visa Type
            </label>
            <select
              id="visa-type"
              name="visa-type"
              value={selectedType}
              onChange={handleTypeChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {visaTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Visa Cards Grid */}
        {filteredVisas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredVisas.map((visa, index) => (
              <Fade
                key={visa._id}
                direction="up"
                delay={index % 4 * 100}
                triggerOnce
                className="h-full"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
                  <img
                    src={visa.country_image}
                    alt={visa.country}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4 flex-grow">
                    <h3 className="text-lg font-semibold mb-2">{visa.country}</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><span className="font-medium">Type:</span> {visa.visa_type}</p>
                      <p><span className="font-medium">Processing:</span> {visa.processing_time}</p>
                      <p><span className="font-medium">Fee:</span> ${visa.fee}</p>
                    </div>
                  </div>
                  <div className="p-4 pt-0">
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
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No visas found for this type
            </h3>
            <p className="text-gray-600 mb-6">
              Try selecting a different visa type or add a new visa.
            </p>
            <Link
              to="/add-visa"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              Add a New Visa
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllVisas; 