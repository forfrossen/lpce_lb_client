import { Component, OnInit } from '@angular/core';
import { NbAuthService, NbAuthResult, NbAuthJWTToken} from '@nebular/auth';
import { NbAccessChecker } from '@nebular/security';

@Component({
	selector: 'TeileinfoDComponent',
	template: `
	<nb-card>
		<nb-card-header>{{getTitle()}}</nb-card-header>
		<nb-card-body>
			Hello from {{getTitle()}} Component.
		</nb-card-body>
		<nb-card-footer></nb-card-footer>
	</nb-card>
	<nb-card>
		<nb-card-header>{{AutoAuth}}</nb-card-header>
		<nb-card-body>
			Auth Result: <br />
			<pre>{{getData() | json}}</pre>
		</nb-card-body>
		<nb-card-footer>
			<button nbButton (click)="authMe()" status="primary">Auth Me</button>
			<button *ngIf="accessChecker.isGranted('create', 'comments') | async" >Post Comment</button>
		</nb-card-footer>
	</nb-card>
	<nb-card>
		<nb-card-header>{{AuthMe}}</nb-card-header>
		<nb-card-body>
			Auth Result: <br />
			<pre>{{getAuthData() | json}}</pre>
		</nb-card-body>
		<nb-card-footer>
			<button nbButton (click)="authMe()" status="primary">Auth Me</button>
			<button nbButton (click)="authMe()" *ngIf="accessChecker.isGranted('root', 'admin') | async" status="primary">Show if Admin</button>
		</nb-card-footer>
	</nb-card>
	
	`,
} )
	
export class TeileinfoDashboardComponent implements OnInit {
	constructor(
		private authService: NbAuthService,
		public accessChecker: NbAccessChecker,
	) {
		
	}
	private title: string = "Teileinfo";
	private data:any;
	private authData:any;

	public getTitle() {
		return this.title;
	}
	public getData() {
		return this.data;
	}
	public getAuthData() {
		return this.authData;
	}

	public setTitle(sTitle: string) {
		this.title = sTitle;
	}
	public setData( sData: any ) {
		this.data += sData;
	}
	public setAuthData( sAuthDataa: any ) {
		this.authData = sAuthDataa;
	}

	ngOnInit() {
		this.setTitle( "Dashboard - Teileinfo" );
		
		
	}

}

