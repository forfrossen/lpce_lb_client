import { NgModule 							      } from '@angular/core';
import { RouterModule, Routes 				} from '@angular/router';
import { AuthGuard 							      } from '../../@core/auth/auth-guard.service';
import { ArtikelstammanlageComponent  } from './artikelstammanlage.component';
import { ListeComponent               } from './liste/liste.component';
import { AnlageformularComponent      } from './anlageformular/anlageformular.component';
import { SucheComponent               } from './suche/suche.component';

const routes: Routes = [ {
	path: '',
	component: ArtikelstammanlageComponent,
	children: [
		{
			path: 'suche',
			component: SucheComponent,
		},
		{
			path: 'liste',
			component: ListeComponent,
		},
		{
			path: 'anlageformular',
			component: AnlageformularComponent,
		},
		{
			path: 'anlageformular/:id',
			component: AnlageformularComponent,
		},
		{
			path: '',
			redirectTo: 'liste',
			pathMatch: 'full',
		},
	]
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
	],
	exports: [
		RouterModule,
	],
})
export class ArtikelstammanlageRoutingModule { }