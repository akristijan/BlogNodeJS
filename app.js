//Use env file in config folder
require("dotenv").config({ path: "./config/.env" });

const express = require('express');
const app = express();
const connectDB = require("./config/database");
const expressLayout = require('express-ejs-layouts')
const mainRoutes = require("./routes/main");

//Connect To Database
connectDB();

//Static Folder
app.use(express.static('public'));
//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Templating Engine 
app.use(expressLayout);
app.set('layout', './layouts/main');
//Using EJS for views
app.set('view engine', 'ejs');

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/admin", adminRoutes)

//Server running 
app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`)
})