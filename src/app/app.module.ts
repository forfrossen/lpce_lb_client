/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SDKBrowserModule, InternalStorage, CookieBrowser } from './shared/sdk/index';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { RoleProvider } from './@core/auth/role.provider';

import { of as observableOf } from 'rxjs/observable/of';


@NgModule( {
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		AppRoutingModule,
		SDKBrowserModule.forRoot({
			provide: InternalStorage,
			useClass: CookieBrowser,
		  }),
		NgbModule.forRoot(),
		ThemeModule.forRoot(),		
		CoreModule.forRoot(),
	],
	providers: [
		{ provide: APP_BASE_HREF, useValue: '/' },
	],
	bootstrap: [ AppComponent ],
} )

export class AppModule {
}
