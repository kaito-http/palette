import React, {useEffect, useState} from 'react';
import {useAtom} from 'jotai';
import {atomCommands} from '../atoms/commands';
import {flowers} from '../flowers';

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
