import express from "express";
import { engine } from "express-handlebars";
import path from 'path';
import { fileURLToPath } from "url";
import dotenv from 'dotenv';
import DB from "./database/db.js";
import bcrypt from 'bcrypt';
import UserRouter from "./campushomes/src/componentes/UserRouters.js";
import RestaurantRouter from "./campushomes/src/componentes/RestaurantRouters.js";
import LoginUserRouter from "./campushomes/src/componentes/LoginUsersRouters.js";
import session from "express-session";
import passport from "passport";
import cors from 'cors';
import UserModel from './campushomes/src/DAOS/UserSchema.js';

dotenv.config();

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const app = express();
const port = process.env.PORT || 3000;

// Middleware para archivos estáticos en public
app.use(express.static(path.join(dirname, 'public')));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", UserRouter);
app.use("/api/restaurants", RestaurantRouter);
app.use("/api/loginusers", LoginUserRouter);

DB.connectDB(process.env.DB_URI);

app.use(express.static("public"));
app.use(session({
    secret: "Esta vida me encanta me gusta, pero no me asusta...",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(UserModel.createStrategy());

// Serializar y deserializar
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
