import propertyModel from '../models/property.model.js';

export const getAvailablePropertiesController = async (req, res) => {
    try{
        const {
            type, city, state,
            minRent, maxRent,
            minSize, maxSize,
            bedrooms, bathrooms,
            amenities, sortBy,
            order, page = 1, limit = 10,
        } = req.query;

        const filter = { availabilityStatus: "Available", isBlocked: false };

        if(type) filter.type = type;
        if(city) filter["address.city"] = { $regex: "city", options: "i" };
        if(state) filter["address.state"] = { $regex: "state", options: "i" };
        if(minRent || maxRent){
           filter.rentAmount = {};
           if(minRent) filter.rentAmount.$gte = Number(minRent);
           if(maxRent) filter.rentAmount.$lte = Number(maxRent);
        }
        if(minSize || maxSize){
           filter.size = {};
           if (minSize) filter.size.$gte = Number(minSize);
           if (maxSize) filter.size.$lte = Number(maxSize);
        }
        if (bedrooms) filter.bedrooms = { $gte: Number(bedrooms) };
        if (bathrooms) filter.bathrooms = { $gte: Number(bathrooms) };
        if (amenities) {
          const amenitiesArray = amenities.split(",");
          filter.amenities = { $all: amenitiesArray };
        }


        let sortOption = {};
        if (sortBy) {
          sortOption[sortBy] = order === "desc" ? -1 : 1;
        } else {
          sortOption = { listedDate: -1 };
        }

        // Pagination
        const skip = (Number(page) - 1) * Number(limit);

        const properties = await propertyModel.find(filter)
            .populate("landlord", "name email phone")
            .sort(sortOption)
            .skip(skip)
            .limit(Number(limit));

        const total = await propertyModel.countDocuments(filter);

        res.status(200).json({
            success: true,
            count: properties.length,
            total: total,
            page: Number(page),
            totalPages: Math.ceil(total / limit),
            properties: properties,
        });
    }
    catch(err){
        console.log("Error in getAvailablePropertiesController: ", err.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const getPropertyByIdController = async (req, res) => {
    try{
        const { id } = req.params;

        const property = await propertyModel.findById(id)
            .populate("landlord", "name email phone");

        if(!property){
            return res.status(404).json({ success: false, message: "Property not found" });
        }

        res.status(200).json({ success: true, property: property });
    }
    catch(err){
        console.log("Error in getPropertyByIdController: ", err.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}