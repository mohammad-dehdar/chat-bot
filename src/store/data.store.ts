import { create } from '@/lib/zustand';

export type PazireshList = unknown | null;
export type Ogrid = unknown | null;

type DataState = {
	pazireshList: PazireshList;
	ogrid: Ogrid;
};

type DataActions = {
	setPazireshList: (value: PazireshList) => void;
	setOgrid: (value: Ogrid) => void;
	reset: () => void;
};

export const useDataStore = create<DataState & DataActions>((set) => ({
	pazireshList: null,
	ogrid: null,

	setPazireshList: (value) => set({ pazireshList: value }),
	setOgrid: (value) => set({ ogrid: value }),
	reset: () => set({ pazireshList: null, ogrid: null }),
}));
