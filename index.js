
//getting the elements 
let searchInput = document.getElementById("searchInput");
let body = document.getElementById("body");
let watchListButton = document.getElementById("watchListButton");

//linking to watch list page when click watch list button
watchListButton.addEventListener('click', function () {
  window.location.href = 'watchlist.html';

})

//creating filtered movies container
let filteredMoviesContainer = document.createElement('div');
filteredMoviesContainer.classList.add('filtered-movie-container');
body.appendChild(filteredMoviesContainer);//appending the container to body

//initially filtered movie conatiner set to hidden
filteredMoviesContainer.style.visibility = 'hidden';


//function for appending the movie data when user enters something in the search input
function createAndAppendMovieList(jsondata) {

  let movieBackgroundContainer = document.createElement("div");
  movieBackgroundContainer.classList.add("background-color");
  filteredMoviesContainer.appendChild(movieBackgroundContainer);

  let movieContainer = document.createElement("div");
  movieContainer.classList.add('movie-container');
  movieBackgroundContainer.appendChild(movieContainer);

  let moviePoster = document.createElement("img");
  moviePoster.classList.add("movie-poster")
  moviePoster.src = jsondata.Poster;
  movieContainer.appendChild(moviePoster);

  let titleDiv = document.createElement('div');
  titleDiv.classList.add('title-div')
  movieContainer.appendChild(titleDiv);

  let queryParams = `?Title=${encodeURIComponent(jsondata.Title)}`;

  let title = document.createElement("a");
  title.classList.add("title");
  title.href = `info.html${queryParams}`;
  title.target = "_blank";
  title.textContent = jsondata.Title;
  titleDiv.appendChild(title);

  let favoritesIcon = document.createElement("i");
  favoritesIcon.classList.add("far", "fa-heart", "heart-icon");
  titleDiv.appendChild(favoritesIcon);
   
  //function for storing the data to local storage
  favoritesIcon.addEventListener("click", function () {
   
    if (typeof Storage !== "undefined") {
      // Generate a unique key for the movie based on its title
      const movieKey = `favorite_${jsondata.Title}`;

      // Get the existing favorites for this movie from local storage or initialize an empty array if it doesn't exist
      let movieFavorites = JSON.parse(localStorage.getItem(movieKey)) || [];

      // Add the movie data to the favorites array for this movie
      movieFavorites.push(jsondata);

      // Update the local storage with the updated favorites array for this movie
      localStorage.setItem(movieKey, JSON.stringify(movieFavorites));

    } else {
      console.error("Local storage is not supported by your browser.");
    }



  });

  let year = document.createElement("p");
  year.classList.add("year");
  year.textContent = jsondata.Year;
  movieContainer.appendChild(year);




}



//function for searching the movie when user enters some value in the searchInput box
function searchMovie() {
  let searchInputValue = searchInput.value.trim(); 
  let apiKey = "e29d0466";
  let url = `https://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}&s=${searchInputValue}`;

  let options = {
    method: 'GET'
  }

  fetch(url, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsondata) {
      console.log(jsondata);


      // Clear the container
      filteredMoviesContainer.innerHTML = '';

      if (Array.isArray(jsondata.Search)) {
        // Filtering results that match the search input
        const matchingResults = jsondata.Search.filter(result => result.Title.toLowerCase().includes(searchInputValue));

        if (matchingResults.length > 0) {
          // Showing the container when there are matching results
          filteredMoviesContainer.style.visibility = 'visible';

          for (let data of matchingResults) {
            createAndAppendMovieList(data);
          }
        } else {
          console.log('No matching results found');
          // Hiding the container when there are no matching results
          filteredMoviesContainer.style.visibility = 'hidden';
        }
      } else {
        console.log('No search results found');
        // Hide the container when there are no search results
        filteredMoviesContainer.style.visibility = 'hidden';
      }
    })
    .catch(function (error) {
      console.error('Fetch error:', error);
    });
}

searchInput.addEventListener('input', searchMovie);