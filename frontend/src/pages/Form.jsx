import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import petAnimation from '../Animation - 1726242978026.json'; // Your animation

const Alert = ({ message, type }) => {
  return (
    <div
      className={`p-4 mb-4 text-sm ${type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'} rounded-lg`}
      role="alert"
    >
      {message}
    </div>
  );
};

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
    petName: '',
    petBreed: '',
    petAge: '',
    petFavoriteFood: '',
    specialization: '',
    clinicAddress: '',
    yearsOfExperience: '',
    businessName: '',
    productCategories: '',
    warehouseAddress: '',
    vehicleType: '',
    serviceAreas: '',
    workHours: '',
    drivingLicense: '',
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [step, setStep] = useState(1); // Step tracker
  const [alert, setAlert] = useState(null);
  const [isLogin, setIsLogin] = useState(false); // To toggle between Registration and Login form
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isLogin) {
      setLoginData({ ...loginData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/register', formData);
      navigate('/login');
    } catch (e) {
      setAlert({ type: 'error', message: 'Registration failed. Please try again.' });
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', loginData);
      navigate('/dashboard'); // Change to the appropriate page after login
    } catch (e) {
      setAlert({ type: 'error', message: 'Login failed. Please check your credentials.' });
    }
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
        setAlert({ type: 'error', message: 'Please fill out all fields in Personal Information.' });
        return;
      }
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen flex bg-peach">
      <div className="relative w-full md:w-1/2 flex flex-col justify-center items-center">
        <div className="md:w-1/2 w-full items-center justify-center">
          <div className="bg-transparent text-gray-700 shadow-lg rounded-lg p-1 max-w-md w-full border border-gray-600">
            <h1 className="text-3xl font-bold text-center mb-2 mt-4">{isLogin ? 'Log In' : 'Register'}</h1>
            {alert && <Alert message={alert.message} type={alert.type} />}
            <form onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit} className="space-y-6 mr-4 ml-4 mb-4">
              {isLogin ? (
                // Login Form
                <>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={loginData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="mt-1 block w-full p-3 border border-gray-600 rounded-lg shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={loginData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className="mt-1 block w-full p-3 border border-gray-600 rounded-lg shadow-sm"
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg mt-4"
                    >
                      Log In
                    </button>
                  </div>
                </>
              ) : (
                // Registration Form
                <>
                  {/* Step 1: Personal Information */}
                  {step === 1 && (
  <>
    <div>
      <label htmlFor="username" className="block text-sm font-medium">Username</label>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
        placeholder="Choose a username"
        className="mt-1 block w-full p-3 border border-gray-600 rounded-lg shadow-sm"
        required
      />
    </div>
    <div>
      <label htmlFor="email" className="block text-sm font-medium">Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Enter your email"
        className="mt-1 block w-full p-3 border border-gray-600 rounded-lg shadow-sm"
        required
      />
    </div>
    <div>
      <label htmlFor="password" className="block text-sm font-medium">Password</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Enter your password"
        className="mt-1 block w-full p-3 border border-gray-600 rounded-lg shadow-sm"
        required
        minLength="8"  // You can add minLength or other password criteria
      />
    </div>
    <div>
      <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm Password</label>
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        placeholder="Confirm your password"
        className="mt-1 block w-full p-3 border border-gray-600 rounded-lg shadow-sm"
        required
      />
      {formData.password !== formData.confirmPassword && formData.confirmPassword && (
        <span className="text-red-500 text-sm">Passwords do not match</span>
      )}
    </div>

    <div className="flex justify-end">
      <button
        type="button"
        onClick={nextStep}
        className="w-1/2 bg-blue-500 text-white font-bold py-3 rounded-lg mt-4"
      >
        Next
      </button>
    </div>
  </>
)}

                  {/* Step 2: User Type Selection */}
                  {step === 2 && (
                    <>
                      <div>
                        <label htmlFor="userType" className="block text-sm font-medium">Select User Type</label>
                        <select
                          name="userType"
                          value={formData.userType}
                          onChange={handleInputChange}
                          className="mt-1 block w-full p-3 border border-gray-600 rounded-lg shadow-sm"
                          required
                        >
                          <option value="" disabled>Select your user type</option>
                          <option value="customer">Customer</option>
                          <option value="petDoctor">Pet Doctor</option>
                          <option value="supplier">Supplier</option>
                          <option value="deliveryPersonnel">Delivery Personnel</option>
                        </select>
                      </div>
                      <div className="flex space-x-4">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="w-1/2 bg-blue-500 text-white font-bold py-3 rounded-lg mt-4"
                        >
                          Previous
                        </button>
                        <button
                          type="button"
                          onClick={nextStep}
                          className="w-1/2 bg-blue-500 text-white font-bold py-3 rounded-lg mt-4"
                        >
                          Next
                        </button>
                      </div>
                    </>
                  )}
 {/* Step 3: Conditional Fields Based on User Type */}
 {step === 3 && formData.userType && (
                <>
                  {formData.userType === 'customer' && (
                    <>
                      <div>
                        <label htmlFor="petName" className="block text-sm font-medium">Pet Name</label>
                        <input
                          type="text"
                          name="petName"
                          value={formData.petName}
                          onChange={handleInputChange}
                          placeholder="Enter your pet's name"
                          className="mt-1 block w-full p-3  border border-gray-600 rounded-lg shadow-sm"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="petBreed" className="block text-sm font-medium">Pet Breed</label>
                        <input
                          type="text"
                          name="petBreed"
                          value={formData.petBreed}
                          onChange={handleInputChange}
                          placeholder="Enter your pet's breed"
                          className="mt-1 block w-full p-3  border border-gray-600 rounded-lg shadow-sm"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="petAge" className="block text-sm font-medium">Pet Age</label>
                        <input
                          type="text"
                          name="petAge"
                          value={formData.petAge}
                          onChange={handleInputChange}
                          placeholder="Enter your pet's age"
                          className="mt-1 block w-full p-3  border border-gray-600 rounded-lg shadow-sm"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="petFavoriteFood" className="block text-sm font-medium">Pet Favorite Food</label>
                        <input
                          type="text"
                          name="petFavoriteFood"
                          value={formData.petFavoriteFood}
                          onChange={handleInputChange}
                          placeholder="Enter your pet's favorite food"
                          className="mt-1 block w-full p-3  border border-gray-600 rounded-lg shadow-sm"
                          required
                        />
                      </div>
                    </>
                  )}
                  {formData.userType === 'petDoctor' && (
                    <>
                      <div>
                        <label htmlFor="specialization" className="block text-sm font-medium">Specialization</label>
                        <input
                          type="text"
                          name="specialization"
                          value={formData.specialization}
                          onChange={handleInputChange}
                          placeholder="Enter your specialization"
                          className="mt-1 block w-full p-3  border border-gray-600 rounded-lg shadow-sm"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="clinicAddress" className="block text-sm font-medium">Clinic Address</label>
                        <input
                          type="text"
                          name="clinicAddress"
                          value={formData.clinicAddress}
                          onChange={handleInputChange}
                          placeholder="Enter your clinic address"
                          className="mt-1 block w-full p-3  border border-gray-600 rounded-lg shadow-sm"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="yearsOfExperience" className="block text-sm font-medium">Years of Experience</label>
                        <input
                          type="number"
                          name="yearsOfExperience"
                          value={formData.yearsOfExperience}
                          onChange={handleInputChange}
                          placeholder="Enter your years of experience"
                          className="mt-1 block w-full p-3  border border-gray-600 rounded-lg shadow-sm"
                          required
                        />
                      </div>
                    </>
                  )}
                  {formData.userType === 'supplier' && (
                    <>
                      <div>
                        <label htmlFor="businessName" className="block text-sm font-medium">Business Name</label>
                        <input
                          type="text"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleInputChange}
                          placeholder="Enter your business name"
                          className="mt-1 block w-full p-3  border border-gray-600 rounded-lg shadow-sm"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="businessType" className="block text-sm font-medium">Business Type</label>
                        <input
                          type="text"
                          name="businessType"
                          value={formData.businessType}
                          onChange={handleInputChange}
                          placeholder="(e.g pet food, medical supplies)"
                          className="mt-1 block w-full p-3  border border-gray-600 rounded-lg shadow-sm"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="productCategories" className="block text-sm font-medium">Product Categories</label>
                        <input
                          type="text"
                          name="productCategories"
                          value={formData.productCategories}
                          onChange={handleInputChange}
                          placeholder="(e.g. grooming products, Toys)"
                          className="mt-1 block w-full p-3  border border-gray-600 rounded-lg shadow-sm"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="warehouseAddress" className="block text-sm font-medium">Warehouse Address</label>
                        <input
                          type="text"
                          name="warehouseAddress"
                          value={formData.warehouseAddress}
                          onChange={handleInputChange}
                          placeholder="Enter your warehouse address"
                          className="mt-1 block w-full p-3  border border-gray-600 rounded-lg shadow-sm"
                          required
                        />
                      </div>
                    </>
                  )}
                  {formData.userType === 'deliveryPersonnel' && (
                    <>
                      <div>
                        <label htmlFor="vehicleType" className="block text-sm font-medium">Vehicle Type</label>
                        <input
                          type="text"
                          name="vehicleType"
                          value={formData.vehicleType}
                          onChange={handleInputChange}
                          placeholder="Enter your vehicle type"
                          className="mt-1 block w-full p-3  border border-gray-600 rounded-lg shadow-sm"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="serviceAreas" className="block text-sm font-medium">Service Areas</label>
                        <input
                          type="text"
                          name="serviceAreas"
                          value={formData.serviceAreas}
                          onChange={handleInputChange}
                          placeholder="Enter your service areas"
                          className="mt-1 block w-full p-3  border border-gray-600 rounded-lg shadow-sm"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="workHours" className="block text-sm font-medium">Work Hours</label>
                        <input
                          type="text"
                          name="workHours"
                          value={formData.workHours}
                          onChange={handleInputChange}
                          placeholder="Enter your work hours"
                          className="mt-1 block w-full p-3  border border-gray-600 rounded-lg shadow-sm"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="drivingLicense" className="block text-sm font-medium">Driving License</label>
                        <input
                          type="text"
                          name="drivingLicense"
                          value={formData.drivingLicense}
                          onChange={handleInputChange}
                          placeholder="Enter your driving license number"
                          className="mt-1 block w-full p-3  border border-gray-600 rounded-lg shadow-sm"
                          required
                        />
                      </div>
                    </>
                  )}
                   <div class="flex space-x-4">
                  <button type="button" onClick={prevStep} className="w-1/2 bg-blue-500 text-white font-bold py-3 rounded-lg mt-4 ">
                    Previous
                  </button>
                  <button type="submit" className="w-1/2 bg-blue-500 text-white font-bold py-3 rounded-lg mt-4">
                    Submit
                  </button>
                  {/* <button type="button" onClick={nextStep} className="w-1/2 bg-blue-500 text-white font-bold py-3 rounded-lg mt-4 ">
                    Next
                  </button> */}
                  </div>
                  
                </>
              )}
                  {/* Additional steps can go here for registration form, similar to the one you've already created */}
                </>
              )}
            </form>
            {!isLogin && (
              <div className="text-center mt-4">
                <p>
                  Already have an account?{' '}
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={() => setIsLogin(true)}
                  >
                    Log in
                  </span>
                </p>
              </div>
            )}
            {isLogin && (
              <div className="text-center mt-4">
                <p>
                  Don't have an account?{' '}
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={() => setIsLogin(false)}
                  >
                    Register
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="hidden md:block md:w-1/2 flex items-center justify-center">
        <Lottie animationData={petAnimation} loop={true} className="w-640 h-640" />
      </div>
    </div>
  );
};

export default RegistrationForm;
