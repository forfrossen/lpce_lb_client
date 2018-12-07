import { Component, Input, OnInit } from '@angular/core';

import { NbAuthSimpleToken, NbAuthService } from '@nebular/auth';
import { map } from 'rxjs/operators'
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';

//import { LoggerService } from 'app/shared/sdk';
import { LoggerServiceExtended } from 'app/shared/extended/logger.service.extended'
import { NbAccessChecker } from '@nebular/security';
import { environment } from '../../../../environments/environment';



@Component( {
	selector: 'ngx-header',
	styleUrls: [ './header.component.scss' ],
	templateUrl: './header.component.html',
} )
export class HeaderComponent implements OnInit {


	@Input() position = 'normal';

	user: 			any = {name: '', picture: ''};
	token: 			any;
	roles: 			any;
	userMenu: 		object[]	= [ { title: 'Profile' }, { title: 'Log out' } ];
	environment: 	string		= '';
	sName:			string 		= 'header.component - ';
	debug:			boolean		= false;
	
	constructor(
		private sidebarService: NbSidebarService,
		private menuService: NbMenuService,
		private log: LoggerServiceExtended,
		private userService: UserService,
		private analyticsService: AnalyticsService,
	) {

	}

	ngOnInit() {
		this.environment = ( environment.production ) ? '' : '!!! DEVELOPMENT !!!';

		this.getUserInfo();
	}

	async getUserInfo() {
		return await this.userService.getUser()
			.subscribe( user => {
					if ( this.debug ) this.log.inform( this.sName, 'User: ', user );
					this.user = user;
				});
	}

	toggleSidebar(): boolean {
		this.sidebarService.toggle( true, 'menu-sidebar' );
		return false;
	}

	toggleSettings(): boolean {
		this.sidebarService.toggle( false, 'settings-sidebar' );
		return false;
	}

	goToHome() {
		this.menuService.navigateHome();
	}

	startSearch() {
		this.analyticsService.trackEvent( 'startSearch' );
	}
}
