import express from "express";
import UserModel from "../DAOS/UserSchema.js";
const router = express.Router();


router.get("/", async (request, response) => {
    try {
        const users = await UserModel.find({});
        response.send(users);
    } catch (error) {
        response.status(500).send({ error });
    }
});


router.get("/:id", async (request, response) => {
    try {
        const user = await UserModel.findOne({ _id: request.params.id });
        response.send(user);
    } catch (error) {
        response.status(500).send({ error });
    }
});



export default router;