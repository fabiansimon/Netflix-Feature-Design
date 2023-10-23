import React from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import MatchTasteView from './views/MatchTasteView/MatchTasteView.js';

function App() {
	const [pageIndex, setPageIndex] = React.useState(0);
	return (
		<div className="App">
			<NavBar navigateView={(idx) => setPageIndex(idx)} idx={pageIndex} /> 
			<MatchTasteView />
			{/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
		</div>
	);
}

export default App;
