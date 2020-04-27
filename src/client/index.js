import { checkForName } from './js/nameChecker'
import { performAction } from './js/formHandler'

import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

let submitButton = document.getElementById('submitCityButton');

// city button
submitButton.addEventListener('click', async(event) => {
    try {
        event.preventDefault();
        performAction();
    } catch (error) {
        console.log("error", error);
    }

})


export {
    checkForName,
    performAction
}