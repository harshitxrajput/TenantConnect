import propertyModel from '../models/property.model.js';
import tenantModel from '../models/tenant.model.js';

//Public Property Controllers
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

//Landlord Specific Property Controllers
export const createLandlordPropertyController = async (req, res) => {
    try{
        const landlordId = req.user?._id;

        const {
            title,
            description,
            type,
            address,
            location,
            size,
            bedrooms,
            bathrooms,
            amenities,
            rentAmount,
            securityDeposit,
            paymentCycle,
            propertyDocuments,
        } = req.body;

        const newProperty = await propertyModel.create({
            landlord: landlordId,
            title: title,
            description: description,
            type: type,
            address: {
                street: address.street,
                city: address.city,
                state: address.state,
                pincode: address.pincode,
                country: address.country || "India"
            },
            location: location,
            size: size,
            bedrooms: bedrooms,
            bathrooms: bathrooms,
            amenities: amenities,
            rentAmount: rentAmount,
            securityDeposit: securityDeposit,
            paymentCycle: paymentCycle,
            propertyDocuments: propertyDocuments,
        });

        return res.status(201).json({ success: true, message: "Property added successfully", newProperty: newProperty });
    }
    catch(err){
        console.log("Error in addPropertyController: ", err.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const getLandlordPropertiesController = async (req, res) => {
    try{
        const landlordId = req.user?._id;

        const properties = await propertyModel.find({ landlord: landlordId })
            .populate("tenants", "name email phone")
            .populate("reviews");

        if(properties.length === 0){
            return res.status(200).json({
                success: true,
                message: "No properties found for this landlord",
                properties: properties
            });
        }

        return res.status(200).json({ success: true, count: properties.length, properties: properties });
    }
    catch(err){
        console.log("Error in getLandlordPropertiesController: ", err.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const getLandlordPropertyByIdController = async (req, res) => {
    try{
        const landlordId = req.user?._id;
        const { id } = req.params;

        const property = await propertyModel.findOne({ landlord: landlordId, _id: id })
            .populate("tenants", "name email phone")
            .populate("reviews");

        if(!property){
            return res.status(404).json({ success: false, message: "Property not found" });
        }

        res.status(200).json({ success: true, property: property });
    }
    catch(err){
        console.log("Error in getLandlordPropertyByIdController: ", err.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const updateLandlordPropertyController = async (req, res) => {
    try{
        const landlordId = req.user?._id;
        const { id } = req.params;

        const property = await propertyModel.findOne({ landlord: landlordId, _id: id });
        if(!property){
            return res.status(404).json({ success: false, message: "Property not found" });
        }

        const updateData = {};
        for (const key in req.body) {
            if (typeof req.body[key] === "object" && !Array.isArray(req.body[key])) {
                for(const nestedKey in req.body[key]){
                    updateData[`${key}.${nestedKey}`] = req.body[key][nestedKey];
                }
            }
            else{
                updateData[key] = req.body[key];
            }
        }

        const updatedProperty = await propertyModel.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true });

        res.status(200).json({ success: true, message: "Property updated successfully", property: updatedProperty });
    }
    catch(err){
        console.log("Error in updateLandlordPropertyController: ", err.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const deleteLandlordPropertyController = async (req, res) => {
    try{
        const landlordId = req.user?._id;
        const { id } = req.params;

        const property = await propertyModel.findOne({ landlord: landlordId, _id: id });
        if(!property){
            return res.status(404).json({ success: false, message: "Property not found" });
        }

        await propertyModel.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Property deleted successfully" });
    }
    catch(err){
        console.log("Error in deleteLandlordPropertyController: ", err.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

//Tenant Specific Property Controllers
export const getTenantFavouritesController = async (req, res) => {
    try{
        const tenantId = req.user?._id;

        const tenant = await tenantModel.findById(tenantId).populate("favourites");
        if(!tenant){
            return res.status(404).json({ success: false, message: "Tenant not found" });
        }

        return res.status(200).json({ success: true, favourites: tenant.favourites });
    }
    catch(err){
        console.log("Error in getTenantFavouritesController: ", err.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const 