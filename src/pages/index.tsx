import React from 'react';
import {Palette} from '../components/pallette';
import {CommandItem, CommandItemType} from '../components/commandItem';

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
			<Palette
				items={[
					new CommandItem(CommandItemType.Action, 'View help'),
					new CommandItem(CommandItemType.Action, 'Download Ram'),
					new CommandItem(CommandItemType.Action, 'Enable Teddies'),
					new CommandItem(CommandItemType.Action, 'Test'),
					new CommandItem(CommandItemType.Action, 'more'),
					new CommandItem(CommandItemType.Action, 'Look mom, commands!'),
					new CommandItem(CommandItemType.Action, 'This is so cool.'),
					new CommandItem(CommandItemType.Navigation, 'Home Page'),
					new CommandItem(CommandItemType.Navigation, 'About Page'),
					new CommandItem(CommandItemType.Navigation, 'Pricing page'),
				]}
			/>
		</div>
	);
};

export default Home;
