import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { tap } from 'rxjs/operators';

import { SSO } from 'app/@core/auth/SSO.service'

@Injectable()
export class AuthGuard implements CanActivate {

	private sName:string = 'Auth-guard.service - '

	constructor(
		private authService: NbAuthService,
		private mySSO: SSO,
		private router: Router,
	) {

	}

	canActivate() {
		return this.authService.isAuthenticated()
			/*
			.pipe(
				tap( authenticated => {
					if ( !authenticated ) {
						console.log( this.sName + 'is NOT YET authenticated' )
						this.mySSO.Login()
							.then( ( result ) => {
								console.log( this.sName + 'is NOW authenticated: %O', result )
								return true;
							} )
							.catch( ( err ) => {
								this.router.navigate( [ '/' ] )
							} )
					} else {
						console.log( this.sName + 'is authenticated' );
						return true;	
					}
				} ),
			);*/
	}
}