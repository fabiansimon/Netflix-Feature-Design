import React from 'react';
import { COLORS } from '../../../constants/theme';
import styles from './Body.module.css';

type Props = {
  text?: string,
  type?: number,
  color?: string,
  style?: React.CSSProperties,
  onPress?: () => void,
}

export default function Body({ text, type = 1, color = COLORS.shades[0], onPress, style }: Props) {

	const { fontSize } = React.useMemo(() => {
		return {
			fontSize: 13 // Default size
		};
	}, []);

	return (
		<div
			onClick={onPress}
			style={{ ...{ color, fontSize, cursor: 'pointer' }, ...style, }}
			className={styles.bodyText}
		>{text}</div>
	);
}