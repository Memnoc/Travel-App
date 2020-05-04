import { postData } from "./postData";

const APP_ID = '&username=Memnoc';
let searchMethod = 'name_equals=';
let searchTerm;
let baseURL = 'http://api.geonames.org/searchJSON?';
let countryName = document.getElementById('countryName');
let countryValue = document.getElementById('countryValue');
let departureDate = document.getElementById('depDate');
let countdownDate = document.getElementById('countdown');
const fetchURL = "http://localhost:8081/geonames";
let url = '';

function geonamesApiCall(e) {
    const newSearch = document.getElementById('submitCity').value;
    const city = newSearch;
    calculateTime();

    getWeather(baseURL, searchMethod, newSearch, APP_ID)
        .then(function(data) {
            try {
                postData('http://localhost:8081/addGeonamesWeather', { country: data.geonames[0].countryName, latitude: data.geonames[0].lat, longitude: data.geonames[0].lng, date: countdownDate, city: city })
                updateUI();
            } catch (error) {
                console.log("error", error);
            }
        });

};


function calculateTime() {
    let departure = departureDate.value;
    let countDownDate = Date.parse(departure);

    let intervalTime = setInterval(function() {
        let today = new Date().getTime();
        let missingDays = countDownDate - today;
        let days = Math.floor(missingDays / (1000 * 60 * 60 * 24));

        document.getElementById("countdown").innerHTML = "status: leaving in " + days + " days";
        if (missingDays < 0) {
            clearInterval(intervalTime);
            document.getElementById("countdown").innerHTML = "status: expired";
        } else if (days == 0) {
            clearInterval(intervalTime);
            document.getElementById("countdown").innerHTML = " status: leave tomorrow";
        }
    }, 1000);
}


const getWeather = async(baseURL, searchMethod, searchTerm, APP_ID) => {
    const res = await fetch(baseURL + searchMethod + searchTerm + APP_ID)
    try {
        const data = await res.json();
        console.log('whole data geonames', data);
        return data;
    } catch (error) {
        console.log("error", error);
    }
}


const updateUI = async() => {
    const request = await fetch(fetchURL);
    try {
        const allData = await request.json();
        console.log("this is data from geoNames", allData);
        const capitalCity = allData.city;
        const capitaliseCity = capitalCity.charAt(0).toUpperCase() + capitalCity.slice(1);
        countryName.innerHTML = "My trip to " + capitaliseCity;
        countryValue.innerHTML = allData.countryName;



    } catch (error) {
        console.log("error", error);
    }
}

export { geonamesApiCall }