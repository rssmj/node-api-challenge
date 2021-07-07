import React from 'react';
import { Projects } from './components/projects.js';
import { Route, Redirect } from 'react-router-dom';
import './App.scss';

export const App = () => {
	return (
		<div className='App'>
			<>
				<Route path='/projects'>
					<Projects />
				</Route>
				<Route exact path='/'>
					<Redirect to='/projects' />
				</Route>
			</>
		</div>
	);
};
