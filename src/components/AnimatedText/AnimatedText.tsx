import React from 'react';
import Headline from '../typography/headline/Headline';
import { COLORS } from '../../constants/theme';

type Props = {
    style?: React.CSSProperties,
    target: number,
    start?: number,
    postfix?: string
    duration?: number
}

export default function AnimatedText({ style, target, postfix, start = 1, duration = 1400 }: Props) {
	const [value, setValue] = React.useState<number>(start);

	React.useEffect(() => {
		let rafId: number; 
		let startTimestamp: number | null = null;

		const animate = (timestamp: number) => {
			if (startTimestamp === null) {
				startTimestamp = timestamp;
			}

			const elapsed = timestamp - startTimestamp;
			const progress = Math.min(elapsed / duration, 1);

			setValue(start + progress * (target - start));

			if (progress < 1) {
				rafId = requestAnimationFrame(animate);
			}
		};

		rafId = requestAnimationFrame(animate);

		return () => {
			cancelAnimationFrame(rafId);
		};
	}, [target, duration]);

	return (
		<Headline
			style={{...{ fontSize: 56, textAlign: 'center' }, ...style}}
			color={COLORS.success[700]}
			text={`${value.toFixed(0)}${postfix}`}
		/>
	);
}