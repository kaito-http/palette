import React from 'react';
import {DialogOverlay, DialogContent} from '@reach/dialog';
import {animated} from '@react-spring/web';
import {Command} from '../components/pallette';

export const AnimatedDialogOverlay = animated(DialogOverlay);
export const AnimatedDialogContent = animated(DialogContent);

const Home = () => {
	return <Command />;
};

export default Home;
