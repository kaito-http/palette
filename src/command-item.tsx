import {motion} from 'framer-motion';
import React, {Dispatch, ReactNode, SetStateAction} from 'react';

export class CommandItem {
	icon: ReactNode;
	name: string;
	shortcut?: string;
	key: string;

	constructor(icon: ReactNode, name: string, shortcut?: string) {
		this.icon = icon;
		this.name = name;
		this.shortcut = shortcut;

		// Cheap random key
		this.key = Math.random().toString(36).slice(2);
	}
}

export const CommandItemView = ({
	item,
	selected,
	...props
}: {
	item: CommandItem;
	selected: boolean;
	setSelected: Dispatch<SetStateAction<string | undefined>>;
	setEventType: Dispatch<SetStateAction<'mouse' | 'arrow' | 'search' | undefined>>;
	lastMouseMove: number;
	click: () => void;
}) => (
	<motion.div
		key={item.key}
		layout
		id={item.key}
		layoutId={item.key}
		initial={{opacity: 0, maxHeight: 'auto'}}
		animate={{opacity: 1, maxHeight: 'auto'}}
		exit={{opacity: 0, maxHeight: '0px', transition: {duration: 0}}}
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
			if (Date.now() - props.lastMouseMove < 50) {
				props.setEventType('mouse');
				props.setSelected(item.key);
			}
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
						w-full
						h-full
						rounded-md
						bg-highlight-background-light
						dark:bg-highlight-background-dark"
			/>
		)}
		<div className="relative z-10 w-full">
			<button
				type="button"
				className="
						flex
						py-3
						px-5
						w-full
						bg-transparent
						rounded-md
						transition-all
						outline-none
						focus:outline-none
						"
				onFocus={() => {
					props.setSelected(item.key);
				}}
				onClick={props.click}
			>
				{item.icon && <div className="mt-px mr-3">{item.icon}</div>}
				<span>{item.name}</span>
				{item.shortcut ? <div>{item.shortcut}</div> : ''}
			</button>
		</div>
	</motion.div>
);
