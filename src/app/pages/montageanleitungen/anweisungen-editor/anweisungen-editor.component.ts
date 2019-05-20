import { Component, OnDestroy, OnInit                 					} from '@angular/core'                               ;
import { FormGroup,	FormControl 										} from '@angular/forms';
import { HotTableRegisterer                                             } from '@handsontable/angular'                       ;
import { NbToastrService, NbDialogRef, NbDialogService                                   } from '@nebular/theme'                              ;
import { API_VERSION, BASE_URL                          				} from 'app/shared/base.url.config'                  ;
import { LoggerServiceExtended                                          } from 'app/shared/extended/logger.service.extended' ;
import { LoopBackConfig                                                 } from 'app/shared/sdk'                              ;
import { MontageanweisungInterface, Montageanweisung	                } from 'app/shared/sdk/models'                       ;
import { MontageanweisungApi				              				} from 'app/shared/sdk/services'                     ;
import { MatUiService                                                   } from 'app/_ui-components/dialog.component'         ;
import { Observable, of, Subject, observable                       		} from 'rxjs'                                        ;
import { catchError, concatAll, debounceTime, distinct, mergeAll		} from 'rxjs/operators'                              ;
import { distinctUntilChanged, switchMap, tap, toArray, map            	} from 'rxjs/operators'                              ;
import { DataService 													} from '../service/data.service'					 ;
import { AnweisungenViewerComponent										} from '../anweisungen-viewer/anweisungen-viewer.component';

import * as eva          												  from 'eva-icons'    ;


@Component({
	selector: 'anweisungen-editor',
	templateUrl: './anweisungen-editor.component.html',
	styleUrls: ['./anweisungen-editor.component.scss']
  })
  export class AnweisungenEditorComponent implements OnInit {

	anweisung		: MontageanweisungInterface = { artikel: ''};
	sName			: string 	= 'Anweisungen-Editor - ';
	isLoading		: boolean	= true;
	isApiError		: boolean 	= false;
	inpAnweisung 				= new FormControl('');

	constructor(
		private log                 : LoggerServiceExtended,
		private montageanweisungApi : MontageanweisungApi,
		private toastrService       : NbToastrService,
		private matUiService        : MatUiService,
		private dataService			: DataService,
		private dialogService		: NbDialogService,
		protected ref				: NbDialogRef<AnweisungenViewerComponent>,
	) { }

	ngOnInit() {
		this.isLoading = false;
	}

	dismiss() {
		this.ref.close();
	}
	
	preview(){

	}

	async save() {
		/*
		try {

			
			
			let existResult: any 	= await this.montageanweisungApi.exists(this.anweisung.artikel).toPromise();
			this.log.inform( this.sName, 'existResult:', existResult );
			if ( existResult.exists ) throw new Error( 'Anweisung existiert bereits' ); 
			
			let createResult: any 	= await this.montageanweisungApi.create( this.anweisung ).toPromise();
			this.log.inform( this.sName, 'createResult:', createResult );

		} catch(err) {
			
			this.isApiError = true;
			this.log.inform ( this.sName, 'An error occoured: ', err );
			this.toastrService.danger( 'ERROR', err );

		} finally {
			
			this.isLoading = false;
			if( ! this.isApiError ) {
				this.toastrService.success( 'Erfolg', "Daten gespeichert!" );
				this.ref.close();
			} else {
				this.dialogService.open( AnweisungenViewerComponent, {} )
			}


		}
		*/
		try {

			this.isLoading = true;
			let createResult = await this.dataService.createNewInstruction( this.anweisung );
			
		} catch (err) {

			this.isApiError = true;
			this.matUiService.error( 'Daten konnten nicht gespeichert werden', err );
			this.toastrService.danger( 'ERROR', err );

		} finally {

			this.isLoading = false;
			
			if( ! this.isApiError ) {
				this.dataService.item = this.anweisung.artikel;
				this.toastrService.success( 'Erfolg', "Daten gespeichert!" );
				this.dialogService.open( AnweisungenViewerComponent, {} );
				this.ref.close();
			}

		}
	}
}
