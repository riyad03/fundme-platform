"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, ChevronRight, ArrowLeft, ChevronDown } from "lucide-react"
import { Link,useNavigate } from "react-router-dom" // Changed from Next.js Link to React Router Link

const countries = [
  { code: "+212", name: "Morocco", flag: "ma" },
  { code: "+1", name: "United States", flag: "🇺🇸" },
  { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "+33", name: "France", flag: "🇫🇷" },
  { code: "+81", name: "Japan", flag: "🇯🇵" },
  { code: "+86", name: "China", flag: "🇨🇳" },
  { code: "+61", name: "Australia", flag: "🇦🇺" },
  { code: "+55", name: "Brazil", flag: "🇧🇷" },
  { code: "+7", name: "Russia", flag: "🇷🇺" },
  { code: "+34", name: "Spain", flag: "🇪🇸" },
  { code: "+39", name: "Italy", flag: "🇮🇹" },
  { code: "+52", name: "Mexico", flag: "🇲🇽" },
  { code: "+82", name: "South Korea", flag: "🇰🇷" },
  { code: "+971", name: "UAE", flag: "🇦🇪" },
]

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    description: "",
  })
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showSignInPassword, setShowSignInPassword] = useState(false)
  const [formStep, setFormStep] = useState(0)
  const [selectedCountry, setSelectedCountry] = useState("+212");
  

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSignInChange = (e) => {
    const { name, value } = e.target
    setSignInData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber ? `${selectedCountry} ${formData.phoneNumber}` : "",
      passwordHash: formData.password, // In a real app, hash before sending or handle securely on backend
      description: formData.description,
    };
    fetch("http://localhost:8080/api/users/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then(err => {
          // handle error response here
          throw new Error(err.message || "Failed to register");
        });
      }else{
        toggleAuthMode();
        
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
      // do something on success like navigation or showing a message
    })
    .catch((error) => {
      console.error("Error:", error.message);
      // show error to user
    });

  }

  const handleSignInSubmit = (e) => {
    e.preventDefault()
    const payload={
      email: signInData.email,
      password: signInData.password,
    };
    fetch('http://localhost:8080/api/login',{
        method:"Post",
        headers:{
          "Content-type":"application/json",
          
        },
        body: JSON.stringify(payload),
    }).then(async (data)=>{
        if (!data.ok) {
         
          throw new Error(`login error! status: ${data.status}`);
        }
        const text = await data.text();
        return text ? JSON.parse(text):{};
    }).then((data)=>{
        // on login success
        localStorage.setItem("isLoggedIn", "true");

        console.log("sucess"+data);
        navigate('/');
    }).catch((error) => {
      localStorage.removeItem("isLoggedIn");
      console.error("Error:", error.message);
      // show error to user
    });


    console.log("Sign in submitted:", {
      
    })
  }

  const nextStep = () => {
    if (formStep < 1) setFormStep(formStep + 1)
  }

  const prevStep = () => {
    if (formStep > 0) setFormStep(formStep - 1)
  }

  const toggleAuthMode = () => {
    setIsSignIn(!isSignIn)
    setFormStep(0) // Reset form step when toggling
  }

  

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
   
      

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6 ">
        <AnimatePresence mode="wait">
          <motion.div
            key={isSignIn ? "signin" : "signup"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: -50 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="mb-8 ">
              {isSignIn ? (
                <>
                  <div className="flex items-center mb-4">
                    <button onClick={toggleAuthMode} className="text-gray-400 hover:text-white mr-2 transition-colors">
                      <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-3xl font-bold">Welcome Back</h1>
                  </div>
                  <p className="text-gray-400">Sign in to your account</p>
                </>
              ) : (
                <>
                  <h1 className="text-3xl font-bold mb-2">Join Clean Energy</h1>
                  <p className="text-gray-400">Create your account to get started</p>
                </>
              )}
            </div>

            <div className="bg-gray-900 rounded-lg p-6 shadow-xl">
              {isSignIn ? (
                <form onSubmit={handleSignInSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="signin-email" className="block text-sm font-medium mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="signin-email"
                        name="email"
                        required
                        value={signInData.email}
                        onChange={handleSignInChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="signin-password" className="block text-sm font-medium mb-1">
                        Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showSignInPassword ? "text" : "password"}
                          id="signin-password"
                          name="password"
                          required
                          value={signInData.password}
                          onChange={handleSignInChange}
                          className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignInPassword(!showSignInPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showSignInPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Link
                        to="/forgot-password"
                        className="text-sm text-green-500 hover:text-green-400 transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-green-500 hover:bg-green-600 text-black font-medium py-3 px-4 rounded-md transition-all flex items-center justify-center mt-6"
                    >
                      Sign In
                    </motion.button>
                  </div>

                  <div className="mt-6 text-center text-sm text-gray-400">
                    Don't have an account?{" "}
                    <button onClick={toggleAuthMode} className="text-green-500 hover:text-green-400 transition-colors">
                      Sign up
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSubmit}>
                  {formStep === 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                          placeholder="your@email.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-1">
                          Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                            placeholder="Create a secure password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={nextStep}
                        className="w-full bg-green-500 hover:bg-green-600 text-black font-medium py-3 px-4 rounded-md transition-all flex items-center justify-center mt-6"
                      >
                        Continue <ChevronRight size={18} className="ml-1" />
                      </motion.button>
                    </motion.div>
                  )}

                  {formStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">
                          Phone Number
                        </label>
                        <div className="flex">
                          <div className="w-1/3 mr-2">
                            <CustomCountrySelect
                              value={selectedCountry}
                              onChange={setSelectedCountry}
                              countries={countries}
                            />
                          </div>
                          <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-2/3 bg-gray-800 border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                            placeholder="Phone number (optional)"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="description" className="block text-sm font-medium mb-1">
                          Description
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          maxLength={500}
                          rows={4}
                          className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all resize-none"
                          placeholder="Tell us about yourself (optional, max 500 characters)"
                        />
                        <p className="text-xs text-gray-400 mt-1">{formData.description.length}/500 characters</p>
                      </div>

                      <div className="flex space-x-3 pt-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          onClick={prevStep}
                          className="w-1/3 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-md transition-all"
                        >
                          Back
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          className="w-2/3 bg-green-500 hover:bg-green-600 text-black font-medium py-3 px-4 rounded-md transition-all"
                        >
                          Create Account
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  <div className="mt-6 text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <button onClick={toggleAuthMode} className="text-green-500 hover:text-green-400 transition-colors">
                      Sign in
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="p-6 text-center text-gray-500 text-sm">
        <p>© 2025 Clean Energy for Tomorrow. All rights reserved.</p>
      </footer>
    </div>
  )
}

function CustomCountrySelect({ value, onChange, countries }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Find the selected country object
  const selectedCountry = countries.find((country) => country.code === value) || countries[0]

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full bg-gray-800 border border-gray-700 rounded-md p-3 h-[50px] focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
          <span className="mr-2">{selectedCountry.flag}</span>
          <span>{selectedCountry.code}</span>
        </div>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
          <ul className="py-1" role="listbox">
            {countries.map((country) => (
              <li
                key={country.code}
                role="option"
                aria-selected={country.code === value}
                onClick={() => {
                  onChange(country.code)
                  setIsOpen(false)
                }}
                className={`flex items-center px-3 py-2 cursor-pointer hover:bg-gray-700 ${
                  country.code === value ? "bg-gray-700" : ""
                }`}
              >
                <span className="mr-2">{country.flag}</span>
                <span>{country.name}</span>
                <span className="ml-1 text-gray-400">{country.code}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
