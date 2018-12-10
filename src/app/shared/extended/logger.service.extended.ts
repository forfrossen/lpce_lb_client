
/* tslint:disable */
import { Injectable, Inject } from '@angular/core';
import { LoopBackConfig } from '../sdk/lb.config';
import { LoggerService } from '../sdk';

/**
* @author Markus Kristen
* @module LoggerServiceExtended
* @license MIT
* @description
* Console Log wrapper that can be disabled in production mode
**/
@Injectable(
)
export class LoggerServiceExtended extends LoggerService {
	
	lengthFirstArg: number = 20;
	lengthSecondArg: number = 20;
	blanksBetweenArgs: string = '  ';
	section: string = ';'

	loginAndUserSections: boolean = false;

	debuggingSections: object = {
		'Auth-guard.service': this.loginAndUserSections,
		'SSO.service':  this.loginAndUserSections,
		'role.provider':  this.loginAndUserSections,
		'user.service':  this.loginAndUserSections,
		'Loopback-auth-strategy':  this.loginAndUserSections,
		'header.component': false,
		'Dashboard.Component': false,
		'Openorders.Component': true,
		'Teileinfo-List.Component': false,
	}
	
	inform( ...args: any[] ) {

		let firstArg  = args[ 0 ].trim();
		let secondArg = args[ 1 ].trim();
		
		if ( typeof firstArg === "string" ) { 		
			
			firstArg = ( firstArg.substr( -2 ) === ' -' ) ? firstArg.substr( 0, firstArg.length - 2 ) : firstArg;
			this.section = firstArg;

			while ( firstArg.length <= this.lengthFirstArg ) {
				firstArg = ( firstArg.length % 2 == 0 ) ? ' ' + firstArg : firstArg + ' ';
			}

			firstArg = '[ ' + firstArg + ' ]' + this.blanksBetweenArgs + ' - ';
		}
		
		if ( typeof secondArg === "string" ) { 		
			
			secondArg = ( secondArg.substr( 1 ) !== ' ' ) ? ' ' + secondArg : secondArg;

			while ( secondArg.length <= this.lengthSecondArg ) {
				secondArg = secondArg + ' ';
			}
			
		}
		// firstArg = firstArg + firstArg.length;
		args[ 0 ] = firstArg;
		args[ 1 ] = secondArg;

		if ( this.isDebuggEnabledForSection( this.section ) ) console.log.apply( console, args );

	}

	isDebuggEnabledForSection(section: string): boolean {
		if ( section in this.debuggingSections && this.debuggingSections[ section ] === true )
			return true;
		else if ( !( section in this.debuggingSections ) )
			return true
		else
			return false;
	}

}