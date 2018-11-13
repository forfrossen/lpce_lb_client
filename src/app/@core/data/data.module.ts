import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from './users.service';
import { StateService } from './state.service';

import { LoopBackConfig, LoggerService } from 'app/shared/sdk';
import { UserApi, LoopBackAuth } from 'app/shared/sdk/services';
import { SSO } from '../auth/SSO.service';

const SERVICES = [
	UserService, SSO,
	StateService, UserApi, LoopBackAuth, LoopBackConfig, LoggerService
];

@NgModule( {
	imports: [
		CommonModule,
	],
	providers: [
		...SERVICES,
	],
} )
export class DataModule {
	static forRoot(): ModuleWithProviders {
		return <ModuleWithProviders> {
			ngModule: DataModule,
			providers: [
				...SERVICES,
			],
		};
	}
}
