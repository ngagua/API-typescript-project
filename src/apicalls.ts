import { moviesData } from "./movies";
export function getMovie(title: string): Promise<moviesData> {
    return fetch(`http://www.omdbapi.com/?t=${title}&apikey=3d7cf028`)
        .then((movies) => movies.json())
        .then(({ Title, Year, Country, Runtime, Actors, Response }) => ({
            title:     Title,
            year: +Year,
            countryarray:     Country?.split(", "),
            runtime:   parseInt(Runtime),
            actors:    Actors,
            response:  Response,
        }));
}
export function getCountry(code: string) {
    return fetch(`https://restcountries.com/v3.1/name/${code}?fullText=true`)
        .then((countries) => countries.json());
}
export function getFlag(country: string) {
    return `https://flagpedia.net/data/flags/icon/36x27/${country}.png`;
}



