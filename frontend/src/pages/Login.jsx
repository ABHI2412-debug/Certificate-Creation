import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext.jsx";
import SocialButton from "../components/SocialButton.jsx";

// Toast functions
const notifySuccess = (message) => toast.success(message);
const notifyError = (message) => toast.error(message);

export default function CertificateLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [certificateId, setCertificateId] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("credentials"); // Changed default to credentials

  const navigate = useNavigate();
  const location = useLocation();
  
  const authContext = useContext(AuthContext);
  const login = authContext?.login;

  // Handle Google login token
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const error = params.get("error");

    if (error === "not_registered") {
      notifyError("You need to register first before logging in with Google!");
    }

    if (token) {
      localStorage.setItem("token", token);
      axios
        .get("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log("Google login response:", res.data);
          // Backend returns { success: true, user: {...} }
          const userData = res.data.user || res.data;
          login({ ...userData, token });
          notifySuccess("Google login successful!");
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error("Google login error:", error);
          notifyError("Failed to fetch user info");
        });
    }
  }, [location.search, login, navigate]);

  const handleCertificateLogin = async (e) => {
    e.preventDefault();
    if (!certificateId.trim()) {
      notifyError("Please enter certificate ID");
      return;
    }

    setIsLoading(true);
    console.log("Certificate login attempt:", certificateId);

    try {
      const res = await axios.post(
        "/api/auth/verify-certificate",
        { certificateId },
        { withCredentials: true }
      );

      console.log("Certificate verification response:", res.data);

      const data = res.data;
      
      // Certificate verification doesn't log you in, just verifies the certificate
      if (data.success && data.certificate) {
        notifySuccess(`Certificate verified successfully! ${data.message}`);
        // Redirect to certificate view page
        navigate(`/verify`);
      } else {
        notifyError(data.message || "Certificate verification failed!");
      }
    } catch (err) {
      console.error("Certificate login error:", err);
      const msg = err.response?.data?.message || "Invalid certificate ID!";
      notifyError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCredentialLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      notifyError("Please fill all fields");
      return;
    }

    setIsLoading(true);
    console.log("Credential login attempt:", { email });

    try {
      const res = await axios.post(
        "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      console.log("Login response:", res.data);

      const data = res.data;
      
      // FIXED: Backend returns { success: true, token: "...", user: {...} }
      if (data.success && data.token && data.user) {
        // Store token in localStorage
        localStorage.setItem("token", data.token);
        
        // Login with user data (including token)
        login({ ...data.user, token: data.token });
        
        notifySuccess(data.message || "Login successful!");
        
        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        notifyError(data.message || "Login failed!");
      }
    } catch (err) {
      console.error("Login error:", err);
      const msg = err.response?.data?.message || "Invalid email or password!";
      notifyError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login initiated");
    window.location.href = "/api/auth/google";
  };

  const handleVerifyCertificate = () => {
    if (!certificateId.trim()) {
      notifyError("Please enter a certificate ID");
      return;
    }
    console.log("Verify without login:", certificateId);
    navigate(`/verify`);
  };

  // Fallback UI if AuthContext not available
  if (!authContext) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Authentication Error
          </h1>
          <p className="text-gray-600">
            AuthContext not available. Please check your App.jsx configuration.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

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
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h1 className="text-4xl font-bold text-blue-900">Certificate Verification Portal</h1>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                Verify your certificates securely and access your certified credentials with our trusted verification system.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700">Secure and tamper-proof certificate verification</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700">Instant verification with unique certificate IDs</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700">Digital credentials that are always accessible</p>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-green-200 text-center">
                <div className="text-2xl font-bold text-green-900">10K+</div>
                <div className="text-sm text-gray-600">Certificates Verified</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-green-200 text-center">
                <div className="text-2xl font-bold text-green-900">99.9%</div>
                <div className="text-sm text-gray-600">Verification Accuracy</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-green-200 text-center">
                <div className="text-2xl font-bold text-green-900">24/7</div>
                <div className="text-sm text-gray-600">Support Available</div>
              </div>
            </div>
          </div>

          {/* Right Section - Login Form */}
          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-blue-200 shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600 mb-6">Choose your verification method</p>

              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  onClick={() => setActiveTab("credentials")}
                  className={`flex-1 py-3 font-semibold text-center border-b-2 transition-colors ${
                    activeTab === "credentials"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Credentials
                </button>
                <button
                  onClick={() => setActiveTab("certificate")}
                  className={`flex-1 py-3 font-semibold text-center border-b-2 transition-colors ${
                    activeTab === "certificate"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Certificate ID
                </button>
              </div>

              {/* Credential Login Form */}
              {activeTab === "credentials" && (
                <form onSubmit={handleCredentialLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="Enter your registered email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="show-password"
                        checked={showPassword}
                        onChange={(e) => setShowPassword(e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="show-password" className="ml-2 text-sm text-gray-700">
                        Show password
                      </label>
                    </div>
                    <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      Forgot password?
                    </Link>
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
                        Signing in...
                      </>
                    ) : (
                      "Sign in"
                    )}
                  </button>
                </form>
              )}

              {/* Certificate Login Form */}
              {activeTab === "certificate" && (
                <form onSubmit={handleCertificateLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Certificate ID
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your certificate ID (e.g., CERT-1234-ABCD)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                      value={certificateId}
                      onChange={(e) => setCertificateId(e.target.value)}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Find your Certificate ID on your issued certificate document
                    </p>
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
                        Verifying Certificate...
                      </>
                    ) : (
                      "Verify Certificate"
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleVerifyCertificate}
                    className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                  >
                    Verify Without Login
                  </button>
                </form>
              )}

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">or continue with</span>
                </div>
              </div>

              <SocialButton provider="google" onClick={handleGoogleLogin} />
            </div>

            <p className="text-center text-sm text-gray-600 mt-6">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 font-semibold hover:text-blue-800 hover:underline">
                Register now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}