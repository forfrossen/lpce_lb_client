import { Component, OnDestroy, OnInit                 					} from '@angular/core'                               ;
import { DatePipe					                					} from '@angular/common'                               ;
import { HotTableRegisterer                                             } from '@handsontable/angular'                       ;
import { NbToastrService, NbDialogService                               } from '@nebular/theme'                              ;
import { API_VERSION, BASE_URL                          				} from 'app/shared/base.url.config'                  ;
import { LoggerServiceExtended                                          } from 'app/shared/extended/logger.service.extended' ;
import { LoopBackConfig                                                 } from 'app/shared/sdk'                              ;
import { MontageanweisungInterface, Montageanweisung	                } from 'app/shared/sdk/models'                       ;
import { MontageanweisungApi				              				} from 'app/shared/sdk/services'                     ;
import { MatUiService                                                   } from 'app/_ui-components/dialog.component'         ;
import { Observable, of, Subject                       					} from 'rxjs'                                        ;
import { catchError, concatAll, debounceTime, distinct, map				} from 'rxjs/operators'                              ;
import { distinctUntilChanged, switchMap, tap, toArray           		} from 'rxjs/operators'                              ;
import * as eva          												  from 'eva-icons'    ;
import * as Handsontable 												  from 'handsontable' ;
import { AnweisungenEditorComponent 									} from '../anweisungen-editor/anweisungen-editor.component';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';

import * as moment from 'moment';
import { ARIA_DESCRIBER_PROVIDER_FACTORY } from '@angular/cdk/a11y';

@Component( {
	selector: 'anweisungen-list',
	templateUrl: './anweisungen-list.component.html',
	styleUrls: ['./anweisungen-list.component.scss'],
})

export class AnweisungenListComponent implements OnInit {
	changesToSave = {};
	datePipe							= new DatePipe('de-DE');
	hotInstance       	: any;
	sName             	: string		= 'Anweisungen-List.Component - ';
	isApiError			: boolean		= false;
	isAnweisungenLoading: boolean		= false;
	instance          	: string 		= 'hotInstance';
	anweisungen			: any = Handsontable.default.helper.createSpreadsheetData( 11, 11 );
	settingsObj:any = {
		data              	: this.anweisungen,
		columns           	: [
			{ readOnly: false, data: 'artikel', 	  	title: 'Artikel', 		},
			{ readOnly: false, data: 'loctite', 	  	title: 'Loctite', 	  	},
			{ readOnly: false, data: 'fett', 	  		title: 'Fett', 			},
			{ readOnly: false, data: 'schrauber',   	title: 'Schrauber' 		},
			{ readOnly: false, data: 'pruefprogramm', 	title: 'Prüfprogramm',	},
			{ readOnly: false, data: 'pruefadapter', 	title: 'Prüfadapter', 	},
			{ readOnly: false, data: 'bemerkung', 	 	title: 'Bemerkung', 	wordWrap: false, },
			{ readOnly: true,  data: 'created',   		title: 'Created',		colWidth: 80, className: 'htRight htMiddle', type: 'date', dateFormat: 'DD.MM.YYYY', correctFormat: true,	},
			{ readOnly: true,  data: 'createdby', 		title: 'CreatedBy', 	colWidth: 80, },
			{ readOnly: true,  data: 'changed',   		title: 'Changed',		colWidth: 80, className: 'htRight htMiddle', type: 'date', dateFormat: 'DD.MM.YYYY', correctFormat: true,	},
			{ readOnly: true,  data: 'changedby', 		title: 'ChangedBy', 	colWidth: 80, },
		],
		licenseKey		  	: 'non-commercial-and-evaluation',
		stretchH			: 'all',
		autoColumnSize		: false,
		fillHandle			: false,
		columnSorting		: true,
		manualColumnResize	: true,
		colHeaders   		: true, 
		observeChanges		: true,
		dropdownMenu		: true,
		filters				: true,
		className			: 'htMiddle',
		minSpareRows		: 1,
	};
	
/*	
	{ readOnly: false, data: 'anhang1', 	 	title: 'Anhang1',		className: 'htRight htMiddle'	},
	{ readOnly: false, data: 'anhang2', 	  	title: 'Anhand2',		className: 'htRight htMiddle' 	},
	{ readOnly: false, data: 'anhang3', 	  	title: 'Anhang3', 		className: 'htRight htMiddle'	},
*/
	constructor(
		private log                 : LoggerServiceExtended,
		private montageanweisungApi : MontageanweisungApi,
		private hotRegisterer       : HotTableRegisterer,
		private toastrService       : NbToastrService,
		private matUiService        : MatUiService,
		private dialogService		: NbDialogService,
	) {
		LoopBackConfig.setBaseURL( BASE_URL );
		LoopBackConfig.setApiVersion( API_VERSION );
		registerLocaleData(localeDe, 'de-DE', localeDeExtra);
	}

	ngOnInit() {
		this.hotInstance = this.hotRegisterer.getInstance( this.instance );
		setTimeout( () => this.refreshData(), 1000);	
	}

	onAfterChange = ( hotInstance, changes, source ) => {
		
		//this.log.inform( this.sName, 'Source of changes:', source );
		
		if ( source === 'internal' ) {
			this.log.inform( this.sName, 'skipping due internal cell update' );
			return;
		} else if ( source === 'loadData' ) {
			this.log.inform( this.sName, 'skipping due to loadData event' );
			return;
		} else if ( source === 'dateValidator' ) {
			this.log.inform( this.sName, 'skipping due to dateValidator event' );
			return;
		} else if ( !changes ) {
			this.log.inform( this.sName, 'onAfterChange - skipping due to no changes' );
			return;
		}

		try {
			changes.forEach( change => {
				const [ row, property, oldVal, newVal ] = change;
				var artikel = hotInstance.getDataAtRowProp( row, 'artikel' );

				this.log.inform( this.sName, 'change', change );
				
				let changeData: any = {  };
				changeData[ property ] = newVal;

				this.montageanweisungApi.patchAttributes( artikel, changeData )
					.subscribe( response => {
													
						hotInstance.setDataAtRowProp( row, 'created', 	this.datePipe.transform( response.created ), 	'internal' );
						hotInstance.setDataAtRowProp( row, 'changed', 	this.datePipe.transform( response.changed ), 	'internal' );
						hotInstance.setDataAtRowProp( row, 'createdby', response.createdby, 							'internal' );
						hotInstance.setDataAtRowProp( row, 'changedby', response.changedby, 							'internal' );
						
						this.log.inform( this.sName, 'ChangeResponse', response );
					
					})
			})
		} catch ( error ) {
			// this.log.error( error );
			this.isApiError = true;
			this.toastrService.danger( 'Error: ' + error );						
		} finally {
			if ( !this.isApiError ) this.toastrService.success( 'Daten erfolgreich eingetragen', 'Gespeichert' );
			this.isApiError = false;
		}
		
		return;
	}

	addItem(){
		const dialogRef = this.dialogService.open(AnweisungenEditorComponent, { hasBackdrop: true, hasScroll: true, closeOnBackdropClick: false, closeOnEsc: false });
	}

	openSearch(){

	}

	refreshData() {

		this.isAnweisungenLoading = true;

		this.montageanweisungApi.find( { order: 'artikel asc' } )
			.pipe(
				concatAll(),
				map( ( anweisung: any ) => {
					anweisung.created = this.datePipe.transform( anweisung.created );
					anweisung.changed = this.datePipe.transform( anweisung.changed );
					return anweisung
				} ),
				toArray(),
				catchError( error => {
					this.matUiService.error( 'Error! Daten konnten nicht geladen werden!', error );
					return of ([])
				})
			)
			.subscribe( anweisungen => {
				this.settingsObj.data 		= anweisungen;
				this.isAnweisungenLoading 	= false;
				this.hotRegisterer.getInstance( this.instance ).updateSettings( this.settingsObj );
			});
	}

}

