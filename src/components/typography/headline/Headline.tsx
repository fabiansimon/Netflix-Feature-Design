import React from 'react';
import { useMemo } from 'react';
import { COLORS } from '../../../constants/theme';
import styles from './Headline.module.css';

type Props = {
  text?: string,
  type?: number,
  color?: string,
  style?: React.CSSProperties,
  onPress?: () => void,
}

export default function Headline({ text, type = 1, color = COLORS.shades[0], onPress, style}: Props) {

	const { fontSize } = useMemo(() => {
		if (type == 1) return {
			fontSize: 36, 
		};

		return {
			fontSize: 22 // Default size
		};
	}, []);

	return (
		<div
			onClick={onPress}
			className={`${styles.headlineText} custom-font`} style={{...{ color, fontSize, cursor: 'pointer' }, ...style}}>{text}</div>
	);
}