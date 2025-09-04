import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { getAuthUser, landlordLogin, landlordSignup, tenantLogin, tenantSignup } from "../../lib/Api";
import { toast } from "react-toastify";
import useAuthUser from "../../hooks/useAuthUser";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const LoginSignupPage = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const setAuthUser = useAuthStore((state) => state.setAuthUser);

    //Landlord Mutations
    const { mutate:landlordSignupMutation, isPending:landlordSignupLoading } = useMutation({
        mutationFn: landlordSignup,
        onSuccess: async () => {
            const profile = await getAuthUser(); // fetch user data
            setAuthUser(profile);
            toast.success("Signed Up Successfully");
            navigate('/');
        },
        onError: (err) => toast.error(err.message || "Signup Failed")
    });
    const { mutate:landlordLoginMutation, isPending:landlordLoginLoading } = useMutation({
        mutationFn: landlordLogin,
        onSuccess: async () => {
            const profile = await getAuthUser(); // fetch user data
            setAuthUser(profile);
            toast.success("Logged in Successfully");
            navigate('/');
        },
        onError: (err) => toast.error(err.message || "Login Failed")
    });

    //Tenant Mutations
    const { mutate:tenantSignupMutation, isPending:tenantSignupLoading } = useMutation({
        mutationFn: tenantSignup,
        onSuccess: async () => {
            const profile = await getAuthUser(); // fetch user data
            setAuthUser(profile);
            toast.success("Signed up Successfully");
            navigate('/');
        },
        onError: (err) => toast.error(err.message || "Signup Failed")
    });
    const { mutate:tenantLoginMutation, isPending:tenantLoginLoading } = useMutation({
        mutationFn: tenantLogin,
        onSuccess: async () => {
            const profile = await getAuthUser(); // fetch user data
            setAuthUser(profile);
            toast.success("Logged in Successfully");
            navigate('/');
        },
        onError: (err) => toast.error(err.message || "Login Failed")
    })

    const [role, setRole] = useState("Tenant"); // Tenant | Landlord
    const [mode, setMode] = useState("signup"); // signup | login
    const [formData, setFormData] = useState({
        name: "",
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
        
        if(mode === "signup" && role === "Tenant"){
            tenantSignupMutation(formData);
        }
        else if(mode === "login" && role === "Tenant"){
            tenantLoginMutation({ email: formData.email, password: formData.password });
        }
        else if(mode === "signup" && role === "Landlord"){
            landlordSignupMutation(formData);
        }
        else{
            landlordLoginMutation({ email: formData.email, password: formData.password });
        }
    };

    const isLoading = landlordSignupLoading || landlordLoginLoading || tenantSignupLoading || tenantLoginLoading;

    return (
        <div className="flex flex-col-reverse md:flex-row gap-10 justify-center items-center min-h-screen w-screen bg-gradient-to-br from-green-100 via-white to-green-200 px-4 sm:px-6 lg:px-12 py-8">

            {/* Right Section - Form Card */}
            <div className="bg-white shadow-2xl rounded-3xl p-6 sm:p-8 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl relative overflow-hidden flex-shrink">

                {/* Header */}
                <div className="text-center mb-6 sm:mb-8">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-green-700">
                        {mode === "signup" ? "Create Account" : "Welcome Back"}
                    </h2>
                    <p className="text-gray-500 mt-2 text-sm sm:text-base">
                        {mode === "signup"
                            ? "Join the community by creating an account"
                            : "Log in to access your account"}
                    </p>
                </div>
                        
                {/* Role Switch */}
                <div className="flex justify-center mb-4 sm:mb-6 space-x-2 sm:space-x-4">
                    <button
                        onClick={() => handleRoleSwitch("Tenant")}
                        className={`flex-1 px-4 sm:px-6 py-2 cursor-pointer rounded-l-xl font-medium transition ${
                            role === "Tenant"
                                ? "bg-green-600 text-white shadow-md"
                                : "bg-gray-100 text-gray-700"
                        }`}
                    >
                        Tenant
                    </button>
                    <button
                        onClick={() => handleRoleSwitch("Landlord")}
                        className={`flex-1 px-4 sm:px-6 py-2 cursor-pointer rounded-r-xl font-medium transition ${
                            role === "Landlord"
                                ? "bg-green-600 text-white shadow-md"
                                : "bg-gray-100 text-gray-700"
                        }`}
                    >
                        Landlord
                    </button>
                </div>
                    
                {/* Mode Switch */}
                <div className="flex w-full justify-center mb-4 sm:mb-6">
                    <button
                        onClick={() => setMode("login")}
                        className={`w-1/2 px-4 sm:px-6 py-2 cursor-pointer rounded-l-xl font-medium transition ${
                            mode === "login"
                                ? "bg-green-600 text-white shadow-lg"
                                : "bg-gray-100 text-gray-600"
                        }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setMode("signup")}
                        className={`w-1/2 px-4 sm:px-6 py-2 cursor-pointer rounded-r-xl font-medium transition ${
                            mode === "signup"
                                ? "bg-green-600 text-white shadow-lg"
                                : "bg-gray-100 text-gray-600"
                        }`}
                    >
                        Sign Up
                    </button>
                </div>
                    
                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    {mode === "signup" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div>
                                <label className="block text-gray-700 font-medium text-sm sm:text-base">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 outline-none transition"
                                    placeholder="Enter your full name"
                                />
                            </div>
                    
                            <div>
                                <label className="block text-gray-700 font-medium text-sm sm:text-base">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 outline-none transition"
                                    placeholder="Enter phone number"
                                />
                            </div>
                        </div>
                    )}

                    <div className={mode === "signup" ? "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6" : "flex flex-col gap-4 sm:gap-5"}>
                        <div>
                            <label className="block text-gray-700 font-medium text-sm sm:text-base">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 outline-none transition"
                                placeholder="Enter your email"
                            />
                        </div>
                
                        <div>
                            <label className="block text-gray-700 font-medium text-sm sm:text-base">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 outline-none transition"
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>
                
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center items-center bg-green-600 cursor-pointer hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Processing...
                            </span>
                        ) : mode === "signup" ? (
                            `Sign Up as ${role}`
                        ) : (
                            `Login as ${role}`
                        )}
                    </button>
                </form>
                    
                {/* Divider */}
                <div className="flex items-center my-4 sm:my-6">
                    <div className="flex-grow h-px bg-gray-300"></div>
                    <span className="px-3 text-gray-500 text-sm sm:text-base">or</span>
                    <div className="flex-grow h-px bg-gray-300"></div>
                </div>
                    
                {/* Social Logins */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
                    <button className="flex items-center justify-center w-full sm:w-65 space-x-2 border border-gray-400 px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-50 transition">
                        <img
                            src="https://www.svgrepo.com/show/355037/google.svg"
                            alt="Google"
                            className="w-6 sm:w-8"
                        />
                        <span className="text-sm sm:text-lg font-semibold">{mode === "signup" ? "SignUp" : "Login"} with Google</span>
                    </button>
                </div>
                    
                {/* Footer */}
                <p className="text-center select-none mt-4 sm:mt-6 text-gray-600 text-sm sm:text-base">
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
                
            {/* Left Section - Image */}
            <div className="hidden md:block flex-shrink-0 ml-10">
                <img className="w-64 sm:w-72 md:w-80 rounded-3xl object-cover" src="/DemoLogo.jpeg" alt="Demo Logo" />
            </div>
        </div>

    );
};

export default LoginSignupPage;
