import React, {useState} from 'react';
import {Palette, CommandItem, SelectHandler} from '../src';
import {useHotkeys} from 'react-hotkeys-hook';

export const App = () => {
	const [open, setOpen] = useState(false);

	useHotkeys(
		'cmd+k,ctrl+k',
		e => {
			e.preventDefault();
			setOpen(v => !v);
		},
		{
			enableOnTags: ['INPUT'],
		}
	);

	const select: SelectHandler = item => {
		console.log(item);
	};

	return (
		<div>
			<span>hit cmd +k</span>
			<Palette
				isOpen={open}
				setOpen={setOpen}
				items={[new CommandItem(null, 'Look Mom'), new CommandItem(null, 'A bird!')]}
				onSelect={select}
			/>
		</div>
	);
};
