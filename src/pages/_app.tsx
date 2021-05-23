import React from 'react';
import {AppProps} from 'next/dist/next-server/lib/router/router';
import {Provider} from 'jotai';

import 'tailwindcss/tailwind.css';

const App = (props: AppProps) => {
	return (
		<Provider>
			<props.Component />
		</Provider>
	);
};

export default App;
