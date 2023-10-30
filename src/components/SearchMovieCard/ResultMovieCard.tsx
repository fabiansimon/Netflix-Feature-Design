import React from 'react';
import { MovieSearchResult } from '../../types/Movie';
import styles from './ResultMovieCard.module.css';
import Headline from '../typography/headline/Headline';
import Body from '../typography/body/Body';
import { COLORS } from '../../constants/theme';
import { Utils } from '../../utils/common';

type Props = {
	movie: MovieSearchResult,
	style?: React.CSSProperties
	onPress: () => void,
}

export default function ResultMovieCard({ movie: { title, description, thumbnail, cast }, style, onPress }: Props) {
	return (
		<div
			onClick={onPress}
			className={styles.container} style={style}>
			<div className={styles.topContainer}>
				<img
					className={styles.thumbnail}
					src={thumbnail}
				/>
				<div className={styles.overlayGradient}/>
			</div>
			<Headline
				style={{marginTop: 6, marginLeft: 8}}
				type={3}
				text={Utils.ellipseString(title, 30)}
			/>
			<div className={styles.description}>
				<Body
					type={1}
					color={COLORS.neutral[500]}
					text={Utils.ellipseString(description, 75)}
				/>

			</div>
			<div className={styles.bottom}>
				<Body
					color={COLORS.neutral[500]}
					text={'Cast: '}
				/>
				<Body
					color={COLORS.shades[0]}
					text={Utils.formatArray(cast)}
				/>
			</div>
		</div>
	);
}