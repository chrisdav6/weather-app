const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const darkSky = require("./utils/darkSky");
const app = express();
const port = process.env.PORT || 3000;

//Use Public folder
const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

//Set Views folder path
const viewsPath = path.join(__dirname, "../templates/views");
app.set("views", viewsPath);

//Set Partials Path
const partialsPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialsPath);

//Use Handlebars
app.set("view engine", "hbs");

//Routes
//Index - GET
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Chris Davis"
  });
});

//About - GET
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Chris Davis"
  });
});

//Help - GET
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    message: "This is the help message",
    name: "Chris Davis"
  });
});

//Weather - GET
app.get("/weather", (req, res) => {
  const address = req.query.address;

  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!"
    });
  }

  geocode(address, (error, { latitide, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error: error
      });
    }

    darkSky(latitide, longitude, (error, weatherData) => {
      if (error) {
        return res.send({
          error: error
        });
      }

      res.send({
        forecast: weatherData,
        location: location,
        address: address
      });
    });
  });
});

//404 Help Route - GET
app.get("*/help/:name", (req, res) => {
  const badUrl = req.params.name;
  res.render("404", {
    title: "Dang It!",
    name: "Chris Davis",
    message: `It looks like you broke the internet! The help article ${badUrl} does not exist`
  });
});

//404 All Others - GET
app.get("*/:name", (req, res) => {
  const badUrl = req.params.name;
  res.render("404", {
    title: "Dang It!",
    name: "Chris Davis",
    message: `It looks like you broke the internet! The page ${badUrl} does not exist`
  });
});

//Server
app.listen("3000", () => {
  console.log(`Server started on port ${port}`);
});