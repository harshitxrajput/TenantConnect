import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import HomePropertyListing from "../components/HomePropertyListing.jsx";
import HomeLandlordTenant from "../components/HomeLandlordTenant.jsx";
import { landlords, tenants } from "../constants/HomePage.js";

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
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            <Navbar />

            <main className="pt-24 px-4 sm:px-8 lg:px-16">

                {/* Discover Section */}
                <div className="flex items-center justify-between mb-4 mt-3 sm:mb-6">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Discover Places to Rent</h1>
                    <button className="bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm xl:text-xl font-medium px-2 sm:px-3 py-1 rounded-lg transition">
                        View More
                    </button>
                </div>

                <div className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-8 xl:gap-8 lg:h-110 overflow-x-auto scrollbar-hide py-2">
                    {properties.map((property) => (
                        <div
                            key={property.id}
                            className="flex-shrink-0 w-52 sm:w-60 md:w-72 lg:w-80 xl:w-96 h-68 sm:h-80 md:h-88 lg:h-96 xl:h-100 rounded-xl shadow-md hover:shadow-xl transition bg-white relative"
                        >
                            <HomePropertyListing
                                property={property}
                                hideBookButtonOnMobile={true} // prop to hide Book button on small screens
                            />
                        </div>
                    ))}
                </div>

                <hr className="border-gray-300 my-8" />

                {/* Landlords Section */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">Meet Our Landlords</h2>
                    <button className="bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base xl:text-xl font-medium px-3 py-1 rounded-lg transition">
                        View More
                    </button>
                </div>
                <div className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide py-2">
                    {landlords.map((landlord) => (
                        <div key={landlord.id} className="flex-shrink-0 w-52 sm:w-60 md:w-64 lg:w-md rounded-xl shadow-md hover:shadow-xl transition bg-white">
                            <HomeLandlordTenant user={landlord} type="landlord" />
                        </div>
                    ))}
                </div>

                <hr className="border-gray-300 my-8" />

                {/* Tenants Section */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">Active Tenants</h2>
                    <button className="bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base xl:text-xl font-medium px-3 py-1 rounded-lg transition">
                        View More
                    </button>
                </div>
                <div className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide py-2">
                    {tenants.map((tenant) => (
                        <div key={tenant.id} className="flex-shrink-0 w-52 sm:w-60 md:w-64 rounded-xl shadow-md hover:shadow-xl transition bg-white">
                            <HomeLandlordTenant user={tenant} type="tenant" />
                        </div>
                    ))}
                </div>

                <hr className="border-gray-300 my-8" />

                {/* Testimonials */}
                <section className="py-12 px-2 sm:px-8 bg-white">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 sm:mb-12">
                        What Our Users Say
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
                        <div className="bg-gray-50 p-4 sm:p-6 rounded-xl shadow-md hover:shadow-xl transition">
                            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                                "This platform made finding a home so easy! I connected with a great landlord within a week."
                            </p>
                            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">– Riya Sharma, Tenant</h3>
                        </div>
                        <div className="bg-gray-50 p-4 sm:p-6 rounded-xl shadow-md hover:shadow-xl transition">
                            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                                "As a landlord, I was able to list my property and find reliable tenants quickly. Love it!"
                            </p>
                            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">– Arjun Mehta, Landlord</h3>
                        </div>
                        <div className="bg-gray-50 p-4 sm:p-6 rounded-xl shadow-md hover:shadow-xl transition">
                            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                                "The roommate finder helped me find someone super compatible. Highly recommend!"
                            </p>
                            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">– Priya Singh, Roommate</h3>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="px-4 sm:px-8 py-12 bg-gray-900 text-center text-white">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Join Our Community</h2>
                <p className="text-sm sm:text-base text-gray-300 mb-6 sm:mb-10 max-w-2xl mx-auto">
                    Stay updated with the latest rental tips, housing trends, and community news. Follow us on social media and become part of our growing family.
                </p>
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                    <a href="#" className="text-gray-300 hover:text-white transition"><FaFacebook size={28} /></a>
                    <a href="#" className="text-gray-300 hover:text-white transition"><FaInstagram size={28} /></a>
                    <a href="#" className="text-gray-300 hover:text-white transition"><FaTwitter size={28} /></a>
                    <a href="#" className="text-gray-300 hover:text-white transition"><FaLinkedin size={28} /></a>
                </div>
            </footer>

            {/* Tailwind class to hide scrollbar */}
            <style>
                {`
                    .scrollbar-hide::-webkit-scrollbar { display: none; }
                    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                `}
            </style>
        </div>
    );
};

export default Homepage;