import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef		} from '@angular/core';
import { NbToastrService, NbSidebarService,								} from '@nebular/theme';

import { style, state, animate, transition, trigger, stagger, keyframes } from '@angular/animations';
import { sequence														} from '@angular/animations';

import { Observable, of, Subject, pipe, throwError    					} from 'rxjs';
import { catchError, map, mergeAll, tap, mergeMap						} from 'rxjs/operators';

import { BASE_URL				                          				} from 'app/shared/base.url.config';
import { LoggerServiceExtended                                          } from 'app/shared/extended/logger.service.extended' ;

import { WorkorderInterface, EnoviaReferenceItem,						} from 'app/shared/sdk/models';
import { EnoviaReferenceItemInterface,     								} from 'app/shared/sdk/models';
import { EnoviaOfflineSearchFileInterface, 								} from 'app/shared/sdk/models';
import { WorkorderApi, 													} from 'app/shared/sdk/services';
import { EnoviaReferenceItemApi,                						} from 'app/shared/sdk/services';
import { EnoviaOfflineSearchFileApi,		              				} from 'app/shared/sdk/services';
import { fadeInOutAnimation 											} from 'app/_ui-components/animations';
import { MatUiService                                                   } from 'app/_ui-components/dialog.component';

import * as eva from 'eva-icons';


@Component({
	selector: 	  'ngx-montageanleitungen',
	templateUrl:  './montageanleitungen.component.html',
	styleUrls: 	[ './montageanleitungen.component.scss' ],
	animations: [ fadeInOutAnimation ],
})


export class MontageanleitungenComponent implements OnInit {
	sName           	: string				= 'Montageanleitungen.Component - ';
	pdfSrc				: any 					= '';
	view				: string				= '';
	
	workorder			: WorkorderInterface;
	
	private alive		: boolean 				= false;
	
	constructor(
		private log								: LoggerServiceExtended,
		private workorderApi					: WorkorderApi,
		private toasterService					: NbToastrService,
		private enoviaReferenceItemApi			: EnoviaReferenceItemApi,
		private enoviaOfflineSearchFileApi		: EnoviaOfflineSearchFileApi,

	) {
		//this.log.inform( this.sName, 'API_BASE_URL: ', BASE_URL );
	}

	ngOnInit() {
		this.alive 			= true;	
		this.view			= 'search';
	}


	ngOnDestroy() {
		this.alive = false;
	}	

/*	next() {
		this.view				= 'search';
		this.pdfSrc 			= '';
	}

	search(searchObj: {searchType:string, searchValue:string }) {
		
		this.pdfSrc 			= '';
				
		switch ( searchObj.searchType ) {
			case 'workorder': {
				
				let wo = Number( searchObj.searchValue );

				this.findWorkorders( wo ).pipe(
					mergeMap( 	item 	=> this.findReferenceItem(item)),
					mergeMap( 	item 	=> this.findMontageanleitung(item)),
				).subscribe( () => {}, err => this.toasterService.warning( err.message, 'Error!' ));
				break;
			}
			case 'artikel': {
				this.findReferenceItem( searchObj.searchValue ).pipe(
					mergeMap( 	item 	=> this.findMontageanleitung(item)),
				).subscribe(() => {}, err => this.toasterService.warning( err.message, 'Error!' ) );
				break;
			}
			case 'anleitung': {
				this.findMontageanleitung( searchObj.searchValue ).subscribe(() => {}, err => this.toasterService.warning( err.message, 'Error!' ) )
				break;
			}
			case '': {
				this.toasterService.warning( 'Bitte erst den Suchtyp definieren' );
				break;
			}
		}
		
	}


	findWorkorders( wo: number ): Observable<{}> {
		return this.workorderApi.find( { where: { wadoco: wo }, limit: 1, order: 'wlopsq asc' } )
			.pipe(
				catchError( () 											=> of( [] ) 														),
				//tap(		( workorder: WorkorderInterface[] ) 		=> this.log.inform( this.sName, 'Workorders Found:', workorder		)),
				tap( 		( result   : WorkorderInterface[] ) 		=> { if ( ! result.length ) throw new Error( 'Workorder "' + wo + '" nicht gefunden!' )}),
				mergeAll(),
				//tap(		( workorder: WorkorderInterface ) 			=> this.log.inform( this.sName, 'Single Workorder Found:', workorder	)),
				map(		( workorder: WorkorderInterface ) 			=> workorder.walitm	),
				//tap(  		item										=> this.log.inform( this.sName, 'Item from Workorder-Search:', item 	)),	
			)
	}

	findReferenceItem( item: {} ): Observable<{}>  {
		return this.enoviaReferenceItemApi.find({ where: { jdeitem: item }, limit: 1 })
			.pipe(
				catchError(	() 											=> of( [] ) 											),
				//tap(		( result: EnoviaReferenceItemInterface[] )	=> this.log.inform( this.sName, 'Result', result ) 		),
				map(		( result: EnoviaReferenceItemInterface[] )	=> result.length ? result : of( [] )					),
				mergeAll(),
				map(		( result: EnoviaReferenceItemInterface )	=> result.montageanleitung ? result.montageanleitung : item + '-M'		),
				//tap( 		result 										=> this.log.inform( this.sName, 'Result2', 	result 		)),
				//tap( 		()  										=> this.log.inform( this.sName, 'Item',		item + '-M'	)),
			)			
	}

	findMontageanleitung( item: {} ): Observable<{}> {
		return this.enoviaOfflineSearchFileApi.find( { where: { and: [ { name: item }, { state: { neq: 'Obsolete' } } ] }, limit: 1 })
			.pipe(
				catchError(	() => of( [] )),
				//tap(		( result: EnoviaOfflineSearchFileInterface[] )	=> this.log.inform( this.sName, 'Offline Search Results:', result 		)),
				tap( 		( result: EnoviaOfflineSearchFileInterface[] ) 	=> { if ( ! result.length ) throw new Error( 'Kein PDF gefunden!' )}),
				mergeAll(),
				//tap(		( result: EnoviaOfflineSearchFileInterface )	=> this.log.inform( this.sName, 'Single Offline Search Result:', result 	)),
				tap( ( result: EnoviaOfflineSearchFileInterface ) => {
					//this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl('ftp://USPHC%5CCOR089FTPMatrixOne:N3oOr%40cle@qcd480a01.uk.parker.corp/STORE/' + result.encryptedfilename);
					//this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl( 'http://lpce480webapps:3001/pdf?file=' + result.encryptedfilename + '#view=Fit' );
					//this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(  BASE_URL + '/pdf?file=' + result.encryptedfilename + '#view=Fit' );
					//this.pdfSrc = 'ftp://USPHC%5CCOR089FTPMatrixOne:N3oOr%40cle@172.18.104.39/STORE/be/c8/bec8bkkzonbxhyonjx2vojpau0fl_4w5wgobuwclxha.ri8';
					let pdfSrc 	= BASE_URL + '/pdf?file=' + result.encryptedfilename + '#view=Fit';
					this.dataService.setPdfSrc( pdfSrc );
					
					this.pdfSrc = pdfSrc
					this.view	= 'pdfViewer';
				} ),
			)		
	}
*/
}