import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SDKModels } from '../sdk/services/custom/SDKModels';
import { BaseLoopBackApi } from '../sdk/services/core/base.service';
import { LoopBackConfig } from '../sdk/lb.config';
import { LoopBackAuth } from '../sdk/services/core/auth.service';
import { LoopBackFilter, SDKToken, AccessToken } from '../sdk/models/BaseModels';
import { ErrorHandler } from '../sdk/services/core/error.service';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../sdk/models/User';
import { UserApi } from '../sdk/services/custom/User';

@Injectable( { providedIn: 'root' } )
export class UserApiExtended extends UserApi {

	/*
	constructor(
		@Inject(HttpClient) protected http: HttpClient,
		@Inject(SocketConnection) protected connection: SocketConnection,
		@Inject(SDKModels) protected models: SDKModels,
		@Inject(LoopBackAuth) protected auth: LoopBackAuth,
		@Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler
	) {
		super(http,  connection,  models, auth, errorHandler);
	}
	*/
	
	public loginAD( credentials?: any, include: any = 'user', rememberMe: boolean = true, customHeaders?: Function ): Observable<any> {
		//public login(credentials: any, include: any = 'user', rememberMe: boolean = true, customHeaders?: Function): Observable<any> {
		let _method: string = "POST";
		let _url: string = LoopBackConfig.getPath() + "/auth/ad"
		// + LoopBackConfig.getApiVersion() +
		//"/users/login";
		let _routeParams: any = {};
		let _postBody: any = {
			//credentials: { 'username': 'asdf', 'password': 'asdf' }
		};
		let _urlParams: any = {};
		if ( typeof include !== 'undefined' && include !== null ) _urlParams.include = include;

		/*
		console.log( ' User.ts - method: ', _method );
		console.log( ' User.ts - url: ', _url );
		console.log( ' User.ts - routeParams: ', _routeParams );
		console.log( ' User.ts - urlParams: ', _urlParams );
		console.log( ' User.ts - postBody: ', _postBody );
		console.log( ' User.ts -  customHeaders: ', customHeaders );
		*/

		//let result = this.request( _method, _url, _routeParams, _urlParams, _postBody, null, customHeaders )
		let result = this.http.request( _method, _url + '?include=user', { body: _postBody, observe: 'response', withCredentials: true } )
			.pipe(
				map( ( response: any ) => {
					
					//console.log( ' User.ts - response: ', response );
					
					return response;
				} ),
				map( ( response: any ) => {
					response.body.ttl = parseInt( '3600' );
					response.body.rememberMe = rememberMe;
					//response.body.id = response.access_token;
					
					//console.log( ' User.ts - response: ', response );
					
					this.auth.setToken( response.body );
					this.auth.save();
					return response;
				}
				)
			);
		return result;
	}
}
