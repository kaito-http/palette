import {atom} from 'jotai';

export type PalletteCommand = {
	label: string;
	action: () => unknown;
	command: string | string[];
};

export const atomCommands = atom<PalletteCommand[]>([]);
