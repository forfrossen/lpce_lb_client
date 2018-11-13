import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NbAuthService, NbAuthResult, NbAuthJWTToken} from '@nebular/auth';
import { NbAccessChecker } from '@nebular/security';
import { NbSelectModule, NbButtonModule, NbButtonComponent } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'HeimarbeitDComponent',
	templateUrl: './heimarbeit-dashboard.component.html',
	styleUrls: [ './heimarbeit-dashboard.component.css' ]
} )
	
export class HeimarbeitDashboardComponent implements OnInit {
	constructor(
		private authService: NbAuthService,
		public accessChecker: NbAccessChecker,
		private http: HttpClient,
	) {
		
	}

	@Input() workorder: string;
		
	private title: string = "Heimarbeit";
	public Heimarbeiters: { Kostenstelle: string, Name: string };
	public Workorders: string[ ] = [ '' ];
	public HeimarbeiterSelected: boolean = false;
	public getTitle() {
		return this.title;
	}

	onEnter( value:string ):void {
		if ( this.Workorders[ 0 ] === '' )
			this.Workorders[ 0 ] = value;
		else
			this.Workorders.push( value );
		
		this.workorder = '';
	}

	saveData(): void{
		this.HeimarbeiterSelected = false;
	}

	selectHeimarbeiter(): void{
		this.HeimarbeiterSelected = true;
	}

	ngOnInit() {

		this.http.get( 'http://qcd480w04:3000/api/Heimarbeiters?filter[order]=name%20ASC', {withCredentials: true} )
			.subscribe( ( data: { Kostenstelle: string, Name: string } ) => {
				this.Heimarbeiters = data;
			});
		
	}

}

