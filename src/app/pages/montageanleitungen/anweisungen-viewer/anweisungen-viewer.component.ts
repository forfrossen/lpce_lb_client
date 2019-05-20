import { Component, OnDestroy, OnInit                 					} from '@angular/core'                               ;
import { HotTableRegisterer                                             } from '@handsontable/angular'                       ;
import { NbToastrService, NbDialogRef                                   } from '@nebular/theme'                              ;
import { API_VERSION, BASE_URL                          				} from 'app/shared/base.url.config'                  ;
import { LoggerServiceExtended                                          } from 'app/shared/extended/logger.service.extended' ;
import { LoopBackConfig                                                 } from 'app/shared/sdk'                              ;
import { MontageanweisungInterface, Montageanweisung	                } from 'app/shared/sdk/models'                       ;
import { MontageanweisungApi				              				} from 'app/shared/sdk/services'                     ;
import { MatUiService                                                   } from 'app/_ui-components/dialog.component'         ;
import { Observable, of, Subject                       					} from 'rxjs'                                        ;
import { catchError, concatAll, debounceTime, distinct, mergeAll		} from 'rxjs/operators'                              ;
import { distinctUntilChanged, switchMap, tap, toArray, map            	} from 'rxjs/operators'                              ;
import { DataService 													} from '../service/data.service';
import * as eva          												  from 'eva-icons'    ;


@Component({
	selector: 'anweisungen-viewer',
	templateUrl: './anweisungen-viewer.component.html',
	styleUrls: ['./anweisungen-viewer.component.scss'],
})
export class AnweisungenViewerComponent implements OnInit {

	anweisung: MontageanweisungInterface;
	sName: string = 'AnweisungenViewer - '
	isLoaded: boolean = false;

	constructor(
		private log                 : LoggerServiceExtended,
		private montageanweisungApi : MontageanweisungApi,
		private hotRegisterer       : HotTableRegisterer,
		private toastrService       : NbToastrService,
		private matUiService        : MatUiService,
		private dataService			: DataService,
		protected ref				: NbDialogRef<AnweisungenViewerComponent>,
	) { }

	ngOnInit() {
		//this.montageanweisungApi.find( { where: { artikel: "21SBVG12MPNS" }, limit: 1 } )
		this.dataService.findMontageanweisung()
			.pipe(
				tap( () => this.isLoaded = false ),
				tap( result	=> this.log.inform( this.sName, 'Result', result )),
				mergeAll(),
				tap( ( anweisung: MontageanweisungInterface ) => {
					this.log.inform( this.sName, 'anweisung', anweisung )
					this.anweisung = anweisung;
				} ),
				tap( () => this.isLoaded = true )
			).subscribe()
	}

	dismiss() {
		this.ref.close();
	}
}
