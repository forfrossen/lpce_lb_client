import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef 		} from '@angular/core';
import { DomSanitizer																} from '@angular/platform-browser';
import { HttpClient 																} from '@angular/common/http';
import { Router, ActivatedRoute														} from '@angular/router';
import { NbActionsModule, NbDialogService											} from '@nebular/theme';

import { Observable, of, Subject, pipe, throwError    								} from 'rxjs';
import { catchError, map, mergeAll, tap, mergeMap									} from 'rxjs/operators';

import { fadeInOutAnimation 														} from 'app/_ui-components/animations';
import { LoggerServiceExtended 														} from 'app/shared/extended/logger.service.extended';

import { DataService 																} from '../service/data.service';
import { AnweisungenViewerComponent													} from '../anweisungen-viewer/anweisungen-viewer.component';
import * as eva from 'eva-icons';

@Component( {
	selector: 'pdf-viewer-component',
	templateUrl: './pdf-viewer.component.html',
	styleUrls: ['./pdf-viewer.component.scss', '../montageanleitungen.component.scss'],
	animations: [ fadeInOutAnimation ],
} )
	
export class PdfViewerComponent implements OnInit {

	
	@ViewChild( "pdfViewer" ) pdfViewer: ElementRef;
	
	sName						: string = 'pdf-viewer.component - ';
	pdfSrc						: string = '';
	blobSrc						: any;
	showPdf						: boolean = false;
	loading						: boolean = false;
	isAnweisungFound			: boolean = false;
	
	constructor(
		private sanitizer		: DomSanitizer,
		private http			: HttpClient,
		private dataService		: DataService,
		private log				: LoggerServiceExtended,
		private router			: Router,
		private route			: ActivatedRoute,
		private dialogService	: NbDialogService
	) 
	{
	
	}
	
	ngOnInit() {

		this.pdfSrc = this.dataService.getPdfSrc();
		this.loading = true;

		if ( ! this.pdfSrc ) this.router.navigate( [ '../suche' ], { relativeTo: this.route } );
		else {
			this.http.get( this.pdfSrc, { responseType: 'blob' } )
				.pipe(
					map( response 	=> new Blob([response], {type: "application/pdf"})),
					tap( blob 		=> this.blobSrc = this.sanitizer.bypassSecurityTrustResourceUrl( URL.createObjectURL( blob ) + '#view=FitV')),
					tap( () => {
						this.showPdf = true;
						this.loading = false;
					})
				)
				.subscribe( () => {
					setTimeout( () => {
						this.pdfViewer.nativeElement.focus();
					}, 1000 ); 
				} )		
			
			this.dataService.findMontageanweisung().subscribe( result => this.isAnweisungFound = ( result.length ) ? true : false );
		}
	}

	nextClick() {
		this.router.navigate( ['../suche'], { relativeTo: this.route } )
	}

	fullscreenViewer() {
		window.open( this.pdfSrc, '_blank' );
	}

	showInstructions() {
		
		this.dialogService.open( AnweisungenViewerComponent, {} );

		//this.router.navigate( ['../montageanweisungen-viewer'], { relativeTo: this.route } )
	}
}
