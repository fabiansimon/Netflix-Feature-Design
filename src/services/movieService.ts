import axios from 'axios';
import thumbnails from '../data/thumbnailData.json';
import actors from '../data/actorsData.json';
import netflixGenres from '../data/genreData.json';
import { MovieResponse, MovieSearchResult } from '../types/Movie';
import OpenAI from 'openai';
import { Utils } from '../utils/common';

const RANDOM_MOVIE_API = 'https://api.reelgood.com/v3.0/content/random?availability=onSources&content_kind=both&nocache=true&region=us&sources=netflix&spin_count=1';

const openai = new OpenAI({
	apiKey: process.env.REACT_APP_CHATGPT_API_KEY,
	dangerouslyAllowBrowser: true
});


async function fetchRandomMovie(): Promise<MovieResponse | undefined> {
	const cast: string[] = [];
 
	const seed = Utils.getRandomNumber(5);
	for (let i = 0; i < seed; i++) {
		cast.push(actors[Utils.getRandomNumber(actors.length - 1)].name);
	}

	try {
		const {data} = await axios.get(RANDOM_MOVIE_API);
		
		return {
			...data,
			thumbnail: thumbnails[Utils.getRandomNumber(thumbnails.length - 1)],
			cast,
			genres: netflixGenres[Utils.getRandomNumber(netflixGenres.length-1)]
		};
	} catch (error) {
		console.log(error);
	}
}

async function searchMovieByPrompt(term: string): Promise<MovieSearchResult[] | undefined> {
	const prompt = `
		Return an array of maximum 5 movies that fit following description: ${term}.
		Do not include any explanations, only provide a RFC8259 compliant JSON response following this format without deviation.
		[{
		"title": "title of movie",
		"description": "description of movie",
		"cast": "short list of the cast of the movie",
		}]
	`;
	
	try {
		const res = await openai.chat.completions.create({
			model: 'gpt-4',
			messages: [
				{ role: 'system', content: 'You are an expert movie search engine' },
				{ role: 'user', content: prompt },
			],
		});
		
		const data = JSON.parse(res.choices[0].message.content!).map((item: MovieSearchResult) => {
			return {
				...item,
				id: `${Utils.getRandomNumber(10)}`,
				thumbnail: thumbnails[Utils.getRandomNumber(thumbnails.length - 1)],
			};
		});

		return data;
	} catch (error) {
		console.error(error);
	}
}


export {fetchRandomMovie, searchMovieByPrompt};