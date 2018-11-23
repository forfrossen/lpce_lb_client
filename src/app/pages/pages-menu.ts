import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
	{
		title: 'Dashboard',
		icon: 'nb-grid-a',
		link: '/pages/dashboard',
		home: true,
	},
	{
		title: 'Teileinfo',
		icon: 'ion-information',
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
		icon: 'ion-home',
		link: '/pages/heimarbeit/dashboard',
		children: [
			{
				title: 'Heimarbeit Übersicht',
				link: '/pages/heimarbeit/dashboard',
			},
		],
	},
	{
		title: 'Open Orders',
		icon: 'ion-home',
		link: '/pages/openorders',
	},
];
