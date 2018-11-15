import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NbAuthService, NbAuthResult, NbAuthJWTToken} from '@nebular/auth';
import { NbAccessChecker } from '@nebular/security';
import { NbSelectModule, NbButtonModule, NbButtonComponent } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { NbToastrService } from '@nebular/theme';
import { NbThemeService } from '@nebular/theme';

import { MatUiService } 									from 'app/_ui-components/dialog.component'

import { BASE_URL, API_VERSION }							from 'app/shared/base.url.config';
import { LoopBackConfig, LoggerService } 					from 'app/shared/sdk';
import { Heimarbeit, Heimarbeiter  } 						from 'app/shared/sdk/models';
import { HeimarbeitInterface, HeimarbeiterInterface  }		from 'app/shared/sdk/models';
import { HeimarbeitApi, HeimarbeiterApi }					from 'app/shared/sdk/services';

@Component({
	selector: 'HeimarbeitDComponent',
	templateUrl: './heimarbeit-dashboard.component.html',
	styleUrls: [ './heimarbeit-dashboard.component.css' ]
} )
	
export class HeimarbeitDashboardComponent implements OnInit {
	
	@Input() workorder: string;
	title: string = "Heimarbeit";

	Heimarbeiter: HeimarbeiterInterface = {kostenstelle: '', name: ''};
	Heimarbeiters: HeimarbeiterInterface[] = [];

	Heimarbeit: HeimarbeitInterface;
	Heimarbeits: HeimarbeitInterface[] = [];

	isHeimarbeiterSelected: boolean = false;
	HeimarbeiterHighlighted: boolean = false;

	public Workorders: string[ ] = [ '' ];


	constructor(
		private log:				LoggerService,
		private heimarbeitApi: 		HeimarbeitApi,
		private heimarbeiterApi: 	HeimarbeiterApi,
		private toastrService: 		NbToastrService,
		private themeService: 		NbThemeService,
		private matUiService: MatUiService,
		private renderer: Renderer2,
	) {
		LoopBackConfig.setBaseURL( BASE_URL );
		LoopBackConfig.setApiVersion( API_VERSION );
	}

	ngOnInit() {
		this.heimarbeiterApi.find( { order: 'name ASC' } )
			.subscribe( heimarbeiters => this.Heimarbeiters = heimarbeiters );
	}	

	onEnter( value: string ): void {
		this.Heimarbeit = { auftrag: value, datum: null, kostenstelle: this.Heimarbeiter.kostenstelle }
		console.log( 'Heimarbeits: %O', this.Heimarbeits );
		this.Heimarbeits.push( this.Heimarbeit );
		this.workorder = '';
	}

	selectHeimarbeiter( HeimarbeiterKostenstelle: string, event: MouseEvent ): void{
		if ( this.isHeimarbeiterSelected && this.Heimarbeits.length ) {
			this.matUiService.dialog( '', 'Es kann kein neuer Heimarbeiter ausgewählt werden. Daten müssen erst abgeschickt, oder Vorgang muss erst abgebrochen werden.' )
			return;
		}

		this.isHeimarbeiterSelected = true;
		this.Heimarbeiter = this.Heimarbeiters.find( Heimarbeiters => Heimarbeiters.kostenstelle == HeimarbeiterKostenstelle )

		setTimeout( () => {
			console.log( 'Adding Class now' );
			this.HeimarbeiterHighlighted = true;
			setTimeout( () => {
				console.log( 'Removing Class now' );
				this.HeimarbeiterHighlighted = false;
			}, 500 )
		}, 100)
				
		console.log( "Clicked on: " + HeimarbeiterKostenstelle );
		console.log( "Selected Heimarbeiter.kostenstelle is now: %O", this.Heimarbeiter.kostenstelle );
		console.log( "Event: %O", event );
	}

	unSelecetHeimarbeiter(): void {
		this.Heimarbeiter = { kostenstelle: '', name: '' };
		this.isHeimarbeiterSelected = false;
	}

	cancelProcess(): void{
		this.unSelecetHeimarbeiter();
		this.Heimarbeits = [];
	}

	saveData(): void{
		this.heimarbeitApi.create( this.Heimarbeits )
			.subscribe( response => {
				this.matUiService.dialog('', JSON.stringify(response))
			}, response => {
				console.log( response );
				let title = 'Error: ' + response.statusCode;
				let content = response.message
					+ '<br /><br /><br />'
					+ ` <nb-accordion>
							<nb-accordion-item>
								<nb-accordion-item-header>
									Details
								</nb-accordion-item-header>
								<nb-accordion-item-body>`
								+ response.details[ 0 ].message
								+ `
								</nb-accordion-item-body>
							</nb-accordion-item>
						</nb-accordion>`;
				
				this.matUiService.dialog( title, content );
			})
	}



}