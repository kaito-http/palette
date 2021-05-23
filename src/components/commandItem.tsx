import React from 'react';
import {AiOutlineQuestion, AiOutlineLink, AiOutlineThunderbolt} from 'react-icons/ai';

export enum CommandItemType {
	Navigation,
	Action
}

export interface CommandItem {
	type: CommandItemType;
	name: string;
	shortcut?: string;
}

const CommandItemIcon = ({type}: {type: CommandItemType}) => {
	switch (type) {
		case CommandItemType.Navigation:
			return <AiOutlineLink size="1.4em" />;
		case CommandItemType.Action:
			return <AiOutlineThunderbolt size="1.4em" />;
		default:
			return <AiOutlineQuestion size="1.4em" />;
	}
};

export const CommandItemView = ({type, name, shortcut}: CommandItem) => {
	return (
		<div
			className="
				flex
				items-center
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
			<div className="mt-px mr-3">
				<CommandItemIcon type={type}/>
			</div>
			<span>{name}</span>
			{shortcut ? <div>{shortcut}</div> : ''}
		</div>
	);
};
