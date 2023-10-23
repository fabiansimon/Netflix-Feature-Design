import React from 'react';
import styles from './MatchTasteView.module.css';
import Headline from '../../components/typography/headline/Headline';
import Body from '../../components/typography/body/Body';

type Props = {}

export default function MatchTasteView({ }: Props) {
	const { opacity, height } = React.useMemo(() => {
		return {
			opacity: 0.1,
			height: '200%',
		};
	}, []);

	return (
		<div className={styles.container}>
			<div style={{marginLeft: 'auto', marginRight: 'auto'}}>
				<div>
					<Headline
						style={{textAlign: 'center'}}
						type={1} text='Movie Night' />
					<Body
						style={{textAlign: 'center', marginTop: 10}}
						text='Let your film and TV tastes collide for the ultimate binge-worthy movie night' />
				</div>
			</div>
			<div className={styles.gradientIndicator} style={{ opacity, height }}></div>
		</div>
	);
}