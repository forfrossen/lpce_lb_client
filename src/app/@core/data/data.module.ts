import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from './users.service';
import { StateService } from './state.service';

import { LoggerServiceExtended } from 'app/shared/extended/logger.service.extended';
import { LoopBackConfig, LoggerService } from 'app/shared/sdk';
import { UserApi, LoopBackAuth } from 'app/shared/sdk/services';

import { SSO } from '../auth/SSO.service';

const SERVICES = [
	SSO, UserService,
	StateService, UserApi, LoopBackAuth, LoopBackConfig, LoggerService, LoggerServiceExtended,
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
