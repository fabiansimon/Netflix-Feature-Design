import axios from 'axios';
import thumbnails from '../data/thumbnailData.json';
import actors from '../data/actorsData.json';
import netflixGenres from '../data/genreData.json';
import { MovieResponse, MovieSearchResult } from '../types/Movie';
import OpenAI from 'openai';

const RANDOM_MOVIE_API = 'https://api.reelgood.com/v3.0/content/random?availability=onSources&content_kind=both&nocache=true&region=us&sources=netflix&spin_count=1';

const openai = new OpenAI({
	apiKey: process.env.REACT_APP_CHATGPT_API_KEY,
	dangerouslyAllowBrowser: true
});

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

async function searchMovieByPrompt(term: string): Promise<MovieSearchResult[] | undefined> {//#endregion
	const prompt = `return a list of max. 5 movies that fit following input: ${term}`;
	const schema = {
		'type': 'object',
		'properties': {
			'title': {
				'type': 'string',
				'description': 'Title of the movie'
			},
			'description': {
				'type': 'string',
				'description': 'Short description of move (max 100 characters)'
			},
			'cast': {
				'type': 'array',
				'description': 'List of actors in the movie (name max. 3)',
				'items': {'type': 'string'}
			},
			'releaseYear': {
				'type': 'number',
				'description': 'the year when the movie was released',
			}
		}
	};

	console.log('CALLED WITH TERM:', term);

	try {
		const res = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo-0613',
			messages: [
				{ role: 'system', 'content': 'You are a helpful movie search engine.' },
				{ role: 'user', content: prompt }],
			functions: [{ name: 'get_movies', parameters: schema }],
			function_call: { name: 'get_movies' }
		});

		const data = res.choices[0].message.function_call?.arguments;
		console.log(JSON.parse(data!));
	} catch (error) {
		console.error(error);
	}

	const cast: string[] = [];

	const seed = getRandomNr(3);
	for (let i = 0; i < seed; i++) {
		cast.push(actors[getRandomNr(actors.length - 1)].name);
	}

	const mock = {
		title: 'Test Title',
		description: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Ipsum Lorem Ipsum Lorem Ipsum Ipsum Lorem Ipsum Lorem Ipsum Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Ending',
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