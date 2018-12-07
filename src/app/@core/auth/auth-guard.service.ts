import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoggerServiceExtended } from 'app/shared/extended/logger.service.extended'
import { NbAccessChecker } from '@nebular/security';
import { RoleProvider } from './role.provider'

import { SSO } from 'app/@core/auth/SSO.service'


@Injectable({
	providedIn: 'root',
  })
export class AuthGuard implements CanActivate {

	private sName: string = 'Auth-guard.service - '
	
	private isLoggedIn: boolean = false;

	constructor(
		private router: Router,
		private log: LoggerServiceExtended,
		private mySSO: SSO,
		public  accessChecker: NbAccessChecker,
		public  roleProvider: RoleProvider,
	) {	
		
	}
	
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		
		this.log.inform( this.sName, 'canActivate has been called!' );

		/*
		this.log.inform( this.sName, 'ActivatedRouteSnapshot: ', route );
		this.log.inform( this.sName, 'RouterStateSnapshot: ', state );
		*/

										
		if ( this.isLoggedIn ) {
			
			this.log.inform( this.sName, 'Is logged in, checking access: ', state.url );
			return this.checkAccess(state.url);
			
		} else {
			
			this.log.inform( this.sName, 'Is NOT logged in, doing now: ', state.url );
			
			return this.handleLogin()
				.then( info => {
					this.log.inform( this.sName, 'Post Login Info: ', info );	
					this.isLoggedIn = true;
				} )
				.then( () => {
					this.log.inform( this.sName, 'Checking for access now!' );	
					return this.checkAccess(state.url);
				})
				.catch( err => {
					this.log.error( this.sName, 'Error ================>', err );
					this.router.navigate( [ '/pages/unauthorized' ] );
					return false;
				})
		
		}
			
	}

	async handleLogin() {
		try {
			return await this.mySSO.loginProcedure();
		} catch (err) {
			this.log.error( this.sName, 'ERROR: ', err );
			this.router.navigate( [ '/pages/unauthorized' ] );
			return false;
		}
	}

	async checkAccess(url) {

		return await this.accessChecker.isGranted( 'access', url )
			.toPromise()
			.then( result => {
				this.log.inform( this.sName, 'Access granted for', url, ' ================>', result );
				return result;
			})
	}

}
