import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, Inject } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { takeWhile } from 'rxjs/operators';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap'

import { NbToastrService } 									from '@nebular/theme';
import { NbThemeService } 									from '@nebular/theme';
import { Ng2SmartTableModule, LocalDataSource } 			from 'ng2-smart-table';
import { NgSelectModule, NgOption } 						from '@ng-select/ng-select';

import { BASE_URL, API_VERSION }							from 'app/shared/base.url.config';
import { LoopBackConfig } 									from 'app/shared/sdk';
import { Teileinfo, TeileinfoInterface, Message } 	from 'app/shared/sdk/models';
import { Item, ItemInterface }						 	    from 'app/shared/sdk/models';
import { TeileinfoApi } 									from 'app/shared/sdk/services';
import { ItemApi } 											from 'app/shared/sdk/services';
import { LoggerServiceExtended } 							from 'app/shared/extended/logger.service.extended'

import { MatUiService } 									from 'app/_ui-components/dialog.component'

import { dateRendererComponent } 							from './dateRenderer.component';
import { NbToastrConfig } 									from '@nebular/theme/components/toastr/toastr-config';
import { Subject, Observable, of, concat } 					from 'rxjs';

import * as Handsontable from 'handsontable';
import { HotTableRegisterer } from '@handsontable/angular';

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

export class TeileinfoListComponent implements OnInit, OnDestroy {

	Teileinfo: TeileinfoInterface;
	item: ItemInterface;
	items: ItemInterface[];
	itemsLoading: boolean = true;
	itemsfetched: boolean = false;
	sName: string = 'Teileinfo-List.Component';
	TiSource: LocalDataSource;
	TiSettings: any;


	alive: boolean = true;

	constructor(
		private log: LoggerServiceExtended,
		private TeileinfoApi: TeileinfoApi,
		private toastrService: NbToastrService,
		private matUiService: MatUiService,
		private themeService: NbThemeService,
		private itemApi: ItemApi,
	) {

		LoopBackConfig.setBaseURL( BASE_URL );
		LoopBackConfig.setApiVersion( API_VERSION );
		this.TiSettings = this.createColDefs();
		this.TiSource = new LocalDataSource();

	}

	ngOnInit(): void {

		this.TeileinfoApi.find( { limit: 50, order: 'created desc' } )
		.subscribe( ( Teileinfos: TeileinfoInterface[] ) => {
			this.TiSource.load( Teileinfos );
		},
		error => {
			this.log.error( error );
		} );

		this.loadItems();
	}

	private loadItems(): void {
		this.itemApi.find( { limit: 50, order: 'IBLITM asc' } )
			.subscribe( ( items: ItemInterface[] ) => {
				this.items = items;
				this.itemsLoading = false;
			},
			error => {
				this.log.error( error );
			},
			() => {
				this.log.inform( this.sName, 'Items fetched: ', this.items );
				this.log.inform( this.sName, 'Items: ', this.items[ 0 ].ibbuyr );
			});
	}


	getInfobyID( id: number ) {
		this.TeileinfoApi.findById( id )
			.subscribe( ( teileinfo: Teileinfo ) => {
				this.Teileinfo = teileinfo;
				this.log.inform( this.sName, this.Teileinfo );
			} );
	}


	tableAction( event, action ): void {
		let tableActionConfig: {} = { create: {}, edit: {}, delete: {}, configured: false };


		if ( action === 'create' || action === 'edit') {
			event.newData.dateAllg = ( event.newData.dateAllg === '' ) ? null : event.newData.dateAllg;
			event.newData.dateSek = ( event.newData.dateSek === '' ) ? null : event.newData.dateSek;
			event.newData.teileinfoAllg = ( event.newData.teileinfoAllg === '' ) ? null : event.newData.teileinfoAllg;
			event.newData.teileinfoSek = ( event.newData.teileinfoSek === '' ) ? null : event.newData.teileinfoSek;
		}

		if ( action === 'create' ) {
			tableActionConfig = {
				create: {
					APIaction: this.TeileinfoApi.create( event.newData ),
					messageTitle: 'Confirm Item Creation',
					messageBody: 'Are you sure you want to add a new item?',
				},
				configured: true,
			}
		}
		if ( action === 'edit' ) {
			tableActionConfig = {
				edit: {
					APIaction: this.TeileinfoApi.updateAttributes( event.data[ 'id' ], event.newData ),
					messageTitle: 'Please Confirm Update',
					messageBody: 'Are you sure you want to update?',
				},
				configured: true,
			}
		}

		if ( action === 'delete' ) {
			tableActionConfig = {
				delete: {
					APIaction: this.TeileinfoApi.deleteById( event.data[ 'id' ] ),
					messageTitle: 'Please confirm Deletion',
					messageBody: 'Are you sure you want to delete this item?',
				},
				configured: true,
			}
		}

		const message = tableActionConfig[action].messageBody;
		const title = tableActionConfig[action].messageTitle

		this.matUiService.confirm( title, message )
			.subscribe( confirmStatus => {
				if ( confirmStatus === true ) {
					tableActionConfig[action].APIaction.subscribe( data => {
						this.log.inform( this.sName, data );
						this.toastrService.success( '', 'Done' );
						event.confirm.resolve( event.newData );
					}, err => {
						this.log.error( err );
						this.matUiService.dialog( 'Error: ' + err.name, err.message );
						event.confirm.reject( err );
					} );
				} else {
					this.log.inform( this.sName, 'Cancelled' );
					event.confirm.reject();
				}
		} );
	}

	enterKeyDown( event ): void {
		event.srcElement.blur();
	}

	createColDefs(): object {
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
		this.matUiService.confirm( 'Please Confirm Update', 'Are you sure you want to update?')
			.subscribe( confirmTrue => {
				if ( confirmTrue ) {
					this.log.inform( this.sName, 'Confirmed' );
					this.TeileinfoApi.updateAttributes( event.data[ 'id' ], event.newData ).subscribe( data => {
						this.log.inform( this.sName, data );
						this.toastrService.success( "", "Saved" );
						event.confirm.resolve( event.newData );
					}, err => {
						this.log.error( err );
						this.toastrService.danger( "", "Error: " + err.name );
						this.matUiService.dialog( "Error: " + err.name, err.message );
						event.confirm.reject( err );
					} );
				} else {
					this.log.inform( this.sName, 'Cancelled' );
					event.confirm.reject();
				} 
		} );
	}
	onCreateConfirm( event ): void  {
		this.matUiService.confirm( 'Confirm Item Creation', 'Are you sure you want to add a new item?')
			.subscribe( confirmTrue => {
				if ( confirmTrue ) {
					this.log.inform( this.sName, 'Confirmed' );
					this.TeileinfoApi.create( event.newData ).subscribe( data => {
						this.log.inform( this.sName, data );
						this.toastrService.success( "", "Saved" );
						event.confirm.resolve( event.newData );
					}, err => {
						this.log.error( err );
						this.toastrService.danger( "", "Error: " + err.name );
						this.matUiService.dialog( "Error: " + err.name, err.message );
						event.confirm.reject( err );
					} );
				} else {
					this.log.inform( this.sName, 'Cancelled' );
					event.confirm.reject();
				} 
			} );
	}

	onDeleteConfirm( event ): void  {
		this.matUiService.confirm( 'Please confirm Deletion', 'Are you sure you want to delete this item?')
			.subscribe( confirmTrue => {
				if ( confirmTrue ) {
					this.log.inform( this.sName, 'Confirmed' );
					this.TeileinfoApi.deleteById( event.data[ 'id' ] ).subscribe( data => {
						this.log.inform( this.sName, data );
						this.toastrService.success( "", "Deleted" );
						event.confirm.resolve( event.newData );
					}, err => {
						this.log.error( err );
						this.toastrService.danger( "", "Error: " + err.name );
						this.matUiService.dialog( "Error: " + err.name, err.message );
						event.confirm.reject( err );
					} );
				} else {
					this.log.inform( this.sName, 'Cancelled' );
					event.confirm.reject();
				} 
			} );
	}







	onSaveConfirm( event ): void {
		this.log.inform( this.sName, event );
		this.confirmService.confirm( { title: 'Please Confirm Update', message: 'Are you sure you want to update?' } )
			.then( () => {
				this.log.inform( this.sName, 'Confirmed' );
				this.TeileinfoApi.updateAttributes( event.data[ 'id' ], event.newData ).subscribe( data => {
					this.log.inform( this.sName, data );
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
				this.log.inform( this.sName, 'Cancelled' );
				event.confirm.reject();
			} )
	}
	
	onCreateConfirm( event ): void  {
		this.confirmService.confirm( { title: 'Confirm Item Creation', message: 'Are you sure you want to add a new item?' } )
			.then( () => { 
				this.log.inform( this.sName, 'Confirmed' )
				this.TeileinfoApi.create( event.newData ).subscribe( data => {
					this.log.inform( this.sName, data )
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
				this.log.inform( this.sName, 'Cancelled' );
				event.confirm.reject();
			} )
	}

	onDeleteConfirm( event ): void  {
		this.confirmService.confirm( { title: 'Please confirm Deletion', message: 'Are you sure you want to delete this item?' } )
			.then( () => { 
				this.log.inform( this.sName, 'Confirmed' );
				this.TeileinfoApi.deleteById( event.data[ 'id' ] ).subscribe( data => {
					this.log.inform( this.sName, data )
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
				this.log.inform( this.sName, 'Cancelled' );
				event.confirm.reject();
			} )
	}
*/
	