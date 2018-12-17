import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import * as eva from 'eva-icons';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {

	menu = MENU_ITEMS;
	
	constructor() {
		eva.replace({
			animation: {
			  type: 'pulse', // zoom, pulse, shake, flip
			  hover: false, // default true
			  infinite: false, // default false
			}
		  });

	}
}
