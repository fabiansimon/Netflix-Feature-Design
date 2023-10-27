import React from 'react';
import { MovieSearchResult } from '../../types/Movie';
import styles from './ResultMovieCard.module.css';
import Body from '../typography/body/Body';
import Headline from '../typography/headline/Headline';
import { COLORS } from '../../constants/theme';

type Props = {
	movie: MovieSearchResult,
	style: React.CSSProperties
}

export default function ResultMovieCard({movie: {title, description, thumbnail, cast}, style}: Props) {
	return (
		<div className={styles.container} style={style}>
			<div className={styles.topContainer}>
				<img
					className={styles.thumbnail}
					src={thumbnail}
				/>
				<div className={styles.overlayGradient}/>
			</div>
			<div className={styles.descriptionContainer}>
				<Headline type={3} text={title} />
				<Body
					type={1}
					style={{marginTop: 10}}
					color={COLORS.neutral[500]}	
					text={description}
				/>
				<div style={{ display: 'flex', bottom: 0}}>
					<Body 
						color={COLORS.neutral[500]}
						text={'Cast:'}
					/>
					<Body text={cast.toString()}
					/>
				</div>
			</div>
		</div>
	);
}