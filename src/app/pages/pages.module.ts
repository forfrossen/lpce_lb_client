import { NgModule } from '@angular/core';
import { NbSelectModule } from '@nebular/theme';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { TeileinfoModule } from './teileinfo/teileinfo.module';
import { HeimarbeitModule } from './heimarbeit/heimarbeit.module';
import { OpenOrdersModule } from './openorders/openorders.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';


const PAGES_COMPONENTS = [
  PagesComponent,
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
	NbSelectModule,
  ],
  declarations: [
	...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
