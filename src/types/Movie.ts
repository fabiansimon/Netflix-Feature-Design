export type Movie = {
    id: string;
    releaseYear: string;
    title: string;
    length: number;
    description: string;
    thumbnailUri: string;
    minAge: number;
    cast: string[];
    genres: string[];
    tags: string[];
}

export type MovieResponse = {
    id: string;
    released_on: string;
    title: string;
    runtime: number;
    overview: string;
    classification: number;
    genres: string[];
    cast: string[];
    thumbnail: string;
}

export type MovieSearchResult = {
    id: string; 
    description: string;
    title: string;
    cast: string[],
    thumbnail: string
}