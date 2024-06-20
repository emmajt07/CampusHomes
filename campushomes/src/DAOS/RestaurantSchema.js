import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
    adress: {
        type: String,
        required: true,
    },
    typefood: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    service: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }

})

const RestaurantModel = mongoose.model("Restaurant", RestaurantSchema)
export default RestaurantModel;