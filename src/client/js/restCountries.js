import { postData } from "./postData";

const fetchURL = "http://localhost:8081/restcountry";
const capital = document.getElementById('capital');
const language = document.getElementById('languages');
const native = document.getElementById('native');
const population = document.getElementById('population');

/**
 * Makes an API call to getCountryInfo - receives the API response from it
 * Calls PostData to post the request to the API with the required fields
 * Calls UpdatedUI() to update the UI with the retrieved data
 * @param {event parameter} e 
 */
function restCountriesApiCall(e) {
    e.preventDefault();
    const baseURL = 'https://restcountries.eu/rest/v2/name/';
    let countryName = document.getElementById('countryValue').innerText;

    getCountryInfo(baseURL + countryName)
        .then(function(data) {
            try {
                postData('http://localhost:8081/AddRestcountry', { capital: data[0].capital, language: data[0].languages[0].name, native: data[0].nativeName, population: data[0].population })
                updateUI();
            } catch (error) {
                console.log("error", error);
            }
        });
    console.log('first console log', baseURL + countryName);
};

/**
 * Fecthes the response data from the API
 * @param {The base URL for the API request} baseURL 
 * @param {Results printed in the UI from GeonamesAPI and used here} countryName 
 */
const getCountryInfo = async(baseURL, countryName) => {
    const res = await fetch(baseURL, countryName)
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
        console.log("this is restcountries allData", allData);
        capital.innerHTML = 'Capital: ' + allData.capital;
        language.innerHTML = 'Language: ' + allData.language;
        native.innerHTML = 'Native name: ' + allData.native;
        population.innerHTML = 'Population: ' + allData.population;
    } catch (error) {
        console.log("error", error);
    }
}

export { restCountriesApiCall }