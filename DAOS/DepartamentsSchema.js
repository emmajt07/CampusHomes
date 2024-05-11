import mongoose from "mongoose"

const DeptsSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }

})

const DeptsModel = mongoose.model("User", DeptsSchema);
export default UserModel;