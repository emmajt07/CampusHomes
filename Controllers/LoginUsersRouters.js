import express from "express";
import UserModel from "../DAOS/UserSchema.js";
import passport from "passport";
const router = express.Router();


router.get("/", async (request, response) => {
    try {
        const users = await UserModel.find({});
        response.send(users);
    } catch (error) {
        response.status(500).send({ error });
    }
});


router.post("/", passport.authenticate('local', { 
    successMessage: "Login Successful",
    failureMessage: "Invalid username or password"
}), (req, res) => {
    res.send("Login Successful");
});


export default router;