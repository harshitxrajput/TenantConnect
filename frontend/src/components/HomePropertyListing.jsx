import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePropertyListing = ({ property }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/property/${property.id}`)}
            className="cursor-pointer flex-shrink-0 w-52 sm:w-60 md:w-72 lg:w-80 xl:w-96 rounded-xl shadow-md hover:shadow-xl transition bg-white overflow-hidden"
        >
            {/* Image */}
            <img
                src={property.image}
                alt={property.title}
                className="w-full h-36 sm:h-44 md:h-48 lg:h-56 xl:h-64 object-cover rounded-t-xl"
            />

            {/* Content */}
            <div className="p-3 flex flex-col justify-between">
                <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold truncate">{property.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500 truncate">{property.location}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mt-1 text-xs sm:text-sm text-gray-700">
                    <span className="flex items-center gap-1">🛏 {property.beds}</span>
                    <span className="flex items-center gap-1">🛁 {property.baths}</span>
                    <span className="font-semibold text-green-700">{property.price}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-1">
                    {property.tags.map((tag, i) => (
                        <span
                            key={i}
                            className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-lg"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center mt-2">
                    <a
                        href="#"
                        className="text-green-600 text-xs sm:text-sm font-medium hover:underline"
                    >
                        View details
                    </a>
                    <button className="hidden sm:block bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-xs sm:text-sm font-medium transition">
                        Book
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomePropertyListing;
