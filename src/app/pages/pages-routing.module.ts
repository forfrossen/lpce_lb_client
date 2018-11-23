import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeileinfoComponent } from './teileinfo/teileinfo.component';
import { HeimarbeitComponent } from './heimarbeit/heimarbeit.component';
import { AuthGuard } from '../@core/auth/auth-guard.service';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
	},
	{
		path: 'teileinfo',
		loadChildren: './teileinfo/teileinfo.module#TeileinfoModule',
	},
	{
		path: 'heimarbeit',
		loadChildren: './heimarbeit/heimarbeit.module#HeimarbeitModule',
	},
	{
		path: 'openorders',
		loadChildren: './openorders/openorders.module#OpenOrdersModule',
	},
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
