import { NgModule } from '@angular/core';
import {
	NbInputModule,
	NbButtonModule,
	NbSelectModule,
}
	from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { RoleProvider } from 'app/@core/auth/role.provider';
import { DashboardComponent } from './dashboard.component';


@NgModule( {
	imports: [
		ThemeModule,
		NbInputModule,
		NbButtonModule,
		NbSelectModule,
	],
	declarations: [
		DashboardComponent,
	],
	providers: [
		RoleProvider,
	],
} )
export class DashboardModule { }
