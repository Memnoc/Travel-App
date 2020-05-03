import { postData } from "./postData";

const fetchURL = "http://localhost:8081/pixabay";




// const language = document.getElementById('languages');
// const native = document.getElementById('native');
// const population = document.getElementById('population');

// https://pixabay.com/api/?key=12439814-8b5ec3fe0f64e43b981b64534&q=rome&image_type=photo

function pixabayApiCall(e) {
    const apiKey = '&key=12439814-8b5ec3fe0f64e43b981b64534&';
    const baseURL = 'https://pixabay.com/api/?';
    const search = 'q='
    const imageType = '&image_type=photo';
    let searchTerm;
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