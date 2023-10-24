import React from 'react';

function getWindowDimension() {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height
	};
}

export default function useWindowDimensions() {
	const [dimensions, setDimensions] = React.useState(getWindowDimension());
    
	React.useEffect(() => {
		const handleResize = () => {
			setDimensions(getWindowDimension());
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);
    
	return dimensions;
}