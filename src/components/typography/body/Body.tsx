import React from 'react';
import { COLORS } from '../../../constants/theme';
import styles from './Body.module.css';

type Props = {
  text?: string,
  type?: number,
  color?: string,
  style?: React.CSSProperties,
  children?: React.ReactElement[]
  onPress?: () => void,
}

export default function Body({ text, type = 1, color = COLORS.shades[0], onPress, style, children }: Props) {

	const { fontSize, fontWeight, letterSpacing } = React.useMemo(() => {
		if (type === 3) return {
			fontSize: 12,
			fontWeight: 300,
			letterSpacing: -0.5
		};

		if (type === 2) return {
			fontSize: 12,
			fontWeight: 300,
			letterSpacing: 0
		};

		return {
			fontSize: 14, // Default size
			fontWeight: 300,
			letterSpacing: 0
		};
	}, [type]);

	return (
		<span
			onClick={onPress}
			style={{ ...{ color, fontSize, fontWeight, letterSpacing, cursor: onPress && 'pointer' }, ...style, }}
			className={`${styles.bodyText} custom-font`}
		>{text || children}</span>
	);
}