import thumbnails from '../data/thumbnailData.json';
import movies from '../data/movieData.json';
import { MovieResponse, MovieSearchResult } from '../types/Movie';
import OpenAI from 'openai';
import { Utils } from '../utils/common';


const openai = new OpenAI({
	apiKey: process.env.REACT_APP_CHATGPT_API_KEY,
	dangerouslyAllowBrowser: true
});


async function fetchRandomMovie(): Promise<MovieResponse | undefined> {
	const { 
		id,
		title,
		year,
		runtime,
		genres,
		actors,
		plot
	} = movies.movies[Utils.getRandomNumber(movies.movies.length - 1)];

	try {
		return {
			id: id.toString(),
			released_on: year,
			genres: genres,
			overview: plot,
			runtime: +runtime,
			cast: actors.split(','),
			classification: Utils.getRandomNumber(18),
			thumbnail: thumbnails[Utils.getRandomNumber(thumbnails.length - 1)],
			title,
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