import { Injectable 													} from '@angular/core';

import { Observable, of, Subject, pipe, throwError    					} from 'rxjs';
import { catchError, map, mergeAll, tap, mergeMap						} from 'rxjs/operators';

import { BASE_URL				                          				} from 'app/shared/base.url.config';
import { LoggerServiceExtended                                          } from 'app/shared/extended/logger.service.extended' ;

import { WorkorderInterface, EnoviaReferenceItem,						} from 'app/shared/sdk/models';
import { EnoviaReferenceItemInterface,     								} from 'app/shared/sdk/models';
import { EnoviaOfflineSearchFileInterface, 								} from 'app/shared/sdk/models';
import { WorkorderApi, 													} from 'app/shared/sdk/services';
import { EnoviaReferenceItemApi, MontageanweisungApi					} from 'app/shared/sdk/services';
import { EnoviaOfflineSearchFileApi,		              				} from 'app/shared/sdk/services';

@Injectable({
	providedIn: 'root',
})
export class DataService {

	
	sName           			: string				= 'EnoviaData.Service - ';
	private pdfSrc				: any 					= '';
	item						: string				= '';

	constructor(
		private log								: LoggerServiceExtended,
		private workorderApi					: WorkorderApi,
		private enoviaReferenceItemApi			: EnoviaReferenceItemApi,
		private enoviaOfflineSearchFileApi		: EnoviaOfflineSearchFileApi,
		private montageanweisungApi 			: MontageanweisungApi,
	) { }
	
	search(searchObj: {searchType:string, searchValue:string }): Observable<{}> {

		this.pdfSrc = '';
		
		switch ( searchObj.searchType ) {
			case 'workorder': {
				return this.findWorkorders( searchObj.searchValue ).pipe(
					mergeMap( item => this.findReferenceItem(item)),
					mergeMap( item => this.findMontageanleitung(item)),
				)
			}
			case 'artikel': {
				return this.findReferenceItem( searchObj.searchValue ).pipe( mergeMap( item => this.findMontageanleitung(item)))
			}
			case 'anleitung': {
				return this.findMontageanleitung( searchObj.searchValue )
			}
		}		
	}

	getPdfSrc(): string{
		//this.log.inform( this.sName, 'getting PdfSrc: ', this.pdfSrc );
		return this.pdfSrc;
	}

	findWorkorders( wo: string ): Observable<{}> {
		return this.workorderApi.find( { where: { wadoco: wo }, limit: 1, order: 'wlopsq asc' } )
			.pipe(
				catchError	( () => of( [] ) 														),
				tap			( ( result   : WorkorderInterface[] ) 	=> { if ( ! result.length ) throw new Error( 'Workorder "' + wo + '" nicht gefunden!' )}),
				mergeAll	( ),
				map			( ( workorder: WorkorderInterface ) 		=> workorder.walitm	),
			)
	}

	findReferenceItem( item: any ): Observable<{}>  {
		return this.enoviaReferenceItemApi.find({ where: { jdeitem: item }, limit: 1 })
			.pipe(
				catchError	( () => of( [] )),
				map			( ( result: EnoviaReferenceItemInterface[] )	=> result.length ? result : of( [] )					),
				mergeAll	( ),
				map( ( result: EnoviaReferenceItemInterface ) => {
					if ( result.montageanleitung ) {
						this.item = ( result.montageanleitung.substring(result.montageanleitung.length - 2, result.montageanleitung.length) === '-M') ? result.montageanleitung.substr(0, result.montageanleitung.length - 2) : result.montageanleitung;
						return result.montageanleitung
					} else {
						this.item = item;
						return item + '-M'
					}
				}),
			)			
	}

	findMontageanleitung( item: {} ): Observable<{}> {
		return this.enoviaOfflineSearchFileApi.find( { where: { and: [ { name: item }, { state: { neq: 'Obsolete' } } ] }, limit: 1 })
			.pipe(
				catchError(	() => of( [] )),
				tap( 		( result: EnoviaOfflineSearchFileInterface[] ) 	=> { if ( ! result.length ) throw new Error( 'Kein PDF gefunden!' )}),
				mergeAll(),
				tap( ( result: EnoviaOfflineSearchFileInterface ) => {
					//this.log.inform( this.sName, 'setting PdfSrc: ', BASE_URL + '/pdf?file=' + result.encryptedfilename + '#view=Fit')
					this.pdfSrc = BASE_URL + '/pdf?file=' + result.encryptedfilename + '#view=Fit';
				} )
			)		
	}

	findMontageanweisung( ) {
		return 	this.montageanweisungApi.find( { where: { artikel: this.item }, limit: 1 } )
			.pipe(
				catchError( () => of( [] ) )
			)
	}

	async createNewInstruction( anweisung:any ) {
		
			let existResult: any 	= await this.montageanweisungApi.exists(anweisung.artikel).toPromise();
			if ( existResult.exists ) throw new Error( 'Anweisung existiert bereits' ); 
	
			let createResult: any 	= await this.montageanweisungApi.create( anweisung ).toPromise();
			this.log.inform( this.sName, 'createResult: ', createResult );

			return true;
	
	}
}
