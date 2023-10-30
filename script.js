// Define API endpoints and constants
const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=07461ce000389890a4fe64117cc816df&page=1'; // API endpoint for discovering popular movies
const IMG_PATH = "https://image.tmdb.org/t/p/w1280"; // Base URL for movie poster images

const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=07461ce000389890a4fe64117cc816df&query="; // API endpoint for searching movies

// Get references to HTML elements by their IDs
const main = document.getElementById("section"); // The main section where movie cards will be displayed
const form = document.getElementById("form"); // The form element used for searching movies
const search = document.getElementById("query"); // The input field for entering search queries

// Call the returnMovies function with the initial APILINK
returnMovies(APILINK);

// Define the returnMovies function to fetch and display movies
function returnMovies(url) {
  fetch(url)
    .then(res => res.json())
    .then(function(data) {
      console.log(data.results);
      data.results.forEach(element => {
        // Create HTML elements for displaying movie information
        const div_card = document.createElement('div');
        div_card.setAttribute('class', 'card');
        
        const div_row = document.createElement('div');
        div_row.setAttribute('class', 'row');
        
        const div_column = document.createElement('div');
        div_column.setAttribute('class', 'column');
        
        const image = document.createElement('img');
        image.setAttribute('class', 'thumbnail');
        image.setAttribute('id', 'image');
        
        const title = document.createElement('h3');
        title.setAttribute('id', 'title');
        
        const center = document.createElement('center');

        // Set the title and image source with movie data
        title.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 25px;">
          <p style="font-size: 20px;">${element.title}</p>
          <a href="movie.html?id=${element.id}&title=${element.title}&image=${element.image}">
            <img src="./image/rating.png" alt="" style="width: 40px;">
          </a>
        </div>`;
        
        image.src = IMG_PATH + element.poster_path;

        // Append elements to create the movie card structure
        center.appendChild(image);
        div_card.appendChild(center);
        div_card.appendChild(title);
        div_column.appendChild(div_card);
        div_row.appendChild(div_column);

        // Add the movie card to the main section
        main.appendChild(div_row);
      });
    });
}

// Add an event listener to the form for submitting search queries
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the default form submission behavior
  main.innerHTML = ''; // Clear the main section to display search results

  const searchItem = search.value; // Get the search query from the input field

  if (searchItem) {
    // If there's a search query, call returnMovies with the SEARCHAPI and the query
    returnMovies(SEARCHAPI + searchItem);
    search.value = ""; // Clear the input field after submitting the search
  }
});
