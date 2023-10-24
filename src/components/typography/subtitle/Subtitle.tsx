import React from 'react';
import { useMemo } from 'react';
import { COLORS } from '../../../constants/theme';
import styles from './Subtitle.module.css';

type Props = {
  text?: string,
  type?: number,
  color?: string,
  style?: React.CSSProperties,
  onPress?: () => void,
}

export default function Subtitle({ text, type = 1, color = COLORS.shades[0], onPress, style }: Props) {

	const { fontSize } = useMemo(() => {
		if (type === 2) {
			// return other type
		}
		
		return {
			fontSize: 13 // Default size
		};
	}, []);

	return (
		<div
			onClick={onPress}
			className={`${styles.subtitleText} custom-font`} style={{...{ color, fontSize, cursor: 'pointer' }, ...style}}>{text}</div>
	);
}