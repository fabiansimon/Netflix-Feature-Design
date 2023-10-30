import React from 'react';
import styles from './MatchTasteView.module.css';
import Headline from '../../components/typography/headline/Headline';
import Body from '../../components/typography/body/Body';
import SearchInput from '../../components/SearchInput/SearchInput';
import Button from '../../components/Button/Button';
import {ReactComponent as PlaybuttonIcon} from '../../assets/icons/playbutton.svg';
import { COLORS } from '../../constants/theme';
import UserMatchContainer from '../../components/UserMatchContainer/UserMatchContainer';
import { User } from '../../types/User';
import MovieSummaryCard from '../../components/MovieSummaryCard/MovieSummaryCard';
import AnimatedText from '../../components/AnimatedText/AnimatedText';
import { fetchRandomMovie } from '../../services/movieService';
import { Movie } from '../../types/Movie';
import SearchModal from '../../components/SearchModal/SearchModal';

const MOCK_USER: User = {
	id: '1',
	name: 'Fabian',
	email: 'fabian.simon98@gmail.com',
};

const MAX_OPACITY = .2;
const MAX_HEIGHT = 300; // in percentage
const USERS_AMOUNT = 2; 

export default function MatchTasteView() {
	const [matchPercentages, setMatchPercentages] = React.useState<number[]>(Array(USERS_AMOUNT).fill(0));
	const [searchModalVisible, setSearchModalVisible] = React.useState<boolean>(false);
	const [overallMatch, setOverallMatch] = React.useState<number>(0);
	const [movieData, setMovieData] = React.useState<Movie | null>(null);

	React.useEffect(() =>  {
		handleNextMovie();
	}, []);

	React.useEffect(() => {
		const ratedUsers = matchPercentages.filter((m) => m != 0);
		if (ratedUsers.length != USERS_AMOUNT) return;

		const average = matchPercentages.reduce((acc, curr) => {
			if (curr != 0) return acc + curr;
			return acc;
		}, 0) / ratedUsers.length;

		setOverallMatch(average || 0);
	}, [matchPercentages]);

	const { opacity, height } = React.useMemo(() => {
		return {
			opacity: MAX_OPACITY * overallMatch,
			height: `${MAX_HEIGHT * overallMatch}%`,
		};
	}, [overallMatch]);

	const updateRatingAtIndex = (index: number, val: number) => {
		setMatchPercentages(prev => {
			const arr = [...prev];
			arr[index] = val;
			return arr;
		});
	};

	const handleMovieBySearch = (id: string) => {
		console.log(id);
		handleNextMovie();
	};

	const handleNextMovie = async () => {
		setMatchPercentages(Array(USERS_AMOUNT).fill(0));
		const data = await fetchRandomMovie();
		if (!data) return;
		
		const {
			classification: minAge,
			genres, id,
			overview: description,
			released_on: releaseYear,
			runtime: length,
			title,
			cast,
			thumbnail: thumbnailUri
		} = data;

		setMovieData({
			description,
			genres,
			id,
			length,
			minAge,
			releaseYear,
			title,
			tags: ['Bittersweet, Heartfelt'],
			thumbnailUri,
			cast,
		});
	};

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
						onAskNelly={()=>setSearchModalVisible(true)}
					/>

					{/* Main Content Section */}
					<div className={styles.contentContainer}>
						<div style={{display: 'flex', flex: 1, flexDirection: 'column'}}>
							<UserMatchContainer
								movieId={movieData?.id || ''}
								user={MOCK_USER}
								onFinishLoading={(match)=>updateRatingAtIndex(0, match)}
							/>
							<div className={matchPercentages[0] > 0 ? styles.leftDottedLine : ''} />
						</div>
						<MovieSummaryCard
							style={{marginInline: 50, flex: 2}}
							movieData={movieData!}
						/>

						<div style={{display: 'flex', flex:1,flexDirection: 'column'}}>
							<UserMatchContainer
								movieId={movieData?.id || ''}
								user={MOCK_USER}
								onFinishLoading={(match)=>updateRatingAtIndex(1, match)}
							/>
							<div className={matchPercentages[1] > 0 ? styles.rightDottedLine : ''} />
						</div>
					</div>

					
					{/* Match Percentage Section */}
					<div style={{ marginBottom: 50, width: '50%' }}>
						<div style={{marginTop: 30}}>
							<AnimatedText target={(overallMatch * 100)} postfix='%' />
							<Headline
								type={3}
								style={{textAlign: 'center'}}
								color={COLORS.success[700]}
								text='overall match'
							/>
						</div>
					</div>

					{/* Button Section */}
					<div style={{display: 'flex'}}>
						<Button
							string='Skip'
							isSecondary
							onPress={handleNextMovie}
						/>
						<Button
							string='Play'
							style={{marginLeft: 20}}
							icon={<PlaybuttonIcon height={18} width={18} />}
							onPress={() => window.location.href='https://www.netflix.com'}
						/>
					</div>

					
				</div>
			</div>

			{/* Search Modal */}
			<SearchModal
				onPress={(movieId: string) => {
					handleMovieBySearch(movieId);
					setSearchModalVisible(false);
				}}
				isVisible={searchModalVisible}
				onRequestClose={() => setSearchModalVisible(false)}
			/>
		</div>
	);
}