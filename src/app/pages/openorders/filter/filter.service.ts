import { Injectable } from '@angular/core';

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

import * as eva          												  from 'eva-icons'    ;
import * as moment 														  from 'moment';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

	public selectedOrderTypes	: any[] 		= [];
	public selectedItems     	: any[] 		= [];
	public selectedIdentNrs    	: any[] 		= [];
	public selectedSuppliers 	: any[] 		= [];
	public selectedOrders    	: any[] 		= [];
	public selectedPlanners  	: any[] 		= [];
	public selectedCommentOnly 	: boolean 		= false;
	
	sName             			: string		= 'Openorders.Component - ';
	instance        		  	: string 		= 'ordersTable';
	selectLate        			: string		= 'all';
	
	constructor(
		private log                 : LoggerServiceExtended,
		private openOrderApi        : OpenOrderApi,
		private openOrderCommentApi : OpenOrderCommentApi,
		private planerNrToADIDApi 	: PlanerNrToADIDApi,
		private matUiService        : MatUiService,
	) { }

	setSelections() {
		
	}
	
	filtersFor( action: string, term?: string ): any {
		//this.log.inform( this.sName, 'action: ', action, ' term: ', term );

		term = ( term === '*' ) ? '%' : term;

		const limit        = 1000;
		//const yesterday    = new Date( new Date( new Date().setDate( new Date().getDate() - 1 ) ).setHours( 0, 0, 0, 0 ) );
		//const yesterday    = moment(0, "HH").utc().subtract(1, 'days').format();
		const yesterday    = moment.utc(0, "HH").format();

		//const lastYear     = new Date( new Date().setFullYear( new Date().getFullYear() - 1 ) );
		//const lastYear     = moment(0, "HH").utc().subtract(1, 'years').format();
		const lastYear     = moment.utc(0, "HH").subtract(1, 'years').format();
		let   filters: any = { where: { and: [] }, limit: limit, order: '' };
		
		/*
		this.log.inform( this.sName, 'yesterday: ', yesterday );
		this.log.inform( this.sName, 'utcOffset: ', moment().utcOffset() );
		this.log.inform( this.sName, 'yesterday2: ', yesterday2 );
		this.log.inform( this.sName, 'last year: ', lastYear );
		this.log.inform( this.sName, 'last year2: ', lastYear2 );
		*/
		
		try {

			if ( this.selectedOrderTypes.length ) filters.where.and.push( { pddcto: 			{ inq: this.selectedOrderTypes 	} } );
			if ( this.selectedItems.length      ) filters.where.and.push( { pdlitm: 			{ inq: this.selectedItems 		} } );
			if ( this.selectedIdentNrs.length   ) filters.where.and.push( { imdraw: 			{ inq: this.selectedIdentNrs	} } );
			if ( this.selectedSuppliers.length  ) filters.where.and.push( { pdan8:  			{ inq: this.selectedSuppliers 	} } );
			if ( this.selectedOrders.length     ) filters.where.and.push( { pddoco: 			{ inq: this.selectedOrders 		} } );
			if ( this.selectedPlanners.length	) filters.where.and.push( { planerusername: 	{ inq: this.selectedPlanners 	} } );
			if ( this.selectedCommentOnly	    ) filters.where.and.push( { comment: 			{ neq: null	 	 } } );
			if ( this.selectLate === 'promise'  ) filters.where.and.push( { pdpddj: 			{ lt:  yesterday } } );
			if ( this.selectLate === 'request'  ) filters.where.and.push( { pddrqj: 			{ lt:  yesterday } } );
			
			filters.where.and.push( { pddrqj: { gt: lastYear } } );

			// Filters for ng-select fields autocomplete
			if ( term ) {
	
				               filters.fields       = {};
				filters.fields[ action ]            = true;
				               filters.fields.pdan8 = ( action === 'pdan801' ) ? true : false;
				               filters.limit        = limit;
				
				/*
				//filters.where.and[ action ] = { like: term + '%' };
				let    tmpObj    = {};
				tmpObj[ action ] = { like: term + '%' };
				filters.where.and.push( tmpObj );
				*/
				
				filters.where.and.push( { [ action ]: { like: term + '%' } } );
				filters.order = action + ' asc';

			} else if ( action === 'table' ) {
				filters.order = 'pdan801 asc, pddoco asc';
				filters.limit = limit;
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
					
			//this.log.inform( this.sName, 'Filters: ', filters );
		} catch ( err ) {
			this.log.inform( this.sName, 'Error: ', err );
		} finally {
			return filters;
		}	
		
	}
}
