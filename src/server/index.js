/* Empty JS object to act as endpoint for all routes */
const geonamesProjectData = {};
const weaProjectData = {};

const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const cors = require("cors");

const request = require('request');
const fetch = require('node-fetch');

app.use(express.static("dist"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// GET geonames api route
app.get('/geonames', sendGeonamesData)

// Callback to the geonames api route
function sendGeonamesData(request, response) {
    response.send(geonamesProjectData)
}


// Geonames POST route
app.post('/addGeonamesWeather', addWeather);

// Geonames callback
function addWeather(request, response) {
    let responseData = request.body;

    geonamesProjectData.countryName = request.body.country;
    geonamesProjectData.latitude = request.body.latitude;
    geonamesProjectData.longitude = request.body.longitude;
    geonamesProjectData.date = request.body.date;
    geonamesProjectData.city = request.body.city;

    response.send(geonamesProjectData)
    console.log('geonames response', geonamesProjectData)
}



// Weatherbit get route
app.get('/weatherbit', cors(), sendWeatherBitData);

// Callback to the weatherbit api route
function sendWeatherBitData(request, response) {
    response.send(weaProjectData)
}

// Weatherbit POST route
app.post('/addWeatherbitWeather', addWeatherBitData);

// Callback to the route to receive the client data and store it into an object entry
function addWeatherBitData(request, response) {
    let responseData = request.body;

    weaProjectData.wind = request.body.wind;
    weaProjectData.clouds = request.body.clouds;
    weaProjectData.uv = request.body.uv;
    weaProjectData.date = request.body.date;

    response.send(weaProjectData)
    console.log('weatherbit response', weaProjectData)
}

// designates what port the app will listen to for incoming requests
app.listen(8081, function() {
    console.log('Example app listening on port 8081!')
})