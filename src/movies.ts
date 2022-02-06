import { getFlag, getMovie, getCountry } from "./apicalls";
const renderHtmlMovies = (title: string, actors: string, year: number | string) => {
  const html =
    ` <div class="movie">
          <li class="movie-title">Movie Title: ${title}</li>          
          <li class="release-year">${year} years ago was this movie released</li>
            <li class="movie-actors">actors: ${actors}</li>
                
                </div> `
  injectPlacemovie.innerHTML = "";
  injectPlacemovie.insertAdjacentHTML("beforeend", html);
}
const renderHtmlcountries = (countryname: string, currency: string, flag: string) => {



  const html =
    `            <div  class=countries>
                    <li class="country">Country: ${countryname}</li>
                    <li class="currency">Currency: ${currency}</li>  
                    <img src="${flag}" alt="" class="flag">

                </div> `

  injectPlaceforcountry.insertAdjacentHTML("beforeend", html);
}

function convertToNames(actorNames: string) {
      const actors = actorNames.split(",");
      const filtered = actors.map((actor) => {
      return actor.trim().split(" ")[0];
    });
  const actorsString = filtered.toString()

  return actorsString;
}

function releasedYear(year: number) {
  const currentYear: number = 2022;
  const filmYear: number = year;
  let yearsAgo: number | string;
  if (currentYear - filmYear >= 1) {
    yearsAgo = currentYear - filmYear;
  } else {
    yearsAgo = "Few month ";
  }
  return yearsAgo;
};


const injectPlaceforcountry  = <HTMLElement> document.querySelector(".country-info");
const injectPlacemovie = <HTMLElement> document.querySelector(".movie-info");
const search = <HTMLButtonElement> document.querySelector(".search-button");

export function movieSearch() {
  search.addEventListener('click', (event: MouseEvent) => {
    injectPlaceforcountry.innerHTML = "";
    injectPlacemovie.innerHTML = "";
    moviesData(event);
  });
}


export interface moviesData {
  title: string;
  actors: string;
  year: number;
  countryarray: string[];
  runtime: number;
  response: string;
  
  
}


async function moviesData(event:MouseEvent ):Promise <moviesData | undefined>  {
  event.preventDefault();
  const contentInput :HTMLInputElement = <HTMLInputElement> document.querySelector(".movie-input");
  const movie: moviesData = await getMovie(contentInput.value);

  if (movie.response == "False") {
    
    injectPlaceforcountry.innerText = "Movie not found!";
    return;
  }

  const title = movie.title
  const actors = convertToNames(movie.actors);
  const year = releasedYear(movie.year);

  renderHtmlMovies(title, actors, year);

  const countryarray = movie.countryarray;
  await generateCountryData(countryarray);
}



interface CountryData {
  countryName: string[];
  currencies: string;
  flagName: string;
  flags: string;
  
}

async function generateCountryData(countriesName: string[]){
  for (let country of countriesName) {
    const countryName = await getCountry(country);
    const currencies = Object.keys(countryName[0].currencies)[0];
    const flagName = countryName[0].altSpellings[0];
    const flags = getFlag(flagName).toLowerCase();
    renderHtmlcountries(country, currencies, flags);

  }
  
}










