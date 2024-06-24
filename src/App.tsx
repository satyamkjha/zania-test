import React from 'react';
import CardContainer from './CardContainer';
import './App.css';

const App: React.FC = () => {
	return (
		<div className='app'>
			<h1>Cat Cards</h1>
			<CardContainer />
		</div>
	);
};

export default App;
