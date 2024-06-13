import express from "express";
import { engine } from "express-handlebars";
import path from 'path';
import { fileURLToPath } from "url";
import dotenv from 'dotenv';
import DB from "./db.js";
import UserRouter from "../Controllers/UserRouters.js";
import RestaurantRouter from "../Controllers/RestaurantRouters.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;

//configure Handlabers
app.engine('handlebars', engine ({
    defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

// Middleware para archivos estaticos en public
app.use(express.static(__dirname + '/public'));

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", UserRouter);
app.use("/api/restaurants", RestaurantRouter);

DB.connectDB(process.env.DB_URI);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});