'use strict';

const proxy = 'https://cors-anywhere.herokuapp.com/'
const tasteDiveurl = 'https://tastedive.com/api/similar?q='
const apiKey = '380351-ArtistX-HW29MYV0' 

//fetch info from API
function getArtists(params) {
  const completeURL = proxy + tasteDiveurl + params + '&verbose=1'+'&k='+ apiKey
  
  console.log(completeURL)

  fetch(completeURL)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      response.json().then(errJson => {
        throw new Error(errJson)
    });
  })
    .then(responseJson => displayResults(responseJson))
    .catch (error => {
      console.log(error)
      alert(error)
    })
}

//Display results to the DOM
function displayResults(responseJson) {
  console.log(responseJson)
     $('.search-results-name').empty()
     $('.search-results').empty() 
          $('.search-results-name').append(
        `<h3> artists/bands similar to ${responseJson.Similar.Info[0].Name}</h3> <br>`)
      for (let i = 0; i < responseJson.Similar.Results.length; i++) {
        $('.search-results').append(
          `<li class = "results-item">
          <h2> ${responseJson.Similar.Results[i].Name} </h2>
          <iframe src = "${responseJson.Similar.Results[i].yUrl}" frameborder="0" allowfullscreen> </iframe>
          <p><b> Artist info </b></p> <p> ${responseJson.Similar.Results[i].wTeaser} </p>
          </li>
          `
        )}
    $('.container').removeClass('hidden')
}


//Gather info from form
function watchForm() {
  $('#input').submit(event => {
    event.preventDefault()
    const input = $('.js-artist-input').val()
    const formattedInput = input.replace(/ /g, '+')
    getArtists(formattedInput)
  })
}

//Run app
$(function() {
  console.log('app loaded waiting for input...')
  watchForm()
})