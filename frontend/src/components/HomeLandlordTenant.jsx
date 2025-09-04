// components/UserCard.jsx
import { MapPin, Home } from "lucide-react";

const HomeLandlordTenant = ({ user, type }) => {
    return (
        <div className="rounded-2xl cursor-pointer shadow-md h-full hover:shadow-lg transition bg-white overflow-hidden">
            <img
                src={user.image}
                alt={user.name}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-gray-600 flex items-center gap-1 text-sm">
                    <MapPin size={16} /> {user.location}
                </p>

                {type === "landlord" && (
                    <p className="mt-2 text-sm text-gray-700 flex items-center gap-1">
                        <Home size={16} /> {user.propertiesCount} Properties
                    </p>
                )}

                {type === "tenant" && (
                    <p className="mt-2 text-sm text-gray-700">
                        Looking for: <span className="font-medium">{user.lookingFor}</span>
                    </p>
                )}
            </div>
        </div>
  );
};

export default HomeLandlordTenant;
