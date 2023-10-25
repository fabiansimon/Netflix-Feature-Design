import React, { ReactElement } from 'react';
import Headline from '../typography/headline/Headline';
import { COLORS } from '../../constants/theme';
import styles from './Button.module.css';

type Props = {
    string: string,
    icon?: ReactElement,
    onPress: () => void,
    style?: React.CSSProperties,
    isSecondary?: boolean,
}

export default function Button({ string, icon, onPress, isSecondary = false, style }: Props) {
	const { backgroundColor, fontColor } = React.useMemo(() => {
		if (isSecondary) {
			return {
				backgroundColor: COLORS.neutral[700],
				fontColor: COLORS.shades[0],
			};
		}
        
		return {
			backgroundColor: COLORS.shades[0],
			fontColor: COLORS.shades[100],
		};
	}, [isSecondary]);

	return (
		<button
			onClick={onPress}
			className={styles.container} style={{...{ backgroundColor },...style}}
		>
			<div style={{marginRight: 6, marginTop: 4}}>
				{icon}
			</div>
			<Headline
				type={3}
				text={string}
				color={fontColor}
			/>
		</button>
	);
}