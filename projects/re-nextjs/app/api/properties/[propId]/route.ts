//for handling fetching for single property page, the page's property and the side properties

//04.03
import { connectToDB } from "@utils/database";
import PropertyModel from "@models/propertyModel";

export const GET = async (request, {params}) => {

    try {
        await connectToDB();
        // console.log(params);

        const thisProperty = await PropertyModel.findById(params.propId).populate("property_userId");
    
        //return recommended side container properties but not including the current thisProperty 
        const recProperties = await PropertyModel.find({_id:{$ne:thisProperty?._id}}).limit(3);
    
        
        return new Response(JSON.stringify({thisProperty,recProperties}), {status: 200});

    } catch {
        return new Response(JSON.stringify("Failed to fetch all properties"), {status: 500});
    }

}