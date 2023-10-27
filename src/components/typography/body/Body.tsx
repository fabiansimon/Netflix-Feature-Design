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

	const { fontSize, fontWeight} = React.useMemo(() => {
		if (type === 3) return {
			fontSize: 10,
			fontWeight: 300,
		};

		if (type === 2) return {
			fontSize: 12,
			fontWeight: 300,
		};

		return {
			fontSize: 14, // Default size
			fontWeight: 300,
		};
	}, []);

	return (
		<div
			onClick={onPress}
			style={{ ...{ color, fontSize, fontWeight, cursor: 'pointer' }, ...style, }}
			className={`${styles.bodyText} custom-font`}
		>{text || children}</div>
	);
}