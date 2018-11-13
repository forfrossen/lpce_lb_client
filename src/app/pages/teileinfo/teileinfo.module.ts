import { NgModule }      				from '@angular/core';
import { CommonModule } 				from '@angular/common';
import { BrowserAnimationsModule }		from '@angular/platform-browser/animations';
import { ThemeModule } 					from '../../@theme/theme.module';

import { FormsModule } 					from '@angular/forms';
import { HttpClientModule } 			from "@angular/common/http";

import { Ng2SmartTableModule } 			from 'ng2-smart-table';

import { TeileinfoComponent } 			from './teileinfo.component';
import { TeileinfoDashboardComponent } 	from './teileinfo-dashboard.component';
import { TeileinfoListComponent }		from './teileinfo-list/teileinfo-list.component';
//import { NgbdModalContent } 			from './teileinfo-list/modal.component'
//import { UiConfirmModule } 				from './teileinfo-list/confirm-module'

//import { richTextEditorComponent } 	from './teileinfo-list/richTextEditor.component';
import { dateRendererComponent } 		from './teileinfo-list/dateRenderer.component';

import { TeileinfoRoutingModule } from './teileinfo-routing.module';

@NgModule({ 
	imports: [
	  CommonModule,
		TeileinfoRoutingModule,
		FormsModule,
		HttpClientModule,
		Ng2SmartTableModule,
		ThemeModule,
	],
	declarations: [
		TeileinfoComponent,
		TeileinfoDashboardComponent,
		TeileinfoListComponent,
		dateRendererComponent,
		//richTextEditorComponent,
	],
	entryComponents: [ dateRendererComponent ],
	providers: [  ]
  })
  export class TeileinfoModule {} 