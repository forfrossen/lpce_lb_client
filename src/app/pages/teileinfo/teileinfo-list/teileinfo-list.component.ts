import { Component, OnDestroy, ChangeDetectionStrategy, Inject } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap'

import { NbToastrService } from '@nebular/theme';
import { NbThemeService } from '@nebular/theme';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';


import { BASE_URL, API_VERSION }							from 'app/shared/base.url.config';
import { LoopBackConfig, LoggerService } 					from 'app/shared/sdk';
import { TeileinfoNeu, TeileinfoNeuInterface, Message,  } 	from 'app/shared/sdk/models';
import { TeileinfoNeuApi } 									from 'app/shared/sdk/services';

import {  MatUiService } 									from 'app/_ui-components/dialog.component'

import { dateRendererComponent } 							from './dateRenderer.component';
import { NbToastrConfig } from '@nebular/theme/components/toastr/toastr-config';
import { Observable } from 'rxjs';

interface CardSettings {
	title: string;
	iconClass: string;
	type: string;
}

@Component({
	selector: 'TeileinfoListComponent',
	templateUrl: './teileinfo-list.component.html',
	styleUrls: [ './teileinfo-list.component.css' ],

} )
  
export class TeileinfoListComponent implements OnDestroy{
	
	private teileinfoNeu: TeileinfoNeuInterface;
	public TiSource: LocalDataSource;
	private alive: boolean = true;
	public TiSettings: any;

	constructor(
		private log: LoggerService,
		private teileinfoNeuApi: TeileinfoNeuApi,
		private toastrService: NbToastrService,
		private MatUiService: MatUiService,
		private themeService: NbThemeService,

	) {
		
		LoopBackConfig.setBaseURL( BASE_URL );
		LoopBackConfig.setApiVersion( API_VERSION );
		this.TiSettings = this.createColDefs();
		this.TiSource = new LocalDataSource();		

		teileinfoNeuApi.find( { limit: 50, order: 'created desc' } )
			.subscribe( ( teileinfoNeus: TeileinfoNeuInterface[] ) => {
				this.TiSource.load( teileinfoNeus );
			},
			error => {
				this.log.error( error );
			} );

	}
	


	getInfobyID( id: number ) {
		this.teileinfoNeuApi.findById( id )
			.subscribe( ( teileinfo: TeileinfoNeu ) => {
				this.teileinfoNeu = teileinfo;
				this.log.info( this.teileinfoNeu );
			} );
	}


	tableAction( event, action ): void {
		var tableActionConfig: {} = {create:{}, edit:{}, delete:{}, configured: false};

		if ( action == 'create' || action == 'edit') {
			event.newData.dateAllg = ( event.newData.dateAllg === '' ) ? null : event.newData.dateAllg;
			event.newData.dateSek = ( event.newData.dateSek === '' ) ? null : event.newData.dateSek;
			event.newData.teileinfoAllg = ( event.newData.teileinfoAllg === '' ) ? null : event.newData.teileinfoAllg;
			event.newData.teileinfoSek = ( event.newData.teileinfoSek === '' ) ? null : event.newData.teileinfoSek;
		}

		if ( action == 'create' ) {
			tableActionConfig = {
				create: {
					APIaction: this.teileinfoNeuApi.create( event.newData ),
					messageTitle: 'Confirm Item Creation',
					messageBody: 'Are you sure you want to add a new item?'
				},
				configured: true,
			}
		}
		if ( action == 'edit' ) {
			tableActionConfig = {
				edit: {
					APIaction: this.teileinfoNeuApi.updateAttributes( event.data[ 'id' ], event.newData ),
					messageTitle: 'Please Confirm Update',
					messageBody: 'Are you sure you want to update?'
				},
				configured: true,
			}
		}

		if ( action == 'delete' ) {
			tableActionConfig = {
				delete: {
					APIaction: this.teileinfoNeuApi.deleteById( event.data[ 'id' ] ),
					messageTitle: 'Please confirm Deletion',
					messageBody: 'Are you sure you want to delete this item?'
				},
				configured: true,
			}
		}

		var message = tableActionConfig[action].messageBody;
		var title = tableActionConfig[action].messageTitle

		this.MatUiService.confirm( title, message )
			.subscribe( confirmStatus => {
				if ( confirmStatus === true ) {
					tableActionConfig[action].APIaction.subscribe( data => {
						this.log.info( data );
						this.toastrService.success( "", "Done" );
						event.confirm.resolve( event.newData );
					}, err => {
						this.log.error( err );
						this.MatUiService.dialog( "Error: " + err.name, err.message );
						event.confirm.reject( err );
					} );
				} else {
					this.log.info( 'Cancelled' );
					event.confirm.reject();
				} 
		} );
	}
	
	enterKeyDown( event ):void {
		event.srcElement.blur();
	}

	createColDefs():object {
		return {
			mode: 'inline',
			add: {
				addButtonContent: '<i class="nb-plus"></i>',
				createButtonContent: '<i class="nb-checkmark"></i>',
				cancelButtonContent: '<i class="nb-close"></i>',
				confirmCreate: true,
			},
			edit: {
				editButtonContent: '<i class="nb-edit"></i>',
				saveButtonContent: '<i class="nb-checkmark"></i>',
				cancelButtonContent: '<i class="nb-close"></i>',
				confirmSave: true,
			},
			delete: {
				deleteButtonContent: '<i class="nb-trash"></i>',
				confirmDelete: true,
			},
			columns: {
				/*id: {
					title: 'ID',
					editable: false,
				},*/
				litm: {
					title: 'Artikel',
					editable: false,
					sort: true,
					width: '250px',
				},
				zeichnungsnummer: {
					title: 'DRAW',
					editable: false,
					sort: true,
					width: '150px',
				},
				teileinfoAllg: {
					title: 'Teileinfo Allg',
					editable: true,
					type: 'text',
					editor: {
						type: 'textarea',
					},
				},
				dateAllg: {
					title: 'Datum Allg',
					editable: false,
					type: 'custom',
					renderComponent: dateRendererComponent,
					width: '150px',
				},
				teileinfoSek: {
					title: 'Teileinfo SEK',
					editable: true,
					type: 'text',
					editor: {
						type: 'textarea',
					},
				},
				dateSek: {
					title: 'Datum SEK',
					editable: false,
					type: 'custom',
					renderComponent: dateRendererComponent,
					width: '150px',
				},/*
				modified: {
					title: 'modified',
					editable: false,
					type: 'custom',
					sort: true,
					renderComponent: dateRendererComponent,
				},
				created: {
					title: 'created',
					editable: false,
				},
				createdby: {
					title: 'created',
					editable: false,
				},*/
			},
			pager: {
				perPage: 100,
			}
		};
	}

	ngOnDestroy() {
		this.alive = false;
	}
}


/*







	onSaveConfirm( event ): void {
		this.MatUiService.confirm( 'Please Confirm Update', 'Are you sure you want to update?')
			.subscribe( confirmTrue => {
				if ( confirmTrue ) {
					this.log.info( 'Confirmed' );
					this.teileinfoNeuApi.updateAttributes( event.data[ 'id' ], event.newData ).subscribe( data => {
						this.log.info( data );
						this.toastrService.success( "", "Saved" );
						event.confirm.resolve( event.newData );
					}, err => {
						this.log.error( err );
						this.toastrService.danger( "", "Error: " + err.name );
						this.MatUiService.dialog( "Error: " + err.name, err.message );
						event.confirm.reject( err );
					} );
				} else {
					this.log.info( 'Cancelled' );
					event.confirm.reject();
				} 
		} );
	}
	onCreateConfirm( event ): void  {
		this.MatUiService.confirm( 'Confirm Item Creation', 'Are you sure you want to add a new item?')
			.subscribe( confirmTrue => {
				if ( confirmTrue ) {
					this.log.info( 'Confirmed' );
					this.teileinfoNeuApi.create( event.newData ).subscribe( data => {
						this.log.info( data );
						this.toastrService.success( "", "Saved" );
						event.confirm.resolve( event.newData );
					}, err => {
						this.log.error( err );
						this.toastrService.danger( "", "Error: " + err.name );
						this.MatUiService.dialog( "Error: " + err.name, err.message );
						event.confirm.reject( err );
					} );
				} else {
					this.log.info( 'Cancelled' );
					event.confirm.reject();
				} 
			} );
	}

	onDeleteConfirm( event ): void  {
		this.MatUiService.confirm( 'Please confirm Deletion', 'Are you sure you want to delete this item?')
			.subscribe( confirmTrue => {
				if ( confirmTrue ) {
					this.log.info( 'Confirmed' );
					this.teileinfoNeuApi.deleteById( event.data[ 'id' ] ).subscribe( data => {
						this.log.info( data );
						this.toastrService.success( "", "Deleted" );
						event.confirm.resolve( event.newData );
					}, err => {
						this.log.error( err );
						this.toastrService.danger( "", "Error: " + err.name );
						this.MatUiService.dialog( "Error: " + err.name, err.message );
						event.confirm.reject( err );
					} );
				} else {
					this.log.info( 'Cancelled' );
					event.confirm.reject();
				} 
			} );
	}







	onSaveConfirm( event ): void {
		this.log.info( event );
		this.confirmService.confirm( { title: 'Please Confirm Update', message: 'Are you sure you want to update?' } )
			.then( () => {
				this.log.info( 'Confirmed' );
				this.teileinfoNeuApi.updateAttributes( event.data[ 'id' ], event.newData ).subscribe( data => {
					this.log.info( data );
					this.toastrService.success( "", "Saved" );
					event.confirm.resolve( event.newData );
				}, err => {
					this.log.error( err );
					this.toastrService.danger( "", "Error: " + err.name );
					this.dialogService.open( DialogComponent, { context: { title: "Error: " + err.name, message: err.message }, hasBackdrop: true, autoFocus: false });
					event.confirm.reject( err );
				} );
			} )
			.catch( () => {
				this.log.info( 'Cancelled' );
				event.confirm.reject();
			} )
	}
	
	onCreateConfirm( event ): void  {
		this.confirmService.confirm( { title: 'Confirm Item Creation', message: 'Are you sure you want to add a new item?' } )
			.then( () => { 
				this.log.info( 'Confirmed' )
				this.teileinfoNeuApi.create( event.newData ).subscribe( data => {
					this.log.info( data )
					this.toastrService.success( "", "Saved" );
					event.confirm.resolve( event.newData );
				}, err => {
					this.log.error( err )
					this.toastrService.danger( "", "Error: " + err.name );
					this.dialogService.open( DialogComponent, { context: { title: "Error: " + err.name, message: err.message }, hasBackdrop: true, autoFocus: false });
					event.confirm.reject( err );
				} );
			} )
			.catch( () => {
				this.log.info( 'Cancelled' );
				event.confirm.reject();
			} )
	}

	onDeleteConfirm( event ): void  {
		this.confirmService.confirm( { title: 'Please confirm Deletion', message: 'Are you sure you want to delete this item?' } )
			.then( () => { 
				this.log.info( 'Confirmed' );
				this.teileinfoNeuApi.deleteById( event.data[ 'id' ] ).subscribe( data => {
					this.log.info( data )
					this.toastrService.success( "", "Deleted" );
					event.confirm.resolve( event.newData );
				}, err => {
					this.log.error( err );
					this.toastrService.danger( "", "Error: " + err.name );
					this.dialogService.open( DialogComponent, { context: { title: "Error: " + err.name, message: err.message }, hasBackdrop: true, autoFocus: false });
					event.confirm.reject( err );
				} );
			} )
			.catch( () => {
				this.log.info( 'Cancelled' );
				event.confirm.reject();
			} )
	}
*/
	