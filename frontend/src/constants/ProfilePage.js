export const landlordAvatar = "https://randomuser.me/api/portraits/women/44.jpg";
export const tenantAvatar = "https://randomuser.me/api/portraits/men/32.jpg";
export const property1 = "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=800";
export const property2 = "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800";
export const property3 = "https://images.unsplash.com/photo-1505691938895-1758d7feb512?w=800";

export const landlordData = {
    id: "1",
    name: "Sarah Johnson",
    type: "landlord",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "Downtown Seattle, WA",
    avatar: landlordAvatar,
    rating: 4.8,
    bio: "Experienced property manager with over 8 years in the real estate industry. Committed to providing quality housing solutions."
};

export const tenantData = {
    id: "2",
    name: "Alex Chen",
    type: "tenant",
    email: "alex.chen@email.com",
    phone: "+1 (555) 987-6543",
    location: "Capitol Hill, Seattle, WA",
    avatar: tenantAvatar,
    rating: 4.5,
    bio: "Software engineer looking for modern living spaces and great roommate connections in the city."
};

export const properties = [
    {
        id: "1",
        title: "Modern Downtown Apartment",
        image: property1,
        price: "$2,800/month",
        location: "Downtown Seattle",
        type: "2BR/2BA"
    },
    {
        id: "2",
        title: "Cozy Family House",
        image: property2,
        price: "$3,500/month",
        location: "Queen Anne",
        type: "3BR/2BA"
    },
    {
        id: "3",
        title: "Stylish Studio",
        image: property3,
        price: "$1,800/month",
        location: "Capitol Hill",
        type: "Studio"
    }
];