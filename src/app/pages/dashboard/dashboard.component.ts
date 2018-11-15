import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators/takeWhile';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';
import { Observable  } from 'rxjs';
import { toPromise } from 'rxjs/operator/toPromise';
import { reject } from 'q';
import { NbAuthService, NbTokenService } from '@nebular/auth'


//import { RoleProvider } 							from 'app/@core/auth/role.provider';

import { BASE_URL, API_VERSION }							from 'app/shared/base.url.config';
import { LoopBackConfig, LoggerService } 					from 'app/shared/sdk';
import { User, UserInterface, Message, SDKToken } 			from 'app/shared/sdk/models';
import { LoopBackAuth } 									from 'app/shared/sdk/services';
import { UserApiExtended } 									from 'app/shared/extended/user.extended';
import { pipe } 											from '@angular/core/src/render3/pipe';
import { SSO } from 'app/@core/auth/SSO.service';

interface CardSettings {
	title: string;
	iconClass: string;
	type: string;
}

interface LBAuthResponse{
	access_token: string;
	userId: number;
}

interface ADUser{
	account: {
		displayName: string,
		name: {
			familyName: string,
			givenName: string
		},
		emails: [{value: string}],
		_json: {
			dn: string,
			displayName: string,
			givenName: string,
			sn: string,
			title: string,
			userPrincipalName: string,
			sAMAccountName: string,
			mail: string,
			description: string,
			memberOfGroups: [string]
		},
		memberOfGroups: [string]
	},
	session: {
		cookie: {
			originalMaxAge: string,
			expires: string,
			httpOnly: string,
			path: string
		},
		__lastAccess: string,
		authenticatedPrincipal: string
	}
}

@Component( {
	selector: 'ngx-dashboard',
	templateUrl: './dashboard.component.html',
} )
export class DashboardComponent implements OnInit, OnDestroy {

	private alive = false;
	private lbToken: SDKToken["id"];
	public ADUser: ADUser;
	public LoopbackData: any;
	public roles: string[] = [];
	private UserIf: UserInterface;
	public TiSettings: any;

	constructor(
		private log: LoggerService,
		private NBAuthService: NbAuthService,
		private NBTokenService: NbTokenService,
		private themeService: NbThemeService,
		private http: HttpClient,
		private auth: LoopBackAuth,
		private mySSO: SSO,
		//private roleProvider: RoleProvider,
	) {

		LoopBackConfig.setBaseURL( BASE_URL );
		LoopBackConfig.setApiVersion( API_VERSION );	
		
/*
		this.http.get( '/express-passport' )
			.subscribe (( data: ADUser ) => {
				this.ADUser = data
			} );
*/		
		
		
	}

	LoopAuthAD() {
		
		this.NBTokenService.clear();
	}
	
	LoopGimme() {

		this.mySSO.Login()
			.then( ( info ) => {
				console.log('Info!: %O', info)
			})
			.catch((err)=>{
				console.error('ERROR!: %O', err)
			})

	}

	ngOnInit() {

		this.alive = true;
/*
		this.roleProvider.getRole()
			.pipe(
				map( role => {
					console.log ( role );
				})
			)
*/
	}

	ngOnDestroy() {
		this.alive = false;
	}
}


