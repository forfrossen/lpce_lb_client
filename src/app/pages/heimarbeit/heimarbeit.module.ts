import { NgModule }      				from '@angular/core';
import { CommonModule } 				from '@angular/common';

import {
	NbInputModule, 
	NbButtonModule, 
	NbSelectModule,
	NbListModule,
	NbUserModule 
} 	from '@nebular/theme';

import { BrowserAnimationsModule }		from '@angular/platform-browser/animations';
import { ThemeModule } 					from '../../@theme/theme.module';

import { FormsModule } 					from '@angular/forms';
import { HttpClientModule } 			from "@angular/common/http";

import { HeimarbeitComponent } 			from './heimarbeit.component';
import { HeimarbeitDashboardComponent } from './heimarbeit-dashboard.component';

import { HeimarbeitRoutingModule } 		from './heimarbeit-routing.module';

@NgModule({ 
	imports: [
	  CommonModule,
		HeimarbeitRoutingModule,
		FormsModule,
		HttpClientModule,
		ThemeModule,
		NbInputModule,
		NbButtonModule,
		NbSelectModule,
		NbListModule,
		NbUserModule 
	],
	declarations: [
		HeimarbeitComponent,
		HeimarbeitDashboardComponent,
		

	],
		entryComponents: [  ],
	providers: [  ]
  })
  export class HeimarbeitModule {} 