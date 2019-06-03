import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent 					} from './pages.component';
import { UnauthorizedComponent 				} from './unauthorized/unauthorized.component';
import { DashboardComponent 				} from './dashboard/dashboard.component';
import { TeileinfoComponent 				} from './teileinfo/teileinfo.component';
import { HeimarbeitComponent 				} from './heimarbeit/heimarbeit.component';
import { MontageanleitungenModule  			} from './montageanleitungen/montageanleitungen.module';
import { AuthGuard 							} from '../@core/auth/auth-guard.service';

const routes: Routes = [ {
	path: '',
	component: PagesComponent,
	children: [
		{
			path: 'dashboard',
			component: DashboardComponent,
		},
		{
			path: 'artikelstammanlage',
			canActivate: [ AuthGuard ],
			loadChildren: () => import('./artikelstammanlage/artikelstammanlage.module').then(m => m.ArtikelstammanlageModule),
		},
		{
			path: 'teileinfo',
			canActivate: [ AuthGuard ],
			loadChildren: () => import('./teileinfo/teileinfo.module').then(m => m.TeileinfoModule),
		},
		{
			path: 'heimarbeit',
			canActivate: [ AuthGuard ],
			loadChildren: () => import('./heimarbeit/heimarbeit.module').then(m => m.HeimarbeitModule),
		},
		{
			path: 'openorders',
			canActivate: [ AuthGuard ],
			loadChildren: () => import('./openorders/openorders.module').then(m => m.OpenOrdersModule),
		},
		{
			path: 'enovia',
			canActivate: [ AuthGuard ],
			loadChildren: () => import('./montageanleitungen/montageanleitungen.module').then(m => m.MontageanleitungenModule),
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
