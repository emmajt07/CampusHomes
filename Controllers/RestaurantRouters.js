import express from "express";
import RestaurantModel from "../DAOS/RestaurantSchema.js";
const router = express.Router();



router.get("/restaurante", async (request, response) => {
    try {
        const restaurants = await RestaurantModel.find({});
        response.send(restaurants);
    } catch (error) {
        response.status(500).send({ error });
    }
});

router.post("/restaurante", async (request, response) => {
    const restaurant = new RestaurantModel(request.body);

    try {
        await restaurant.save();
        response.send(restaurant);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.put("/restaurante/:id", async (request, response) => {
    const { id } = request.params;
    const { address, typeFood, rating, service, password } = request.body;

    try {
        const updatedRestaurant = await RestaurantModel.findByIdAndUpdate(id, {
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

router.delete("/restaurante/:id", async (request, response) => {
    const { id } = request.params;

    try {
        const deletedRestaurant = await RestaurantModel.findByIdAndDelete(id);

        if (!deletedRestaurant) {
            return response.status(404).send({ message: "Restaurant not found." });
        }

        response.send({ message: "Restaurant successfully deleted." });
    } catch (error) {
        response.status(500).send({ error: error.message });
    }
});


router.get("/restaurante/:id", async (request, response) => {
    try {
        const restaurant = await RestaurantModel.findOne({ _id: request.params.id });
        response.send(restaurant);
    } catch (error) {
        response.status(500).send({ error });
    }
});

export default router;

