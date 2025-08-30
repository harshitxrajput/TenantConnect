import React, { useState } from "react";
import { Search, Home, Users, Building2, LogIn, Plus } from "lucide-react";
import useAuthUser from "../hooks/useAuthUser";
import { useNavigate } from "react-router-dom";
import { IoNotifications, IoSearch } from "react-icons/io5";
import { IoIosChatbubbles } from "react-icons/io";
import { logoutUser } from "../lib/Api";
import { useMutation } from "@tanstack/react-query";
import { TbLogout } from "react-icons/tb";

const SearchPage = () => {
    const { isLoading, authUser } = useAuthUser();
    const navigate = useNavigate();

    const { mutate:logoutMutation } = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            toast.success("Logout successfully");
            navigate("/signup");
        }
    })

    const [selected, setSelected] = useState("properties");
    const [query, setQuery] = useState("");

    const renderFeed = () => {
        switch (selected) {
            case "properties":
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        {[1, 2, 3, 4, 5, 6].map((id) => (
                            <div key={id} className="p-4 rounded-2xl shadow-md border border-gray-200 bg-white hover:shadow-lg transition">
                                <img
                                    src={`https://source.unsplash.com/400x250/?apartment,house&sig=${id}`}
                                    alt="property"
                                    className="rounded-xl mb-3 w-full h-40 object-cover"
                                />
                                <h2 className="font-semibold text-lg text-gray-800">Modern Apartment #{id}</h2>
                                <p className="text-sm text-gray-500">2BHK • New York City</p>
                                <p className="font-bold text-green-600 mt-1">$1200/month</p>
                            </div>
                        ))}
                    </div>
                );
            case "landlords":
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        {[1, 2, 3].map((id) => (
                            <div key={id} className="p-4 rounded-2xl shadow-md border border-gray-200 bg-white hover:shadow-lg transition flex flex-col items-center">
                                <img
                                    src={`https://i.pravatar.cc/150?img=${id}`}
                                    alt="landlord"
                                    className="w-20 h-20 rounded-full mb-3"
                                />
                                <h2 className="font-semibold text-lg text-gray-800">John Doe #{id}</h2>
                                <p className="text-sm text-gray-500">Verified Landlord • 10 properties</p>
                            </div>
                        ))}
                    </div>
                );
            case "roommates":
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        {[1, 2, 3, 4].map((id) => (
                            <div key={id} className="p-4 rounded-2xl shadow-md border border-gray-200 bg-white hover:shadow-lg transition flex flex-col items-center">
                                <img
                                    src={`https://i.pravatar.cc/150?img=${id + 5}`}
                                    alt="roommate"
                                    className="w-20 h-20 rounded-full mb-3"
                                />
                                <h2 className="font-semibold text-lg text-gray-800">Alex Smith #{id}</h2>
                                <p className="text-sm text-gray-500">Looking for: 2BHK near NYC</p>
                            </div>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
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
                            placeholder="Search for properties, landlords, roommates..."
                            className="flex-1 px-3 py-2 outline-none bg-transparent text-gray-700"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {authUser && (
                        <div className="flex items-center gap-4">
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

            {/* Toggle Buttons */}
            <div className="flex justify-center gap-4 mb-6 mt-4">
                <button
                    onClick={() => setSelected("properties")}
                    className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition ${selected === "properties" ? "bg-green-600 text-white shadow-md" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"}`}
                >
                    <Home size={18} /> Properties
                </button>
                <button
                    onClick={() => setSelected("landlords")}
                    className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition ${selected === "landlords" ? "bg-green-600 text-white shadow-md" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"}`}
                >
                    <Building2 size={18} /> Landlords
                </button>
                <button
                    onClick={() => setSelected("roommates")}
                    className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition ${selected === "roommates" ? "bg-green-600 text-white shadow-md" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"}`}
                >
                    <Users size={18} /> Roommates
                </button>
            </div>

            {/* Feed */}
            <div className="max-w-6xl mx-auto">
                {renderFeed()}
            </div>
        </div>
    );
};

export default SearchPage;