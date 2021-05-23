import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Transition} from '@headlessui/react';
import {useHotkeys} from 'react-hotkeys-hook';
import {CommandItem, CommandItemView} from './commandItem';
import {AnimateSharedLayout} from 'framer-motion';

export const Pallette = ({items}: {items: CommandItem[]}) => {
	const [open, setOpen] = useState(false);

	useHotkeys(
		'cmd+k',
		e => {
			e.preventDefault();
			setOpen(v => !v);
		},
		{enableOnTags: ['INPUT']}
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
	const [selected, setSelected] = useState(0);
	const ref = useOutsideClick<HTMLDivElement>(close);
	const inputRef = useRef<HTMLInputElement | null>(null);

	useHotkeys('esc', close, {
		enableOnTags: ['INPUT'],
	});

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const moveFocus = (e: React.KeyboardEvent<HTMLInputElement>) => {
		switch (e.key) {
			case 'ArrowDown':
				setSelected((selected + 1) % items.length);
				break;
			case 'ArrowUp':
				if (selected <= 0) {
					setSelected(items.length - 1);
				}	else {
					setSelected(selected - 1);
				}

				break;
			default:
		}
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
				ref={ref} className="
				flex
				overflow-y-auto
				flex-col
				w-3/4
				max-w-screen-sm
				h-3/4
				max-h-96
				rounded-xl
				border
				border-separator-light
				dark:border-separator-dark
				text-pallette-foreground-light
				dark:text-pallette-foreground-dark
				bg-pallette-background-light
				dark:bg-pallette-background-dark"
			>
				<input
					ref={inputRef}
					type="text"
					placeholder="Search"
					className="
						py-4
						px-5
						pt-5
						text-lg
						appearance-none
						text-highlight-foreground-light
						dark:text-highlight-foreground-dark
						bg-pallette-background-light
						dark:bg-pallette-background-dark"
					value={predicate}
					onInput={e => {
						setPredicate((e.target as HTMLInputElement).value);
					}}
					onKeyDown={moveFocus}
				/>
				<div className="mx-3 mb-1 h-px bg-separator-light dark:bg-separator-dark" />
				<AnimateSharedLayout>
					{items.map(item => <CommandItemView key={item.name} item={item} selected={items[selected] === item} />)}
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
