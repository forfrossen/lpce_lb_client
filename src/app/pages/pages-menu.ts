import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
	{
		title: 'Dashboard',
		icon: 'eva eva-grid-outline',
		link: '/pages/dashboard',
		home: true,
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
		title: 'Open Orders',
		icon: 'eva eva-archive-outline',
		link: '/pages/openorders',
	},
];
