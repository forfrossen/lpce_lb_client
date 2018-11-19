import { Injectable } from '@angular/core';
import { Observable ,  observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { NbAuthService, NbAuthSimpleToken } from '@nebular/auth';
import { NbRoleProvider } from '@nebular/security';
import { SSO } from './SSO.service';
import { UserService } from '../data/users.service';


@Injectable()
export class RoleProvider implements NbRoleProvider {

	private userGroups: string[];
	private user: any = new BehaviorSubject( ['guest'] );
	private loggedIn: boolean = false;
	private sName: string = 'role.provider - ';

	constructor(
		private nbAuthService: NbAuthService,
		private mySSO: SSO,
		private userService: UserService,
	) {
		console.log( 'role.provider' );
/*
		this.nbAuthService.isAuthenticated().subscribe( (authStatus) => {
			if ( authStatus ) {
				this.nbAuthService.getToken().subscribe( (token: NbAuthSimpleToken) => {
					console.log( this.sName + ' token in constructor: %O' + token);
				})
			} else {
				this.nbAuthService.authenticate( 'Loopback' ).toPromise().then( result => {
					console.log( this.sName + ' Authenticating - Result: %O', result );
				})
			}
		});
*/
		mySSO.Login()
			.then( ( info ) => {
				console.log(this.sName + 'Info!: %O', info)
			})
			.catch((err)=>{
				console.error(this.sName + 'ERROR!: %O', err)
			})
	}


	getRole(): Observable<string[]> {
		return this.userService.getUser()
			.pipe(
				map(( user ) => {
					// console.log( this.sName + 'UserName: %O', user )
					//this.user.ADProfile._groups = this.userService.getUser().pipe( map( ( user ) => { return user.ADProfile._groups } ));
					return (user.ADProfile !== undefined)? user.ADProfile._groups : 'guest';
				})
			);
				 

		
	
		
		/*return of( this.userGroups );
		if ( this.loggedIn )
			return of( this.userGroups );
		else {
			this.mySSO.Login()
			.then( () => {
				this.userService.setUser()
					.then( () => {
						this.userService.getUser().toPromise()
							.then( user => {
								this.userGroups = user.ADProfile.profile._groups;
								this.loggedIn = true;
								return of( this.userGroups );
							})
						console.log( this.sName + 'Logged in!')
					});
			})
			.catch( ( err ) => {
				console.log( err )
				return of( this.userGroups );
			} )
		}*/
	}

}