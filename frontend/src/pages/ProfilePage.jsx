import { useState } from "react";
import { Mail, Phone, MapPin, Star, Edit, Building, Users, Heart, Home, UserPlus, Plus } from "lucide-react";
import { IoIosChatbubbles } from "react-icons/io";
import { IoNotifications, IoSearch } from "react-icons/io5";

import Navbar from '../components/Navbar.jsx';

import useAuthUser from '../hooks/useAuthUser.js';
import { tenantData, landlordData, properties } from '../constants/ProfilePage.js';
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore.js";


const ProfilePage = () => {
    const authUser = useAuthStore((state) => state.authUser);
    console.log(authUser);
    const navigate = useNavigate();

    const [currentUser] = useState(tenantData); // Switch between landlordData and tenantData

    const stats = authUser.role === "landlord"
        ? { totalProperties: 12, totalTenants: 28, reviews: 45 }
        : { totalRentals: 3, reviews: 12, roommatesFound: 2 };

    const PropertyCard = ({ property }) => (
        <div className="p-4 rounded-2xl shadow-md hover:shadow-lg transition bg-white cursor-pointer">
            <div className="aspect-video rounded-xl overflow-hidden mb-3">
                <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>
            <h3 className="font-semibold mb-1">{property.title}</h3>
            <p className="text-sm text-gray-500 mb-2">{property.location}</p>
            <div className="flex justify-between items-center">
                <span className="text-green-700 font-semibold">{property.price}</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">{property.type}</span>
            </div>
        </div>
    );

    const StatCard = ({ icon: Icon, label, value }) => (
        <div className="p-6 w-50 bg-white rounded-xl shadow-sm text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
                <Icon className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-xl font-bold">{value}</div>
            <div className="text-sm text-gray-500">{label}</div>
        </div>
    );

    return (
        <div>
            <Navbar />

            <div className="min-h-screen mt-20 flex justify-center gap-10 bg-gray-50">
                {/* Left Section */}
                <div>
                    <div className="max-w-6xl mx-auto px-6 py-10">
                        {/* Profile Card */}
                        <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col md:flex-row items-start gap-6 mb-10">
                            <img
                                src={currentUser.avatar}
                                alt={currentUser.name}
                                className="w-28 h-28 cursor-pointer rounded-full ring-4 ring-green-200 object-cover"
                            />
                            <div className="flex-1">
                                <div className="flex flex-col md:flex-row justify-between mb-4">
                                    <div>
                                        <h2 className="text-2xl font-bold">{authUser.user.name}</h2>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm capitalize">
                                                {authUser.role}
                                            </span>
                                            <div className="flex items-center gap-1 text-yellow-500">
                                                <Star className="w-4 h-4 fill-yellow-400" />
                                                <span>{authUser.user.rating || 4.5}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="flex cursor-pointer items-center gap-2 px-4 h-10 bg-green-600 hover:bg-green-700 text-white rounded-lg transition mt-3 md:mt-0">
                                        <Edit size={16} /> Edit Profile
                                    </button>
                                </div>
                                <p className="text-gray-600 mb-4">{authUser.user.bio || 'Update profile to add bio'}</p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Mail size={16} className="text-green-600" /> {authUser.user.email}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone size={16} className="text-green-600" />+91 {authUser.user.phone}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} className="text-green-600" /> {authUser.user.address.country || "--"}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Properties Section */}
                        <div className="mb-12">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold">
                                    {authUser.role === "landlord" ? "Your Properties" : "Past Properties"}
                                </h3>
                                <button onClick={() => navigate(authUser.role === "landlord" ? "/property/add" : "/search")} className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition">
                                    <Plus size={16} />
                                    {authUser.role === "landlord" ? "Add Property" : "Find Properties"}
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {properties.map((property) => (
                                    <PropertyCard key={property.id} property={property} />
                                ))}
                            </div>
                        </div>

                        {/* Roommates Section (for tenants only) */}
                        {authUser.role === "tenant" && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-2xl font-bold">Potential Roommates</h3>
                                    <button className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition">
                                        <UserPlus size={16} /> Find Roommates
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[1, 2, 3].map((i) => (
                                        <div
                                            key={i}
                                            className="bg-white cursor-pointer p-6 rounded-xl shadow-md hover:shadow-lg transition text-center"
                                        >
                                            <img
                                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`}
                                                alt={`User ${i}`}
                                                className="w-16 h-16 mx-auto rounded-full mb-3"
                                            />
                                            <h4 className="font-semibold">User {i}</h4>
                                            <p className="text-sm text-gray-500 mb-2">
                                                Looking for roommate in Capitol Hill
                                            </p>
                                            <div className="flex items-center justify-center gap-1 text-yellow-500 mb-3">
                                                <Star className="w-4 h-4 fill-yellow-400" />
                                                <span>4.{i + 2}</span>
                                            </div>
                                            <button className="w-full cursor-pointer border border-green-600 text-green-600 hover:bg-green-50 py-2 rounded-lg transition">
                                                Connect
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Section */}
                <div className="pt-10">
                    {/* Stats Section */}
                    <div className="grid select-none cursor-pointer grid-cols-1 md:grid-cols-1 gap-6 mb-1">
                        {authUser.role === "landlord" ? (
                            <>
                                <StatCard icon={Building} label="Properties Listed" value={authUser.user.properties.length} />
                                <StatCard icon={Users} label="Total Tenants" value={stats.totalTenants} />
                                <StatCard icon={Star} label="Reviews" value={authUser.user.reviews.length} />
                                <StatCard icon={Heart} label="Avg Rating" value={currentUser.rating} />
                            </>
                        ) : (
                            <>
                                <StatCard icon={Home} label="Rentals" value={stats.totalRentals} />
                                <StatCard icon={UserPlus} label="Roommates Found" value={stats.roommatesFound} />
                                <StatCard icon={Star} label="Reviews" value={authUser.user.reviews.length} />
                                <StatCard icon={Heart} label="Rating" value={authUser.user.rating || 4.5} />
                            </>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProfilePage;