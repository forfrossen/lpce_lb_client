import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeileinfoComponent } from './teileinfo/teileinfo.component';
import { HeimarbeitComponent } from './heimarbeit/heimarbeit.component';
import { AuthGuard } from '../@core/auth/auth-guard.service';

const routes: Routes = [ {
	path: '',
	component: PagesComponent,
	children: [
		{
			path: 'dashboard',
			component: DashboardComponent,
		},
		{
			path: 'teileinfo',
			canActivate: [ AuthGuard ],
			loadChildren: './teileinfo/teileinfo.module#TeileinfoModule',
		},
		{
			path: 'heimarbeit',
			canActivate: [ AuthGuard ],
			loadChildren: './heimarbeit/heimarbeit.module#HeimarbeitModule',
		},
		{
			path: 'openorders',
			canActivate: [ AuthGuard ],
			loadChildren: './openorders/openorders.module#OpenOrdersModule',
		},
		{
			path: 'unauthorized',
			component: UnauthorizedComponent,
		},
		{
			path: '',
			redirectTo: 'dashboard',
			pathMatch: 'full',
		},
	],
} ];

@NgModule( {
	imports: [ RouterModule.forChild( routes ) ],
	exports: [ RouterModule ],
} )
export class PagesRoutingModule {
}
