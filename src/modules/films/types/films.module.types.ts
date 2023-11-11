export interface IFilm {
    title: string;
    director: string;
    release_date: string;
    characters: string[];
    url: string;
}

export interface IFilmCharacterChart {
    title: string,
    characters: number;
    tooltip: string;
}
