import { Component, Input, Inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';

export interface DialogData {
	title: string;
	message: string;
}

@Injectable( { providedIn: 'root' } )
export class MatUiService {
	constructor(
		private matDialogService: MatDialog,
	) {
	}
	
	public confirm( sTitle: string, sMessage: string ): Observable<boolean> {
		const confirmDialog = this.matDialogService.open( confirmComponent, { data: { title: sTitle, message: sMessage } } );
		return confirmDialog.afterClosed();
	}

	public dialog( sTitle: string, sMessage: string ):void {
		const confirmDialog = this.matDialogService.open( dialogComponent, { data: { title: sTitle, message: sMessage } } );
	}
}

@Component({
	selector: 'confirmComponent',
	styleUrls: [ 'dialog.component.css' ],
	templateUrl: './dialog.component.html',
} )	
export class confirmComponent {
	
	private confirmMode: boolean = true;
	
	constructor(
		public dialogRef: MatDialogRef<confirmComponent>,
		@Inject( MAT_DIALOG_DATA ) public data: DialogData
	) {	}

	getConfirmMode(){
		return this.confirmMode;
	}
}

@Component({
	selector: 'dialogComponent',
	styleUrls: [ 'dialog.component.css' ],
	templateUrl: './dialog.component.html',
} )	
export class dialogComponent {
	
	private confirmMode: boolean = false;

	constructor(
		public dialogRef: MatDialogRef<dialogComponent>,
		@Inject( MAT_DIALOG_DATA ) public data: DialogData
	) {	}

	getConfirmMode(){
		return this.confirmMode;
	}
}