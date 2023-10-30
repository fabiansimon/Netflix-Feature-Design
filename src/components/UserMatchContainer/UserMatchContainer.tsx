import React from 'react';
import { User } from '../../types/User';
import Headline from '../typography/headline/Headline';
import actors from '../../data/actorsData.json';
import styles from './UserMatchContainer.module.css';
import Body from '../typography/body/Body';
import { COLORS } from '../../constants/theme';
import Avatar from '../Avatar/Avatar';
import {ReactComponent as ChevronDown} from '../../assets/icons/chevron_down_icon.svg';
import Subtitle from '../typography/subtitle/Subtitle';
import ReasonListTile from '../ReasonListTile/ReasonListTile';
import { MatchData, ReasonType } from '../../types/ReasonType';
import { Movie } from '../../types/Movie';
import { Utils } from '../../utils/common';

type Props = {
    user?: User,  
    movieData: Movie | null,
    style?: React.CSSProperties,
    onFinishLoading: (matchPercentage: number) => void,
}

export default function UserMatchContainer({ user, movieData, onFinishLoading, style }: Props) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [matchData, setMatchData] = React.useState<MatchData>();

	if (!user) return <div/>;

	const { name, email } = user;

	const getRandomMockReasons = () => {
		const randActors: string[] = [];

		const seed = Utils.getRandomNumber(3); // number for max listed actors
		for (let i = 0; i < seed; i++) {
			randActors.push(actors[Utils.getRandomNumber(actors.length-1)].name);
		}
		
		const reasons = [
			{
				type: ReasonType.CAST,
				values: randActors,
			},
			{
				type: ReasonType.PLOT,
				values: ['entrepreneurship', 'finance'],
			},
			{
				type: ReasonType.LENGTH,
				values: Math.max((movieData?.length || 100) - Utils.getRandomNumber(20), 12),
			}
		];

		return [reasons[Utils.getRandomNumber(reasons.length - 1)]];

	};
    
	React.useEffect(() => {
		if (!movieData) return;
		setIsLoading(true);
		setTimeout(() => {
			const matchPercentage = Math.random();
			
			setIsLoading(false);
			setMatchData({
				percentage: matchPercentage,
				reasons: getRandomMockReasons()
			});
			onFinishLoading(matchPercentage);
		}, Math.random() * 1000);
		
	}, [movieData, user]);

	return (
		<div className={styles.container} style={style}>
			<Avatar avatarUri={user?.avatarUri} />
			<div style={{display: 'flex', alignItems: 'center', marginTop: 12, marginBottom: 2}}>
				<Headline type={3}
					text={name}
				/>
				<ChevronDown style={{marginLeft: 4, marginTop: 2}}/>
			</div>
			<Body type={1} text={email} color={COLORS.neutral[500]} /> 
            
			{/* Match Container */}
			{!isLoading && <div className={styles.matchContainer}>
				<Subtitle
					text={`${((matchData?.percentage || 0)*100).toFixed(0)}%`}
					color={COLORS.success[700]}
				/>
				<Subtitle
					style={{ marginTop: 1 }}
					text={'You might like this because'} color={COLORS.shades[0]}
				/>

				{/* Reasons Section */}
				{matchData?.reasons?.map((reasonsData, index) => {
					return <ReasonListTile style={{marginTop: 16}} key={index} data={reasonsData} />;
				})}
			</div>}
                
		</div>
	);
}
