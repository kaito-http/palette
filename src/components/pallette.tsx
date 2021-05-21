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
			className="transition-all fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-80 transform"
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
			className="transition-all h-full transform flex items-center justify-center"
			enterFrom="scale-95 opacity-0"
			enterTo="scale-100 opacity-100"
			leaveFrom="scale-100 opacity-100"
			leaveTo="scale-50 opacity-0"
		>
			<div ref={ref} className="w-1/2 h-1/2 shadow-xl bg-gray-900 text-white rounded-md overflow-y-auto">
				<input
					ref={inputRef}
					type="text"
					placeholder="Search"
					className="w-full transition-all py-2 bg-transparent border-b px-4 border-gray-800 border-opacity-20 focus:outline-none outline-none focus:border-opacity-100 border-orange text-white"
				/>

				<div className="grid grid-cols-2 gap-4">hi</div>
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
