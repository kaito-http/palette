import React from 'react';

export enum CommandItemType {
	Navigation,
	Action
}

export interface CommandItem {
	type: CommandItemType;
	name: string;
	shortcut?: string;
}

export const CommandItemView = ({type, name, shortcut}: CommandItem) => {
	return (
		<div
			className="
				flex
				py-3
				px-5
				my-1
				mx-3
				rounded-md
				cursor-pointer
				hover:bg-highlight-background-light
				hover:text-highlight-foreground-light
				dark:hover:bg-highlight-background-dark
				dark:hover:text-highlight-foreground-dark"
		>
			<div
				className="
				block
				w-4
				h-4
				bg-highlight-background-light"
			>
				{type}
			</div>
			<span>{name}</span>
			{shortcut ? <div>{shortcut}</div> : ''}
		</div>
	);
};
