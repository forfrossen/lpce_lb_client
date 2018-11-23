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
import { dateRendererComponent } 		from './teileinfo-list/dateRenderer.component';

import { TeileinfoRoutingModule } 		from './teileinfo-routing.module';
import { NgSelectModule } 				from '@ng-select/ng-select';

@NgModule({
	imports: [
	  CommonModule,
		TeileinfoRoutingModule,
		FormsModule,
		HttpClientModule,
		Ng2SmartTableModule,
		ThemeModule,
		NgSelectModule,
	],
	declarations: [
		TeileinfoComponent,
		TeileinfoDashboardComponent,
		TeileinfoListComponent,
		dateRendererComponent,
	],
	entryComponents: [ dateRendererComponent ],
	providers: [  ]
  })
export class TeileinfoModule { }
