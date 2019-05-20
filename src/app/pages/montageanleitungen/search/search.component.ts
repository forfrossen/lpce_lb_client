import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef 		} from '@angular/core';
import { Router, ActivatedRoute														} from '@angular/router';
import { NbToastrService															} from '@nebular/theme';

import { LoggerServiceExtended                                          			} from 'app/shared/extended/logger.service.extended' ;

import { fadeInOutAnimation 														} from 'app/_ui-components/animations';
import { DataService																} from '../service/data.service';



@Component( {
	selector: 'search-component',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss', '../montageanleitungen.component.scss' ],
	animations: [ fadeInOutAnimation ],
})

export class SearchComponent implements OnInit {
		
	@Input() searchValue		: any;
	@Input() searchType			: string 	= 'workorder';
	
	@Output() search 			= new EventEmitter<{searchType: string, searchValue: string}>();
	
	@ViewChild( "searchValueField" ) searchValueField: ElementRef;

	sName			: string 			= 'search.component - '

	constructor(
		private dataService						: DataService,
		private toasterService					: NbToastrService,
		private log 							: LoggerServiceExtended,
		private router							: Router,
		private route							: ActivatedRoute,
	) { }

	ngOnInit() {
		setTimeout( () => this.searchValueField.nativeElement.focus(), 1000 ); 
	}

	onSearchClick() {
		
		let searchObj: { searchType: string, searchValue: string } = { searchType: this.searchType, searchValue: this.searchValue }
		this.dataService.search( searchObj )
			.subscribe(
				() => {
					this.router.navigate( [ '../pdf-viewer' ], { relativeTo: this.route } )
				},
				err => this.toasterService.warning( err.message, 'Error!' )
			)
		
		//this.search.emit( searchObj );		
	}

	resetForm() {
		this.searchValue = '';		
	}

}
