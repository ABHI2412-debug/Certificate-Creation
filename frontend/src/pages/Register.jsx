import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

// Toast functions
const notifySuccess = (message) => toast.success(message);
const notifyError = (message) => toast.error(message);

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    userType: "candidate" // candidate or employer
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      notifyError("Passwords do not match!");
      return;
    }

    if (formData.password.length < 6) {
      notifyError("Password must be at least 6 characters long!");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(
        "/api/auth/register",
        {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          userType: formData.userType
        },
        { withCredentials: true }
      );

      const { token, user, message } = res.data;

      if (token && user) {
        login({ ...user, token });
        notifySuccess("Registration successful! Welcome to our platform!");
        navigate("/dashboard");
      } else {
        notifyError(message || "Registration failed!");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed. Please try again!";
      notifyError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    window.location.href = "/api/auth/google";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-green-200 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236B9F6B' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10 min-h-screen flex items-center justify-center">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 w-full">
          {/* Left Section - Information */}
          <div className="flex-1 max-w-xl">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-blue-200 shadow-xl mb-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h1 className="text-4xl font-bold text-green-900">Join Our Professional Community</h1>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                Create your account and unlock access to certificate verification, career opportunities, and professional networking.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700">Get your certificates verified instantly</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700">Access exclusive career opportunities</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700">Build your professional network</p>
                </div>
              </div>
            </div>

            {/* Testimonials Section */}
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-green-200 shadow-sm">
                <p className="text-lg italic text-green-900 mb-2">
                  "This platform helped me verify all my certifications and land my dream job within weeks!"
                </p>
                <p className="text-sm text-green-600 font-medium">— Priya Sharma, Software Engineer</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-green-200 shadow-sm">
                <p className="text-lg italic text-green-900 mb-2">
                  "As an employer, the certificate verification feature saves us so much time in the hiring process."
                </p>
                <p className="text-sm text-green-600 font-medium">— Raj Patel, HR Manager</p>
              </div>
            </div>
          </div>

          {/* Right Section - Registration Form */}
          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-blue-200 shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
              <p className="text-gray-600 mb-6">Join thousands of professionals</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* User Type Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">I am a</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, userType: "candidate"})}
                      className={`py-2 px-4 rounded-lg border transition-colors ${
                        formData.userType === "candidate" 
                          ? "bg-blue-600 text-white border-blue-600" 
                          : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
                      }`}
                    >
                      Candidate
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, userType: "employer"})}
                      className={`py-2 px-4 rounded-lg border transition-colors ${
                        formData.userType === "employer" 
                          ? "bg-blue-600 text-white border-blue-600" 
                          : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
                      }`}
                    >
                      Employer
                    </button>
                  </div>
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Create a password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m9.02 9.02l3.83 3.83" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                    required
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                    I agree to the{" "}
                    <Link to="/terms" className="text-blue-600 hover:text-blue-800 font-medium">
                      Terms and Conditions
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-blue-600 hover:text-blue-800 font-medium">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">or continue with</span>
                </div>
              </div>

              <button
                onClick={handleGoogleRegister}
                className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
            </div>

            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-green-600 font-semibold hover:text-green-800 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}