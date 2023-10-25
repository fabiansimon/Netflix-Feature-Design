import React from 'react';
import styles from './MatchTasteView.module.css';
import Headline from '../../components/typography/headline/Headline';
import Body from '../../components/typography/body/Body';
import SearchInput from '../../components/SearchInput/SearchInput';
import Button from '../../components/Button/Button';
import {ReactComponent as PlaybuttonIcon} from '../../assets/icons/playbutton.svg';
import { COLORS } from '../../constants/theme';
import MovieSummaryCard from '../../components/MovieSummaryCard/MovieSummaryCard';
import UserMatchContainer from '../../components/UserMatchContainer/UserMatchContainer';
import { User } from '../../types/User';

const MOCK_USER: User = {
	id: '1',
	name: 'Fabian',
	email: 'fabian.simon98@gmail.com',
};

const MAX_OPACITY = .1;
const MAX_HEIGHT = 300; // in percentage

export default function MatchTasteView() {
	const [matchPercentage, setMatchPercentage] = React.useState<number>(0);
	const [movieId, setMovieId] = React.useState<string>('1234');

	const { opacity, height } = React.useMemo(() => {
		return {
			opacity: MAX_OPACITY * matchPercentage,
			height: `${MAX_HEIGHT * matchPercentage}%`,
		};
	}, [matchPercentage]);

	return (
		<div className={styles.container}>
			<div className={styles.gradientIndicator} style={{ opacity, height }}></div>
			<div style={{marginLeft: 'auto', marginRight: 'auto', zIndex: 1, marginTop: 20}}>
				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					
					{/* Header Section */}
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

					{/* Main Content Section */}
					<div className={styles.contentContainer}>
						<UserMatchContainer
							style={{flex: 1}}
							movieId={movieId}
							user={MOCK_USER}
							onFinishLoading={(match)=>console.log(match)}
						/>
						<MovieSummaryCard
							style={{marginInline: 50, flex: 2}}
							movieId={movieId} 
						/>
						<UserMatchContainer
							style={{flex: 1}}
							movieId={movieId}
							user={MOCK_USER}
							onFinishLoading={(match)=>console.log(match)}
						/>
					</div>

					{/* Match Percentage Section */}
					<div style={{marginTop: 36, marginBottom: 50}}>
						<Headline
							style={{ fontSize: 56, textAlign: 'center' }}
							color={COLORS.success[700]}
							text={`${(matchPercentage*100).toFixed(0)}%`} />
						<Headline
							type={3}
							style={{textAlign: 'center'}}
							color={COLORS.success[700]}
							text='overall match' />
					</div>

					{/* Button Section */}
					<div style={{display: 'flex'}}>
						<Button
							string='Skip'
							isSecondary
							onPress={() => {
								setMatchPercentage(Math.random());
								setMovieId('213213');
							}}
						/>
						<Button
							string='Play'
							style={{marginLeft: 20}}
							icon={<PlaybuttonIcon height={18} width={18} />}
							onPress={()=>console.log('Play')}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}