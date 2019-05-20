/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';

@Component( {
	selector: 'ngx-app',
	template: '<router-outlet></router-outlet>',
} )
export class AppComponent implements OnInit {
	//private authAttempt: number = 0;
	//private LBAuth: LoopBackAuth = new LoopBackAuth(new(InternalStorage))

	constructor(
	) {

	}

	ngOnInit() {
		var stylesheet = document.styleSheets[0];
		stylesheet.disabled = true;
		
	}
}
