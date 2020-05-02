import { postData } from "./postData";

const fetchURL = "http://localhost:8081/restcountry";

// https://restcountries.eu/rest/v2/name/italy

function restCountriesApiCall(e) {
    e.preventDefault();
    const baseURL = 'https://restcountries.eu/rest/v2/name/';
    let countryName = document.getElementById('countryValue').innerText;

    getCountryInfo(baseURL + countryName)
        .then(function(data) {
            try {
                // postData('http://localhost:8081/AddRestcountry', { wind: data.data[0].wind_spd, clouds: data.data[0].clouds, uv: data.data[0].max_uv, date: data.data[0].datetime })
                // updateUI();
            } catch (error) {
                console.log("error", error);
            }
        });
    console.log('first console log', baseURL + countryName);
};

const getCountryInfo = async(baseURL, countryName) => {
    const res = await fetch(baseURL, countryName)
    try {
        const data = await res.json();
        console.log('data form rest countries', data);
        return data;
    } catch (error) {
        console.log("error", error);
    }
}


// const updateUI = async() => {
//     const request = await fetch(fetchURL);
//     try {
//         const allData = await request.json();
//         console.log("this is weatherbit allData", allData);
//         today.innerHTML = 'Today is: ' + allData.date;
//         wind.innerHTML = 'Average wind speed (Default m/s): ' + allData.wind;
//         clouds.innerHTML = 'Average cloud coverage (%): ' + allData.clouds;
//         uv.innerHTML = 'Maximum UV Index (0-11+): ' + allData.uv;


//     } catch (error) {
//         console.log("error", error);
//     }
// }

export { restCountriesApiCall }