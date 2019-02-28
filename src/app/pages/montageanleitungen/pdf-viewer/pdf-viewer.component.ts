import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef 		} from '@angular/core';
import { DomSanitizer																} from '@angular/platform-browser';
import { fadeInOutAnimation 														} from 'app/_ui-components/animations';
import { HttpClient } from '@angular/common/http';

import { Observable, of, Subject, pipe, throwError    					} from 'rxjs';
import { catchError, map, mergeAll, tap, mergeMap						} from 'rxjs/operators';

@Component( {
	selector: 'pdf-viewer-component',
	templateUrl: './pdf-viewer.component.html',
	styleUrls: ['./pdf-viewer.component.scss'],
	animations: [ fadeInOutAnimation ],
} )
	
export class PdfViewerComponent implements OnInit {

	@Input() pdfSrc: string;
	@Output() next = new EventEmitter();
	
	@ViewChild( "pdfViewer" ) pdfViewer: ElementRef;
	
	blobSrc: any;
	showPdf: boolean = false;
	loading: boolean = false;

	constructor(
		private sanitizer: DomSanitizer, private http: HttpClient,
	) 
	{
	}
	
	
	sanitizeSrc() {
		return this.sanitizer.bypassSecurityTrustResourceUrl( this.pdfSrc );
	}

	ngOnInit() {
		
		console.log(this.pdfSrc);
		
		this.loading = true;

		this.http.get(this.pdfSrc, { responseType: 'blob' }).pipe(
				map( response 	=> new Blob([response], {type: "application/pdf"})),
				tap( blob 		=> this.blobSrc = this.sanitizer.bypassSecurityTrustResourceUrl( URL.createObjectURL( blob ) + '#view=FitV'))
			).subscribe( () => this.showPdf = true  )	

		setTimeout( () => {
			this.loading = false;
			this.pdfViewer.nativeElement.focus();
	   	}, 2000 ); 
	}

	nextClick() {
		this.next.emit();
	}
}
