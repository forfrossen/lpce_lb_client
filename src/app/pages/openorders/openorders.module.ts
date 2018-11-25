import { NgModule }      				from '@angular/core';
import { CommonModule } 				from '@angular/common';

import {
	NbInputModule,
	NbButtonModule,
	NbSelectModule,
	NbListModule,
	NbUserModule,
	NbTabsetModule,
} 	from '@nebular/theme';

import { BrowserAnimationsModule }		from '@angular/platform-browser/animations';
import { ThemeModule } 					from '../../@theme/theme.module';

import { FormsModule } 					from '@angular/forms';
import { HttpClientModule } 			from '@angular/common/http';

import { OpenOrdersComponent } 			from './openorders.component';
import { OpenOrdersRoutingModule } 		from './openorders-routing.module';

import { HotTableModule } from '@handsontable/angular';

@NgModule({ 
	imports: [
	  CommonModule,
		OpenOrdersRoutingModule,
		FormsModule,
		HttpClientModule,
		ThemeModule,
		NbInputModule,
		NbButtonModule,
		NbSelectModule,
		NbListModule,
		NbUserModule,
		NbTabsetModule,
		HotTableModule.forRoot(),
	],
	declarations: [
		OpenOrdersComponent,
	],
		entryComponents: [  ],
	providers: [  ]
  })
  export class OpenOrdersModule {} 