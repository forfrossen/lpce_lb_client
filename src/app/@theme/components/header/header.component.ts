import { Component, Input, OnInit } from '@angular/core';

import { NbAuthSimpleToken, NbAuthService } from '@nebular/auth';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';

import { environment } from '../../../../environments/environment';



@Component( {
	selector: 'ngx-header',
	styleUrls: [ './header.component.scss' ],
	templateUrl: './header.component.html',
} )
export class HeaderComponent implements OnInit {


	@Input() position = 'normal';

	user: any;
	token: any;
	roles: any;
	userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];
	environment: string;
	

	constructor( private sidebarService: NbSidebarService,
		private menuService: NbMenuService,
		private authService: NbAuthService,
		private userService: UserService,
		private analyticsService: AnalyticsService,
	) {

	}

	ngOnInit() {
		this.environment = ( environment.production ) ? '' : '!!! DEVELOPMENT !!!';

		this.userService.getUser()
			.subscribe( user => {
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
