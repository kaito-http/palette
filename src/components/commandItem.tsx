import {motion} from 'framer-motion';
import React, {Dispatch, SetStateAction} from 'react';
import {AiOutlineQuestion, AiOutlineLink, AiOutlineThunderbolt} from 'react-icons/ai';

export enum CommandItemType {
	Navigation,
	Action,
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

export const CommandItemView = ({
	item,
	selected,
	...props
}: {
	item: CommandItem;
	selected: boolean;
	index: number;
	setIndex: Dispatch<SetStateAction<number>>;
	click: () => void;
}) => {
	return (
		<motion.div
			key={item.name}
			layout
			initial={{opacity: 0, maxHeight: 'auto'}}
			animate={{opacity: 1, maxHeight: 'auto'}}
			exit={{
				opacity: 0,
				maxHeight: '0%',
				transition: {
					type: 'spring',
					damping: 10000,
					stiffness: 1,
				},
			}}
			transition={{
				type: 'spring',
				damping: 80,
				stiffness: 2000,
			}}
			className="
				flex
				relative
				items-center
				my-1
				mx-3
			"
			onMouseOver={() => {
				props.setIndex(props.index);
			}}
		>
			{selected && (
				<motion.div
					layoutId="selection"
					transition={{
						type: 'spring',
						damping: 65,
						stiffness: 1800,
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
				/>
			)}
			<div className="z-10 w-full">
				<button
					type="button"
					className="
						flex
						py-3
						px-5
						w-full
						rounded-md
						focus:ring
						outline-none
						focus:outline-none
						"
					onClick={props.click}
				>
					<div className="mt-px mr-3">
						<CommandItemIcon type={item.type} />
					</div>
					<span>{item.name}</span>
					{item.shortcut ? <div>{item.shortcut}</div> : ''}
				</button>
			</div>
		</motion.div>
	);
};
