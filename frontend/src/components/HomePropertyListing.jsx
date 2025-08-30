import React from 'react'

const HomePropertyListing = ({property}) => {
    return (
        <div className='cursor-pointer'>
            <img
                src={property.image}
                alt={property.title}
                className="rounded-t-2xl h-48 w-full object-cover"
            />
                <div className="p-4">
                    <h2 className="font-semibold text-lg">{property.title}</h2>
                    <p className="text-sm text-gray-500">{property.location}</p>

                <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-700 text-sm">
                        {property.beds} beds · {property.baths} baths
                    </span>
                    <span className="font-semibold text-green-700">{property.price}</span>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                    {property.tags.map((tag, i) => (
                        <span
                            key={i}
                            className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-lg"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex justify-between items-center mt-4">
                    <a
                        href="#"
                        className="text-green-600 text-sm font-medium hover:underline"
                    >
                        View details
                    </a>
                    <button className="bg-green-600 cursor-pointer hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                        Book
                    </button>
                </div>
            </div>
        </div>
  )
}

export default HomePropertyListing
