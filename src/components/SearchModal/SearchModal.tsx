import React, { ChangeEvent, useEffect } from 'react';
import styles from './SearchModal.module.css';
import Body from '../typography/body/Body';
import {ReactComponent as SearchIcon} from '../../assets/icons/search_icon.svg';
import {ReactComponent as AIIcon}  from '../../assets/icons/person_ai.svg';
import {ReactComponent as MicrophoneIcon}  from '../../assets/icons/microphone.svg';
import {ReactComponent as XMarkIcon}  from '../../assets/icons/x_mark.svg';
import { COLORS } from '../../constants/theme';
import { MovieSearchResult } from '../../types/Movie';
import { searchMovieByPrompt } from '../../services/movieService';
import ResultMovieCard from '../SearchMovieCard/ResultMovieCard';

const INPUT_SUGGESTION: string[] = [
	'A horror movie that is shorter than 90 minutes',
	'A movie that was filmed in Vienna',
	'A movie that came out around 2018',
	'A comedy with Robin Williams'
];

type Props = {
    isVisible: boolean,
    onRequestClose: (moveId: string | undefined) => void,
}

export default function SearchModal({ isVisible, onRequestClose }: Props) {
	const [term, setTerm] = React.useState<string>('');
	const [movieResults, setMovieResults] = React.useState<MovieSearchResult[] | undefined>();
    
	const handleMovieSearch = async () => {
		const res = await searchMovieByPrompt('movies that were directed by steven spielberg');
		setMovieResults(res);
	};
    
	const handleTermInput = (event: ChangeEvent<HTMLInputElement>) => { 
		setTerm(event.target.value);
	};
    
	useEffect(() => {
		handleMovieSearch();
	}, [term]);

	if (!isVisible) return <div/>;

	return (
		<div
			className={styles.container}>
			<div
				className={styles.innerContainer}>
                
				{/* Header Section */}
				<div className={styles.headerContainer}>
					<div className={styles.aiContainer}>
						<Body
							type={2}
							text='Artificial Intelligence'
							color={COLORS.neutral[500]}
						/>
						<AIIcon style={{marginLeft: 4, height: 12, width: 12}}/>
					</div>
					<div style={{position: 'absolute', display: 'flex', left: '47%'}}>
						<Body
							text='Search with'
						/>
						<Body
							style={{ marginLeft: 4, fontWeight: '600' }}
							color={COLORS.primary[900]}
							text='Nelly'
						/>
					</div>
				</div>
                
				{/* Search Input + Suggestions */}
				<div className={styles.searchContainer}>
					<div className={styles.searchInput}>
						<SearchIcon style={{fill: COLORS.neutral[500], marginRight: 10, marginLeft: 5}}/>
						<input
							value={term}
							onChange={handleTermInput}
							className={styles.inputContainer}
							placeholder={'“Show me a movie that is about a real life success story”'}
							type='text'
						/>
						{term.length > 0 &&  <button
							onClick={() => setTerm('')}
							className={styles.xmark}>
							<XMarkIcon />
						</button>}
					</div>
					<div className='hidden-overflow' style={{display: 'flex', overflowX: 'auto'}}> 
						{INPUT_SUGGESTION?.map((suggestion, index) => 
							<div
								onClick={()=>setTerm(suggestion)}
								key={index}
								style={{marginRight: 8}}
								className={styles.suggestionContainer}>
								<Body
									type={2}
									text={`"${suggestion}"`}
									color={COLORS.neutral[500]}
								/>
							</div>)}
					</div>
				</div>
                
				{/* Results Section */}
				<div className={styles.resultContainer}>
					<Body
						type={1}
						text={`${movieResults?.length} results`}
						color={COLORS.neutral[500]}
						style={{marginTop: 4, marginBottom: 14, marginLeft: 25}}
					/>
					<div className='hidden-overflow' style={{display: 'flex', overflowX: 'auto', paddingLeft: 15}}> 
						{movieResults?.map((movie, index) => <ResultMovieCard
							style={{marginRight: 15}}
							key={index}
							movie={movie}
						/>)}
					</div>
				</div>

				{/* Microphone Icon Button */}
				<button
					onClick={() => onRequestClose('123')}
					className={styles.button}
				>
					<MicrophoneIcon />
				</button>
			</div>
		</div>
	);
}