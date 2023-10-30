import axios from 'axios';
import thumbnails from '../data/thumbnailData.json';
import actors from '../data/actorsData.json';
import netflixGenres from '../data/genreData.json';
import { MovieResponse, MovieSearchResult } from '../types/Movie';
// import OpenAI from 'openai';

const RANDOM_MOVIE_API = 'https://api.reelgood.com/v3.0/content/random?availability=onSources&content_kind=both&nocache=true&region=us&sources=netflix&spin_count=1';

// const openai = new OpenAI({
// 	apiKey: process.env.REACT_APP_CHATGPT_API_KEY,
// 	dangerouslyAllowBrowser: true
// });

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
	// const string = `Please adjust your answer to plain JSON with following specifications: { title as string, description(max 50 words) as string, cast(main 3 actors) as array of strings, releaseYear as number.}. That being said please list maximum 10 movies that include specifications such as ${term}. Please only return data of movies, if none are found please state that no movies match that criteria, Thanks!`;
	// console.log(typeof string);
	// // const res = await openai.chat.completions.create({
	// // 	messages: [{ role: 'system', content:  }],
	// // 	model: 'gpt-3.5-turbo',
	// // });

	// const chatCompletion = await openai.chat.completions.create({
	// 	messages: [{ role: 'user', content: 'Say this is a test' }],
	// 	model: 'gpt-3.5-turbo',
	// });
	
	// console.log(chatCompletion);

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