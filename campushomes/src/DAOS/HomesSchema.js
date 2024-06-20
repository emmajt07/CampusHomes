import mongoose from "mongoose";

const HomesSchema = new mongoose.Schema({
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

const HomesModel = mongoose.model("Restaurant", HomesSchema)
export default HomesModel;