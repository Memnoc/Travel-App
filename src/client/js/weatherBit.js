import { postData } from "./postData";


const fetchURL = "http://localhost:8081/weatherbit";
const today = document.getElementById('today');
const wind = document.getElementById('wind');
const clouds = document.getElementById('clouds');
const uv = document.getElementById('uv');

// https://api.weatherbit.io/v2.0/history/daily?city=Rome&start_date=2020-04-26&end_date=2020-04-27&key=7e120a3934954a01a4027b3c8aaf8c0d
function weatherBitApiCall(e) {
    const apiKey = "&key=7e120a3934954a01a4027b3c8aaf8c0d";
    const searchMethod = 'city=';
    const startingDate = '&start_date=';
    const endingDate = '&end_date=';
    let searchTerm;
    let todaysDate;
    const baseURL = 'https://api.weatherbit.io/v2.0/history/daily?';

    let countryName = document.getElementById('countryName');
    let departureDate = document.getElementById('depDate').value;
    let countdownDate = document.getElementById('countdown');
    const newSearch = document.getElementById('submitCity').value;
    const city = newSearch;

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



const getWeather = async(baseURL, searchMethod, searchTerm, startingDate, todaysDate, endingDate, departureDate, apiKey) => {
    const res = await fetch(baseURL, searchMethod, searchTerm, startingDate, todaysDate, endingDate, departureDate, apiKey)
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}


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