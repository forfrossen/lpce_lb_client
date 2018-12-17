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
	
	async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		
		this.log.inform( this.sName, 'canActivate has been called!' );

		/*
		this.log.inform( this.sName, 'ActivatedRouteSnapshot: ', route );
		this.log.inform( this.sName, 'RouterStateSnapshot: ', state );
		*/				
		
		let page = state.url;
		page = page.replace( '/pages/', '' );

		try {
			
			if ( ! this.isLoggedIn ) {
			
				this.log.inform( this.sName, 'Is NOT logged in, doing now: ', page );
				
				let loginResult = await this.mySSO.loginProcedure();
				this.log.inform( this.sName, 'Post Login Info: ', loginResult );
				
				if ( loginResult ) this.isLoggedIn = true;
				else new Error( loginResult )
	
			}
			
			this.log.inform( this.sName, 'Is logged in, checking access: ', page );
				
			let isGranted = await this.accessChecker.isGranted( 'access', page ).toPromise();
			this.log.inform( this.sName, 'Access granted for', page, ' ================>', isGranted );

			if ( !isGranted ) this.router.navigate( [ '/pages/unauthorized' ] );
				
			return isGranted;


		} catch ( err ) {
			
			this.log.error( this.sName, 'Error ================>', err );
			this.router.navigate( [ '/pages/unauthorized' ] );
			return Promise.reject(err);
		
		}
			
	}
/*
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
		let isGranted = await this.accessChecker.isGranted( 'access', url ).toPromise();
		this.log.inform( this.sName, 'Access granted for', url, ' ================>', isGranted );
		return isGranted;
	}
	
*/
	
}
