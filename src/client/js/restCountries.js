import { postData } from "./postData";

const fetchURL = "http://localhost:8081/restcountry";
const capital = document.getElementById('capital');
const language = document.getElementById('languages');
const native = document.getElementById('native');
const population = document.getElementById('population');

// https://restcountries.eu/rest/v2/name/italy

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

const getCountryInfo = async(baseURL, countryName) => {
    const res = await fetch(baseURL, countryName)
    try {
        const data = await res.json();
        console.log('data form rest countries', data[0].capital);
        console.log('data form rest countries', data[0].languages[0].name);
        console.log('data form rest countries', data[0].nativeName);
        console.log('data form rest countries', data[0].population);
        return data;
    } catch (error) {
        console.log("error", error);
    }
}


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