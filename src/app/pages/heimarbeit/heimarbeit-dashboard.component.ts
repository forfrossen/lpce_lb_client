import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NbSelectModule, NbButtonModule, NbButtonComponent } from '@nebular/theme';

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
	
export class HeimarbeitDashboardComponent implements OnInit, OnDestroy {
	
	@Input() workorder: string;
	title: string = "Heimarbeit";
	private alive = false;

	Heimarbeiter: HeimarbeiterInterface = {kostenstelle: '', name: ''};
	Heimarbeiters: HeimarbeiterInterface[] = [];

	Heimarbeit: HeimarbeitInterface;
	Heimarbeits: HeimarbeitInterface[] = [];

	isBadWorkorderScanned: boolean = false;
	isHeimarbeiterSelected: boolean = false;
	isHeimarbeitScanned: boolean = false;
	HeimarbeiterHighlighted: boolean = false;

	public Workorders: string[ ] = [ '' ];


	constructor(
		private log:				LoggerService,
		private heimarbeitApi: 		HeimarbeitApi,
		private heimarbeiterApi: 	HeimarbeiterApi,
		private toastrService: 		NbToastrService,
		private themeService: 		NbThemeService,
		private matUiService:		MatUiService,
	) {
		LoopBackConfig.setBaseURL( BASE_URL );
		LoopBackConfig.setApiVersion( API_VERSION );
	}

	ngOnInit() {
		this.heimarbeiterApi.find( { order: 'name ASC' } )
			.subscribe( heimarbeiters => this.Heimarbeiters = heimarbeiters );
		
		this.alive = true;
	}	

	ngOnDestroy() {
		this.alive = false;
	}

	onEnter( value: string ): void {
		// Scanned Workorder length must be 8 Digits long else do nothing
		if ( value.length !== 8 ) {
			this.emptyWorkorderScanField();

			setTimeout( () => {
				this.isBadWorkorderScanned = true;
				setTimeout( () => {
					this.isBadWorkorderScanned = false;
				}, 500 )
			}, 100 )

			return;	
		}

		this.Heimarbeit = { auftrag: value, datum: null, kostenstelle: this.Heimarbeiter.kostenstelle }
		this.Heimarbeits.push( this.Heimarbeit );
		this.emptyWorkorderScanField();
		this.isHeimarbeitScanned = true;

	}

	selectHeimarbeiter( HeimarbeiterKostenstelle: string, event: MouseEvent ): void{
		// Q: Is a Heimarbeiter already selected and were workorders already scanned?
		if ( this.isHeimarbeiterSelected && this.Heimarbeits.length ) {

			// Show error message and stop funktion
			this.matUiService.dialog( 'Error', 'Es kann kein neuer Heimarbeiter ausgewählt werden. Daten müssen erst abgeschickt, oder Vorgang muss erst abgebrochen werden.' )
			return;
		}

		// Set internal Status and Currently selected Heimarbeiter for use when workorder is scanned (onEnter)
		this.isHeimarbeiterSelected = true;
		this.Heimarbeiter = this.Heimarbeiters.find( Heimarbeiters => Heimarbeiters.kostenstelle == HeimarbeiterKostenstelle )

		setTimeout( () => {
			console.log( 'Adding Class now' );
			this.HeimarbeiterHighlighted = true;
			setTimeout( () => {
				console.log( 'Removing Class now' );
				this.HeimarbeiterHighlighted = false;
			}, 200 )
		}, 200 )
		
	}

	saveData(): void{
		this.heimarbeitApi.create( this.Heimarbeits )
			.subscribe( response => {
				//this.matUiService.dialog( '', JSON.stringify( response ) )
				this.toastrService.success( 'Daten erfolgreich eingetragen', 'Gespeichert' );
				this.unSelecetHeimarbeiter();
				this.emptyHeimarbeits();
			}, response => {
				console.log( response );
				let title = 'Error: ' + response.statusCode;
				this.matUiService.error( title, response.details[ 0 ].message );
			})
	}

	unSelecetHeimarbeiter(): void {
		this.Heimarbeiter = { kostenstelle: '', name: '' };
		this.isHeimarbeiterSelected = false;
	}

	emptyHeimarbeits(): void {
		this.Heimarbeits = [];
	}

	emptyWorkorderScanField(): void {
		this.workorder = '';
		this.isHeimarbeitScanned = true;
	}

	cancelProcess(): void {
		this.unSelecetHeimarbeiter();
		this.emptyHeimarbeits();
	}


}