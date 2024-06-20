import express from "express";
import { engine } from "express-handlebars";
import path from 'path';
import { fileURLToPath } from "url";
import dotenv from 'dotenv';
import DB from "../database/db.js";
import UserRouter from "./UserRouters.js";
import RestaurantRouter from "./RestaurantRouters.js";
import LoginUserRouter from "./LoginUsersRouters.js";
import session from "express-session";
import passport, { Passport } from "passport";
import passport from "passport-local-mongoose";




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
app.use("api/loginusers", LoginUserRouter);

DB.connectDB(process.env.DB_URI);


app.use(express.static("public"));
app.use(session({ 
  secret : "Esta vida me encanta me gusta, pero no me asusta...", 
  resave : false, 
  saveUninitialized : false
}));

app.use(passport.initialize()); 
  
// Starting the session 
app.use(passport.session()); 
 
passport.use(UserSchema.createStrategy()); 
  
// Serializing and deserializing 
passport.serializeUser(UserSchema.serializeUser()); 
passport.deserializeUser(UserSchema.deserializeUser()); 



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});