

//function for display the watchlist data when dom content loads
document.addEventListener("DOMContentLoaded", function () {
  // Creating an array to store the retrieved movie data
  let favoriteMovies = [];

  // Retrieving all keys from local storage
  const keys = Object.keys(localStorage);

  // Iterate through the keys to find movie data
  keys.forEach(function (key) {
    // Checking if the key starts with "favorite_"
    if (key.startsWith("favorite_")) {
      // Extracting the movie title from the key
      const movieTitle = key.replace("favorite_", "");

      // Retrieving the movie data using the key
      const movieData = JSON.parse(localStorage.getItem(key));

      // Add the movie data to the array
      favoriteMovies.push({ Title: movieTitle, Data: movieData });
    }
  });

  // Getting the watchlist container element in watchlist.html
  let watchlistContainer = document.getElementById("watchlistContainer");
  let filteredMoviesContainer = document.createElement('div');
  filteredMoviesContainer.classList.add('filtered-movie-container');
  watchlistContainer.appendChild(filteredMoviesContainer);

  



  // Iterate through favorite movies and display them
  favoriteMovies.forEach(function (movie) {
    // Create a div element to display each movie
    filteredMoviesContainer.style.visibility = 'visible';

    let movieDiv = document.createElement("div");
    movieDiv.classList.add("movie-container");

    // Create an image element for the movie poster
    let moviePoster = document.createElement("img");
    moviePoster.classList.add("movie-poster");
    moviePoster.src = movie.Data[0].Poster; // Update to access the Poster property from the movie data
    movieDiv.appendChild(moviePoster);

    let titleDiv = document.createElement('div');
    titleDiv.classList.add('title-div')
    movieDiv.appendChild(titleDiv);

    let queryParams = `?Title=${encodeURIComponent(movie.Title)}`;

    // Create a heading element for the movie title
    let movieTitle = document.createElement("a");
    movieTitle.classList.add('title');
    movieTitle.href=`info.html${queryParams}`;
    movieTitle.target = "_blank";
    movieTitle.textContent = movie.Title; // Use the movie title from the retrieved data
    titleDiv.appendChild(movieTitle);

    // Create a paragraph element for the movie year
    let movieYear = document.createElement("p");
    movieYear.classList.add("year")
    movieYear.textContent = movie.Data[0].Year; // Update to access the Year property from the movie data
    movieDiv.appendChild(movieYear);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    movieDiv.appendChild(deleteIcon);

    deleteIcon.addEventListener("click", function () {
      // Remove the movie from the DOM
      filteredMoviesContainer.removeChild(movieDiv);

      // Remove the movie data from local storage
      localStorage.removeItem(`favorite_${movie.Title}`);
    });

    // Append the movie div to the watchlist container
    filteredMoviesContainer.appendChild(movieDiv);
  });

  // Append the movie div to the watchlist container
  filteredMoviesContainer.appendChild(movieDiv);
});


