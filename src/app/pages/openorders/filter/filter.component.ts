import { Component, EventEmitter, OnInit, Output          				} from '@angular/core'                               ;
import { HotTableRegisterer                                             } from '@handsontable/angular'                       ;
import { NbToastrService                                                } from '@nebular/theme'                              ;

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

import { FilterService                                                  } from './filter.service'					         ;

import * as eva          												  from 'eva-icons'    ;

@Component( {
	selector: 'filter',
	templateUrl: './filter.component.html',
	styleUrls: [ './filter.component.scss' ]
} )
export class FilterComponent implements OnInit {

	sName             	: string		= 'Filter.Component - ';
	selectLate        	: string		= 'all';

	selectedOrderTypes	: any[] 		= [];
	selectedItems     	: any[] 		= [];
	selectedSuppliers 	: any[] 		= [];
	selectedOrders    	: any[] 		= [];
	selectedPlanners  	: any[] 		= [];	
	selectedCommentOnly : boolean 		= false;	
	loading				: boolean		= false;
	
	ordersFound       	: number		= 0;
	
	orders            	: OpenOrderInterface[ ];
	items$            	: Observable<{}[]>;
	suppliers$        	: Observable<{}[]>;
	orders$           	: Observable<any>;
	planners$		  	: Observable<{}[]>;
	orderTypes$		  	: Observable<{}[]>;
	

	itemsInput$         = new Subject<string>();
	suppliersInput$     = new Subject<string>();
	ordersInput$        = new Subject<string>();
	


	@Output() searchNow = new EventEmitter();

	constructor(
		private log                 : LoggerServiceExtended,
		private openOrderApi        : OpenOrderApi,
		private planerNrToADIDApi 	: PlanerNrToADIDApi,
		private toastrService       : NbToastrService,
		private matUiService        : MatUiService,
		private filterService		: FilterService,
	) { }

	ngOnInit() {

		this.items$ = this.itemsInput$.pipe(
			debounceTime( 500 ),
			distinctUntilChanged(),
			switchMap( term =>
				this.openOrderApi.find( this.filterService.filtersFor( 'pdlitm', term )).pipe(
					catchError(() => of( [] )),
					concatAll(),distinct(),toArray())))
		
		this.suppliers$ = this.suppliersInput$.pipe(
			debounceTime( 500 ),
			distinctUntilChanged(),
			switchMap( term =>
				this.openOrderApi.find( this.filterService.filtersFor( 'pdan801', term )).pipe(
					catchError(() => of( [] )),
					concatAll(), distinct( x => x.pdan8 ), toArray())))
		
		this.orders$ = this.ordersInput$.pipe(
			debounceTime( 500 ),
			distinctUntilChanged(),
			switchMap( term =>
				this.openOrderApi.find( this.filterService.filtersFor( 'pddoco', term )).pipe(
					catchError(() => of( [] )),
					concatAll(),distinct(),toArray())))
		
		this.planners$ = this.planerNrToADIDApi.find( { order: 'username asc' } ).pipe(
				catchError(() => of( [] )),
				concatAll(), distinct( x => x.username ), toArray())
		
		this.orderTypes$ = of( [
			{ name: 'OO', value: 'OO' },
			{ name: 'OC', value: 'OC' },
			{ name: 'OU', value: 'OU' },
			{ name: 'OP', value: 'OP' },
		] );
		
		this.countMatchingOrders( 'count' );

		eva.replace( {
			animation: {
				type    : 'pulse',
				hover   : true,
				infinite: true,
			},
		});		
	}

	onNgSelectChange() {
		
		this.filterService.selectLate 			= this.selectLate;
		this.filterService.selectedOrderTypes 	= this.selectedOrderTypes;
		this.filterService.selectedItems     	= this.selectedItems;
		this.filterService.selectedSuppliers 	= this.selectedSuppliers;
		this.filterService.selectedOrders    	= this.selectedOrders;
		this.filterService.selectedPlanners  	= this.selectedPlanners;
		this.filterService.selectedCommentOnly  = this.selectedCommentOnly;
		
		this.countMatchingOrders( 'count' );

	}

	countMatchingOrders( filters ) {
		
		this.loading = true;

		filters = ( filters === 'count' ) ? this.filterService.filtersFor( 'count' ) : filters;

		this.openOrderApi.count( filters.where )
			.subscribe( result => {
				this.ordersFound = result.count;
				this.loading = false;
				this.log.inform( this.sName, 'Orders found: ', result.count.toString());
			} )
	}

}
