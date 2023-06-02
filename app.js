//Use env file in config folder
require("dotenv").config({ path: "./config/.env" });

const express = require('express');
const app = express();
const connectDB = require("./config/database");
const session = require("express-session");
const flash = require("express-flash");
const expressLayout = require('express-ejs-layouts')
const mainRoutes = require("./routes/main");
const adminRoutes = require("./routes/admin");
const cookieParser = require('cookie-parser')
const MongoStore = require("connect-mongo");

//Connect To Database
connectDB();

//Static Folder
app.use(express.static('public'));
//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
//Use flash messages for errors, info, ect...
app.use(flash());

// Setup Sessions - stored in MongoDB
app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: true,
      store:  MongoStore.create({ mongoUrl: process.env.DB_URI }),
    })
  );
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