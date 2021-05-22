<<<<<<< HEAD
import React, {useEffect, useState} from 'react';
import {DialogOverlay, DialogContent} from '@reach/dialog';
import {animated} from '@react-spring/web';
import {useAtom} from 'jotai';
import {atomCommands} from '../atoms/commands';
import {flowers} from '../flowers';

export const AnimatedDialogOverlay = animated(DialogOverlay);
export const AnimatedDialogContent = animated(DialogContent);

const getRandomFlower = () => flowers[Math.floor(Math.random() * flowers.length)];

=======
import React from 'react';
import {Command} from '../components/pallette';

>>>>>>> 8bcda2057ea7951d74f68b6a24c8e6fcd812c75e
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
