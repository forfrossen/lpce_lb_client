import {
	Component, OnDestroy,
	OnInit, ChangeDetectionStrategy, ViewChild,
} from '@angular/core';

import {FormControl, FormGroup, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, from, Observable, Subject, concat } from 'rxjs';
import {
	takeWhile, catchError, retry, map, tap, pluck,
	groupBy, mergeMap, toArray, distinct, switchMap, debounceTime, distinctUntilChanged, filter,
} from 'rxjs/operators';

import { MatUiService } from 'app/_ui-components/dialog.component'
import * as eva from 'eva-icons';
import * as Handsontable from 'handsontable';
import { HotTableRegisterer } from '@handsontable/angular';

import { BASE_URL, API_VERSION } from 'app/shared/base.url.config';
import { LoopBackConfig, LoggerService } from 'app/shared/sdk';
import { User, UserInterface, Message, SDKToken } from 'app/shared/sdk/models';
import { LoopBackAuth } from 'app/shared/sdk/services';
import { OpenOrders, OpenOrdersInterface } from 'app/shared/sdk/models';
import { OpenOrdersComment, OpenOrdersCommentInterface } from 'app/shared/sdk/models';
import { OpenOrdersApi } from 'app/shared/sdk/services';
import { OpenOrdersCommentApi } from 'app/shared/sdk/services';
import { LoggerServiceExtended } from 'app/shared/extended/logger.service.extended'


@Component( {
	selector: 'ngx-openorders',
	templateUrl: './openorders.component.html',
	styleUrls: [ './openorders.component.css' ],
})

export class OpenOrdersComponent implements OnInit, OnDestroy {
	
	hotInstance:		any;
	numericFormat:		any			= { pattern: '0,0', culture: 'de-DE'};
	selectedOrderTypes:	any[] 		= [];
	selectedItems: 		any[] 		= [];
	selectedSuppliers:	any[] 		= [];
	selectedOrders:		any[] 		= [];
	sName:				string		= 'Openorders.Component - ';
	instance: 			string 		= 'ordersTable';
	selectLate:			string		= 'all';
	submitError:		boolean		= false;
	alive:				boolean 	= false;
	isGritHeightSet:	boolean 	= false;
	isOrdersFetched: 	boolean 	= false;
	isItemsLoading: 	boolean 	= true;
	isSuppliersLoading:	boolean 	= true;
	isOrdersLoading:	boolean 	= true;
	dateFieldLength:	number		= 65;
	ordersFound: 		number		= 0;
	orders: 			OpenOrdersInterface[ ];
	items$:				Observable<{}[]>;
	suppliers$:			Observable<{}[]>;
	orders$: 			Observable<{}[]>;
	itemsInput$ 	  = new Subject<string>();
	suppliersInput$   = new Subject<string>();
	ordersInput$   	  = new Subject<string>();
	typesArray: 		{ name: string, value: string }[] = [
		{name: 'OO', value: 'OO'},
		{name: 'OC', value: 'OC'},
		{name: 'OU', value: 'OU'},
		{name: 'OP', value: 'OP'},
	];
	
	/*
		{ data: 'pdmcu', title: 'pdmcu', readOnly: true, editor: false },data: this.orders,
		{ data: 'pdlocn', title: 'pdlocn', readOnly: true, editor: false },
		{ data: 'pdlnty', title: 'pdlnty', readOnly: true, editor: false },
		{ data: 'pdlnid', title: 'lnid', type: 'numeric', readOnly: true, editor: false },
		{ data: 'pdaddj', title: 'addj', type: 'date', readOnly: true, editor: false },
	*/
	

	settingsObj: Handsontable.GridSettings = {
		data: Handsontable.helper.createSpreadsheetData( 17, 50 ),
		stretchH: 'all',
		autoColumnSize: false, columnSorting: true, 
		contextMenu: true, manualColumnResize: true,
		undo: true, colHeaders: true, observeChanges: true, className: 'htMiddle',
		columns: [
			{ colWidths: 35,   readOnly: true, editor: false, data: 'pddcto', title: 'Typ' 				},
			{ colWidths: 75,   readOnly: true, editor: false, data: 'pddoco', title: 'Order Nr', 		type: 'numeric' },
			{ colWidths: 140,  readOnly: true, editor: false, data: 'pdlitm', title: 'Artikel' 			},
			{ colWidths: 180,  readOnly: true, editor: false, data: 'pdan801', title: 'Lieferant' 		},
			{ colWidths: 80,   readOnly: true, editor: false, data: 'pdan8', title: 'Lief. Nr', 		type: 'numeric' },
			{ colWidths: 80,   readOnly: true, editor: false, data: 'pduorg', title: 'Menge', 			type: 'numeric', numericFormat: this.numericFormat },
			{ colWidths: 80,   readOnly: true, editor: false, data: 'pduopn', title: 'Offen', 			type: 'numeric', numericFormat: this.numericFormat },
			{ colWidths: 95,   readOnly: true, editor: false, data: 'pddrqj', title: 'Request',			className: 'htRight htMiddle' },
			{ colWidths: 95,   readOnly: true, editor: false, data: 'pdpddj', title: 'Promise',			className: 'htRight htMiddle' },
			{ colWidths: 95,   readOnly: true, editor: false, data: 'pdtrdj', title: 'Order Date', 		className: 'htRight htMiddle' },
			{ colWidths: 90,   editor: false, data: 'created', title: 'Komment Date', 					className: 'htRight htMiddle' },
			{ colWidths: 90,   editor: false, data: 'createdby', title: 'User' 			},
			{ colWidths: 150,  data: 'comment', title: 'Kommentar' },
		],
	};


	constructor(
		private log: 					LoggerServiceExtended,
		private themeService: 			NbThemeService,
		private openOrdersApi: 			OpenOrdersApi,
		private openOrdersCommentApi: 	OpenOrdersCommentApi,
		private hotRegisterer: 			HotTableRegisterer,
		private toastrService: 			NbToastrService,
		private matUiService:			MatUiService,
	) {
		LoopBackConfig.setBaseURL( BASE_URL );
		LoopBackConfig.setApiVersion( API_VERSION );
	}

	calculateGridHeight(): number {

		const h: number = document.getElementById( 'layoutOrdersContent' ).clientHeight;
		const i: number = document.getElementById( 'header1' ).scrollHeight;
		const j: number = h - ( i * 2 ) - 31;
		
		this.log.inform( this.sName, 'heights: h:' + h + ', i: ' + i + ', j: ' + j );

		return j;
	}

	filtersFor( action: string, term?: string ): any {
		const limit = 50;
		let filters: any = { where: { and: [] }, limit: limit, order: '' };
		
		const today = new Date().setHours( 0, 0, 0, 0 );
		const yesterdayNow = new Date().setDate( new Date().getDate() - 1)
		const yesterday = new Date( new Date( new Date().setDate( new Date().getDate() - 1 ) ).setHours( 0, 0, 0, 0 ) );
		
		const lastYear = new Date( new Date().setFullYear( new Date().getFullYear() - 1 ) );

		if ( this.selectedOrderTypes.length ) filters.where.and.push( { pddcto: { inq: this.selectedOrderTypes } } );	
		if ( this.selectedItems.length ) 		filters.where.and.push( { pdlitm: { inq: this.selectedItems } } );
		if ( this.selectedSuppliers.length ) 	filters.where.and.push( { pdan8:  { inq: this.selectedSuppliers } } );
		if ( this.selectedOrders.length )		filters.where.and.push( { pddoco: { inq: this.selectedOrders } } );
		if ( this.selectLate === 'promise' )	filters.where.and.push( { pdpddj: { lt:  yesterday } } );
		if ( this.selectLate === 'request' )	filters.where.and.push( { pddrqj: { lt:  yesterday } } );
		
		filters.where.and.push( { pddrqj: { gt: lastYear } } );
		
		// Filters for ng-select fields autocomplete
		if ( term ) {
			filters.fields = {};
			filters.fields[ action ] 	= true;
			filters.fields.pdan8		= ( action === 'pdan801' ) ? true : false;	
			filters.limit 				= limit;	
			filters.where[action] 		= { like: term + '%' };
			filters.order				= action + ' asc';
		} else if ( action === 'table' ) {
			filters.order 				= 'pdan801 asc, pddoco asc';
			filters.limit 				= limit;			
		}
		
		// CLEANUP !
		if (  filters.where.and.length === 1 ) {
			filters.where = filters.where.and[0];
			delete filters.where.and;
		} else if ( Object.keys( filters.where.and ).length === 0 ) {
			delete filters.where.and;
		}			
		
		if ( Object.keys(filters.where).length === 0 )
			delete filters.where;

		this.log.inform( this.sName, 'Filters: ', filters );
		
		return filters;
	}

	loadOrRefreshOrders(): void {

		let  filters = this.filtersFor( 'table' );

		this.isOrdersFetched = false;


		

		this.openOrdersApi.find( filters )
			.subscribe(( orders: OpenOrdersInterface[] ) => {
				this.orders = orders;			
			},
			error => {
				this.log.error( this.sName, error );
				this.matUiService.dialog( 'Error', 'Etwas ist schief gelaufen beim abruf der Daten! <br /><br />' + error )
			},
			() => {
				const hotInstance = this.hotRegisterer.getInstance( this.instance );
				hotInstance.loadData( this.orders );

				if ( !this.isGritHeightSet ) {
					hotInstance.updateSettings( { height: this.calculateGridHeight() }, true )	
					hotInstance.render();
					this.isGritHeightSet = true;
				} 
				this.isOrdersFetched = true;
				if ( !this.submitError ) this.toastrService.success( 'Daten erfolgreich geladen', 'Erfolg!' );
			} );
			
		this.openOrdersApi.count( filters.where )
			.subscribe( result => {
				this.ordersFound = result.count;
				this.log.inform( this.sName, 'Found %s Orders!', result.count.toString() );
			})
			
			
		
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
				const [ row, prop, oldVal, newVal ] = change;
				const pddoco = hotInstance.getDataAtCell( row, 'pddoco' );
				const pdlnid = hotInstance.getDataAtCell( row, 'pdlnid' );

				//console.log( 'Change pddoco: %s + pdlnid: %s + change: %s', pddoco, pdlnid, newVal );
				const newOpenOrdersComment: OpenOrdersCommentInterface = {
					pddoco: pddoco,
					pdlnid: pdlnid,
					comment: newVal,
					created: null,
					createdby: null,
					version: null,
				}

				this.openOrdersCommentApi.create( newOpenOrdersComment )
					.subscribe( response => {
						
						const modifiedCreatedDate = this.formateDate( response.created );
						
						hotInstance.setDataAtRowProp( row, 'created', modifiedCreatedDate, 'internal' );
						hotInstance.setDataAtRowProp( row, 'createdby', response.createdby, 'internal' );
						//console.log(response);
					}, error => {
						this.log.error( error );
						this.submitError = true;
						const title = 'Error: ' + error.statusCode;
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

	ngOnInit() {

		this.alive = true;
		
		this.loadOrRefreshOrders();

		this.items$ = this.itemsInput$.pipe(
			debounceTime( 500 ),
			distinctUntilChanged(),
			tap( () => this.isItemsLoading = true ),
			//switchMap( term => this.openOrdersApi.find( { where: { pdlitm: { like: term + '%' } }, order: 'pdlitm asc' } ).pipe(
			switchMap( term => this.openOrdersApi.find( this.filtersFor( 'pdlitm', term ) ).pipe(
				catchError( () => of( [] ) ),
				tap( () => this.isItemsLoading = false ),
			) ) )
		
		this.suppliers$ = this.suppliersInput$.pipe(
			debounceTime( 500 ),
			distinctUntilChanged(),
			tap( () => this.isSuppliersLoading = true ),
			//switchMap( term => this.openOrdersApi.find( { where: { pdan801: { like: term + '%' } }, order: 'pdan801 asc' } ).pipe(
			switchMap( term => this.openOrdersApi.find( this.filtersFor( 'pdan801', term ) ).pipe(
				catchError( () => of( [] ) ),
				tap( () => this.isSuppliersLoading = false ),
			) ) )
		
		this.orders$ = this.ordersInput$.pipe(
			debounceTime( 500 ),
			distinctUntilChanged(),
			tap( () => this.isOrdersLoading = true ),
			//switchMap( term => this.openOrdersApi.find( { where: { pdan801: { like: term + '%' } }, order: 'pdan801 asc' } ).pipe(
			switchMap( term => this.openOrdersApi.find( this.filtersFor( 'pddoco', term ) ).pipe(
				catchError( () => of( [] ) ),
				tap( () => this.isOrdersLoading = false ),
			) ) )
		
		eva.replace( {
			animation: {
				type: 'pulse',
				hover: true,
				infinite: true,
			},
		});
	}



	ngOnDestroy() {
		this.alive = false;
	}

	onAfterInit() {

		const hotInstance = this.hotRegisterer.getInstance( this.instance );
		hotInstance.updateSettings( {}, false );
		hotInstance.render();
		return;
	}

	undoTableAction() {
		//const hotInstance = this.hotRegisterer.getInstance( this.instance );
		//hotInstance.plu undo();
	}

	formateDate( date: any ): string {
		const dDate = new Date(date);
		const day = dDate.getDate();
		const month = dDate.getMonth() + 1;
		const year = dDate.getFullYear();
		const returnDate = ( '0' + day.toString() ).slice( -2 ) + '.' + ( '0' + month.toString() ).slice( -2 ) + '.' + year;
		return returnDate;
					
	}
}


