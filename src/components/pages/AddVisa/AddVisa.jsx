import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Fade } from "react-awesome-reveal";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";

const AddVisa = () => {
  const axios = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    country: "",
    country_image: "",
    visa_type: "Tourist visa",
    processing_time: "",
    required_documents: [],
    description: "",
    age_restriction: "",
    fee: "",
    validity: "",
    application_method: ""
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "age_restriction" || name === "fee") {
      // Only allow numeric values for age and fee
      if (value === "" || /^\d+$/.test(value)) {
        setFormData({
          ...formData,
          [name]: value
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleDocumentChange = (e) => {
    const { value, checked } = e.target;
    
    if (checked) {
      setFormData({
        ...formData,
        required_documents: [...formData.required_documents, value]
      });
    } else {
      setFormData({
        ...formData,
        required_documents: formData.required_documents.filter(doc => doc !== value)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.required_documents.length === 0) {
      toast.error("Please select at least one required document");
      return;
    }
    
    setLoading(true);
    
    try {
      // Add additional fields
      const visaData = {
        ...formData,
        added_by: user.email,
        added_by_name: user.displayName,
        added_date: new Date().toISOString()
      };
      
      const response = await axios.post("/visas", visaData);
      
      if (response.data.insertedId) {
        toast.success("Visa added successfully!");
        navigate("/my-added-visas");
      }
    } catch (error) {
      console.error("Error adding visa:", error);
      toast.error("Failed to add visa. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <Fade direction="down" triggerOnce>
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Add a New Visa
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Share visa information to help fellow travelers navigate the
              application process.
            </p>
          </div>
        </Fade>

        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Country */}
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Country Name*
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. United States"
                  />
                </div>

                {/* Country Image URL */}
                <div>
                  <label
                    htmlFor="country_image"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Country Image URL*
                  </label>
                  <input
                    type="url"
                    id="country_image"
                    name="country_image"
                    value={formData.country_image}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {/* Visa Type */}
                <div>
                  <label
                    htmlFor="visa_type"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Visa Type*
                  </label>
                  <select
                    id="visa_type"
                    name="visa_type"
                    value={formData.visa_type}
                    onChange={handleChange}
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
                    htmlFor="processing_time"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Processing Time*
                  </label>
                  <input
                    type="text"
                    id="processing_time"
                    name="processing_time"
                    value={formData.processing_time}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. 5-7 business days"
                  />
                </div>

                {/* Age Restriction */}
                <div>
                  <label
                    htmlFor="age_restriction"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Age Restriction*
                  </label>
                  <input
                    type="number"
                    id="age_restriction"
                    name="age_restriction"
                    value={formData.age_restriction}
                    onChange={handleChange}
                    required
                    min="0"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. 18"
                  />
                </div>

                {/* Fee */}
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
                    value={formData.fee}
                    onChange={handleChange}
                    required
                    min="0"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. 160"
                  />
                </div>

                {/* Validity */}
                <div>
                  <label
                    htmlFor="validity"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Validity*
                  </label>
                  <input
                    type="text"
                    id="validity"
                    name="validity"
                    value={formData.validity}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. 6 months"
                  />
                </div>

                {/* Application Method */}
                <div>
                  <label
                    htmlFor="application_method"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Application Method*
                  </label>
                  <input
                    type="text"
                    id="application_method"
                    name="application_method"
                    value={formData.application_method}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. Online or Embassy"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description*
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Provide a detailed description of the visa..."
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
                        id={`doc-${doc}`}
                        name="required_documents"
                        value={doc}
                        checked={formData.required_documents.includes(doc)}
                        onChange={handleDocumentChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`doc-${doc}`}
                        className="ml-2 block text-sm text-gray-700"
                      >
                        {doc}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Adding Visa..." : "Add Visa"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVisa; 