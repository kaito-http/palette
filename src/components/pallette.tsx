import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Transition} from '@headlessui/react';
import {useHotkeys} from 'react-hotkeys-hook';

export const Command = () => {
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
				transition-all
				transform
				bg-overlay-light
				dark:bg-overlay-dark"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<CommandContainer
				close={() => {
					setOpen(false);
				}}
			/>
		</Transition>
	);
};

const CommandContainer = ({close}: {close: () => void}) => {
	const ref = useOutsideClick<HTMLDivElement>(close);
	const inputRef = useRef<HTMLInputElement | null>(null);

	useHotkeys('esc', close, {
		enableOnTags: ['INPUT'],
	});

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

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
				/>
				<div className="mx-3 mb-1 h-px bg-separator-light dark:bg-separator-dark" />
				{/* Use framer-motion here to move the highlight seamlessly */}
				<CommandItem name="Action 1"/>
				<CommandItem name="Action 2"/>
				<CommandItem name="Action 3"/>
				<CommandItem name="Action 4"/>
				<CommandItem name="Action 5"/>
			</div>
		</Transition.Child>
	);
};

enum CommandItemType {
	Navigation,
	Action
}

const CommandItem = ({type, name, shortcut}: {type?: CommandItemType; name: string; shortcut?: string|number}) => {
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
			<span>{name} {type} {shortcut}</span>
		</div>
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
