import { getMovie, getCountry } from "./apicalls";
import { moviesData } from "./movies";
const renderHtmlpopulation = (population: number, Runtime:number) => {



    const html =
        `            <div  class=population>
                      <li class="country">Population: ${population}</li>
                      <li class="currency">Total minutes: ${Runtime}</li>  
                     
                  </div> `

    injectPlace.insertAdjacentHTML("beforeend", html);
}

const injectPlace = <HTMLElement> document.querySelector(".population-content");
const searchbutton = <HTMLButtonElement> document.querySelector(".search-button2");

export function populationCounter() {

    searchbutton.addEventListener('click', (event: MouseEvent) => {
        injectPlace.innerHTML = "";
        moviesData2(event);
    });
}

async function moviesData2(event: MouseEvent)  {
    event.preventDefault();
    const movieinput1 :HTMLInputElement = <HTMLInputElement> document.querySelector(".movie-input1");
    const movieinput2 :HTMLInputElement =  <HTMLInputElement> document.querySelector(".movie-input2");
    const movieinput3 :HTMLInputElement =  <HTMLInputElement> document.querySelector(".movie-input3");


    const movie1: moviesData = await getMovie(movieinput1.value);
    const movie2: moviesData = await getMovie(movieinput2.value);
    const movie3: moviesData = await getMovie(movieinput3.value);

    let responses = [movie1.response, movie2.response, movie3.response];
    const chekedresponses = responses.includes("True");
    if (chekedresponses == false) {
        injectPlace.innerText = "Movie not found!";
        return;
    }



    const splitedCountryArray: string[]= makeuniqecountries(movie1, movie2, movie3);


    const moviesRuntime = minutesSumfunction(movie1, movie2, movie3)


    const population = await generatepopulationData(splitedCountryArray);
    renderHtmlpopulation(population, moviesRuntime);
}


async function generatepopulationData(countriesName: string[]) {
    let population = 0;
    for (let country of countriesName) {
        const countryName = await getCountry(country);
        population += countryName[0].population;

    }
    return population;
}


function minutesSumfunction(movie1:moviesData, movie2:moviesData, movie3:moviesData) {
    const movieInputArray = [movie1.runtime, movie2.runtime, movie3.runtime];
    const filteredMovieInputArray = movieInputArray.filter(function (elem) {
        return !isNaN(elem);
    });
    const minutesSum = filteredMovieInputArray.reduce((x, y) => x + y);
    return minutesSum;

}

function makeuniqecountries(movie1: moviesData, movie2: moviesData, movie3: moviesData): string[] {
    const movieCountryArray = [movie1.countryarray, movie2.countryarray, movie3.countryarray].flat();
    const filteredArray = movieCountryArray.filter(function (elem) {
        return elem !== undefined;
    });
    return [...new Set(filteredArray)] 
    
}