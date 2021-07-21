import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Transition} from '@headlessui/react';
import {useHotkeys} from 'react-hotkeys-hook';
import {CommandItem, CommandItemView} from './command-item';
import {AnimatePresence, AnimateSharedLayout, motion} from 'framer-motion';

export const Palette = ({items}: {items: CommandItem[]}) => {
	const [open, setOpen] = useState(false);

	useHotkeys(
		'cmd+k,ctrl+k',
		e => {
			e.preventDefault();
			setOpen(v => !v);
		},
		{
			enableOnTags: ['INPUT'],
		}
	);

	useEffect(() => {
		document.body.style.overflowY = open ? 'hidden' : 'auto';
	}, [open]);

	return (
		<Transition
			show={open}
			className="
				fixed
				top-0
				right-0
				bottom-0
				left-0
				bg-overlay-light
				dark:bg-overlay-dark
				transition-all
				transform"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<CommandContainer
				items={items}
				close={() => {
					setOpen(false);
				}}
			/>
		</Transition>
	);
};

const CommandContainer = ({items, close}: {items: CommandItem[]; close: () => void}) => {
	const [predicate, setPredicate] = useState('');
	const [lastMouseMove, setLastMouseMove] = useState(Date.now());
	const [eventType, setEventType] = useState<'mouse' | 'arrow' | 'search' | undefined>();
	const [selected, setSelected] = useState<string | undefined>(items[0]?.key);

	const itemMap = useMemo(
		() =>
			items.reduce<Record<string, CommandItem>>((map, item) => {
				map[item.key] = item;
				return map;
			}, {}),
		[items]
	);

	const filteredItems = useMemo(() => {
		if (predicate.length <= 0) {
			return items;
		}

		return items.filter(item => item.name.toLowerCase().includes(predicate.toLowerCase()));
	}, [items, predicate]);

	const ref = useOutsideClick<HTMLDivElement>(close);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const suggestionRef = useRef<HTMLDivElement | null>(null);

	const acceptCommand = () => {
		if (selected !== undefined) {
			const command = itemMap[selected];
			// eslint-disable-next-line no-alert
			alert(command.name);
		}
	};

	useHotkeys('esc', close, {
		enableOnTags: ['INPUT'],
	});

	useHotkeys('enter', acceptCommand, {
		enableOnTags: ['INPUT'],
	});

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	useEffect(() => {
		setSelected(filteredItems[0]?.key);
	}, [filteredItems, items]);

	useEffect(() => {
		if (!selected || eventType !== 'arrow') {
			return;
		}

		const element = document.getElementById(selected);
		if (element) {
			element.scrollIntoView({behavior: 'smooth', block: 'nearest'});
		}
	}, [selected, eventType]);

	const moveFocus = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (filteredItems.length <= 0) {
			return;
		}

		// eslint-disable-next-line no-negated-condition
		const selectedIndex = selected !== undefined ? filteredItems.indexOf(itemMap[selected]) : 0;

		switch (e.key) {
			case 'ArrowDown': {
				setSelected(filteredItems[(selectedIndex + 1) % filteredItems.length].key);
				break;
			}

			case 'ArrowUp': {
				setSelected(filteredItems[selectedIndex - 1]?.key ?? filteredItems[filteredItems.length - 1]?.key);
				break;
			}

			default: {
				break;
			}
		}

		setEventType('arrow');
	};

	return (
		<Transition.Child
			className="flex justify-center items-center h-full transition-all transform-gpu"
			enterFrom="scale-95 opacity-0"
			enterTo="scale-100 opacity-100"
			leaveFrom="scale-100 opacity-100"
			leaveTo="scale-75 opacity-0"
		>
			<div
				ref={ref}
				className="
					flex
					absolute
					top-1/3
					flex-col
					w-3/4
					max-w-screen-sm
					max-h-96
					text-pallette-foreground-light
					dark:text-pallette-foreground-dark
						"
			>
				<input
					ref={inputRef}
					type="text"
					placeholder="Search"
					className="
						flex-1
						px-5
						pt-4
						pb-5
						text-lg
						rounded-t-xl
						border-t
						border-r
						border-l
						border-separator-light
						dark:border-separator-dark
						appearance-none
						focus:outline-none
						text-highlight-foreground-light
						dark:text-highlight-foreground-dark
						bg-pallette-background-light
						dark:bg-pallette-background-dark
							"
					value={predicate}
					onInput={e => {
						setPredicate((e.target as HTMLInputElement).value);
						setEventType('search');
					}}
					onKeyDown={moveFocus}
				/>
				<div
					style={{width: 'calc(100% - 1.5rem)'}}
					className="
						absolute
						top-14
						mx-3
						mt-1
						h-px
						bg-separator-light
						dark:bg-separator-dark
						"
				/>
				<AnimateSharedLayout>
					<motion.div
						ref={suggestionRef}
						layout
						layoutId="container"
						transition={{
							type: 'spring',
							damping: 80,
							stiffness: 2000,
						}}
						className="
							overflow-x-hidden
							overflow-y-scroll
							py-2
							rounded-b-xl
							border-r
							border-b
							border-l
							border-separator-light
							dark:border-separator-dark
							bg-pallette-background-light
							dark:bg-pallette-background-dark
										"
						onMouseMove={() => {
							setLastMouseMove(Date.now());
						}}
					>
						<AnimatePresence>
							{filteredItems.map(item => (
								<CommandItemView
									key={item.key}
									item={item}
									selected={item.key === selected}
									setEventType={setEventType}
									setSelected={setSelected}
									lastMouseMove={lastMouseMove}
									click={acceptCommand}
								/>
							))}
						</AnimatePresence>
					</motion.div>
				</AnimateSharedLayout>
			</div>
		</Transition.Child>
	);
};

/**
 * Handle clicks outside of an element.
 * This is useful for closing a modal by clicking outside of the modal.
 * @param callback - The callback function to run when clicking outside of an element
 */
export function useOutsideClick<E extends HTMLElement = HTMLElement>(callback: () => unknown) {
	const container = useRef<E | null>(null);

	const stableCallback = useCallback(() => callback(), [callback]);

	useEffect(() => {
		const handler = (event: MouseEvent) => {
			if (!container.current) {
				return;
			}

			if (!container.current.contains(event.target as HTMLElement)) {
				stableCallback();
			}
		};

		document.addEventListener('click', handler);

		return () => {
			document.removeEventListener('click', handler);
		};
	}, [stableCallback]);

	return container;
}
