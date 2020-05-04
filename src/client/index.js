import { geonamesApiCall } from './js/geoName'
import { weatherBitApiCall } from './js/weatherBit'
import { restCountriesApiCall } from './js/restCountries'
import { pixabayApiCall } from './js/pixaBay'

import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'
let submitButton = document.getElementById('submitCityButton');

// city button
submitButton.addEventListener('click', async(event) => {
    try {
        event.preventDefault();

        geonamesApiCall();
        weatherBitApiCall();
        pixabayApiCall();

    } catch (error) {
        console.log("error", error);
    }

})


export {
    geonamesApiCall,
    weatherBitApiCall,
    restCountriesApiCall,
    pixabayApiCall
}