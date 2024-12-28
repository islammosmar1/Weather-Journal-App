// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan("dev"));

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

app.get("/projectData", (req, res) => {
  res.status(200).send(projectData);
});

app.post("/projectData", (req, res) => {
  const body = req.body;
  projectData = {
    date: body.date,
    temp: body.temp,
    content: body.content,
  };

  res.status(200).send(projectData);
});

// Setup Server
const port = 8000;
app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
