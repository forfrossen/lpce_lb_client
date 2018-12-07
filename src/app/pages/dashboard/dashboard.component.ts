import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile ,  catchError, retry, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable  } from 'rxjs';

import { reject } from 'q';
import { NbAuthService, NbTokenService } from '@nebular/auth'
import { NbAccessChecker } from '@nebular/security';

//import { RoleProvider } 							from 'app/@core/auth/role.provider';

import { BASE_URL, API_VERSION }							from 'app/shared/base.url.config';
import { LoopBackConfig }				 					from 'app/shared/sdk';
import { User, UserInterface, Message, SDKToken } 			from 'app/shared/sdk/models';
import { LoopBackAuth } 									from 'app/shared/sdk/services';
import { UserApiExtended } 									from 'app/shared/extended/user.extended';
import { LoggerServiceExtended } 							from 'app/shared/extended/logger.service.extended'
import { pipe } 											from '@angular/core/src/render3/pipe';
import { SSO } from 'app/@core/auth/SSO.service';
import { RoleProvider } from '../../@core/auth/role.provider'


interface CardSettings {
	title: string;
	iconClass: string;
	type: string;
}

interface LBAuthResponse{
	access_token: string;
	userId: number;
}

interface ADUser {
	account: {
		displayName: string,
		name: {
			familyName: string,
			givenName: string,
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
			path: string,
		},
		__lastAccess: string,
		authenticatedPrincipal: string,
	}
}

@Component( {
	selector: 'ngx-dashboard',
	templateUrl: './dashboard.component.html',
} )
export class DashboardComponent implements OnInit, OnDestroy {

	private alive = false;
	private lbToken: SDKToken['id'];
	public ADUser: ADUser;
	public LoopbackData: any;
	public roles: string[] = [];
	private UserIf: UserInterface;
	public TiSettings: any;
	sName: string =  'Dashboard.Component - ';


	constructor(
		private log: LoggerServiceExtended,
		private NBTokenService: NbTokenService,
		private themeService: NbThemeService,
		//public roleProvider: RoleProvider,
		public accessChecker: NbAccessChecker,
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

	Test() {
		this.log.inform( 'tested' );
	}

	LoopAuthAD() {
		this.NBTokenService.clear();
	}

	LoopGimme() {

		this.accessChecker.isGranted( 'view', 'news' ).subscribe( result => {
			this.log.inform( this.sName, 'Admin Access granted ================>', result );
		});

	}

	ngOnInit() {

		this.alive = true;


		/*
		this.roleProvider.getRole()
			.pipe(
				map( role => {
					this.log.inform( this.sName, 'ROLES ARRAY.isarray', Array.isArray( role ) );
					this.log.inform( this.sName, 'ROLES ARRAY.length', role.length );
					this.log.inform( this.sName, 'ROLES ARRAY', role );
					return Array.isArray( role ) ? role : [ role ];
				} ),
				map( roles => {
					return roles.some(  role => {
						this.log.inform( this.sName, 'ROLES FOUND IN ARRAY', role );
						if ( role === 'QCD480GGOUAdministrators' )
							return true;
						else
							return false;
					} );
				} ) )
				.subscribe( result => {
					this.log.inform( this.sName, 'RESULT asdf ================>', result );
				});


		this.roleProvider.getRole()
			.subscribe( roles => this.LoopbackData = roles )
*/		
		// this.roleProvider.getRole()
			

/*
		this.roleProvider.getRole()
			.pipe(
				map( role => {
					this.log.inform ( role );
				})
			)
*/
	}

	ngOnDestroy() {
		this.alive = false;
	}
}


