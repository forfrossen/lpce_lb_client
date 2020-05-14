import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../../@core/auth/auth-guard.service';
import { TeileinfoComponent } from './teileinfo.component';
import { TeileinfoDashboardComponent } 		from './teileinfo-dashboard.component';
import { TeileinfoListComponent } from './teileinfo-list/teileinfo-list.component';

const routes: Routes = [{
	path: '',
	component: TeileinfoComponent,
	children: [{
		path: 'dashboard',
		component: TeileinfoDashboardComponent,
		pathMatch: 'full',
	},
	{
		path: 'list',
		component: TeileinfoListComponent,
		canActivate: [AuthGuard],
		pathMatch: 'full',
	}]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class TeileinfoRoutingModule { };