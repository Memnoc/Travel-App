const APP_ID = '&username=Memnoc';
// let units = '&units=metric';
let searchMethod = 'name_equals=';
let searchTerm;
let baseURL = 'http://api.geonames.org/searchJSON?';
// let temperatureElement = document.getElementById('temp');
// let humidityLevel = document.getElementById('humidity');
// let currentDate = document.getElementById('date');
// const fetchURL = "http://localhost:8081/all";

// http://api.geonames.org/search?q=dublin&username=Memnoc

// Capture the search method and update getWeather() with it
function performAction(e) {
    const newSearch = document.getElementById('submitCity').value;
    // const feelings = document.getElementById('feelings').value;
    // Create a new date instance
    // let d = new Date();
    // let date = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
    // currentDate.value = date;

    getWeather(baseURL, searchMethod, newSearch, APP_ID)
        .then(function(data) {
            try {
                postData('http://localhost:8081/addWeather', { country: data.geonames[0].countryName, latitude: data.geonames[0].lat, longitude: data.geonames[0].lng })
                    // Update the UI with data
                    // updateUI();
            } catch (error) {
                console.log("error", error);
            }
        });

};


// GET call
const getWeather = async(baseURL, searchMethod, searchTerm, APP_ID) => {
    const res = await fetch(baseURL + searchMethod + searchTerm + APP_ID)
    try {
        const data = await res.json();
        // console.log('getWeather data', data.geonames[0].countryName);
        // console.log('getWeather data', data.geonames[0].lat);
        // console.log('getWeather data', data.geonames[0].lng);
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
// const updateUI = async() => {
//     const request = await fetch(fetchURL);
//     try {
//         const allData = await request.json();
//         console.log(allData);
//         humidityLevel.innerHTML = "Humidity level at: " + allData.humidity;
//         temperatureElement.innerHTML = "Temperature level at: " + allData.temperature + " C˚";
//         document.getElementById('content').innerHTML = "Today's feeling: " + allData.feelings;
//         currentDate.innerHTML = "Today's date: " + allData.date;

//     } catch (error) {
//         console.log("error", error);
//     }
// }

export { performAction }