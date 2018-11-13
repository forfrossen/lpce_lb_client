
import { of as observableOf, Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { NbAuthService, NbAuthResult, NbAuthSimpleToken } from '@nebular/auth';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { switchMap, map, catchError } from 'rxjs/operators';


import { BASE_URL, API_VERSION } from 'app/shared/base.url.config';
import { LoopBackConfig, LoggerService } from 'app/shared/sdk';
import { User, UserInterface, Message, SDKToken } from 'app/shared/sdk/models';
import { UserApi, LoopBackAuth } from 'app/shared/sdk/services';

let counter = 0;

@Injectable()
export class UserService {

	private users = {
		nick: { name: 'Markus Kristen', picture: 'assets/images/nick.png' },
		eva: { name: 'Eva Moor', picture: 'assets/images/eva.png' },
		jack: { name: 'Jack Williams', picture: 'assets/images/jack.png' },
		lee: { name: 'Lee Wong', picture: 'assets/images/lee.png' },
		alan: { name: 'Alan Thompson', picture: 'assets/images/alan.png' },
		kate: { name: 'Kate Martinez', picture: 'assets/images/kate.png' },
	};

	private guest = {
		name: 'Gast',
		picture: '',
		ADProfile:{
			_groups:
				[ 'guest' ]
		}
	};
	
	//private user: any = this.guest;
	private userArray: any[];
	private user: any = new BehaviorSubject( this.guest );
	public LoopbackData: any;
	private sName: string = 'user.service - ';

	constructor(
		private log: LoggerService,
		private NBAuthService: NbAuthService,
		protected http: HttpClient,
		private LBAuth: LoopBackAuth,
		private userAPI: UserApi,
	) {
		LoopBackConfig.setBaseURL( BASE_URL );
		LoopBackConfig.setApiVersion( API_VERSION );
		LoopBackConfig.setRequestOptionsCredentials( true );
		// this.userArray = Object.values(this.users);
	}

	getUsers(): Observable<any> {
		return observableOf( this.users );
	}

	getUserArray(): Observable<any[]> {
		return observableOf( this.userArray );
	}

	getUser(): Observable<any> { 
		return observableOf( this.user );
	}

	setUser() {
		return new Promise( ( resolve, reject ) => {
			if ( !this.LBAuth.getToken() ) {
				console.log( this.sName + 'LB Module not yet ready - not logged in!' )
				reject();
			} 
			else {
				console.log( this.sName + 'LB Module ready - setting user! Token: %O', this.LBAuth.getToken() );
				this.userAPI.getIdentities( this.LBAuth.getCurrentUserId() )
					.toPromise()
						.then( userIdentities  => {
							this.log.info( this.sName + 'LB User Profile: %O', userIdentities[ 0 ] );
							this.user.name = userIdentities[ 0 ].profile.displayName;
							this.user.picture = '';
							this.user.ADProfile = userIdentities[ 0 ].profile;
							this.user.groups = userIdentities[ 0 ].profile._groups;
							resolve();
						} )
						.catch( err => {
							console.error( this.sName + 'Could not retrieve user info due to Error: %O', err )
							reject(err);
						})
			}
		})
	}

	getUserA(): Observable<any> {

		return this.NBAuthService.onTokenChange()
			.pipe(
				map( ( token: NbAuthSimpleToken ) => {

					let userId = token.getValue()[ 'userId' ];
					let accessTokenId = token.getValue()[ 'access_token' ];
					
					this.log.info(this.sName + 'Nbtoken: %O', token.getValue()[ 'userId' ] );
					//return this.guest;

					if ( !token.isValid() ) {
						this.log.info(this.sName + 'sorry, token invalid!' );
						return this.guest;
					} else {


						// Wenn LBAuth kein Token hat, dann aus dem Nebular Token zusammenbauen und speichern
						if ( ! this.LBAuth.getAccessTokenId() &&  ! this.LBAuth.getToken()['id'] ) {
							this.log.info(this.sName + 'LBAuth no token!!!!!!!!!!!!!!!!: %O', this.LBAuth.getAccessTokenId() );
							let tmpToken: any = { id: accessTokenId, userId: userId }
							this.LBAuth.setToken( tmpToken );
							this.LBAuth.setRememberMe( true );
							this.LBAuth.save();
						}

						this.log.info(this.sName + 'getAccessTokenId: %O', this.LBAuth.getAccessTokenId() );
						this.log.info(this.sName + 'getToken: %O', this.LBAuth.getToken() );
						this.log.info(this.sName + 'LBAuth Check: %O', this.LBAuth.getToken() );
						//this.LBAuth.setToken = token.getValue();
					}

				} ),
			);
	}

	private handleError( data?: any ) {
		return ( error: any ) => {
			console.log( error );
		}
	}
}