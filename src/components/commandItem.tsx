import {motion} from 'framer-motion';
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

export const CommandItemView = ({item, selected}: {item: CommandItem; selected: boolean}) => {
	return (
		<motion.div
			key={item.name}
			layout
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			exit={{opacity: 0}}
			className="
				flex
				relative
				items-center
				py-3
				px-5
				my-1
				mx-3
				cursor-pointer"
		>
			{selected &&
				<motion.div
					layoutId="selection"
					transition={{
						type: 'spring',
						damping: 65,
						stiffness: 1800
					}}
					className="
						absolute
						right-0
						z-0
						w-full
						h-full
						rounded-md
						bg-highlight-background-light
						dark:bg-highlight-background-dark"
				/>}
			<div className="flex z-10 items-center">
				<div className="mt-px mr-3">
					<CommandItemIcon type={item.type}/>
				</div>
				<span>{item.name}</span>
				{item.shortcut ? <div>{item.shortcut}</div> : ''}
			</div>
		</motion.div>
	);
};
