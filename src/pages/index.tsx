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
					{type: CommandItemType.Action, name: 'Action 1'},
					{type: CommandItemType.Action, name: 'Action 2'},
					{type: CommandItemType.Action, name: 'Action 3'},
					{type: CommandItemType.Navigation, name: 'Navigation 1'},
					{type: CommandItemType.Navigation, name: 'Navigation 2'},
				]}
			/>
		</div>
	);
};

export default Home;
