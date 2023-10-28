import React from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import MatchTasteView from './views/MatchTasteView/MatchTasteView.js';

function App() {
	const [pageIndex, setPageIndex] = React.useState(0);
	return (
		<div>
			<NavBar navigateView={(idx) => setPageIndex(idx)} idx={pageIndex} /> 
			<MatchTasteView />
		</div>
	);
}

export default App;
