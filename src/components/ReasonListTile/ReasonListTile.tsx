import React, { ReactElement } from 'react';
import { Reason, ReasonType } from '../../types/ReasonType';
import styles from './ReasonListTile.module.css';
import {ReactComponent as CastIcon} from '../../assets/icons/cast.svg';
import {ReactComponent as ClockIcon} from '../../assets/icons/clock.svg';
import {ReactComponent as PopcornIcon}from '../../assets/icons/popcorn.svg';
import Body from '../typography/body/Body';
import { COLORS } from '../../constants/theme';
import Subtitle from '../typography/subtitle/Subtitle';

const REASON_DATA = [
	{
		type: ReasonType.CAST,
		icon: <CastIcon height={28} width={28}/>,
		description: 'You are more likely to finish a movie if',
		ending: 'are casted',
		gapWord: 'or',
	},
	{
		type: ReasonType.PLOT,
		icon: <PopcornIcon height={22} width={22}/>,
		description: 'You previously liked movies that include',
		gapWord: 'and',
	},
	{
		type: ReasonType.LENGTH,
		icon: <ClockIcon height={25} width={25}/>,
		description: 'Your highest rated movies are usually',
	},
];

type Props = {
	data: Reason,
	style?: React.CSSProperties
}

export default function ReasonListTile({ data, style }: Props) {
	const { type: _type, values } = data;
    
	const { icon, description, ending, gapWord } = React.useMemo(() => {
		return REASON_DATA.find(({type}) => type === _type);
	}, [_type]) as {icon: ReactElement, description: string, ending?: string, gapWord?: string};
    
	return (
		<div className={styles.container} style={style	}>
			<div style={{display: 'flex'}}>
				<div className={styles.iconContainer}>
					{icon}
				</div>
				<div className={styles.descriptionContainer}>
					<Body type={1}
						color={COLORS.neutral[500]}
						text={description}
					/>
					<div style={{ display: 'flex', marginLeft: 5}}>
						{values.map((v, index) => {
							return (
								<div style={{display: 'flex'}} key={index}>
									<Subtitle
										text={v} />
									<Body
										text={index !== values.length-1 ? gapWord : ''}
										color={COLORS.neutral[500]}
										style={{ marginInline: 3 }} />
								</div>);
						}
						)}
					</div>
					<Body type={1}
						color={COLORS.neutral[500]}
						text={ending}
					/>
				</div>
			</div>
		</div>
	);
}