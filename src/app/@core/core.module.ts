/* tslint:disable */
import { ModuleWithProviders, NgModule, Optional, SkipSelf, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbAuthJWTToken, NbAuthSimpleToken } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils/analytics.service';

import { KerbADAuthStrategy } from './auth/kerbad-auth-strategy';
import { LoopbackAuthStrategy } from './auth/loopback-auth-strategy';
import { RoleProvider } from './auth/role.provider';
import { AuthGuard } from './auth/auth-guard.service';

export const NB_CORE_PROVIDERS = [
	...DataModule.forRoot().providers,
	...NbAuthModule.forRoot( {

		strategies: [
			LoopbackAuthStrategy.setup( {
				name: 'Loopback',
				token: {
					class: NbAuthSimpleToken,
					key: 'modified_token'
				},
				baseEndpoint: 'http://qcd480w04:3000/auth/',
				login: {
					endpoint: 'ad',
					method: 'post',
					requireValidToken: true,
				},
			} ),
		],
	} ).providers,

	NbSecurityModule.forRoot( {
		accessControl: {
			guest: {
				access: [ 'dashboard', 'unauthorized' ],
			},
			QCD480GGUsers: {
				parent: 'guest',
				access: [ 'dashboard', 'unauthorized' ],
			},
			QCD480GG_WEB_OpenOrders: {
				parent: 'QCD480GGUsers',
				access: [ 'openorders' ],
			},
			QCD480GG_WEB_HEIMARBEIT_WRITE: {
				parent: 'QCD480GGUsers',
				access: [ 'heimarbeit', 'heimarbeit-dashboard' ],
			},
			QCD480GGIt: {
				parent: 'QCD480GGUsers',
				access: [ 'openorders' ],
			},
			QCD480GG_WEB_Montageanleitungen: {
				parent: 'guest',
				access: [ 'enovia' , 'enovia/documentsearch' , 'enovia/montageanleitungen' ],
			},
			QCD480GG_WEB_MONTAGEANLEITUNGEN: {
				parent: 'guest',
				access: [ 'enovia' , 'enovia/documentsearch' , 'enovia/montageanleitungen' ],
			},
			QCD480GGOUAdministrators: {
				parent: 'QCD480GGUsers',
				access: '*',
			}
		},
	} ).providers,
	{ provide: NbRoleProvider, useClass: RoleProvider },

	AnalyticsService, 
];

@NgModule( {
	imports: [
		CommonModule,
	],
	exports: [
		NbAuthModule,
	],
	declarations: [],
} )
export class CoreModule {
	constructor( @Optional() @SkipSelf() parentModule: CoreModule ) {
		throwIfAlreadyLoaded( parentModule, 'CoreModule' );
	}

	static forRoot(): ModuleWithProviders {
		return <ModuleWithProviders> {
			ngModule: CoreModule,
			providers: [
				...NB_CORE_PROVIDERS, RoleProvider, AuthGuard
			],
		};
	}
}