const APP_ID = '&username=Memnoc';
// let units = '&units=metric';
let searchMethod = 'name_equals=';
let searchTerm;
let baseURL = 'http://api.geonames.org/searchJSON?';
// let temperatureElement = document.getElementById('temp');
let countryName = document.getElementById('countryName');
let departureDate = document.getElementById('depDate');
let countdownDate = document.getElementById('countdown');
const fetchURL = "http://localhost:8081/all";

// http://api.geonames.org/search?q=dublin&username=Memnoc

// Capture the search method and update getWeather() with it
function performAction(e) {
    const newSearch = document.getElementById('submitCity').value;
    const city = newSearch;
    // Create a new date instance
    // let d = new Date();
    // let date = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
    // currentDate.value = date;
    calculateTime();

    getWeather(baseURL, searchMethod, newSearch, APP_ID)
        .then(function(data) {
            try {
                postData('http://localhost:8081/addWeather', { country: data.geonames[0].countryName, latitude: data.geonames[0].lat, longitude: data.geonames[0].lng, date: countdownDate, city: city })
                    // Update the UI with data
                updateUI();
            } catch (error) {
                console.log("error", error);
            }
        });

};


function calculateTime() {
    let departure = departureDate.innerText;
    let countDownDate = Date.parse(departure);

    let intervalTime = setInterval(function() {
        let today = new Date().getTime();
        let missingDays = countDownDate - today;

        let days = Math.floor(missingDays / (1000 * 60 * 60 * 24));


        document.getElementById("countdown").innerHTML = "is " + days + " days away ";
        if (missingDays < 0) {
            clearInterval(intervalTime);
            document.getElementById("countdown").innerHTML = "Your trip was expired :(";
        }
    }, 1000);
}


// GET call
const getWeather = async(baseURL, searchMethod, searchTerm, APP_ID) => {
    const res = await fetch(baseURL + searchMethod + searchTerm + APP_ID)
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}


// POST call
// Function to fetch data asynchronously
const postData = async(url = '', data = {}) => {
    // this is the POST route
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Turn the body of the request into JSON        
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log('this is newData', newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

// Update the UI with the information extracted from the API and the HTML elements
const updateUI = async() => {
    const request = await fetch(fetchURL);
    try {
        const allData = await request.json();
        console.log("this is allData", allData);
        const capitalCity = allData.city;
        const capitaliseCity = capitalCity.charAt(0).toUpperCase() + capitalCity.slice(1);
        countryName.innerHTML = "My trip to " + capitaliseCity + ", " + allData.countryName;
        // temperatureElement.innerHTML = "Temperature level at: " + allData.temperature + " C˚";
        // currentDate.innerHTML = "Today's date: " + allData.date;


    } catch (error) {
        console.log("error", error);
    }
}

export { performAction }