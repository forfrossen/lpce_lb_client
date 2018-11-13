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

export const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  ...NbAuthModule.forRoot({

    strategies: [
		KerbADAuthStrategy.setup( {
			name: 'Kerberos',
			token: {
				class: NbAuthJWTToken,
			},
			baseEndpoint: 			'http://qcd480w04:3001/',
			login: {
				endpoint: 			'auth',
				method: 			'post',
				requireValidToken: 	 true,
			},
		} ),
		LoopbackAuthStrategy.setup( {
			name: 'Loopback',
			token: {
				class: NbAuthSimpleToken,
				key: 'modified_token'
			},
			baseEndpoint: 			'http://qcd480w04:3000/auth/',
			login: {
				endpoint: 			'ad',
				method: 			'post',
				requireValidToken: 	 true,
			},
		} ),
	],
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
	  },
	  QCD480GGOUAdministrators: {
		  parent: 'user',
		  root: 'admin',
		  view: '*',
		  create: '*',
		  edit: '*',
		  remove: '*',
	  }
    },
  }).providers,

  {
    provide: NbRoleProvider, useClass: RoleProvider,
  },
  AnalyticsService
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}