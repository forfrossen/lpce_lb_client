import { Component, OnDestroy, OnInit                 					} from '@angular/core'                               ;
import { NbToastrService, NbDialogService                                                } from '@nebular/theme'                              ;

import { Observable, of, Subject                       					} from 'rxjs'                                        ;
import { catchError, concatAll, debounceTime, distinct 					} from 'rxjs/operators'                              ;
import { distinctUntilChanged, switchMap, tap, toArray            		} from 'rxjs/operators'                              ;

import { API_VERSION, BASE_URL                          				} from 'app/shared/base.url.config'                  ;
import { LoggerServiceExtended                                          } from 'app/shared/extended/logger.service.extended' ;
import { LoopBackConfig                                                 } from 'app/shared/sdk'                              ;
import { OpenOrderCommentInterface, OpenOrderInterface                  } from 'app/shared/sdk/models'                       ;
import { PlanerNrToADID, PlanerNrToADIDInterface		                } from 'app/shared/sdk/models'                       ;
import { OpenOrderApi, OpenOrderCommentApi, PlanerNrToADIDApi			} from 'app/shared/sdk/services'                     ;

import { MatUiService                                                   } from 'app/_ui-components/dialog.component'         ;

import { FilterComponent							            		} from './filter/filter.component'					 ;
import { FilterService							            			} from './filter/filter.service'					 ;

import * as eva          												  from 'eva-icons'    ;
import * as Handsontable 												  from 'handsontable' ;
import { HotTableRegisterer 											} from '@handsontable/angular';
import { CommenthistoryComponent                                        }  from './commenthistory/commenthistory.component'

@Component( {
	selector   : 'ngx-openorders',
	templateUrl: './openorders.component.html',
	styleUrls  : [ './openorders.component.scss' ],
})

export class OpenOrdersComponent implements OnInit, OnDestroy {
	
	hotInstance       : any;
	numericFormat     : any			= {  pattern: '0,0[.]00', culture: 'de-DE' };
		
	sName             : string		= 'Openorders.Component - ';
	instance          : string 		= 'ordersTable';

	isOrdersFetched   : boolean		= false;
	submitError       : boolean		= false;
	alive             : boolean 	= false;
	isGritHeightSet   : boolean 	= false;
	
	dateFieldLength   : number		= 65;
	ordersFound       : number		= 0;
	
	orders            : OpenOrderInterface[ ];
	
	
	/*
		{ data: 'pdmcu', title: 'pdmcu', readOnly: true, editor: false },data: this.orders,
		{ data: 'pdlocn', title: 'pdlocn', readOnly: true, editor: false },
		{ data: 'pdlnty', title: 'pdlnty', readOnly: true, editor: false },
		{ data: 'pdlnid', title: 'lnid', , readOnly: true, editor: false },
		{ data: 'pdaddj', title: 'addj', type: 'date', readOnly: true, editor: false },
	*/
	
	//settingsObj: Handsontable.GridSettings = {
	settingsObj = {
		data				: Handsontable.default.helper.createSpreadsheetData(4, 4),
		licenseKey		  	: 'non-commercial-and-evaluation',
		stretchH          	: 'all',
		autoColumnSize    	: false, columnSorting: true,
		manualColumnResize	: true,
		undo              	: true, colHeaders   : true, observeChanges: true, className: 'htMiddle',
		columns           	: [
			{ colWidths: 35,   readOnly: true,  editor: false, data: 'pddcto', 	  title: 'Typ' 			 	},
			{ colWidths: 75,   readOnly: true,  editor: false, data: 'pddoco', 	  title: 'Order Nr', 	  	},
			{ colWidths: 140,  readOnly: true,  editor: false, data: 'pdlitm', 	  title: 'Artikel' 			},
			{ colWidths: 45,   readOnly: true,  editor: false, data: 'imdraw', 	  title: 'Ident Nr',		},
			{ colWidths: 180,  readOnly: true,  editor: false, data: 'pdan801',   title: 'Lieferant' 		},
			{ colWidths: 70,   readOnly: true,  editor: false, data: 'pdan8', 	  title: 'Lief. Nr',		},
			{ colWidths: 70,   readOnly: true,  editor: false, data: 'pduorg', 	  title: 'Menge', 		  	className: 'htRight htMiddle'	},
			{ colWidths: 70,   readOnly: true,  editor: false, data: 'pduopn', 	  title: 'Offen', 		  	className: 'htRight htMiddle'	},
			{ colWidths: 90,   readOnly: true,  editor: false, data: 'pddrqj', 	  title: 'Request',		 	className: 'htRight htMiddle'	},
			{ colWidths: 90,   readOnly: true,  editor: false, data: 'pdpddj', 	  title: 'Promise',		 	className: 'htRight htMiddle' 	},
			{ colWidths: 90,   readOnly: true,  editor: false, data: 'pdtrdj', 	  title: 'Order Date', 	 	className: 'htRight htMiddle'	},
			{ colWidths: 150,  readOnly: false,                data: 'comment',   title: 'Kommentar' 	 	},
			{ colWidths: 90,   readOnly: true,  editor: false, data: 'created',   title: 'Komment Date',	className: 'htRight htMiddle'	},
			{ colWidths: 90,   readOnly: true,  editor: false, data: 'createdby', title: 'User' 			},
		],
        filters				: true,
        dropdownMenu: [
            'filter_by_condition',
            'filter_operators',
            'filter_by_condition2',
            'filter_by_value',
            'filter_action_bar'
        ],
		contextMenu: {
			items: {/*
				"custom1": {
					name    : 'Zeige Teileverfügbarkeit',
					callback: (key, selection, clickEvent) => this.showItemAvaibility(key, selection, clickEvent),
				},*/
				"custom2": {
					name    : 'Zeige Kommentarverlauf',
					callback: (key, selection, clickEvent) => this.showCommentHistory(key, selection, clickEvent),
				}
			}
		}
	};


	constructor(
		private log                 : LoggerServiceExtended,
		private filterService		: FilterService,
		private openOrderApi        : OpenOrderApi,
		private openOrderCommentApi : OpenOrderCommentApi,
		private planerNrToADIDApi 	: PlanerNrToADIDApi,
		private toastrService       : NbToastrService,
		private hotRegisterer		: HotTableRegisterer,
		private matUiService        : MatUiService,
        private nbDialogService     : NbDialogService,
	) {
		/*
		LoopBackConfig.setBaseURL( BASE_URL );
		LoopBackConfig.setApiVersion( API_VERSION );
		*/
	}

    public showCommentHistory( key, selection, clickEvent ) {
        if ( ( selection[ 0 ].start.row !== selection[ 0 ].end.row ) || ( selection[ 0 ].start.col !== selection[ 0 ].end.col ) ) {
			this.matUiService.dialog( 'Warnung', 'Teileverfügbarkeit nicht bei Mehrfachauswahl möglich!' )
		}
		else {
			let item                = this.hotInstance.getDataAtCell( selection[ 0 ].start.row, selection[ 0 ].start.col );
            const pddoco            = this.hotInstance.getDataAtCell( selection[ 0 ].start.row, 'pddoco' );
            const pdlnid            = this.hotInstance.getDataAtCell( selection[ 0 ].start.row, 'pdlnid' );

			this.log.inform( this.sName, 'PDDOCO: ' + pddoco, '');
			this.log.inform( this.sName, 'pdlnid: ' + pdlnid, '');
			
            this.filterService.commentHitoryPDDOCO = pddoco;
            this.filterService.commentHitoryPDLNID = pdlnid;

            let ref = this.nbDialogService.open( CommenthistoryComponent )
		}
    } 
	
	public showItemAvaibility( key, selection, clickEvent ) {
		/*console.log(clickEvent);
		console.log(selection);
		console.log(key);*/
		
		if ( ( selection[ 0 ].start.row !== selection[ 0 ].end.row ) || ( selection[ 0 ].start.col !== selection[ 0 ].end.col ) ) {
			this.matUiService.dialog( 'Warnung', 'Teileverfügbarkeit nicht bei Mehrfachauswahl möglich!' )
		}
		else {
			let item: 			string = this.hotInstance.getDataAtCell( selection[ 0 ].start.row, selection[ 0 ].start.col );
			let reportLocation: string = 'JDE+Reports/Nussdorf+Lokal/Planung/Material_Status_Report';
			let parameters             = { Item: item };
			this.log.inform( this.sName, 'Cell Data: ' + this.hotInstance.getDataAtCell( selection[0].start.row, selection[0].start.col ))
			this.matUiService.ReportViewer( 'Reportserver', reportLocation, parameters )

		}

	}

	ngOnInit() {
		
		this.alive = true;

		setTimeout( () => {
			this.loadOrRefreshOrders();
		}, 1000)

	}

	ngOnDestroy() {
		this.alive = false;
	}
/*
	negativeValueRenderer( td, value ) {
		Handsontable.renderers.TextRenderer.apply( this, arguments );

		// if row contains negative number
		if ( parseInt( value, 10 ) < 0 ) {
			// add class "negative"
			td.className = 'make-me-red';
		}

		if ( !value || value === '' ) {
			td.style.background = '#EEE';
		}
		else {
			if ( value === 'Nissan' ) {
				td.style.fontStyle = 'italic';
			}
			td.style.background = '';
		}
	}
*/


	loadOrRefreshOrders(): void {

		if ( ! this.hotInstance ) this.hotInstance = this.hotRegisterer.getInstance( this.instance );

		let filters = this.filterService.filtersFor( 'table' );

		this.isOrdersFetched = false;
		
		this.countMatchingOrders( filters );
		
		this.openOrderApi.find( filters )
			.subscribe(( orders: OpenOrderInterface[] ) => {
				this.orders = orders;
			},
			error => {
				this.log.error( this.sName, error );
				this.matUiService.dialog( 'Error', 'Etwas ist schief gelaufen beim abruf der Daten! <br /><br />' + error )
			},
			() => {
				if ( ! this.hotInstance ) this.hotInstance = this.hotRegisterer.getInstance( this.instance );
				
				this.hotInstance.loadData( this.orders );
				/*
				if ( !this.isGritHeightSet ) {
					//this.hotInstance.updateSettings( { height: '70vh' }, true )	
					this.hotInstance.render();
					this.isGritHeightSet = true;
				}
				*/

				this.isOrdersFetched = true;
				
				if ( !this.submitError ) this.toastrService.success( 'Daten erfolgreich geladen', 'Erfolg!' );				
			} );
	}

	countMatchingOrders( filters ) {
		filters = ( filters === 'count' ) ? this.filterService.filtersFor( 'count' ) : filters;

		this.openOrderApi.count( filters.where )
			.subscribe( result => {
				this.ordersFound = result.count;
				this.log.inform( this.sName, 'Orders found: ', result.count.toString() );
			} )
	}
	
	onAfterChange = ( hotInstance, changes, source ) => {
		if ( !changes ) {
			// this.log.inform( this.sName, 'onAfterChange - skipping due to no changes' );
			return;
		}
		if ( source === 'internal' ) {
			// this.log.inform( this.sName, 'skipping due internal cell update' );
			return;
		}
		this.log.inform( this.sName, 'Source: ' + source );

		//const observeableChanges = of( changes );
		//observeableChanges.subscribe( change => {
		try {
			changes.forEach( change => {

				//if ( oldVal === newVal )
				const [ row,,, newVal ] = change;
				const pddoco            = hotInstance.getDataAtCell( row, 'pddoco' );
				const pdlnid            = hotInstance.getDataAtCell( row, 'pdlnid' );

				//console.log( 'Change pddoco: %s + pdlnid: %s + change: %s', pddoco, pdlnid, newVal );
				const newOpenOrderComment: OpenOrderCommentInterface = {
					pddoco   : pddoco,
					pdlnid   : pdlnid,
					comment  : newVal,
					created  : null,
					createdby: null,
					version  : null,
				}

				this.openOrderCommentApi.create( newOpenOrderComment )
					.subscribe( response => {
						
						const modifiedCreatedDate = this.formateDate( response.created );
						
						hotInstance.setDataAtRowProp( row, 'created', modifiedCreatedDate, 'internal' );
						hotInstance.setDataAtRowProp( row, 'createdby', response.createdby, 'internal' );
						//console.log(response);
					}, error => {
						this.log.error( error );
						            this.submitError = true;
						      const title            = 'Error: ' + error.statusCode;
						this.matUiService.error( title, error.details[ 0 ].message );
					})
			})
		} catch ( err ) {
			this.log.error( err );
		} finally {
			if ( !this.submitError ) this.toastrService.success( 'Daten erfolgreich eingetragen', 'Gespeichert' );
			this.submitError = false;
		}

		return;
	}

	undoTableAction() {
		//const hotInstance = this.hotRegisterer.getInstance( this.instance );
		this.hotInstance.undo();
	}

	formateDate( date: any ): string {
		const dDate      = new Date( date );
		const day        = dDate.getDate();
		const month      = dDate.getMonth() + 1;
		const year       = dDate.getFullYear();
		const returnDate = ( '0' + day.toString() ).slice( -2   ) + '.' + ( '0' + month.toString() ).slice( -2 ) + '.' + year;
		return returnDate;
	}
}


