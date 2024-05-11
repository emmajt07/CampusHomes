import express from "express";
import RestaurantModel from "../DAOS/RestaurantSchema.js";
const router = express.Router();

router.get("/", async (request, response) => {
    try {
        const restaurants = await RestaurantModel.find({});
        response.send(restaurants);
    } catch (error) {
        response.status(500).send({ error });
    }
});

router.post("/", async (request, response) => {
    const restaurant = new RestaurantModel(request.body);

    try {
        await restaurant.save();
        response.send(restaurant);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.put("/:id", async (request, response) => {
    const { id } = request.params;
    const { address, typeFood, rating, service, password } = request.body; // Asumiendo que estos son los campos que quieres actualizar

    try {
        const updatedRestaurant = await RestaurantModel.findByIdAndUpdate(id, {
            address,
            typeFood,
            rating,
            service,
            password
        }, { new: true }); // El flag {new: true} es opcional y sirve para retornar el documento actualizado

        if (!updatedRestaurant) {
            return response.status(404).send({ message: "Restaurant not found." });
        }

        response.send(updatedRestaurant);
    } catch (error) {
        response.status(500).send({ error: error.message });
    }
});

router.delete("/:id", async (request, response) => {
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


router.get("/:id", async (request, response) => {
    try {
        const restaurant = await RestaurantModel.findOne({ _id: request.params.id });
        response.send(restaurant);
    } catch (error) {
        response.status(500).send({ error });
    }
});

export default router;