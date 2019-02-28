import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef 		} from '@angular/core';
import { fadeInOutAnimation 														} from 'app/_ui-components/animations';

@Component( {
	selector: 'search-component',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss'],
	animations: [ fadeInOutAnimation ],
})
export class SearchComponent implements OnInit {
		
	@Input() searchValue		: any;
	@Input() searchType			: string 	= 'workorder';
	
	@Output() search 			= new EventEmitter<{searchType: string, searchValue: string}>();
	
	@ViewChild( "searchValueField" ) searchValueField: ElementRef;

	constructor() {}

	ngOnInit() {
		setTimeout( () => this.searchValueField.nativeElement.focus(), 1000 ); 
	}

	onSearchClick() {

		let searchObj: { searchType: string, searchValue: string } = { searchType: this.searchType, searchValue: this.searchValue }
		this.search.emit( searchObj );
		
	}

	resetForm() {
		this.searchValue = '';		
	}

}
