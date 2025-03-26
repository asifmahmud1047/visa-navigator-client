import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import toast from "react-hot-toast";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";

const VisaDetails = () => {
  const { id } = useParams();
  const axios = useAxios();
  const { user } = useAuth();
  const [visa, setVisa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyForm, setApplyForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    appliedDate: new Date().toISOString().split("T")[0],
    fee: ""
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchVisaDetails = async () => {
      try {
        const response = await axios.get(`/visas/${id}`);
        setVisa(response.data);
        setApplyForm(prev => ({
          ...prev,
          email: user?.email || "",
          fee: response.data.fee
        }));
      } catch (error) {
        console.error("Error fetching visa details:", error);
        toast.error("Failed to load visa details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVisaDetails();
    }
  }, [id, axios, user?.email]);

  const handleApplyFormChange = (e) => {
    const { name, value } = e.target;
    setApplyForm({
      ...applyForm,
      [name]: value
    });
  };

  const handleApply = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const applicationData = {
        ...applyForm,
        visa_id: visa._id,
        country: visa.country,
        country_image: visa.country_image,
        visa_type: visa.visa_type,
        processing_time: visa.processing_time,
        validity: visa.validity,
        application_method: visa.application_method,
        userId: user.uid
      };

      const response = await axios.post("/applications", applicationData);
      
      if (response.data.insertedId) {
        toast.success("Application submitted successfully!");
        setShowApplyModal(false);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!visa) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Visa not found</h2>
        <p className="text-gray-600">
          The visa you're looking for does not exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <Fade triggerOnce>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-64 md:h-80">
              <img
                src={visa.country_image}
                alt={visa.country}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                <div className="p-6 text-white">
                  <h1 className="text-3xl md:text-4xl font-bold">{visa.country}</h1>
                  <p className="text-xl mt-2">{visa.visa_type}</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Visa Information
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">
                        Description
                      </h3>
                      <p className="text-gray-600 mt-1">{visa.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-700">
                          Processing Time
                        </h3>
                        <p className="text-gray-600 mt-1">{visa.processing_time}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-700">
                          Fee
                        </h3>
                        <p className="text-gray-600 mt-1">${visa.fee}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-700">
                          Validity
                        </h3>
                        <p className="text-gray-600 mt-1">{visa.validity}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-700">
                          Age Restriction
                        </h3>
                        <p className="text-gray-600 mt-1">{visa.age_restriction}+ years</p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-700">
                          Application Method
                        </h3>
                        <p className="text-gray-600 mt-1">{visa.application_method}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Required Documents
                  </h2>
                  
                  <ul className="space-y-2">
                    {visa.required_documents.map((doc, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-700">{doc}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8">
                    <button
                      onClick={() => setShowApplyModal(true)}
                      className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors flex items-center justify-center"
                    >
                      Apply for this Visa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Apply for {visa.country} {visa.visa_type}
                </h2>
                <button
                  onClick={() => setShowApplyModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleApply} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={applyForm.email}
                    onChange={handleApplyFormChange}
                    required
                    disabled
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name*
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={applyForm.firstName}
                    onChange={handleApplyFormChange}
                    required
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name*
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={applyForm.lastName}
                    onChange={handleApplyFormChange}
                    required
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="appliedDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Applied Date*
                  </label>
                  <input
                    type="date"
                    id="appliedDate"
                    name="appliedDate"
                    value={applyForm.appliedDate}
                    onChange={handleApplyFormChange}
                    required
                    disabled
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="fee"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Fee (USD)*
                  </label>
                  <input
                    type="number"
                    id="fee"
                    name="fee"
                    value={applyForm.fee}
                    onChange={handleApplyFormChange}
                    required
                    disabled
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
                  />
                </div>

                <div className="flex justify-end pt-4 space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Submitting..." : "Apply"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisaDetails; 