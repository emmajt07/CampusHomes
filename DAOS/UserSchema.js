import mongoose from "mongoose"
import passportLocalMongoose from 'passport-local-mongoose';


const UserSchema = new mongoose.Schema({
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

UserSchema.plugin(passportLocalMongoose); 

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;