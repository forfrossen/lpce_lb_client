import { NgModule 							} from '@angular/core';
import { RouterModule, Routes 				} from '@angular/router';

import { AuthGuard 							} from '../../@core/auth/auth-guard.service';
import { MontageanleitungenComponent 		} from './montageanleitungen.component';

const routes: Routes = [
	{
		path: '',
		component: MontageanleitungenComponent,
	},
	{
		path: 'documentsearch',
		component: MontageanleitungenComponent,
	},
	{
		path: 'montageanleitungen',
		component: MontageanleitungenComponent,
	},

];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
	],
	exports: [
		RouterModule,
	],
})

export class MontageanleitungenRoutingModule {
};
