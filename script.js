const buttonElement = document.querySelector(".btn");
const movieElement = document.querySelector(".movie");
const moviePoster = document.querySelector(".movie-image");
const releaseYear = document.querySelector(".year");
const directorName = document.querySelector(".director");
const category = document.querySelector(".genre");
const actorsName = document.querySelector('.actors')
const searchInput = document.querySelector(".movie-input");

const api_url = "https://www.omdbapi.com/?apikey=c04dc933";

async function getMovieDetails(movieName) {
  try {
    //if (!movieName) {
    //    movieElement.innerHTML = "Please enter a valid movie name!";
    //    return;
    //  }

    const url = `${api_url}&t=${movieName}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("The response:", data);
    const title = data.Title;
    console.log("The title:", title);

    if (data.Response === "False") {
      movieElement.innerHTML = "Movie not found!";
      moviePoster.src = null
      releaseYear.innerHTML = ""
      directorName.innerHTML = ""
      category.innerHTML = ""
      actorsName.innerHTML = ""
      return;
    }

    movieElement.innerHTML = `Movie name: ${data.Title}`;
   
    moviePoster.src = data.Poster;
    releaseYear.innerHTML = `Released at: ${data.Released}`;
    directorName.innerHTML = `Directed by: ${data.Director}`;
    category.innerHTML = `Genre: ${data.Genre}`;
    actorsName.innerHTML = `Actors: ${data.Actors}`

    document.querySelector('.movie-area').style.display = 'block'
    
  } catch (error) {
    console.log("Couldnt get data :(", error);
  }
}
buttonElement.addEventListener("click", function () {
  const movieName = searchInput.value.trim();
  if (movieName) {
    movieElement.innerHTML = "Loading..."; // Optional: Show a loading message while fetching data
    getMovieDetails(movieName);
  } else {
    movieElement.innerHTML = "Please enter a movie name!";
  }
  
});
// Initially hide the "Please enter a valid movie name!" message
movieElement.innerHTML = ""; 

