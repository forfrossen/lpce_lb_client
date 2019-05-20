import { NgModule 							} from '@angular/core';
import { NbSelectModule 					} from '@nebular/theme';

import { ThemeModule	  					} from '../@theme/theme.module';

import { PagesComponent 					} from './pages.component';
import { DashboardModule 					} from './dashboard/dashboard.module';
import { HeimarbeitModule  					} from './heimarbeit/heimarbeit.module';
import { MontageanleitungenModule  			} from './montageanleitungen/montageanleitungen.module';
import { MiscellaneousModule				} from './miscellaneous/miscellaneous.module';
import { OpenOrdersModule  					} from './openorders/openorders.module';
import { PagesRoutingModule  				} from './pages-routing.module';
import { TeileinfoModule  					} from './teileinfo/teileinfo.module';
import { UnauthorizedComponent 				} from './unauthorized/unauthorized.component';


const PAGES_COMPONENTS = [
	PagesComponent, 
	UnauthorizedComponent,
];

@NgModule({
	imports: [
		PagesRoutingModule,
		ThemeModule,
		DashboardModule,
		TeileinfoModule,
		HeimarbeitModule,
		OpenOrdersModule,
		MiscellaneousModule,
		MontageanleitungenModule,
		NbSelectModule,
	],
	declarations: [
		...PAGES_COMPONENTS,
	],
})

export class PagesModule {
}
