'use strict';

const apiKey = 'RrT2CxMsHK88RfduvEdYTq6XLw5neWEiMxRxObTM';

const searchURL = 'https://developer.nps.gov/api/v1/parks';

function displayResults(responseJson, maxResults) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length & i < maxResults; i++) {
    $('#results-list').append(
      `<li><h2>${responseJson.data[i].fullName}</h2>
      <a href="${responseJson.data[i].url}">${responseJson.data[i].name}</a>
      <p>${responseJson.data[i].description}</p>
      </li>`
    )
  };
  $('#results').removeClass('hidden');
};

function getParks(searchState, maxResults = 10) {

  const url = searchURL + '?' + 'stateCode=' + searchState + '&limit=' + maxResults + '&api_key=' + apiKey;

  console.log(url);

  fetch(url)
    .then(response => {

      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Oops! Smokey, we have a problem: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchState = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getParks(searchState, maxResults);
  });
}

$(watchForm);