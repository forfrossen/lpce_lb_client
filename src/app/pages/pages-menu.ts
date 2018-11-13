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
	children: [
		{
		  title: 'Heimarbeit Übersicht',
		  link: '/pages/heimarbeit/dashboard',
		},
	  ],
	},
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Auth',
    icon: 'nb-locked',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
