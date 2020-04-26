// ***********************************************************  FETCHING API  *********************************************************** //

/**
 * SCOPE: 
 * performs a post request to fect the Alyen API response
 * returns the data from the response
 * extracts JSON from the response and returns it 
 * @param {the API post route in src/server/index.js} url 
 * @param {the user input in frontend via a field} data 
 */
const postRequest = async(url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

// ***********************************************************  FETCHING API  *********************************************************** //

/**
 * SCOPE: 
 * capture the value in the usertext field
 * call to postRequest() with the frontend data and the server route
 * call to updateSentimentUI()
 * @param {anchor parameter to leverage the preventDefault() function} event 
 * https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
 */
async function sentimentApi(event) {
    try {
        event.preventDefault();
        const userText = document.getElementById("submitText").value;
        const data = await postRequest("http://localhost:8081/sentiment", { userText });
        updateSentimentUI(data);
    } catch (error) {
        alert("Please use a valid text format");
    }
}

/**
 * SCOPE:
 * captures user-input data
 * formats user-input data
 * returns the resulting variables to be used in updateSentimentUI()
 * @param {variable} polarity_confidence 
 * @param {variable} polarity 
 */
function captureSentimentFrontendData(polarity_confidence, polarity) {
    const textPolarity = document.getElementById("polarity");
    const textPolarityConfidence = document.getElementById("polarity_confidence");

    const polarityConfidenceFormat = polarity_confidence.toFixed(3);
    const capitalisePolarity = polarity.charAt(0).toUpperCase() + polarity.slice(1);
    return { textPolarity, capitalisePolarity, textPolarityConfidence, polarityConfidenceFormat };
}

/**
 * SCOPE: updates the frontend with the data gathered from sentimentFrontendData()
 * @param {the API response data} data 
 */
const updateSentimentUI = async data => {
    try {
        const {
            polarity,
            polarity_confidence
        } = data;
        const {
            textPolarity,
            capitalisePolarity,
            textPolarityConfidence,
            polarityConfidenceFormat
        } = captureSentimentFrontendData(polarity_confidence, polarity);
        textPolarity.innerHTML = `Text sentiment: ${ capitalisePolarity},\n `;
        textPolarityConfidence.innerHTML = `Text confidence: ${ polarityConfidenceFormat}.`;
    } catch (error) {
        const unsupportedText = "The text doesn't have the necessary attributes!\n"
        const sentimentTryAgain = 'Read why at https://docs.aylien.com/textapi/endpoints/?javascript#sentiment-analysis'
        alert(unsupportedText.concat(sentimentTryAgain));
    }
};

export { sentimentApi }