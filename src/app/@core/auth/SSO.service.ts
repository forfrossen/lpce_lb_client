import { Injectable } from '@angular/core';
import { NbAuthService, NbAuthResult, NbAuthToken, NbAuthSimpleToken } from '@nebular/auth';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { pipe } from 'rxjs';

import { BASE_URL, API_VERSION } from 'app/shared/base.url.config';
import { LoopBackConfig, LoggerService } from 'app/shared/sdk';
import { User, UserInterface, SDKToken } from 'app/shared/sdk/models';
import { UserApi, LoopBackAuth } from 'app/shared/sdk/services';
import { reject } from 'q';
import { resolve } from 'url';
import { UserService } from '../data/users.service';

@Injectable({
	providedIn: 'root',
})
export class SSO {

	private sName: string = 'SSO.Service - '

	constructor( private authService: NbAuthService,
		private NBAuthService: NbAuthService,
		private LBAuth: LoopBackAuth,
		private userAPI: UserApi,
		private userService: UserService,
		private log: LoggerService,
	) {
		LoopBackConfig.setBaseURL( BASE_URL );
		LoopBackConfig.setApiVersion( API_VERSION );
		LoopBackConfig.setRequestOptionsCredentials( true );

		//this.Login
	}

	Login(): Promise<any>{
		return new Promise( ( resolve, reject ) => {
			this.NBAuthService.isAuthenticated()
				.toPromise()
				.then( isAuthenticated => {
					if ( isAuthenticated ) {
						console.log( this.sName + ' NB already Authenticated!' )
						this.loginLB()
							.then( () => {
								console.log( this.sName + ' LB Authenticated!' )
								this.userService.setUser()
									.then( () => {
										resolve('Login done');
									} )
									.catch( this.handleError() );
							} )
							.catch( this.handleError() );
					} else {
						console.log( this.sName + ' NB not yet Authenticated!' )
						this.loginNb()
							.then( () => {
								console.log( this.sName + ' NB Authenticated!' )
								if ( !this.LBAuth.getAccessTokenId() ) {
									console.log( this.sName + ' LB no TokenID: %O', this.LBAuth.getAccessTokenId() )
									this.loginLB()
										.then( () => {
											console.log( this.sName + ' LB Authenticated!' )
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


	loginNb() {
		return new Promise( ( resolve, reject ) => {
			this.NBAuthService.authenticate( 'Loopback' )
				.toPromise()
				.then( ( authResult: NbAuthResult ) => {
					if ( authResult.isFailure() ) {
						reject( 'Could not login NB. Error: ' + authResult.getErrors() )
					}
					else {
						console.log(this.sName +  'Nb Login Attempt successfull: %O', authResult )
						resolve()
					}
				} )
				.catch( this.handleError() );
		})
	}

	loginLB() {
		return new Promise( ( resolve, reject ) => {
			this.NBAuthService.getToken()
				.toPromise()
				.then( ( token: NbAuthSimpleToken ) => {
					if ( token.isValid() ) {
						console.log(this.sName +  'building tmpToken from NBToken: %O', token );
						let userId = token.getValue()[ 'userId' ];
						let accessTokenId = token.getValue()[ 'access_token' ];
						let tmpToken: any = { id: accessTokenId, userId: userId }
						console.log(this.sName +  'userId: %O', userId );
						console.log(this.sName +  'accessTokenId: %O', accessTokenId );
						console.log(this.sName +  'tmpToken: %O', tmpToken );
						console.log(this.sName +  'set LBAuth token' );
						this.LBAuth.setToken( tmpToken );
						this.LBAuth.setRememberMe( true );
						this.LBAuth.save();
						resolve();
					}
					else {
						console.log( this.sName + 'NB Token not valid: %O', token);
						reject();
					}
				} )
				.catch( this.handleError() )
		})
	}

	private getUserInfo() {
		return new Promise( ( resolve, reject ) => {
			this.userAPI.getCurrent()
				.toPromise()
				.then( userData => {
					console.log( this.sName + 'UserData: %O', userData );
					this.userAPI.findByIdIdentities( userData.id, userData.id )
						.toPromise()
						.then( ( data: any ) => {
							this.log.info( this.sName + 'findByIdIdentities: %O', data );
							this.LBAuth.setRememberMe( true );
							this.LBAuth.setUser( data );
							this.LBAuth.save();
							this.log.info( this.sName + 'LB User Profile: %O', this.LBAuth.getCurrentUserData() );
							resolve();
						} )
						.catch( this.handleError() );
				} )
				.catch( this.handleError() );
		})
	}

	private handleError( data?: any ) {
		return ( error: any ) => {
			console.log( error );
		}
	}

}