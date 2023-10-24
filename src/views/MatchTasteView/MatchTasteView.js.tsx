import React from 'react';
import styles from './MatchTasteView.module.css';
import Headline from '../../components/typography/headline/Headline';
import Body from '../../components/typography/body/Body';
import SearchInput from '../../components/SearchInput/SearchInput';
import MovieSummaryCard from '../../components/MovieSummaryCard/MovieSummaryCard';
// import UserMatchContainer from '../../components/UserMatchContainer/UserMatchContainer';
// import { User } from '../../types/User';

// const MOCK_USER: User = {
// 	id: '1',
// 	name: 'Fabian',
// 	email: 'fabian.simon98@gmail.com',
// };

export default function MatchTasteView() {

	const { opacity, height } = React.useMemo(() => {
		return {
			opacity: 0.1,
			height: '200%',
		};
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.gradientIndicator} style={{ opacity, height }}></div>
			<div style={{marginLeft: 'auto', marginRight: 'auto', zIndex: 1, marginTop: 20}}>
				<div>
					<Headline
						style={{textAlign: 'center'}}
						type={1} text='Movie Night' />
					<Body
						style={{textAlign: 'center', marginTop: 10}}
						text='Let your film and TV tastes collide for the ultimate binge-worthy movie night' />
					<SearchInput
						style={{justifyContent: 'center', marginTop: 23}}
						placeholder='Titles, people, genres'
					/>
					<div className={styles.contentContainer}>
						{/* <UserMatchContainer
							movieId='1234'
							user={MOCK_USER}
							onFinishLoading={(match)=>console.log(match)}
						/> */}
						<MovieSummaryCard movieId={'1234'} />
						{/* <UserMatchContainer
							movieId='1234'
							user={MOCK_USER}
							onFinishLoading={(match)=>console.log(match)}
						/> */}
					</div>
				</div>
			</div>
		</div>
	);
}