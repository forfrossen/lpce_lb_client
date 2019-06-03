import { CommonModule  							} from '@angular/common';
import { HttpClientModule  						} from '@angular/common/http';
import { NgModule  								} from '@angular/core';
import { FormsModule  							} from '@angular/forms';
import { BrowserAnimationsModule  				} from '@angular/platform-browser/animations';
import { HotTableModule  						} from '@handsontable/angular';
import { NgSelectModule  						} from '@ng-select/ng-select';

import { ThemeModule  							} from '../../@theme/theme.module';

import { OpenOrdersRoutingModule  				} from './openorders-routing.module';
import { OpenOrdersComponent  					} from './openorders.component';


import {
	NbButtonModule, 
	NbInputModule,
	NbListModule,
	NbSelectModule,
	NbTabsetModule,
	NbUserModule,
	NbCheckboxModule,
	NbSpinnerModule
												} from '@nebular/theme';
import { FilterComponent } from './filter/filter.component';
import { CommenthistoryComponent } from './commenthistory/commenthistory.component';

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
		NbCheckboxModule,
		NbSpinnerModule,
		NbListModule,
		NbUserModule,
		NbTabsetModule,
		NgSelectModule,
		HotTableModule.forRoot(),
	],
	declarations: [
		OpenOrdersComponent,
		FilterComponent,
		CommenthistoryComponent,
	],
	entryComponents: [
        CommenthistoryComponent
	],
	providers: [

	],
} )
	
export class OpenOrdersModule {
	
} 
