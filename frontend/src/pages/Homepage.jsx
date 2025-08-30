import { Search, LogIn, Plus } from "lucide-react";
import { IoIosChatbubbles } from "react-icons/io";
import { IoNotifications, IoSearch } from "react-icons/io5";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import HomePropertyListing from "../components/HomePropertyListing.jsx";
import HomeLandlordTenant from '../components/HomeLandlordTenant.jsx';
import { landlords, tenants } from "../constants/HomePage.js";
import { TbLogout } from "react-icons/tb";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../lib/Api.js";
import { toast } from "react-toastify";
import useAuthStore from "../store/useAuthStore.js";

const properties = [
    {
        id: 1,
        title: "Cozy Studio in City Center",
        location: "San Francisco, CA",
        price: "$145/night",
        beds: 1,
        baths: 1,
        tags: ["studio", "city", "wifi"],
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800"
    },
    {
        id: 2,
        title: "Bright 2BR Near Park",
        location: "Portland, OR",
        price: "$180/night",
        beds: 2,
        baths: 1,
        tags: ["family", "park", "pet-friendly"],
        image: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=800"
    },
    {
        id: 3,
        title: "Modern Loft with Views",
        location: "Austin, TX",
        price: "$220/night",
        beds: 1,
        baths: 1,
        tags: ["loft", "views", "parking"],
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb512?w=800"
    }
];

const Homepage = () => {
    const { isLoading, authUser } = useAuthStore();
    const navigate = useNavigate();

    const { mutate:logoutMutation } = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            toast.success("Logout successfully");
            navigate("/signup");
        }
    })

    const [query, setQuery] = useState("");

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* Header */}
            <header className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
                <div onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer select-none">
                    <img className="w-10 rounded-lg" src="/DemoLogo.jpeg" alt="" />
                    <span className="font-bold text-xl">TenantConnect</span>
                </div>

                {/* Search Bar */}
                <div className="w-3xl mx-auto">
                    <div className="flex items-center bg-white rounded-full shadow-md border border-gray-200 px-4 py-2">
                        <Search className="text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for valuable and affordable properties"
                            className="flex-1 px-3 py-2 outline-none bg-transparent text-gray-700"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {authUser && (
                        <div className="flex items-center gap-4">
                            {/* Search Button */}
                            <button
                                onClick={() => navigate('/search')}
                                className="flex cursor-pointer gap-1 items-center text-gray-700 hover:text-green-600 transition text-lg font-semibold"
                            >
                                <IoSearch className="text-3xl" />
                            </button>

                            {/* Chat Button */}
                            <button
                                onClick={() => navigate('/chat')}
                                className="flex cursor-pointer gap-1 items-center text-gray-700 hover:text-green-600 transition text-lg font-semibold"
                            >
                                <IoIosChatbubbles className="text-3xl" />
                            </button>

                            {/* Notification Button */}
                            <button
                                onClick={() => navigate('/notifications')}
                                className="flex cursor-pointer gap-1 items-center text-gray-700 hover:text-green-600 transition text-lg font-semibold"
                            >
                                <IoNotifications className="text-3xl" />
                            </button>
                    
                            {/* Profile Button */}
                            <button
                                onClick={() => navigate('/profile')}
                                className="flex cursor-pointer gap-1 items-center text-gray-700 hover:text-green-600 transition text-lg font-semibold"
                            >
                                <img className="w-12 rounded-full" src="/DemoLogo.jpeg" alt="profile" />
                            </button>
                            
                            {/* Logout Button */}
                            <button
                                onClick={() => logoutMutation()}
                                className="flex cursor-pointer gap-1 items-center text-gray-700 hover:text-green-600 transition text-lg font-semibold"
                            >
                                <TbLogout className="text-3xl" />
                            </button>
                        </div>
                    )}

                    {!authUser && (
                        <div className="flex gap-5">
                            <button
                                onClick={() => navigate('/login')}
                                className="flex bg-gray-100 px-3 rounded-lg cursor-pointer gap-1 items-center text-gray-700 hover:bg-gray-300 transition text-lg font-semibold"
                            >
                                <LogIn size={20} /> Log in
                            </button>
                            <button
                                onClick={() => navigate('/signup')}
                                className="flex cursor-pointer gap-1 items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-lg font-semibold"
                            >
                                <Plus size={20} /> Sign up
                            </button>
                        </div>
                    )}
                </div>
            </header>

            {/* Main Section */}
            <main className="px-8 py-10 pt-5">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">Discover places to rent</h1>
                    <button className="text-lg bg-green-600 rounded-lg px-2 py-1 text-white font-semibold cursor-pointer">View more</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.map((property) => (
                        <div
                            key={property.id}
                            className="rounded-2xl shadow-md hover:shadow-lg transition bg-white overflow-hidden"
                        >
                            <HomePropertyListing property={property} />
                        </div>
                    ))}
                </div>

                <div className="w-full border-t mt-8 mb-8 border-gray-300"></div>

                {/* Landlords Section */}
                <section className="bg-gray-50">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold">Meet Our Landlords</h2>
                        <button className="text-lg bg-green-600 rounded-lg px-2 py-1 text-white font-semibold cursor-pointer">View more</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {landlords.map((landlord) => (
                            <HomeLandlordTenant key={landlord.id} user={landlord} type="landlord" />
                        ))}
                    </div>
                </section>

                <div className="w-full border-t mt-8 mb-8 border-gray-300"></div>
                
                {/* Tenants Section */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold">Active Tenants</h2>
                        <button className="text-lg bg-green-600 rounded-lg px-2 py-1 text-white font-semibold cursor-pointer">View more</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tenants.map((tenant) => (
                            <HomeLandlordTenant key={tenant.id} user={tenant} type="tenant"/>
                        ))}
                    </div>
                </section>

                <div className="w-full border-t mt-8 mb-8 border-gray-300"></div>
                            
                {/* Section 4 - Testimonials */}
                <section className="px-8 py-16 bg-white">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Our Users Say</h2>
                    <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                        <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition">
                            <p className="text-gray-600 mb-4">
                                "This platform made finding a home so easy! I connected with a great landlord within a week."
                            </p>
                            <h3 className="font-semibold text-gray-800">– Riya Sharma, Tenant</h3>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition">
                            <p className="text-gray-600 mb-4">
                                "As a landlord, I was able to list my property and find reliable tenants quickly. Love it!"
                            </p>
                            <h3 className="font-semibold text-gray-800">– Arjun Mehta, Landlord</h3>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition">
                            <p className="text-gray-600 mb-4">
                                "The roommate finder helped me find someone super compatible. Highly recommend!"
                            </p>
                            <h3 className="font-semibold text-gray-800">– Priya Singh, Roommate</h3>
                        </div>
                    </div>
                </section>
            </main>

            {/* Section 5 - Social Media / Community */}
            <footer className="px-8 py-16 bg-gray-900 text-center text-white">
                <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
                <p className="text-lg text-gray-300 mb-10">
                    Stay updated with the latest rental tips, housing trends, and community news.  
                    Follow us on social media and become part of our growing family.
                </p>
                <div className="flex justify-center gap-6">
                    <a href="#" className="text-gray-300 hover:text-white transition">
                        <FaFacebook size={30} />
                    </a>
                    <a href="#" className="text-gray-300 hover:text-white transition">
                        <FaInstagram size={30} />
                    </a>
                    <a href="#" className="text-gray-300 hover:text-white transition">
                        <FaTwitter size={30} />
                    </a>
                    <a href="#" className="text-gray-300 hover:text-white transition">
                        <FaLinkedin size={30} />
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default Homepage;
