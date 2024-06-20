import express from "express";
import HomesModel from "../DAOS/HomesSchema.js";
const router = express.Router();



router.get("/homes", async (request, response) => {
    try {
        const restaurants = await HomesModel.find({});
        response.send(restaurants);
    } catch (error) {
        response.status(500).send({ error });
    }
});

router.post("/homes", async (request, response) => {
    const restaurant = new HomesModel(request.body);

    try {
        await restaurant.save();
        response.send(restaurant);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.put("/homes/:id", async (request, response) => {
    const { id } = request.params;
    const { address, typeFood, rating, service, password } = request.body;

    try {
        const updatedRestaurant = await HomesModel.findByIdAndUpdate(id, {
            address,
            typeFood,
            rating,
            service,
            password
        }, { new: true });

        if (!updatedRestaurant) {
            return response.status(404).send({ message: "Restaurant not found." });
        }

        response.send(updatedRestaurant);
    } catch (error) {
        response.status(500).send({ error: error.message });
    }
});

router.delete("/homes/:id", async (request, response) => {
    const { id } = request.params;

    try {
        const deletedRestaurant = await HomesModel.findByIdAndDelete(id);

        if (!deletedRestaurant) {
            return response.status(404).send({ message: "Restaurant not found." });
        }

        response.send({ message: "Restaurant successfully deleted." });
    } catch (error) {
        response.status(500).send({ error: error.message });
    }
});


router.get("/homes/:id", async (request, response) => {
    try {
        const restaurant = await HomesModel.findOne({ _id: request.params.id });
        response.send(restaurant);
    } catch (error) {
        response.status(500).send({ error });
    }
});

export default router;

