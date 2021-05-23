import React from 'react';
import {CommandItemType} from '../components/commandItem';
import {Pallette} from '../components/pallette';

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
			<Pallette
				items={[
					{type: CommandItemType.Action, name: 'View help'},
					{type: CommandItemType.Action, name: 'Download Ram'},
					{type: CommandItemType.Action, name: 'Enable Teddies'},
					{type: CommandItemType.Navigation, name: 'Home Page'},
					{type: CommandItemType.Navigation, name: 'About Page'},
				]}
			/>
		</div>
	);
};

export default Home;
