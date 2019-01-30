import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile ,  catchError, retry, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
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
import { jsonpCallbackContext } 							from '@angular/common/http/src/module';

import * as XML2js from 'xml2js';


@Component( {
	selector: 'ngx-dashboard',
	templateUrl: './dashboard.component.html',
} )
export class DashboardComponent implements OnInit, OnDestroy {

	private alive = false;
	private lbToken: SDKToken['id'];
	public LoopbackData: any;
	public roles: string[] = [];
	private UserIf: UserInterface;
	public TiSettings: any;
	sName: string =  'Dashboard.Component - ';

	enoviaJSONdata: any = {};


	constructor(
		private log: LoggerServiceExtended,
		private NBTokenService: NbTokenService,
		private themeService: NbThemeService,
		//public roleProvider: RoleProvider,
		public accessChecker: NbAccessChecker,
		private httpClient: HttpClient,
	) {

		LoopBackConfig.setBaseURL( BASE_URL );
		LoopBackConfig.setApiVersion( API_VERSION );


		const enoviaAPI: string = 'http://qcd480a01.uk.parker.corp/documentSearch/DocumentSearchResultsXML.jsp';
		
		const headers = new HttpHeaders({ 'Content-Type': 'text/xml' }).set('Accept', 'text/xml');
		//const headers = new HttpHeaders( { 'Content-Type': 'text/xml' } ).set( 'Accept', 'text/xml' );
	
		let params = new HttpParams()
			.set( 'type', 'Part' )
			.set( 'revision', '*' )
			.set( 'name', '502KRAM12*' )
			.set( 'current', '*' )
			.set( 'short_description', '*' )
			.set( 'user', 'QCDEDocSearch' )
			.set( 'rdo', 'QCDE-Unrestricted' )
			.set( 'results_field', 'Type,Name,Revision,State,RDO,Short_Description,FileLink' )
	

		//let asdf = JSON.stringify( options ).replace( '{', '' ).replace( '}', '' )
		
		// console.log( params.toString() );

		try {
			this.httpClient.get( enoviaAPI, { headers: headers, responseType: 'text', params: params } ).subscribe( ( data: any ) => {
				
				data = data.trim();

				var parser = new XML2js.Parser({
					mergeAttrs : true
				});
				
				parser.parseString( data, ( err, result ) => {
					if ( err ) throw err;
					
					this.enoviaJSONdata = result.phcXML.data[ 0 ][ "z:row" ];

					console.log('Done');
				});

				//console.log( data );
			} )

		} catch {
			console.error( 'something went wrong' );
		} finally {
			console.log( 'enovia api query done...%O', this.enoviaJSONdata );
		}

	}

	ngOnInit() {

		this.alive = true;

	}

	ngOnDestroy() {
		this.alive = false;
	}
}