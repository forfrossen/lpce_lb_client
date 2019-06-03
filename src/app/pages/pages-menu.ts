import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
	{
		title: 'Home',
		icon: 'eva eva-home-outline',
		link: '/pages/dashboard',
		home: true,
	},
	{
		title: 'Artikelstamm',
		icon: 'eva eva-file-add-outline',
		link: '/pages/artikelstammanlage',
	},
	{
		title: 'Teileinfo',
		icon: 'eva eva-info-outline',
		link: '/pages/teileinfo/list',
	},
	{
		title: 'Heimarbeit',
		icon: 'eva eva-car-outline',
		link: '/pages/heimarbeit/dashboard',
	},
	{
		title: 'Open Orders',
		icon: 'eva eva-archive-outline',
		link: '/pages/openorders',
	},
	{
		title: 'Montageanleitungen',
		icon: 'eva eva-book-open-outline',
		children: [
			{
				title: 'Montageanleitungen',
				link: '/pages/enovia/montageanleitungen',
			},
			{
				title: 'Anweisungen',
				link: '/pages/enovia/montageanweisungen-liste',
			},
		],
	},
];


/*
			{
				title: 'Document Search',
				link: '/pages/enovia/documentsearch',
			},

			
	{
		title: 'Teileinfo',
		icon: 'eva eva-info-outline',
		children: [
			{
				title: 'Teileinfo Übersicht',
				link: '/pages/teileinfo/dashboard',
			},
			{
				title: 'Teileinfo Liste',
				link: '/pages/teileinfo/list',
			},
		],
	},
	{
		title: 'Heimarbeit',
		icon: 'eva eva-car-outline',
		link: '/pages/heimarbeit/dashboard',
		children: [
			{
				title: 'Heimarbeit Übersicht',
				link: '/pages/heimarbeit/dashboard',
			},
		],
	},
	{
		title: 'Enovia',
		icon: 'eva eva-book-open-outline',
		children: [
			{
				title: 'Document Search',
				link: '/pages/enovia/documentsearch',
			},
			{
				title: 'Montageanleitungen',
				link: '/pages/enovia/montageanleitungen',
			},
		],
	},
*/