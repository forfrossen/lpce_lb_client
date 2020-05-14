import { Component, Input, Inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NbAccordionModule } from '@nebular/theme';

import { Observable } from 'rxjs';

export interface DialogData {
	title: string;
	message: string;
}

@Injectable( { providedIn: 'root' } )
export class MatUiService {

	constructor( private matDialogService: MatDialog ) { }
	
	public confirm( sTitle: string, sMessage: string ): Observable<boolean> {
		const confirmDialog = this.matDialogService.open( confirmComponent, { data: { title: sTitle, message: sMessage } } );
		return confirmDialog.afterClosed();
	} 

	public dialog( sTitle: string, sMessage: string ):void {
		const confirmDialog = this.matDialogService.open( dialogComponent, { data: { title: sTitle, message: sMessage } } );
	}

	public ReportViewer( sTitle: string, reportLocation: string, parameters: any ):void {
		const confirmDialog = this.matDialogService.open(
			ReportViewer, {
				data: {
					title: sTitle,
					reportLocation: reportLocation,
					parameters: parameters
				},
				minHeight: '600px',
				height: 'auto',
				minWidth: '1150px',
				width: 'auto',
			} );
	}

	public error( sTitle: string, sMessage: string[] ):void {
		const errorDialog = this.matDialogService.open( errorComponent, { data: { title: sTitle, message: sMessage } } );
	}
}

@Component({
	selector: 'confirmComponent',
	styleUrls: [ 'dialog.component.css' ],
	templateUrl: './dialog.component.html',
} )	
export class confirmComponent {
	
	private confirmMode: boolean = true;
	report: string = 'confirm';
	
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
	report: string = 'dialog';
	
	constructor(
		public dialogRef: MatDialogRef<dialogComponent>,
		@Inject( MAT_DIALOG_DATA ) public data: DialogData
	) {	}

	getConfirmMode(){
		return this.confirmMode;
	}
}



@Component({
	selector: 'errorComponent',
	styleUrls: [ 'dialog.component.css' ],
	templateUrl: './error.component.html',

} )	
export class errorComponent {
	
	private confirmMode: boolean = false;
	report: string = 'error';
	
	constructor(
		public dialogRef: MatDialogRef<errorComponent>,
		@Inject( MAT_DIALOG_DATA ) public data: DialogData
	) {	}

	getConfirmMode(){
		return this.confirmMode;
	}
}



@Component({
	selector: 'ReportViewer',
	styleUrls: [ 'dialog.component.css' ],
	templateUrl: './url.component.html',
} )	
export class ReportViewer {
	
	confirmMode				: boolean	= false;
	loaded					: boolean 	= false;
	parameters				: any 		= this.data.parameters;
	reportServer			: string 	= 'http://lpce480reports/ReportServer/';
	reportUrl				: string 	= 'JDE+Reports/Nussdorf+Lokal/Planung/Material_Status_Report';
	showParameters			: string 	= 'false'; 
	toolbar					: string 	= 'false';
	report					: string 	= 'report';
	language				: string 	= 'de-DE';
	width					: number 	= 100;
	height					: number 	= 100;

	constructor(
		public dialogRef: MatDialogRef<ReportViewer>,
		@Inject( MAT_DIALOG_DATA ) public data: any,
	) {	
		setTimeout( () => {
			this.loaded = true;
		}, 200)
	}

	getConfirmMode(){
		return this.confirmMode;
	}
}
