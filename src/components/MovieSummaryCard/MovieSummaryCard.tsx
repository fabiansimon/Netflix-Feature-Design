import React from 'react';
import { Movie } from '../../types/Movie';
import Body from '../typography/body/Body';
import styles from './MovieSummaryCard.module.css';
import { COLORS } from '../../constants/theme';
import NFilmLogo from '../../assets/images/n_film.png';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Headline from '../typography/headline/Headline';
import { Utils } from '../../utils/common';

type Props = {
	movieData: Movie;
	style?: React.CSSProperties
}

const MAX_DESC_LENGTH = 200;

export default function MovieSummaryCard({ movieData, style }: Props) {
	const [boxShadow, setBoxShadow] = React.useState<string>('0px 0px 56px -1px rgba(0,0,0,0.4)');
	
	const { height, width } = useWindowDimensions();

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

	const arrayToString = (inputArr: string[]) => React.useMemo(() => Utils.formatArray(inputArr), [movieData]);

	return (
		<div className={styles.container} style={{...{boxShadow}, ...style}}>
			
			{/* Preview Container */}
			<div className={styles.thumbnailContainer}>
				<img
					className={styles.thumbnail}
					src={movieData?.thumbnailUri} />
				<div className={styles.overlayGradient} />
				<div className={styles.titleContainer}>
					<img className={styles.filmLogo} src={NFilmLogo} />
					<Headline type={3} text={movieData?.title} />
				</div>
			</div>

			{<div className={styles.summaryContainer}>

				{/* Summary Container Left */}
				<div className={styles.leftSummary}>
					<div>
						<div style={{display: 'flex'}}>
							<Body type={2}
								color={COLORS.neutral[500]}
								text={`${movieData?.releaseYear?.substring(0, 4) || 2000}  ${duration || 2}h`}
							/>
							<div className={styles.HDContainer}>
								<Body type={2} text='HD' />
							</div>
						</div>
						<div className={styles.ageContainer}>
							<Body type={2} text={`${movieData?.minAge|| 3}`} />
						</div>
					</div>
					<Body type={2}
						color={COLORS.neutral[500]}
						text={`${movieData?.description.slice(0, MAX_DESC_LENGTH)} ${movieData?.description?.length > MAX_DESC_LENGTH ? '...' : ''}`}
						
					/>
				</div>

				{/* Summary Container Right */}
				<div className={styles.rightSummary}>
					<div style={{ display: 'inline', marginBottom: 20 }}>
						<Body type={2}
							color={COLORS.neutral[500]}
							text={'Cast:'}
							style={{marginRight: 3}}
						/>
						<Body type={2}
							text={arrayToString(movieData?.cast)}
						/>
					</div>
					<div style={{marginTop: 10}}>
						<div style={{display: 'inline', marginBottom: 10}}>
							<Body type={2}
								color={COLORS.neutral[500]}
								text={'Genres:'}
								style={{marginRight: 3}}
							/>
							<Body type={2}
								text={arrayToString(movieData?.genres)}
							/>
						</div>
					</div>
					<div style={{marginTop: 10}}>
						<div style={{display: 'inline'}}>
							<Body type={2}
								color={COLORS.neutral[500]}
								text={'This movie is:'}
								style={{marginRight: 3}}
							/>
							<Body type={2}
								text={arrayToString(movieData?.tags)}
							/>
						</div>
					</div>
				</div>
			</div>}
		</div>
	);
}