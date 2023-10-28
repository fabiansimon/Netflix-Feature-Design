import React from 'react';
import { User } from '../../types/User';
import Headline from '../typography/headline/Headline';
import styles from './UserMatchContainer.module.css';
import Body from '../typography/body/Body';
import { COLORS } from '../../constants/theme';
import Avatar from '../Avatar/Avatar';
import {ReactComponent as ChevronDown} from '../../assets/icons/chevron_down_icon.svg';
import Subtitle from '../typography/subtitle/Subtitle';
import ReasonListTile from '../ReasonListTile/ReasonListTile';
import { MatchData, ReasonType } from '../../types/ReasonType';

type Props = {
    user?: User,  
    movieId: string,
    style?: React.CSSProperties,
    onFinishLoading: (matchPercentage: number) => void,
}

export default function UserMatchContainer({ user, movieId, onFinishLoading, style }: Props) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [matchData, setMatchData] = React.useState<MatchData>();

	if (!user) return <div/>;

	const { name, email } = user;
    
	React.useEffect(() => {
		setIsLoading(true);
		setTimeout(() => {
			const matchPercentage = Math.random();
			
			setIsLoading(false);
			setMatchData({
				percentage: matchPercentage,
				reasons: [
					{
						type: ReasonType.CAST,
						values: ['Minne Koole', 'Ryan Reynolds']
					},
					{
						type: ReasonType.PLOT,
						values: ['entrepreneurship', 'finance'],
					},
				]
			});
			onFinishLoading(matchPercentage);
		}, Math.random()*1000);
	}, [movieId, user]);

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
