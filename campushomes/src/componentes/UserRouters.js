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

router.post("/", async (request, response) => {
    const user = new UserModel(request.body);

    try {
        await user.save();
        response.send(user);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.put("/:id", async (request, response) => {
    const { id } = request.params;
    const { username, name, mail, number, password } = request.body;

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(id, {
            username,
            name,
            mail,
            number,
            password
        }, { new: true });

        if (!updatedUser) {
            return response.status(404).send({ message: "User not found." });
        }

        response.send(updatedUser);
    } catch (error) {
        response.status(500).send({ error: error.message });
    }
});

router.delete("/:id", async (request, response) => {
    const { id } = request.params;

    try {
        const deletedUser = await UserModel.findByIdAndDelete(id);

        if (!deletedUser) {
            return response.status(404).send({ message: "User not found." });
        }

        response.send({ message: "User successfully deleted." });
    } catch (error) {
        response.status(500).send({ error: error.message });
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