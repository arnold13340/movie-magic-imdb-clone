document.addEventListener("DOMContentLoaded", function () {
    const queryParams = new URLSearchParams(window.location.search);
    const title = queryParams.get("Title");
  
    if (title) {
      let apiKey = "e29d0466";
      let url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`;
  
      fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (jsondata) {
          console.log(jsondata);
  
          // Populate movie information on the page
          document.getElementById("movieName").textContent = jsondata.Title || "N/A";
          document.getElementById("year").textContent = jsondata.Year || "N/A";
          document.getElementById("rating").textContent = jsondata.Rated || "N/A";
          document.getElementById("releasedDate").textContent = jsondata.Released || "N/A";
          document.getElementById("genre").textContent = jsondata.Genre || "N/A";
          document.getElementById("actors").textContent = jsondata.Actors || "N/A";
          document.getElementById("plot").textContent = jsondata.Plot || "N/A";
          document.getElementById("language").textContent = jsondata.Language || "N/A";
          document.getElementById("awards").textContent = jsondata.Awards || "N/A";
  
          const posterUrl = jsondata.Poster;
          if (posterUrl) {
            document.getElementById("moviePoster").src = posterUrl;
          }
        })
        .catch(function (error) {
          console.error('Fetch error:', error);
        });
    }
  });
  