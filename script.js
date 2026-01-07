let searchForm = document.querySelector("form");
let inp = document.querySelector("input");
let movieContainer = document.querySelector(".container");



//function to fetch Movie information using API
let getMovieInfo = async (movie) => {
    try {
        let myApiKey = "fe765161";
        // let myApiKey = "f71973b0";
        let url = `https://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`;

        let resp = await fetch(url);

        let data = await resp.json();     //to convert in json
        console.log(data);

        showMovieData(data);
    }
    catch {
        // showErrorMessage("No Movie Found!!");
        let imgError = document.createElement("img");
        imgError.classList.add('error-img');
        let img = "https://i.redd.it/ds1luav7dl851.jpg";
        imgError.setAttribute("src", img);
        movieContainer.appendChild(imgError);
    }
}

//Function to show movie data
function showMovieData(data) {
    movieContainer.innerHTML = "";
    movieContainer.classList.remove('noBackground');

    //Use Destructing assignment to extract properties from data object
    let { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;   //Array destructuring -> Apne data se jo hamare kaam ka value hai usko ik baar me yaha array me store krwa rhe

    let movieElement = document.createElement("div");
    movieElement.classList.add("movie-info");

    movieElement.innerHTML = `<h2>${Title}</h2>
                              <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`;

    let movieGenreElement = document.createElement("div");
    movieGenreElement.classList.add("movieGenre");


    //yaha hum Genre string dega jiske bich comma(,) hai thop yaha hum comma se seperate kr rhe sara element ko 
    //jaha comma lga hoga waha se seperate kr dega
    Genre.split(",").forEach(element => {
        let p = document.createElement("p");
        p.innerText = element;
        movieGenreElement.appendChild(p);
    });
    movieElement.appendChild(movieGenreElement);


    //Yaha hum += isliye use kiye ki wo purane innerHtml ko replace na kre uske sath hi isko v add kr de , jo v likha rhega usme last me append kr dega replace nhi krega
    movieElement.innerHTML += `<p><strong>Released Date: </strong>${Released}</p>
                              <p><strong>Duration: </strong>${Runtime}</p>
                              <p><strong>Cast: </strong>${Actors}</p>
                              <p><strong>Plot: </strong>${Plot}</p>  `;


    //Creating a div for movie poster
    let moviePoster = document.createElement("div");
    moviePoster.classList.add("movie-poster");
    moviePoster.innerHTML = `<img src = "${Poster}">`
    movieContainer.appendChild(moviePoster);


    movieContainer.appendChild(movieElement);
}


//Function to display error message
let showErrorMessage = (message) => {
    movieContainer.innerHTML = `<h2>${message}</h2>`;
    movieContainer.classList.add('noBackground');
}
//Adding event listener to search form
searchForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    console.log(inp.value);

    const movieName = inp.value.trim(); //space ko hatane ke liye trim() func ka use krenge
    if (movieName !== '') {
        showErrorMessage("Fetching Movie Information... ");
        getMovieInfo(movieName);
    }
    else {
        showErrorMessage("Enter movie name to get movie information");
    }
})