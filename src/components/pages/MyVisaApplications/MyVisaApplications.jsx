import { useEffect, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";

const MyVisaApplications = () => {
  const axios = useAxios();
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMyApplications = async () => {
      try {
        const response = await axios.get(`/applications/${user.uid}`);
        setApplications(response.data);
        setFilteredApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
        toast.error("Failed to load your applications");
      } finally {
        setLoading(false);
      }
    };

    if (user?.uid) {
      fetchMyApplications();
    }
  }, [axios, user?.uid]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredApplications(applications);
    } else {
      const filtered = applications.filter(app => 
        app.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredApplications(filtered);
    }
  }, [searchTerm, applications]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is already handled by the useEffect
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`/applications/${id}`);
          if (response.data.deletedCount > 0) {
            // Update local state after successful deletion
            setApplications(applications.filter(app => app._id !== id));
            setFilteredApplications(filteredApplications.filter(app => app._id !== id));
            Swal.fire({
              title: "Cancelled!",
              text: "Your application has been cancelled.",
              icon: "success"
            });
          }
        } catch (error) {
          console.error("Error cancelling application:", error);
          toast.error("Failed to cancel application");
        }
      }
    });
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
            My Visa Applications
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track and manage your visa applications.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-md mx-auto">
          <form onSubmit={handleSearch} className="relative">
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden shadow-sm">
              <input
                type="text"
                placeholder="Search by country name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 px-4 focus:outline-none"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              )}
              <button
                type="submit"
                className="p-2 bg-blue-600 text-white hover:bg-blue-700"
              >
                <FaSearch />
              </button>
            </div>
          </form>
        </div>

        {filteredApplications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApplications.map((app, index) => (
              <Fade
                key={app._id}
                direction="up"
                delay={index % 3 * 100}
                triggerOnce
                className="h-full"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
                  <img
                    src={app.country_image}
                    alt={app.country}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5 flex-grow">
                    <h3 className="text-xl font-semibold mb-2">{app.country}</h3>
                    <div className="space-y-2 text-gray-600">
                      <p>
                        <span className="font-medium">Visa Type:</span> {app.visa_type}
                      </p>
                      <p>
                        <span className="font-medium">Processing Time:</span>{" "}
                        {app.processing_time}
                      </p>
                      <p>
                        <span className="font-medium">Fee:</span> ${app.fee}
                      </p>
                      <p>
                        <span className="font-medium">Validity:</span> {app.validity}
                      </p>
                      <p>
                        <span className="font-medium">Applied Date:</span>{" "}
                        {new Date(app.appliedDate).toLocaleDateString()}
                      </p>
                      <p>
                        <span className="font-medium">Applicant:</span>{" "}
                        {app.firstName} {app.lastName}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span> {app.email}
                      </p>
                    </div>
                  </div>
                  <div className="px-5 pb-5">
                    <button
                      onClick={() => handleCancel(app._id)}
                      className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                    >
                      <FaTimes /> Cancel Application
                    </button>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No applications found
            </h3>
            {searchTerm ? (
              <p className="text-gray-600 mb-6">
                No applications match your search criteria. Try a different search term.
              </p>
            ) : (
              <p className="text-gray-600 mb-6">
                You haven't applied for any visas yet.
              </p>
            )}
            <a
              href="/all-visas"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              Explore Visas
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyVisaApplications; 