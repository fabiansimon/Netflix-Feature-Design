import React, { ChangeEvent } from 'react';
import {ReactComponent as SearchIcon} from '../../assets/icons/search_icon.svg';
import styles from './SearchInput.module.css';
import Subtitle from '../typography/subtitle/Subtitle';
import Body from '../typography/body/Body';
import { COLORS } from '../../constants/theme';

type Props = {
    placeholder?: string,
	style?: React.CSSProperties,
	onAskNelly: () => void,
}

export default function SearchInput({ placeholder, style, onAskNelly }: Props) {
	const [term, setTerm] = React.useState<string>('');
    
	const handleTextInput = (event: ChangeEvent<HTMLInputElement>) => { 
		setTerm(event.target.value);
	};

	return (
		<div className={styles.container} style={style}>
			<div className={styles.searchInput}>
				<SearchIcon
					fill={COLORS.shades[0]}
				/>
				<input
					value={term}
					onChange={handleTextInput}
					className={styles.inputContainer}
					placeholder={placeholder || 'Search'}
					type='text'
				/>
			</div>
			<Subtitle style={{ marginInline: 12}} text='or' />
			<div
				onClick={onAskNelly}
				className={styles.askAIContainer}>
				<Body text='Ask' style={{marginRight: 4}} />
				<Subtitle text='Nelly' />
			</div>
		</div>
	);
}