//Use env file in config folder
require("dotenv").config({ path: "./config/.env" });

const express = require('express');
const app = express();
const expressLayout = require('express-ejs-layouts')
const mainRoutes = require("./routes/main");


app.use(express.static('public'));
//Templating Engine 
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);

//Server running 
app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`)
})