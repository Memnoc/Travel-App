/* Empty JS object to act as endpoint for all routes */
let projectData = {};

const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const express = require("express");
const aylien = require("aylien_textapi");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

app.use(express.static("dist"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// GET route
app.get('/all', getData)

// Callback to the get route
function getData(request, response) {
    response.send(projectData)
}


// POST route
app.post('/addWeather', addWeather);

// Callback to the route to receive the client data and store it into an object entry
function addWeather(request, response) {
    let responseData = request.body;
    console.log(responseData);

    projectData.countryName = request.body.country;
    projectData.latitude = request.body.latitude;
    projectData.longitude = request.body.longitude;

    response.send(projectData)
    console.log(projectData)
}

// designates what port the app will listen to for incoming requests
app.listen(8081, function() {
    console.log('Example app listening on port 8081!')
})