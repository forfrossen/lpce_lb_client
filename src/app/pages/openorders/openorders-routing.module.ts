import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../../@core/auth/auth-guard.service';
import { OpenOrdersComponent } from './openorders.component';


const routes: Routes = [{
	path: '',
	component: OpenOrdersComponent,

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class OpenOrdersRoutingModule {
};
