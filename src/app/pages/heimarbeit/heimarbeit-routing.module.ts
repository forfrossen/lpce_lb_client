import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../../@core/auth/auth-guard.service';
import { HeimarbeitComponent } from './heimarbeit.component';
import { HeimarbeitDashboardComponent } 		from './heimarbeit-dashboard.component';

const routes: Routes = [{ 
	path: '', 
	component: HeimarbeitComponent,
	children: [{
		path: 'dashboard', 
		component: HeimarbeitDashboardComponent, 
		pathMatch: 'full' 
	}]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class HeimarbeitRoutingModule { };
 