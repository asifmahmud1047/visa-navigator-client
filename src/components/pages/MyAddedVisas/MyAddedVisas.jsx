import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";

const MyAddedVisas = () => {
  const axios = useAxios();
  const { user } = useAuth();
  const [myVisas, setMyVisas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentVisa, setCurrentVisa] = useState(null);
  
  const documentOptions = [
    "Valid passport",
    "Visa application form",
    "Recent passport-sized photograph",
    "Proof of accommodation",
    "Travel itinerary",
    "Bank statements",
    "Travel insurance",
    "Employment verification",
    "Invitation letter",
    "Medical certificate"
  ];
  
  const visaTypes = [
    "Tourist visa",
    "Business visa",
    "Student visa",
    "Work visa",
    "Transit visa",
    "Official visa"
  ];

  useEffect(() => {
    const fetchMyVisas = async () => {
      try {
        const response = await axios.get(`/visas/user/${user.email}`);
        setMyVisas(response.data);
      } catch (error) {
        console.error("Error fetching my visas:", error);
        toast.error("Failed to load your visas");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchMyVisas();
    }
  }, [axios, user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`/visas/${id}`);
          if (response.data.deletedCount > 0) {
            // Update local state after successful deletion
            setMyVisas(myVisas.filter(visa => visa._id !== id));
            Swal.fire({
              title: "Deleted!",
              text: "Your visa has been deleted.",
              icon: "success"
            });
          }
        } catch (error) {
          console.error("Error deleting visa:", error);
          toast.error("Failed to delete visa");
        }
      }
    });
  };

  const handleUpdate = (visa) => {
    setCurrentVisa(visa);
    setShowUpdateModal(true);
  };

  const handleCloseModal = () => {
    setShowUpdateModal(false);
    setCurrentVisa(null);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setCurrentVisa({
      ...currentVisa,
      [name]: value
    });
  };

  const handleDocumentChange = (e) => {
    const { value, checked } = e.target;
    
    if (checked) {
      setCurrentVisa({
        ...currentVisa,
        required_documents: [...currentVisa.required_documents, value]
      });
    } else {
      setCurrentVisa({
        ...currentVisa,
        required_documents: currentVisa.required_documents.filter(doc => doc !== value)
      });
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.put(`/visas/${currentVisa._id}`, currentVisa);
      
      if (response.data.modifiedCount > 0) {
        // Update local state with updated visa
        setMyVisas(myVisas.map(visa => 
          visa._id === currentVisa._id ? currentVisa : visa
        ));
        
        toast.success("Visa updated successfully!");
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error updating visa:", error);
      toast.error("Failed to update visa");
    }
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
            My Added Visas
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage the visa information you've shared with the community.
          </p>
        </div>

        {myVisas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myVisas.map((visa, index) => (
              <Fade
                key={visa._id}
                direction="up"
                delay={index % 3 * 100}
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
                  <div className="p-5 pt-0 flex gap-2">
                    <button
                      onClick={() => handleUpdate(visa)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                    >
                      <FaEdit /> Update
                    </button>
                    <button
                      onClick={() => handleDelete(visa._id)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              You haven't added any visas yet
            </h3>
            <p className="text-gray-600 mb-6">
              Share visa information to help fellow travelers.
            </p>
            <a
              href="/add-visa"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              Add a New Visa
            </a>
          </div>
        )}
      </div>

      {/* Update Visa Modal */}
      {showUpdateModal && currentVisa && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Update Visa Information
                </h2>
                <button
                  onClick={handleCloseModal}
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

              <form onSubmit={handleUpdateSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Country */}
                  <div>
                    <label
                      htmlFor="update-country"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Country Name*
                    </label>
                    <input
                      type="text"
                      id="update-country"
                      name="country"
                      value={currentVisa.country}
                      onChange={handleUpdateChange}
                      required
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Country Image URL */}
                  <div>
                    <label
                      htmlFor="update-country_image"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Country Image URL*
                    </label>
                    <input
                      type="url"
                      id="update-country_image"
                      name="country_image"
                      value={currentVisa.country_image}
                      onChange={handleUpdateChange}
                      required
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Visa Type */}
                  <div>
                    <label
                      htmlFor="update-visa_type"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Visa Type*
                    </label>
                    <select
                      id="update-visa_type"
                      name="visa_type"
                      value={currentVisa.visa_type}
                      onChange={handleUpdateChange}
                      required
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      {visaTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Processing Time */}
                  <div>
                    <label
                      htmlFor="update-processing_time"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Processing Time*
                    </label>
                    <input
                      type="text"
                      id="update-processing_time"
                      name="processing_time"
                      value={currentVisa.processing_time}
                      onChange={handleUpdateChange}
                      required
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Age Restriction */}
                  <div>
                    <label
                      htmlFor="update-age_restriction"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Age Restriction*
                    </label>
                    <input
                      type="number"
                      id="update-age_restriction"
                      name="age_restriction"
                      value={currentVisa.age_restriction}
                      onChange={handleUpdateChange}
                      required
                      min="0"
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Fee */}
                  <div>
                    <label
                      htmlFor="update-fee"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Fee (USD)*
                    </label>
                    <input
                      type="number"
                      id="update-fee"
                      name="fee"
                      value={currentVisa.fee}
                      onChange={handleUpdateChange}
                      required
                      min="0"
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Validity */}
                  <div>
                    <label
                      htmlFor="update-validity"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Validity*
                    </label>
                    <input
                      type="text"
                      id="update-validity"
                      name="validity"
                      value={currentVisa.validity}
                      onChange={handleUpdateChange}
                      required
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Application Method */}
                  <div>
                    <label
                      htmlFor="update-application_method"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Application Method*
                    </label>
                    <input
                      type="text"
                      id="update-application_method"
                      name="application_method"
                      value={currentVisa.application_method}
                      onChange={handleUpdateChange}
                      required
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="update-description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description*
                  </label>
                  <textarea
                    id="update-description"
                    name="description"
                    value={currentVisa.description}
                    onChange={handleUpdateChange}
                    required
                    rows="4"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>

                {/* Required Documents */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Required Documents*
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {documentOptions.map((doc) => (
                      <div key={doc} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`update-doc-${doc}`}
                          name="required_documents"
                          value={doc}
                          checked={currentVisa.required_documents.includes(doc)}
                          onChange={handleDocumentChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`update-doc-${doc}`}
                          className="ml-2 block text-sm text-gray-700"
                        >
                          {doc}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-4 space-x-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                  >
                    Update Visa
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

export default MyAddedVisas; 