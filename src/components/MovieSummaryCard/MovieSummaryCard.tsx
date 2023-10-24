import React from 'react';
import { Movie } from '../../types/Movie';

type Props = {
    movieId: string;
}

const MOCK_MOVIE: Movie = {
	cast: ['Leonardo DiCaprio', 'Arnold Schwarzenegger'],
	genres: ['Dutch', 'Drama Movies'],
	length: 103,    
	description: 'Following a dispute with his father, a young man falls prey to cryptocurrency’s allure and an entrepreneur’s audacious promises of financial freedom',
	minAge: 13,
	releaseDate: 2023,
	tags: ['Bittersweet, Heartfelt'],
	thumbnailUri: 'www.google.com',
};

export default function MovieSummaryCard({ movieId }: Props) {
	// const [movieData, setMovieData] = React.useState<Movie | undefined>();
	// const [isLoading, setIsLoading] = React.useState<boolean>(false);

	React.useEffect(() => {
		// setIsLoading(true);
		setTimeout(() => {
			// setMovieData(MOCK_MOVIE);
			// setIsLoading(false);
		}, 300);
        
	}, [movieId]);

	return (
		<div>MovieSummaryCard</div>
	);
}