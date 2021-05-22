import React from 'react';
import {Command} from '../components/pallette';

const Home = () => {
	return (
		<div
			className="
			flex
			justify-center
			items-center
			h-screen
			text-black
			dark:text-white
			bg-white
			dark:bg-black
						"
		>
			<h1 className="flex-grow-0 text-2xl opacity-30">Press ⌘K</h1>
			<Command />
		</div>
	);
};

export default Home;
