import React, { useState } from "react";

const LoginSignupPage = () => {
    const [role, setRole] = useState("Tenant"); // Tenant | Landlord
    const [mode, setMode] = useState("signup"); // signup | login
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        phone: "",
        company: "",
        role: "Tenant",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRoleSwitch = (selectedRole) => {
        setRole(selectedRole);
        setFormData({ ...formData, role: selectedRole });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`${mode.toUpperCase()} Data: `, formData);
        
        if(mode === "signup" && role === "Tenant"){
            signupTenant.mutate();
        }
        else if(mode === "login" && role === "Tenant"){

        }
        else if(mode === "signup" && role === "Landlord"){

        }
        else{

        }
    };

    return (
        <div className="flex justify-center items-center gap-20 min-h-screen w-screen bg-gradient-to-br from-green-100 via-white to-green-200">
            {/* Right Section */}
            <div className="bg-white shadow-2xl rounded-2xl p-8 w-2xl relative overflow-hidden">

                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-extrabold text-green-700">
                        {mode === "signup" ? "Create Account" : "Welcome Back"}
                    </h2>
                    <p className="text-gray-500 mt-2">
                        {mode === "signup"
                            ? "Join the community by creating an account"
                            : "Log in to access your account"}
                    </p>
                </div>

                {/* Role Switch */}
                <div className="flex justify-center mb-6">
                    <button
                        onClick={() => handleRoleSwitch("Tenant")}
                        className={`px-6 py-2 cursor-pointer rounded-tl-xl rounded-bl-xl font-medium transition ${
                            role === "Tenant"
                                ? "bg-green-600 text-white shadow-md"
                                : "bg-gray-100 text-gray-700"
                        }`}
                    >
                        Tenant
                    </button>
                    <button
                        onClick={() => handleRoleSwitch("Landlord")}
                        className={`px-6 py-2 cursor-pointer rounded-tr-xl rounded-br-xl font-medium transition ${
                            role === "Landlord"
                                ? "bg-green-600 text-white shadow-md"
                                : "bg-gray-100 text-gray-700"
                        }`}
                    >
                        Landlord
                    </button>
                </div>
                  
                {/* Mode Switch (Login / Signup) */}
                <div className="flex w-full justify-center mb-6">
                    <button
                        onClick={() => setMode("login")}
                        className={`px-6 py-2 w-1/2 cursor-pointer rounded-tl-xl rounded-bl-xl font-medium transition ${
                            mode === "login"
                                ? "bg-green-600 text-white shadow-lg"
                                : "bg-gray-100 text-gray-600"
                        }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setMode("signup")}
                        className={`px-6 py-2 w-1/2 cursor-pointer rounded-tr-xl rounded-br-xl font-medium transition ${
                            mode === "signup"
                                ? "bg-green-600 text-white shadow-lg"
                                : "bg-gray-100 text-gray-600"
                        }`}
                    >
                        Sign Up
                    </button>
                </div>
                  
                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5 min-h-3xl max-h-xl">
                    {mode === "signup" && (
                        <div className="grid grid-cols-2 ">
                            <div>
                                <label className="block text-gray-700 font-medium">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                    className="w-2xs  px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-2xs  px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                                    placeholder="Enter phone number"
                                />
                            </div>
                        </div>
                    )}
                <div className={mode === "signup" ? "grid grid-cols-2" : "flex flex-col gap-5"}>
                    <div>
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className={mode === "signup" ? "w-2xs px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 outline-none" : "w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"}
                            placeholder="Enter your email"
                        />
                    </div>
                
                    <div>
                        <label className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className={mode === "signup" ? "w-2xs px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 outline-none" : "w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"}
                            placeholder="Enter your password"
                        />
                    </div>
                </div>
                  <button
                        type="submit"
                        className="w-full bg-green-600 cursor-pointer hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition transform hover:scale-[1.02]"
                  >
                        {mode === "signup"
                            ? `Sign Up as ${role}`
                            : `Login as ${role}`}
                  </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-grow h-px bg-gray-300"></div>
                    <span className="px-3 text-gray-500 text-sm">or</span>
                    <div className="flex-grow h-px bg-gray-300"></div>
                </div>

                {/* Social Logins */}
                <div className="flex justify-center items-center space-x-4">
                    <button className="flex items-center cursor-pointer justify-center w-65 space-x-2 border border-gray-400 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
                        <img
                            src="https://www.svgrepo.com/show/355037/google.svg"
                            alt="Google"
                            className="w-8"
                        />
                        <span className="text-xl font-semibold">{mode === "signup" ? "SignUp" : "Login"} with Google</span>
                    </button>
                </div>

                {/* Footer */}
                <p className="text-center mt-6 text-gray-600">
                    {mode === "signup" ? (
                        <>
                            Already have an account?{" "}
                            <span
                                onClick={() => setMode("login")}
                                className="text-green-600 cursor-pointer font-semibold hover:underline"
                            >
                                Log In
                            </span>
                        </>
                    ) : (
                        <>
                            Don’t have an account?{" "}
                            <span
                                onClick={() => setMode("signup")}
                                className="text-green-600 font-semibold hover:underline cursor-pointer"
                            >
                                Sign Up
                            </span>
                        </>
                    )}
                </p>
            </div>

            {/* Left Section */}
            <div>
                <img className="w-3xs rounded-3xl" src="/DemoLogo.jpeg" alt="" />
            </div>
        </div>
    );
};

export default LoginSignupPage;
