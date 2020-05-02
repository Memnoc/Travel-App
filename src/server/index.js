/* Empty JS object to act as endpoint for all routes */

const weatherbitProjectData = {};
const geonamesProjectData = {};

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

//************************************************** Geonames routes **************************************************/ 

// GET geonames api route
app.get('/geonames', sendGeonamesData)
    // Callback to the geonames api route
function sendGeonamesData(request, response) {
    response.send(geonamesProjectData)
}

// POST geonames api route
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

//************************************************** Geonames routes **************************************************/ 

//************************************************** Weatherbit routes **************************************************/ 

// Weatherbit GET route
app.get('/weatherbit', cors(), sendWeatherBitData);
// Callback to the weatherbit api route
function sendWeatherBitData(request, response) {
    response.send(weatherbitProjectData)
}

// Weatherbit POST route
app.post('/addWeatherbitWeather', addWeatherBitData);
// Callback to the weatherbit api route
function addWeatherBitData(request, response) {
    let responseData = request.body;

    weatherbitProjectData.wind = request.body.wind;
    weatherbitProjectData.clouds = request.body.clouds;
    weatherbitProjectData.uv = request.body.uv;
    weatherbitProjectData.date = request.body.date;

    response.send(weatherbitProjectData)
    console.log('weatherbit response', weatherbitProjectData)
}

//************************************************** Weatherbit routes **************************************************/

// designates what port the app will listen to for incoming requests
app.listen(8081, function() {
    console.log('Example app listening on port 8081!')
})