import React, { useState } from "react";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import petAnimation from "../Animation - 1726242978026.json";

const Alert = ({ message, type }) => (
  <div
    className={`p-4 mb-4 text-sm ${
      type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
    } rounded-lg`}
    role="alert"
  >
    {message}
  </div>
);

const RegistrationForm = () => {
  const [step, setStep] = useState(1); // To track the current step
  const [formData, setFormData] = useState({
    userType: "",
    username: "",
    password: "",
    email: "",
    gender: "",
    age: "",
    petBreed: "",
    petName: "",
    img: null,
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, img: e.target.files[0] });
  };

  const handleNextStep = () => setStep((prevStep) => prevStep + 1);
  const handlePreviousStep = () => setStep((prevStep) => prevStep - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    try {
      const finalFormData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        finalFormData.append(key, value);
      });

      await api.post("/api/userinformation/", finalFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const loginData = { username: formData.username, password: formData.password };
      const res = await api.post("/api/login/", loginData);

      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      navigate("/login");
    } catch (e) {
      const errorMessage =
        e.message === "Network Error"
          ? "Please check your Internet connection"
          : e.message === "Request failed with status code 401"
          ? "Invalid username or password"
          : "Some error occurred";

      setAlert({
        type: "error",
        message: `Oops! ${errorMessage}!`,
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Step 1: Select User Type</h2>
            <div className="space-y-4">
              {["customer", "pet doctor", "supplier", "delivery personnel"].map((type) => (
                <div key={type}>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="userType"
                      value={type}
                      checked={formData.userType === type}
                      onChange={handleInputChange}
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 capitalize">{type}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Step 2: Account Information</h2>
            <div>
              <label className="block text-sm font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter your username"
                className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm"
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm"
                required
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Step 3: Personal Information</h2>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm"
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm"
                required
              >
                <option value="" disabled>
                  Select your gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Step 4: Pet Information</h2>
            <div>
              <label className="block text-sm font-medium">Pet Breed</label>
              <input
                type="text"
                name="petBreed"
                value={formData.petBreed}
                onChange={handleInputChange}
                placeholder="Enter your pet's breed"
                className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm"
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium">Profile Picture</label>
              <input
                type="file"
                name="img"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full text-white bg-gray-700 border border-gray-600 rounded-lg shadow-sm"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-lg p-8 bg-gray-800 text-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
        {alert && <Alert message={alert.message} type={alert.type} />}
        <form onSubmit={step === 4 ? handleSubmit : (e) => e.preventDefault()} className="space-y-6">
          {renderStep()}
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePreviousStep}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                Previous
              </button>
            )}
            {step < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
      <div className="ml-6 hidden md:block">
        <Lottie animationData={petAnimation} style={{ width: "400px", height: "400px" }} />
      </div>
    </div>
  );
};

export default RegistrationForm;
