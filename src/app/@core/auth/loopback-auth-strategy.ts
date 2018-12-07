import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable, of as observableOf } from 'rxjs';
import { switchMap, map, catchError ,  delay } from 'rxjs/operators';

import { NbAuthStrategy } from '@nebular/auth/strategies/auth-strategy';
import { NbAuthResult } from '@nebular/auth/services/auth-result';
import { NbAuthStrategyClass } from '@nebular/auth/auth.options';
import { LoopbackAuthStrategyOptions } from './loopback-auth-strategy-options';
import { NbAuthIllegalTokenError } from '@nebular/auth/services/token/token';

import { BASE_URL, API_VERSION }							from 'app/shared/base.url.config';
import { LoopBackConfig, LoggerService } 					from 'app/shared/sdk';
import { User, UserInterface, Message, SDKToken } 			from 'app/shared/sdk/models';
import { UserApi, LoopBackAuth } 							from 'app/shared/sdk/services';
import { UserApiExtended } 									from 'app/shared/extended/user.extended';
import { pipe } from '@angular/core/src/render3/pipe';

@Injectable( { providedIn: 'root' } )
export class LoopbackAuthStrategy extends NbAuthStrategy {
	
	private loopbackAuthStrategyOptions: LoopbackAuthStrategyOptions = new LoopbackAuthStrategyOptions();
	protected defaultOptions: LoopbackAuthStrategyOptions = this.loopbackAuthStrategyOptions;
	private sName = 'Loopback-auth-strategy - ';

	static setup( options: LoopbackAuthStrategyOptions ): [ NbAuthStrategyClass, LoopbackAuthStrategyOptions ] {
		return [ LoopbackAuthStrategy, options ];
	}

	constructor(
		protected http: HttpClient,
		private route: ActivatedRoute,
		private LBAuth: LoopBackAuth,
		private userApi: UserApiExtended
	){
		super();
	}



	authenticate( data?: any ): Observable<NbAuthResult> {
		const module = 'login';
		const method = this.getOption( `${module}.method` );
		const url = this.getActionEndpoint( module );
		
		const requireValidToken = this.getOption( `${module}.requireValidToken` );
		//return this.http.request( method, url + '?include=user', { body: data, observe: 'response', withCredentials: true } )
		return this.userApi.loginAD()
			.pipe(
				map( ( res: any ) => {
					if ( this.getOption( `${module}.alwaysFail` ) ) {
						throw this.createFailResponse( data );
					}
					console.log( this.sName, 'RES: ', res );
					return res;
				} ),
				map( ( res: any ) => {
					
					
					if ( res ) {
						/*
						this.LBAuth.setToken( res );
						this.LBAuth.setRememberMe( true );
						*/
						//this.userApi.login();
						
						//console.log( this.sName, 'getAccessTokenId: ', this.LBAuth.getAccessTokenId() );
						//console.log( this.sName, 'getToken: ', this.LBAuth.getToken() );
						//console.log( this.sName, 'response: ', res );

						let modified_token: any =  JSON.parse(JSON.stringify(res.body))
						
						res.body[ 'modified_token' ] = modified_token;
						
						console.log( this.sName, 'response: ', res );
						//res.body.data.access_token = res.body.access_token; //{ access_token: res.access_token, id: res.id, userId: res.userId };

					} else {

						console.error( 'Access Token not given in Server response: ', res.body );
						
					}
					
					return res;
				} ),

				map( ( res ) => {
					return new NbAuthResult(
						true,
						res,
						this.getOption( `${module}.redirect.success` ),
						[],
						this.getOption( 'messages.getter' )( module, res, this.options ),
						this.createToken( this.getOption( 'token.getter' )( module, res, this.options ), requireValidToken ) );
				} ),
				catchError( ( res ) => {
					return this.handleResponseError( res, module );
				} ),
			);
	}

	register( data?: any ): Observable<NbAuthResult> {
		const module = 'register';
		const method = this.getOption( `${module}.method` );
		const url = this.getActionEndpoint( module );
		const requireValidToken = this.getOption( `${module}.requireValidToken` );
		return this.http.request( method, url, { body: data, observe: 'response' } )
			.pipe(
				map( ( res ) => {
					if ( this.getOption( `${module}.alwaysFail` ) ) {
						throw this.createFailResponse( data );
					}

					return res;
				} ),
				map( ( res ) => {
					return new NbAuthResult(
						true,
						res,
						this.getOption( `${module}.redirect.success` ),
						[],
						this.getOption( 'messages.getter' )( module, res, this.options ),
						this.createToken( this.getOption( 'token.getter' )( 'login', res, this.options ), requireValidToken ) );
				} ),
				catchError( ( res ) => {
					return this.handleResponseError( res, module );
				} ),
			);
	}

	requestPassword( data?: any ): Observable<NbAuthResult> {
		const module = 'requestPass';
		const method = this.getOption( `${module}.method` );
		const url = this.getActionEndpoint( module );
		return this.http.request( method, url, { body: data, observe: 'response' } )
			.pipe(
				map( ( res ) => {
					if ( this.getOption( `${module}.alwaysFail` ) ) {
						throw this.createFailResponse();
					}

					return res;
				} ),
				map( ( res ) => {
					return new NbAuthResult(
						true,
						res,
						this.getOption( `${module}.redirect.success` ),
						[],
						this.getOption( 'messages.getter' )( module, res, this.options ) );
				} ),
				catchError( ( res ) => {
					return this.handleResponseError( res, module );
				} ),
			);
	}

	resetPassword( data: any = {} ): Observable<NbAuthResult> {

		const module = 'resetPass';
		const method = this.getOption( `${module}.method` );
		const url = this.getActionEndpoint( module );
		const tokenKey = this.getOption( `${module}.resetPasswordTokenKey` );
		data[ tokenKey ] = this.route.snapshot.queryParams[ tokenKey ];
		return this.http.request( method, url, { body: data, observe: 'response' } )
			.pipe(
				map( ( res ) => {
					if ( this.getOption( `${module}.alwaysFail` ) ) {
						throw this.createFailResponse();
					}

					return res;
				} ),
				map( ( res ) => {
					return new NbAuthResult(
						true,
						res,
						this.getOption( `${module}.redirect.success` ),
						[],
						this.getOption( 'messages.getter' )( module, res, this.options ) );
				} ),
				catchError( ( res ) => {
					return this.handleResponseError( res, module );
				} ),
			);
	}

	logout(): Observable<NbAuthResult> {

		const module = 'logout';
		const method = this.getOption( `${module}.method` );
		const url = this.getActionEndpoint( module );

		return observableOf( {} )
			.pipe(
				switchMap( ( res: any ) => {
					if ( !url ) {
						return observableOf( res );
					}
					return this.http.request( method, url, { observe: 'response' } );
				} ),
				map( ( res ) => {
					if ( this.getOption( `${module}.alwaysFail` ) ) {
						throw this.createFailResponse();
					}

					return res;
				} ),
				map( ( res ) => {
					return new NbAuthResult(
						true,
						res,
						this.getOption( `${module}.redirect.success` ),
						[],
						this.getOption( 'messages.getter' )( module, res, this.options ) );
				} ),
				catchError( ( res ) => {
					return this.handleResponseError( res, module );
				} ),
			);
	}

	refreshToken( data?: any ): Observable<NbAuthResult> {
		
		const module = 'refreshToken';
		const method = this.getOption( `${module}.method` );
		const url = this.getActionEndpoint( module );
		const requireValidToken = this.getOption( `${module}.requireValidToken` );

		return this.http.request( method, url, { body: data, observe: 'response' } )
			.pipe(
				map( ( res ) => {
					if ( this.getOption( `${module}.alwaysFail` ) ) {
						throw this.createFailResponse( data );
					}

					return res;
				} ),
				map( ( res ) => {
					return new NbAuthResult(
						true,
						res,
						this.getOption( `${module}.redirect.success` ),
						[],
						this.getOption( 'messages.getter' )( module, res, this.options ),
						this.createToken( this.getOption( 'token.getter' )( module, res, this.options ), requireValidToken ) );
				} ),
				catchError( ( res ) => {
					return this.handleResponseError( res, module );
				} ),
			);
	}

	protected handleResponseError( res: any, module: string ): Observable<NbAuthResult> {
		let errors = [];
		if ( res instanceof HttpErrorResponse ) {
			errors = this.getOption( 'errors.getter' )( module, res, this.options );
		} else if ( res instanceof NbAuthIllegalTokenError ) {
			errors.push( res.message )
		} else {
			errors.push( 'Something went wrong.' );
		}
		return observableOf(
			new NbAuthResult(
				false,
				res,
				this.getOption( `${module}.redirect.failure` ),
				errors,
			) );
	}

}