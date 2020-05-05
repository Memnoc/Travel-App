import { postData } from "./postData";

const fetchURL = "http://localhost:8081/weatherbit";
const today = document.getElementById('today');
const wind = document.getElementById('wind');
const clouds = document.getElementById('clouds');
const uv = document.getElementById('uv');

const baseURL = 'https://api.weatherbit.io/v2.0/history/daily?';
const apiKey = "&key={your_key}";
const searchMethod = 'city=';
const startingDate = '&start_date=';
const endingDate = '&end_date=';

let searchTerm;
let todaysDate;

/**
 * Makes an API call to getWeather - receives the API response from it
 * Creates a new data instance
 * Calls PostData to post the request to the API with the required fields
 * Calls UpdatedUI() to update the UI with the retrieved data
 * @param {event parameter} e 
 */
function weatherBitApiCall(e) {
    let departureDate = document.getElementById('depDate').value;
    const newSearch = document.getElementById('submitCity').value;
    let date = new Date().toJSON().slice(0, 10);
    todaysDate = date;

    getWeather(baseURL + searchMethod + newSearch + startingDate + todaysDate + endingDate + departureDate + apiKey)
        .then(function(data) {
            try {

                postData('http://localhost:8081/addWeatherbitWeather', { wind: data.data[0].wind_spd, clouds: data.data[0].clouds, uv: data.data[0].max_uv, date: data.data[0].datetime })

                updateUI();
            } catch (error) {
                console.log("error", error);
            }
        });
};

/**
 * Fecthes the response data from the API
 * 
 * @param {The base URL for the API request} baseURL 
 * @param {Search query parameter} searchMethod 
 * @param {User input} searchTerm 
 * @param {Starting date query parameter} startingDate 
 * @param {Today's date} todaysDate 
 * @param {Ending date query parameter} endingDate 
 * @param {User input} departureDate 
 * @param {API key} apiKey 
 */
const getWeather = async(baseURL, searchMethod, searchTerm, startingDate, todaysDate, endingDate, departureDate, apiKey) => {
    const res = await fetch(baseURL, searchMethod, searchTerm, startingDate, todaysDate, endingDate, departureDate, apiKey)
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

/**
 * Updates the UI with the data fecthed from the API
 */
const updateUI = async() => {
    const request = await fetch(fetchURL);
    try {
        const allData = await request.json();
        console.log("this is weatherbit allData", allData);
        today.innerHTML = 'Today is: ' + allData.date;
        wind.innerHTML = 'Average wind speed (Default m/s): ' + allData.wind;
        clouds.innerHTML = 'Average cloud coverage (%): ' + allData.clouds;
        uv.innerHTML = 'Maximum UV Index (0-11+): ' + allData.uv;
    } catch (error) {
        console.log("error", error);
    }
}

export { weatherBitApiCall }