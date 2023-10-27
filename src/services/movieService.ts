import axios from 'axios';
import thumbnails from '../data/thumbnailData.json';
import actors from '../data/actorsData.json';
import netflixGenres from '../data/genreData.json';
import { MovieResponse, MovieSearchResult } from '../types/Movie';

const RANDOM_MOVIE_API = 'https://api.reelgood.com/v3.0/content/random?availability=onSources&content_kind=both&nocache=true&region=us&sources=netflix&spin_count=1';

function getRandomNr(max: number) {
	return Math.floor(Math.random() * max) + 1;
}

async function fetchRandomMovie(): Promise<MovieResponse | undefined> {
	const cast: string[] = [];

	const seed = getRandomNr(5);
	for (let i = 0; i < seed; i++) {
		cast.push(actors[getRandomNr(actors.length - 1)].name);
	}

	try {
		const {data} = await axios.get(RANDOM_MOVIE_API);
		
		return {
			...data,
			thumbnail: thumbnails[getRandomNr(thumbnails.length - 1)],
			cast,
			genres: netflixGenres[getRandomNr(netflixGenres.length-1)]
		};
	} catch (error) {
		console.log(error);
	}
}

async function searchMovieByPrompt(term: string): Promise<MovieSearchResult[] | undefined> {
	const cast: string[] = [];

	const seed = getRandomNr(5);
	for (let i = 0; i < seed; i++) {
		cast.push(actors[getRandomNr(actors.length - 1)].name);
	}

	const mock = {
		title: 'Test Title',
		description: 'Lorem Ipsum lkfjödlkfjadösljfösdalkjf',
		thumbnail: thumbnails[getRandomNr(thumbnails.length - 1)],
		cast,
		id: term,
	};

	try {
		// const {data} = await axios.get(RANDOM_MOVIE_API);
		return Array(seed*2).fill(mock);
	} catch (error) {
		console.log(error);
	}
}


export {fetchRandomMovie, searchMovieByPrompt};