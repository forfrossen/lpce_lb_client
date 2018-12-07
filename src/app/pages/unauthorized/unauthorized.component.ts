import { Component, OnInit } from '@angular/core';
import { NbAuthService, NbAuthResult, NbAuthJWTToken} from '@nebular/auth';
import { NbAccessChecker } from '@nebular/security';

@Component({
	selector: 'UnauthorizedComponent',
	template: `
	<nb-card>
		<nb-card-header>UNAUTHORIZED ACCESS! - You do not have permissions to access this page.</nb-card-header>
		<nb-card-body>
			<p>If you think this is an error, please contact the <a href="mailto:QCDE-IT-HELPDESK@parker.com">IT Department</a></p>
		</nb-card-body>
		<nb-card-footer></nb-card-footer>
	</nb-card>	
	`,
} )
	
export class UnauthorizedComponent implements OnInit {
	constructor(
	) {
		
	}
	private title: string = 'Unauthorized';
	
	

	ngOnInit() {

		
		
	}

}

