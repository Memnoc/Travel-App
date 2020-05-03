import { postData } from "./postData";

const fetchURL = "http://localhost:8081/pixabay";

const apiKey = '&key=12439814-8b5ec3fe0f64e43b981b64534';
const baseURL = 'https://pixabay.com/api/?';
const search = 'q='
const imageType = '&image_type=photo';
const category = '&category=travel'
let searchTerm;

// const capital = document.getElementById('capital');
// const language = document.getElementById('languages');
// const native = document.getElementById('native');
// const population = document.getElementById('population');

// https://pixabay.com/api/?key=12439814-8b5ec3fe0f64e43b981b64534&q=rome&image_type=photo

function pixabayApiCall(e) {
    let newSearch = document.getElementById('submitCity').value;
    getPixabayImages(baseURL + apiKey + search + newSearch + imageType)
        .then(function(data) {
            try {
                // postData('http://localhost:8081/AddPixabayImages', { capital: data[0].capital, language: data[0].languages[0].name, native: data[0].nativeName, population: data[0].population })
                // updateUI();
            } catch (error) {
                console.log("error", error);
            }
        });
    console.log('first console log', baseURL + apiKey + search + newSearch + imageType);
};

const getPixabayImages = async(baseURL, apiKey, search, searchTerm, imageType) => {
    const res = await fetch(baseURL, apiKey, search, searchTerm, imageType)
    try {
        const data = await res.json();
        // console.log('data from pixabay',data);

        return data;
    } catch (error) {
        console.log("error", error);
    }
}


// const updateUI = async() => {
//     const request = await fetch(fetchURL);
//     try {
//         const allData = await request.json();
//         console.log("this is restcountries allData", allData);
//         capital.innerHTML = 'Capital: ' + allData.capital;
//         language.innerHTML = 'Language: ' + allData.language;
//         native.innerHTML = 'Native name: ' + allData.native;
//         population.innerHTML = 'Population: ' + allData.population;


//     } catch (error) {
//         console.log("error", error);
//     }
// }

export { pixabayApiCall }