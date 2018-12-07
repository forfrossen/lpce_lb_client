import { Injectable } from '@angular/core';
import { NbAuthService, NbAuthResult, NbAuthToken, NbAuthSimpleToken } from '@nebular/auth';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { pipe } from 'rxjs';

import { BASE_URL, API_VERSION } from 'app/shared/base.url.config';
import { LoggerServiceExtended } from 'app/shared/extended/logger.service.extended'
import { LoopBackConfig } from 'app/shared/sdk';
import { User, UserInterface, SDKToken } from 'app/shared/sdk/models';
import { UserApi, LoopBackAuth } from 'app/shared/sdk/services';
import { reject } from 'q';
import { resolve } from 'url';
import { UserService } from '../data/users.service';

@Injectable()
export class SSO {

	private sName: string = 'SSO.service - '
	private debug: boolean = true;
	isLoginFailed: boolean = false;

	constructor(
		private NBAuthService: NbAuthService,
		private LBAuth: LoopBackAuth,
		private userAPI: UserApi,
		private userService: UserService,
		private log: LoggerServiceExtended,
	) {
		LoopBackConfig.setBaseURL( BASE_URL );
		LoopBackConfig.setApiVersion( API_VERSION );
		LoopBackConfig.setRequestOptionsCredentials( true );

		//this.Login
	}

	async loginProcedure( ): Promise<any> {
		return new Promise( ( resolve, reject ) => {
			this.NBAuthService.isAuthenticated().toPromise()
				.then(  isAuthenticated => this.loginNB( isAuthenticated ) )
				.then(  () => this.loginLB() )
				.then(  () => this.userService.setUser() )
				.then(  () => resolve( 'Login done' ) )
				.catch( () => {
					this.handleLoginFailure();
					if ( !this.isLoginFailed ) this.loginProcedure();
					else alert( ' Sorry, anmeldung Fehlgeschlagen. Bitte IT verständigen!' );
				});
		} )
	}
	
	async loginNB( isAuthenticated ): Promise<any> {
		
		return new Promise( ( resolve, reject ) => {
			
			if ( isAuthenticated ) {
				if ( this.debug ) this.log.inform( this.sName, ' NB already authenticated!' );
				return resolve();
			} 
			
			if ( this.debug ) this.log.inform( this.sName, ' NB not yet authenticated!' );
			
			this.NBAuthService.authenticate( 'Loopback' ).toPromise()
				.then( ( authResult: NbAuthResult ) => {
					if ( authResult.isFailure() ) {
						if ( this.debug ) this.log.inform( this.sName, ' Nb Login Attempt UNsuccessfull!!!: ', authResult )
						return reject( 'Could not login NB. Error: ' + authResult.getErrors() )
					} else {
						if ( this.debug ) this.log.inform( this.sName, ' Nb Login Attempt successfull: ', authResult )
						return resolve()
					}
				} )
				.catch( this.handleError() );
			
		})
	}

	async loginLB() {
		return new Promise( ( Resolve, Reject ) => {
			if ( this.LBAuth.getAccessTokenId() ) {
				if ( this.debug ) this.log.inform( this.sName, ' LB already authenticated. TokenID: ', this.LBAuth.getAccessTokenId() )
				return Resolve();
			}

			if ( this.debug ) this.log.inform( this.sName, ' LB no TokenID: ', this.LBAuth.getAccessTokenId() )
			
			this.NBAuthService.getToken().toPromise()
				.then( ( token: NbAuthSimpleToken ) => {
					if ( token.isValid() ) {
						if ( this.debug ) this.log.inform( this.sName, ' building tmpToken from NBToken');
						const userId = token.getValue()[ 'userId' ];
						const accessTokenId = token.getValue()[ 'access_token' ];
						const tmpToken: any = { id: accessTokenId, userId: userId }
						if ( this.debug ) this.log.inform( this.sName, ' userId: ', userId );
						if ( this.debug ) this.log.inform( this.sName, ' accessTokenId: ', accessTokenId );
						if ( this.debug ) this.log.inform( this.sName, ' tmpToken: ', tmpToken );
						if ( this.debug ) this.log.inform( this.sName, ' set LBAuth token' );
						this.LBAuth.setToken( tmpToken );
						this.LBAuth.setRememberMe( true );
						this.LBAuth.save();
						Resolve();
					} else {
						if ( this.debug ) this.log.inform( this.sName, ' NB Token not valid: ', token);
						reject();
					}
				} )
				.catch( this.handleError() )
		})
	}

	private handleError( data?: any ) {
		return ( error: any ) => {
			if ( this.debug ) this.log.error( this.sName, error );
			Promise.reject();
		}
	}

	handleLoginFailure(): void {
		this.log.error( this.sName, ' =================== LOGIN FAILED, EXECUTING FALLBACK ACTION =================== ' );
		this.isLoginFailed = true;
		sessionStorage.clear();
		localStorage.clear();


		const cookies = document.cookie.split( ';' );
		
		for (let i = 0; i < cookies.length; i++) {
			const cookie = cookies[i];
			const eqPos = cookie.indexOf('=');
			const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
			document.cookie = name + 'expires=Thu, 01 Jan 1970 00:00:00 GMT';
		}

	}
}


/*

	Login(): Promise<any> {
		return new Promise( ( resolve, reject ) => {
			this.NBAuthService.isAuthenticated().toPromise()
				.then( isAuthenticated => {
					if ( isAuthenticated ) {
						if ( this.debug ) this.log.inform( this.sName, ' NB already Authenticated!' )
						this.loginLB()
							.then( () => {
								if ( this.debug ) this.log.inform( this.sName, ' LB Authenticated!' )
								this.userService.setUser()
									.then( () => {
										resolve('Login done');
									} )
									.catch( this.handleError() );
							} )
							.catch( this.handleError() );
					} else {
						if ( this.debug ) this.log.inform( this.sName, ' NB not yet Authenticated!' )
						this.loginNb()
							.then( () => {
								if ( this.debug ) this.log.inform( this.sName, ' NB Authenticated!' )
								if ( !this.LBAuth.getAccessTokenId() ) {
									if ( this.debug ) this.log.inform( this.sName, ' LB no TokenID: ', this.LBAuth.getAccessTokenId() )
									this.loginLB()
										.then( () => {
											if ( this.debug ) this.log.inform( this.sName, ' LB Authenticated!' )
											this.userService.setUser().then( () => { resolve('Login done'); } ).catch( this.handleError() );
										} )
										.catch( this.handleError() );
								} else {
									this.userService.setUser().then( () => { resolve('Login done'); } ).catch( this.handleError() );
								}
							} )
							.catch( this.handleError() );
						//reject('Error loggin in');
					}
				} )
				.catch( this.handleError() );
		})
	}


	
	private getUserInfo() {
		return new Promise( ( resolve, reject ) => {
			this.userAPI.getCurrent()
				.toPromise()
				.then( userData => {
					if ( this.debug ) this.log.inform( this.sName, 'UserData: ', userData );
					this.userAPI.findByIdIdentities( userData.id, userData.id )
						.toPromise()
						.then( ( data: any ) => {
							if ( this.debug ) this.log.inform( this.sName, 'findByIdIdentities: ', data );
							this.LBAuth.setRememberMe( true );
							this.LBAuth.setUser( data );
							this.LBAuth.save();
							if ( this.debug ) this.log.inform( this.sName, 'LB User Profile: ', this.LBAuth.getCurrentUserData() );
							resolve();
						} )
						.catch( this.handleError() );
				} )
				.catch( this.handleError() );
		})
	}

	loginNb() {

		return new Promise( ( resolve, reject ) => {

			this.NBAuthService.authenticate( 'Loopback' ).toPromise()
				.then( ( authResult: NbAuthResult ) => {
					if ( authResult.isFailure() ) {
						reject( 'Could not login NB. Error: ' + authResult.getErrors() )
					} else {
						if ( this.debug ) this.log.inform( this.sName, ' Nb Login Attempt successfull: ', authResult )
						resolve()
					}
				} )
				.catch( this.handleError() );
		})
	}

		loginLB() {
		return new Promise( ( Resolve, Reject ) => {
			this.NBAuthService.getToken()
				.toPromise()
				.then( ( token: NbAuthSimpleToken ) => {
					if ( token.isValid() ) {
						if ( this.debug ) this.log.inform( this.sName, ' building tmpToken from NBToken: ', token );
						const userId = token.getValue()[ 'userId' ];
						const accessTokenId = token.getValue()[ 'access_token' ];
						const tmpToken: any = { id: accessTokenId, userId: userId }
						if ( this.debug ) this.log.inform( this.sName, ' userId: ', userId );
						if ( this.debug ) this.log.inform( this.sName, ' accessTokenId: ', accessTokenId );
						if ( this.debug ) this.log.inform( this.sName, ' tmpToken: ', tmpToken );
						if ( this.debug ) this.log.inform( this.sName, ' set LBAuth token' );
						this.LBAuth.setToken( tmpToken );
						this.LBAuth.setRememberMe( true );
						this.LBAuth.save();
						Resolve();
					} else {
						if ( this.debug ) this.log.inform( this.sName, ' NB Token not valid: ', token);
						reject();
					}
				} )
				.catch( this.handleError() )
		})
	}

	*/
