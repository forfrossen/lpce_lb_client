import { Component, OnDestroy, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef                 					} from '@angular/core'                               ;
import { DatePipe					                					} from '@angular/common'                               ;
import { HotTableRegisterer                                             } from '@handsontable/angular'                       ;
import { NbToastrService, NbDialogService                               } from '@nebular/theme'                              ;
import { API_VERSION, BASE_URL                          				} from 'app/shared/base.url.config'                  ;
import { LoggerServiceExtended                                          } from 'app/shared/extended/logger.service.extended' ;
import { LoopBackConfig                                                 } from 'app/shared/sdk'                              ;
import { Artikelstammanlage, ArtikelstammanlageInterface	            } from 'app/shared/sdk/models'                       ;
import { ArtikelstammanlageApi				              				} from 'app/shared/sdk/services'                     ;
import { MatUiService                                                   } from 'app/_ui-components/dialog.component'         ;
import { Observable, of, Subject                       					} from 'rxjs'                                        ;
import { catchError, concatAll, debounceTime, distinct, map				} from 'rxjs/operators'                              ;
import { distinctUntilChanged, switchMap, tap, toArray           		} from 'rxjs/operators'                              ;
import { registerLocaleData 											} from '@angular/common';
import { ARIA_DESCRIBER_PROVIDER_FACTORY 								} from '@angular/cdk/a11y';

import localeDe 														  from '@angular/common/locales/de';
import localeDeExtra													  from '@angular/common/locales/extra/de';
import * as eva          												  from 'eva-icons'    ;
import * as Handsontable 												  from 'handsontable' ;
import * as moment                                                        from 'moment';


@Component({
  selector: 'liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeComponent implements OnInit {

	datePipe							= new DatePipe('de-DE');
	sName             	: string		= 'Artikelstammanlage-Liste.Component - ';
	instance          	: string 		= 'hotInstance';
	hotInstance       	: any;
	isApiError			: boolean		= false;
	isAnlagenLoading	: boolean		= false;
	anlagen				: any = Handsontable.default.helper.createSpreadsheetData( 11, 11 );
	
	settingsObj:any = {
		data              	: this.anlagen,
		hiddenColumns: {
			copyPasteEnabled: false,
			indicators: true,
			columns: [0],
		},
		columns           	: [
			{ readOnly: true, data: 'id', 	  				title: 'id', 				},
			{ readOnly: true, title: 'Artikelnummer',  		data: 'myLinkField', 		renderer: 'html', },
			{ readOnly: true, title: 'Ident Nr.', 	  		data: 'identnummer', 	  	},
			{ readOnly: true, title: 'S-Text', 	  			data: 'stext', 				},
			{ readOnly: true, title: 'Erstbestellung Menge',data: 'erstbestellungqty' 	},
			{ readOnly: true, title: 'RFQ', 				data: 'rfqnr',				},
			{ readOnly: true, title: 'Kunde', 				data: 'kunde', 				},
			{ readOnly: true, title: 'changed',   			data: 'Changed',			colWidth: 80, className: 'htRight htMiddle', type: 'date', dateFormat: 'DD.MM.YYYY', correctFormat: true,	},
			{ readOnly: true, title: 'changedBy', 			data: 'ChangedBy', 			colWidth: 80, },
		],
		licenseKey		  	: 'non-commercial-and-evaluation',
		rowHeaders			: true,
		colHeaders			: true,
		stretchH			: 'all',
		autoColumnSize		: false,
		fillHandle			: false,
		columnSorting		: true,
		manualColumnResize	: true,
		observeChanges		: true,
		filters				: true,
        dropdownMenu: [
            'filter_by_condition',
            'filter_operators',
            'filter_by_condition2',
            'filter_by_value',
            'filter_action_bar'
        ],
		className			: 'htMiddle',
		minSpareRows		: 1,
    };

    constructor(
        private log                 	: LoggerServiceExtended,
        private artikelstammanlageApi 	: ArtikelstammanlageApi,
        private hotRegisterer       	: HotTableRegisterer,
        private toastrService      		: NbToastrService,
        private matUiService        	: MatUiService,
		private dialogService			: NbDialogService,
		private componentFactoryResolver: ComponentFactoryResolver,
    ) { }

    ngOnInit() {

		this.hotInstance = this.hotRegisterer.getInstance( this.instance );
		setTimeout( () => this.refreshData(), 1000);

	}

	refreshData(){
		
		this.isAnlagenLoading = true;

		this.artikelstammanlageApi
			.find()
			.pipe(
				concatAll(),
				map(( artikelstammanlage: Artikelstammanlage ) => {
					
					let changed: any;
					let changedBy: string;
					let myLinkField: string;

					changed = artikelstammanlage.starterdatum;
					changedBy = artikelstammanlage.startername;

					if ( changed < artikelstammanlage.manufacturingdatum ){
						changed 	= artikelstammanlage.manufacturingdatum;
						changedBy 	= artikelstammanlage.manufacturingname; 
					}

					if ( changed < artikelstammanlage.konstruktiondatum ){
						changed 	= artikelstammanlage.konstruktiondatum;
						changedBy 	= artikelstammanlage.konstruktionname; 
					}
					
					if ( changed < artikelstammanlage.serviceteamdatum ){
						changed 	= artikelstammanlage.serviceteamdatum;
						changedBy 	= artikelstammanlage.serviceteamname; 
					}
					
					if ( changed < artikelstammanlage.pricingdatum ){
						changed 	= artikelstammanlage.pricingdatum;
						changedBy 	= artikelstammanlage.pricingname; 
					}
					
					changed = this.datePipe.transform( changed );
					myLinkField = '<a  href="#/pages/artikelstammanlage/anlageformular/' + artikelstammanlage.id + '">' + artikelstammanlage.artikelnummer + '</a>';
					
					return { ...artikelstammanlage, changed: changed, changedBy: changedBy, myLinkField: myLinkField }

				}),
				toArray(),
			)
			.subscribe ( artikelstammanlagen => {
				this.settingsObj.data 		= artikelstammanlagen;

				this.hotRegisterer.getInstance( this.instance ).updateSettings( this.settingsObj );

				this.isAnlagenLoading	 	= false;
			})
	}

	openSearch(){

	}

	onAfterChange(){

	}
}