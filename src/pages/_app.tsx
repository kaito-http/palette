import React from 'react';
import {AppProps} from 'next/dist/next-server/lib/router/router';
import 'tailwindcss/tailwind.css';

const App = (props: AppProps) => {
	return <props.Component />;
};

export default App;
