
import { of as observableOf, Observable, Subject, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { NbAuthService, NbAuthResult, NbAuthSimpleToken } from '@nebular/auth';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { switchMap, map, catchError } from 'rxjs/operators';


import { BASE_URL, API_VERSION } from 'app/shared/base.url.config';
import { LoopBackConfig } from 'app/shared/sdk';
import { LoggerServiceExtended } from 'app/shared/extended/logger.service.extended'
import { User, UserInterface, Message, SDKToken } from 'app/shared/sdk/models';
import { UserApi, LoopBackAuth } from 'app/shared/sdk/services';

interface MyUserInterface {
	name: string;
	picture: string;
	ADProfile: {
		_groups: string[];
	};
	groups: string[];
}


@Injectable({
	providedIn: 'root',
  })
export class UserService {

	private guest = {
		name: 'Gast',
		picture: '',
		ADProfile: {
			_groups:
				[ 'guest' ],
		},
		groups: [ 'guest' ],
	};

	//private user: any = this.guest;
	LoopbackData: any;
	userArray: any[];
	user: MyUserInterface = this.guest;
	groups: string[] = this.guest.ADProfile._groups;
	sName: string = 'user.service - ';

	constructor(
		private log: LoggerServiceExtended,
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

	getUserArray(): Observable<any[]> {
		return observableOf( this.userArray );
	}

	getUser(): Observable<MyUserInterface> {
		return observableOf( this.user );
	}

	getGroups(): Observable<string[]> {
		return observableOf( this.groups );
	}

	async setUser() {
		try {
			return await this.userAPI.getIdentities( this.LBAuth.getCurrentUserId() ).toPromise()
				.then( userIdentities => {
						
					this.log.inform( this.sName, 'LB User Profile: ', userIdentities[ 0 ] );
					
					const tmpUser: MyUserInterface = {
						name: userIdentities[ 0 ].profile.displayName,
						picture: '',
						ADProfile: userIdentities[ 0 ].profile,
						groups: userIdentities[ 0 ].profile._groups,
					}
					
					this.user =  tmpUser;
					this.groups = tmpUser.ADProfile._groups;

					this.log.inform( this.sName, 'This User: ', this.user );
					return true;

				} )
		} catch ( err ) {
			this.log.error( this.sName, 'Could not retrieve user info due to Error: ', err )
			return Promise.reject( err );
		}

	}

	getUserA(): Observable<any> {

		return this.NBAuthService.onTokenChange()
			.pipe(
				map( ( token: NbAuthSimpleToken ) => {

					const userId = token.getValue()[ 'userId' ];
					const accessTokenId = token.getValue()[ 'access_token' ];

					this.log.inform( this.sName, 'Nbtoken: ', token.getValue()[ 'userId' ] );
					//return this.guest;

					if ( !token.isValid() ) {
						this.log.inform( this.sName, 'sorry, token invalid!' );
						return this.guest;
					} else {


						// Wenn LBAuth kein Token hat, dann aus dem Nebular Token zusammenbauen und speichern
						if ( !this.LBAuth.getAccessTokenId() && !this.LBAuth.getToken()[ 'id' ] ) {
							this.log.inform( this.sName, 'LBAuth no token!!!!!!!!!!!!!!!!: ', this.LBAuth.getAccessTokenId() );
							const tmpToken: any = { id: accessTokenId, userId: userId }
							this.LBAuth.setToken( tmpToken );
							this.LBAuth.setRememberMe( true );
							this.LBAuth.save();
						}

						this.log.inform( this.sName, 'getAccessTokenId: ', this.LBAuth.getAccessTokenId() );
						this.log.inform( this.sName, 'getToken: ', this.LBAuth.getToken() );
						this.log.inform( this.sName, 'LBAuth Check: ', this.LBAuth.getToken() );
						//this.LBAuth.setToken = token.getValue();
					}

				} ),
			);
	}

	private handleError( data?: any ) {
		return ( error: any ) => {
			this.log.inform( error );
		}
	}
}