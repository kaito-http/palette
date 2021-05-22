import React, {useEffect, useState} from 'react';
import {DialogOverlay, DialogContent} from '@reach/dialog';
import {animated} from '@react-spring/web';
import {useAtom} from 'jotai';
import {atomCommands} from '../atoms/commands';
import {flowers} from '../flowers';

export const AnimatedDialogOverlay = animated(DialogOverlay);
export const AnimatedDialogContent = animated(DialogContent);

const getRandomFlower = () => flowers[Math.floor(Math.random() * flowers.length)];

const Home = () => {
	const [, set] = useAtom(atomCommands);
	const [flower, setFlower] = useState(getRandomFlower());

	const hi = () => {
		setFlower(getRandomFlower());
	};

	useEffect(() => {
		void set(x => {
			return [
				...x,
				{
					label: 'Deez',
					action: hi,
					command: 'cmd+x',
				},
			];
		});
	}, [set]);

	return <p>{flower}</p>;
};

export default Home;
