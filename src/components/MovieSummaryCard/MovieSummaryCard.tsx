import React from 'react';
import { Movie } from '../../types/Movie';
import Body from '../typography/body/Body';
import styles from './MovieSummaryCard.module.css';
import { COLORS } from '../../constants/theme';
import NFilmLogo from '../../assets/images/n_film.png';
import useWindowDimensions from '../../hooks/useWindowDimensions';

type Props = {
	movieId: string;
	style?: React.CSSProperties
}

const MOCK_MOVIE: Movie = {
	cast: ['Leonardo DiCaprio', 'Arnold Schwarzenegger'],
	genres: ['Dutch', 'Drama Movies'],
	length: 104,    
	description: 'Following a dispute with his father, a young man falls prey to cryptocurrency’s allure and an entrepreneur’s audacious promises of financial freedom',
	minAge: 13,
	releaseYear: 2023,
	tags: ['Bittersweet, Heartfelt'],
	thumbnailUri: 'https://occ-0-1489-1490.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABVSUiLpLYI2DWzeq77wNMEx94Y4k8AKHF3qIIyT7ColWAcaGrWrWm4B1LsUs8RSt0ZVcF4ut0PWHoBaA5ucjL0RaBtqAPvVFEwSk.webp?r=9fc',
};

export default function MovieSummaryCard({ movieId, style }: Props) {
	const [movieData, setMovieData] = React.useState<Movie | undefined>();
	const [boxShadow, setBoxShadow] = React.useState<string>('0px 0px 56px -1px rgba(0,0,0,0.4)');
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	
	const { height, width } = useWindowDimensions();

	React.useEffect(() => {
		setIsLoading(true);
		setTimeout(() => {
			setMovieData(MOCK_MOVIE);
			setIsLoading(false);
		}, 300);
        
	}, [movieId]);

	React.useEffect(() => {
		window.addEventListener('mousemove', getMousePosition);
		return () => window.removeEventListener('mousemove', getMousePosition);
	});

	const getMousePosition = (e: { x: number, y: number; }) => {
		const shadowX = -(e.x - width / 2) / 20;
		const shadowY = -(e.y - height / 2) / 20;

		setBoxShadow(`${shadowX}px ${shadowY}px 56px -1px rgba(0,0,0,0.4)`);
	};

	const duration = React.useMemo(() => {
		if (!movieData?.length) {
			return '0';
		}

		const { length } = movieData;

		const hours = Math.floor(length/60);
		const minutes = length % 60;

		return `${hours}:${String(minutes).padStart(2, '0')}`;
	}, [movieData?.length]);

	return (
		<div className={styles.container} style={{...{boxShadow}, ...style}}>
			
			{/* Preview Container */}
			<div className={styles.thumbnailContainer}>
				<img
					className={styles.thumbnail}
					src={movieData?.thumbnailUri} />
				<div className={styles.overlayGradient} />
				{!isLoading && <img className={styles.filmLogo} src={NFilmLogo} />}
			</div>

			{<div className={styles.summaryContainer}>

				{/* Summary Container Left */}
				<div className={styles.leftSummary}>
					<div style={{display: 'flex'}}>
						<Body type={2}
							color={COLORS.neutral[500]}
							text={`${movieData?.releaseYear}  ${duration}h`}
						/>
						<div className={styles.HDContainer}>
							<Body type={2} text='HD' />
						</div>
					</div>
					<div className={styles.ageContainer}>
						<Body type={2} text={`${movieData?.minAge}+`} />
					</div>
					<Body type={2}
						color={COLORS.neutral[500]}
						text={movieData?.description}
					/>
				</div>

				{/* Summary Container Right */}
				<div className={styles.rightSummary}>
					<div style={{ display: 'flex', marginBottom: 10}}>
						<Body type={2}
							color={COLORS.neutral[500]}
							text={'Cast:'}
						/>
						<Body type={2}
							text={movieData?.cast.toString()}
						/>
					</div>
					<div style={{display: 'flex', marginBottom: 10}}>
						<Body type={2}
							color={COLORS.neutral[500]}
							text={'Genres: '}
						/>
						<Body type={2}
							text={movieData?.genres.toString()}
						/>
					</div>
					<div style={{display: 'flex'}}>
						<Body type={2}
							color={COLORS.neutral[500]}
							text={'This movie is: '}
						/>
						<Body type={2}
							text={movieData?.tags.toString()}
						/>
					</div>
				</div>
			</div>}
		</div>
	);
}