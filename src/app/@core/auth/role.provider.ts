import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { NbRoleProvider } from '@nebular/security';
import { UserService } from '../data/users.service';
import { LoggerServiceExtended } from 'app/shared/extended/logger.service.extended'

@Injectable({
	providedIn: 'root',
  })
export class RoleProvider implements NbRoleProvider {

	private sName: string = 'role.provider - ';
	private debug: boolean = false;

	constructor(
		private userService: UserService,
		private log: LoggerServiceExtended,
	) {
	}

	getRole(): Observable<string[]> {
		if ( this.debug ) this.log.inform( this.sName, 'Groups: ', this.userService.getGroups() );
		return this.userService.getGroups();
		//return of(['guest', 'user', 'QCD480GGOUAdministrators']);
	}

}
