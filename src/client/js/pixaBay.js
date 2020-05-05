import { postData } from "./postData";

const fetchURL = "http://localhost:8081/pixabay";
const apiKey = '&key={your_key}&';
const baseURL = 'https://pixabay.com/api/?';
const search = 'q='
const imageType = '&image_type=photo';
let searchTerm;

/**
 * Makes an API call to getPixabayImages() - receives the API response from it
 * Calls PostData to post the request to the API with the required fields
 * Calls UpdatedUI() to update the UI with the retrieved data
 * @param {event parameter} e 
 */
function pixabayApiCall(e) {
    let newSearch = document.getElementById('submitCity').value;

    getPixabayImages(baseURL + apiKey + search + newSearch + imageType)
        .then(function(data) {
            try {
                postData('http://localhost:8081/AddPixabayImages', { image: data.hits[0].largeImageURL })
                updateUI();
            } catch (error) {
                console.log("error", error);
            }
        });
    console.log('first console log', baseURL + apiKey + search + newSearch + imageType);
};

/**
 * Fecthes the response data from the API
 * @param {The base URL for the API request} baseURL 
 * @param {The API key for the API} apiKey 
 * @param {Search query parameter} search 
 * @param {User input} searchTerm 
 * @param {Image type query parameter} imageType 
 */
const getPixabayImages = async(baseURL, apiKey, search, searchTerm, imageType) => {
    const res = await fetch(baseURL, apiKey, search, searchTerm, imageType)
    try {
        const data = await res.json();
        console.log('data from pixabay', data);
        console.log('image pixabay', data.hits[0].largeImageURL);

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
        console.log("this is pixabay allData", allData);
        let imageContainer = document.getElementById('image').src = allData.image;


    } catch (error) {
        console.log("error", error);
    }
}

export { pixabayApiCall }