import { Injectable } from '@angular/core';
import { NbAuthService, NbAuthResult, NbAuthToken, NbAuthSimpleToken, NbTokenService } from '@nebular/auth';
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
	
	isLoginFailed: boolean = false;

	constructor(
		private NBAuthService: NbAuthService,
		private LBAuth: LoopBackAuth,
		private NBTokenService: NbTokenService,
		private userAPI: UserApi,
		private userService: UserService,
		private log: LoggerServiceExtended,
	) {
		LoopBackConfig.setBaseURL( BASE_URL );
		LoopBackConfig.setApiVersion( API_VERSION );
		LoopBackConfig.setRequestOptionsCredentials( true );

	}

	async loginProcedure( ): Promise<any> {

		try {
			
			this.log.inform( this.sName, 'Clearing Token Storage now' );
			
			// Clear Token Storage, ensure no old local Tokens interfere with the authentication process
			let NBTokenClearer	= await this.NBTokenService.clear().toPromise();
			let emptyNBToken 	= await this.NBTokenService.get().toPromise();
			if ( emptyNBToken.getValue() === '' ) this.log.inform( this.sName, 'NB Token deleted' );
			
			let clearedLBToken	= await this.LBAuth.clear();
			let emptyLBToken	= await this.LBAuth.getToken();
			if ( emptyLBToken.id === null ) this.log.inform( this.sName, 'LB Token deleted' );
			
			// Authenticate against Backend Server
			let NBAuthResult	= await this.NBAuthService.authenticate( 'Loopback' ).toPromise();			
			if ( NBAuthResult.isSuccess() ) this.log.inform( this.sName, ' Nb Login Attempt successfull: ', NBAuthResult.getResponse() );
			else throw new Error( 'Could not login NB. Error: ' + NBAuthResult.getErrors() );

			// Getting Token from Nebular Token Service to build LB Token
			let NBToken = await this.NBAuthService.getToken().toPromise()
			
			// Building LB Access Token from Nebular token
			if ( NBToken.isValid() ) {

				this.log.inform( this.sName, ' building tmpToken from NBToken:', NBToken.getValue() );

				const tmpLBToken: SDKToken = {
					id: NBToken.getValue()[ 'access_token' ],
					userId: NBToken.getValue()[ 'userId' ],
					ttl: 60 * 60,
					scopes: '',
					created: new Date(),
					rememberMe: true,
					user: '',
				};

				this.log.inform( this.sName, ' setting LBAuth-Token now: ', tmpLBToken );
				this.LBAuth.setToken( tmpLBToken );
				this.LBAuth.save();

			} else throw new Error( 'NB Token is not valid!: ' + NBToken.toString() );
			
			// Getting User Info from Backend and setting them 
			let userInfoSetr = await this.userService.setUser();
			


			return Promise.resolve( 'Login done' )

		} catch ( err ) {
			this.handleLoginFailure( err );
		}
	}


	handleLoginFailure(err): void {

		this.log.error( this.sName, ' =================== LOGIN FAILED, EXECUTING FALLBACK ACTION =================== ' );
		this.log.inform( this.sName, 'ERROR: ', err );
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
		if ( !this.isLoginFailed ) this.loginProcedure();
		else {
			alert( 'Sorry, login not working. Even after wiping cache and trying again...' );
			location.reload();
		}
	}
}


/*

	
	async loginNB( ): Promise<any> {
		
		if ( isAuthenticated && ! this.isLoginFailed ) {
			this.log.inform( this.sName, ' NB already authenticated!' );
			return Promise.resolve();
		} 
		
		this.log.inform( this.sName, ' NB not yet authenticated!' );

		
		return await this.NBAuthService.authenticate( 'Loopback' )
			.subscribe( ( authResult: NbAuthResult ) => {
				if ( authResult.isFailure() ) {
					this.log.inform( this.sName, ' Nb Login Attempt UNsuccessfull!!!: ', authResult )
					throw new Error( 'Could not login NB. Error: ' + authResult.getErrors() );
				} else {
					this.log.inform( this.sName, ' Nb Login Attempt successfull: ', authResult );
					return Promise.resolve();
				}
			} )

	}

	async loginLB() {
		return new Promise( ( Resolve, Reject ) => {
			if ( this.LBAuth.getAccessTokenId() ) {
				this.log.inform( this.sName, ' LB already authenticated. TokenID: ', this.LBAuth.getAccessTokenId() )
				return Resolve();
			}

			this.log.inform( this.sName, ' LB no TokenID: ', this.LBAuth.getAccessTokenId() )
			
			this.NBAuthService.getToken().toPromise()
				.then( ( token: NbAuthSimpleToken ) => {
					if ( token.isValid() ) {
						this.log.inform( this.sName, ' building tmpToken from NBToken');
						const userId = token.getValue()[ 'userId' ];
						const accessTokenId = token.getValue()[ 'access_token' ];
						const tmpToken: any = { id: accessTokenId, userId: userId }
						this.log.inform( this.sName, ' userId: ', userId );
						this.log.inform( this.sName, ' accessTokenId: ', accessTokenId );
						this.log.inform( this.sName, ' tmpToken: ', tmpToken );
						this.log.inform( this.sName, ' set LBAuth token' );
						this.LBAuth.setToken( tmpToken );
						this.LBAuth.setRememberMe( true );
						this.LBAuth.save();
						Resolve();
					} else {
						this.log.inform( this.sName, ' NB Token not valid: ', token);
						reject();
					}
				} )
				.catch( this.handleError() )
		})
	}




	Login(): Promise<any> {
		return new Promise( ( resolve, reject ) => {
			this.NBAuthService.isAuthenticated().toPromise()
				.then( isAuthenticated => {
					if ( isAuthenticated ) {
						this.log.inform( this.sName, ' NB already Authenticated!' )
						this.loginLB()
							.then( () => {
								this.log.inform( this.sName, ' LB Authenticated!' )
								this.userService.setUser()
									.then( () => {
										resolve('Login done');
									} )
									.catch( this.handleError() );
							} )
							.catch( this.handleError() );
					} else {
						this.log.inform( this.sName, ' NB not yet Authenticated!' )
						this.loginNb()
							.then( () => {
								this.log.inform( this.sName, ' NB Authenticated!' )
								if ( !this.LBAuth.getAccessTokenId() ) {
									this.log.inform( this.sName, ' LB no TokenID: ', this.LBAuth.getAccessTokenId() )
									this.loginLB()
										.then( () => {
											this.log.inform( this.sName, ' LB Authenticated!' )
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
					this.log.inform( this.sName, 'UserData: ', userData );
					this.userAPI.findByIdIdentities( userData.id, userData.id )
						.toPromise()
						.then( ( data: any ) => {
							this.log.inform( this.sName, 'findByIdIdentities: ', data );
							this.LBAuth.setRememberMe( true );
							this.LBAuth.setUser( data );
							this.LBAuth.save();
							this.log.inform( this.sName, 'LB User Profile: ', this.LBAuth.getCurrentUserData() );
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
						this.log.inform( this.sName, ' Nb Login Attempt successfull: ', authResult )
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
						this.log.inform( this.sName, ' building tmpToken from NBToken: ', token );
						const userId = token.getValue()[ 'userId' ];
						const accessTokenId = token.getValue()[ 'access_token' ];
						const tmpToken: any = { id: accessTokenId, userId: userId }
						this.log.inform( this.sName, ' userId: ', userId );
						this.log.inform( this.sName, ' accessTokenId: ', accessTokenId );
						this.log.inform( this.sName, ' tmpToken: ', tmpToken );
						this.log.inform( this.sName, ' set LBAuth token' );
						this.LBAuth.setToken( tmpToken );
						this.LBAuth.setRememberMe( true );
						this.LBAuth.save();
						Resolve();
					} else {
						this.log.inform( this.sName, ' NB Token not valid: ', token);
						reject();
					}
				} )
				.catch( this.handleError() )
		})
	}

	*/
