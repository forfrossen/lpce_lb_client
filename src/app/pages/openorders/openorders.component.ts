import { Component, OnDestroy, 
	OnInit, ChangeDetectionStrategy } 						from '@angular/core';
import { FormControl }										from '@angular/forms';
import { NbThemeService, NbToastrService } 					from '@nebular/theme';
import { HttpClient, HttpHeaders } 							from '@angular/common/http';
import { takeWhile, catchError, retry, map } 				from 'rxjs/operators';
import { MatUiService } 									from 'app/_ui-components/dialog.component'
import * as Handsontable 									from 'handsontable';
import { HotTableRegisterer } 								from '@handsontable/angular';

import { BASE_URL, API_VERSION }							from 'app/shared/base.url.config';
import { LoopBackConfig, LoggerService } 					from 'app/shared/sdk';
import { User, UserInterface, Message, SDKToken } 			from 'app/shared/sdk/models';
import { LoopBackAuth } 									from 'app/shared/sdk/services';
import { OpenOrders, OpenOrdersInterface  }				 	from 'app/shared/sdk/models';
import { OpenOrdersApi } 									from 'app/shared/sdk/services';


@Component({
	selector: 'ngx-openorders',
	templateUrl: './openorders.component.html',
	styleUrls: [ './openorders.component.css' ],
} )

export class OpenOrdersComponent implements OnInit, OnDestroy {

	alive:				boolean 	= false;
	isOrdersFetched: 	boolean 	= false;
	instance: 			string 		= 'ordersTable';
	selectedOrderType:	string 		= '';
	orders: 			OpenOrdersInterface[];
	//{ data: 'pddcto', title: 'pddcto', readOnly: true },
	//{ data: 'pdmcu', title: 'pdmcu', readOnly: true },
	settingsObj: 		Handsontable.GridSettings = {
		data: this.orders, autoColumnSize: true, columnSorting: true, manualColumnFreeze: true, contextMenu: true, comments: true,

		columns: [
			{ data: 'pddoco', title: 'pddoco', type: 'numeric', readOnly: true },
			{ data: 'pdlnid', title: 'pdlnid', type: 'numeric', readOnly: true },
			{ data: 'pdan8', title: 'pdan8', type: 'numeric', readOnly: true },
			{ data: 'pdan801', title: 'pdan801', readOnly: true },
			{ data: 'pddrqj', title: 'pddrqj', type: 'date', correctFormat: true, defaultDate: '01/01/1900', readOnly: true },
			{ data: 'pdtrdj', title: 'pdtrdj', type: 'date', correctFormat: true, defaultDate: '01/01/1900', readOnly: true },
			{ data: 'pdpddj', title: 'pdpddj', type: 'date', correctFormat: true, defaultDate: '01/01/1900', readOnly: true },
			{ data: 'pdaddj', title: 'pdaddj', type: 'date', correctFormat: true, defaultDate: '01/01/1900', readOnly: true },
			{ data: 'pdlitm', title: 'pdlitm', readOnly: true },
			{ data: 'pdlocn', title: 'pdlocn', readOnly: true },
			{ data: 'pdlnty', title: 'pdlnty', readOnly: true },
			{ data: 'pdnxtr', title: 'pdnxtr', readOnly: true },
			{ data: 'pduorg', title: 'pduorg', type: 'numeric', readOnly: true },
			{ data: 'pduopn', title: 'pduopn', type: 'numeric', readOnly: true },
		],
		colHeaders: true,
		fixedColumnsLeft: 3,
	};


	constructor(
		private log: 			LoggerService,
		private themeService: 	NbThemeService,
		private openOrdersApi: 	OpenOrdersApi,
		private hotRegisterer: 	HotTableRegisterer,
		private toastrService: 	NbToastrService,
		private matUiService:	MatUiService,
	) {
		LoopBackConfig.setBaseURL( BASE_URL );
		LoopBackConfig.setApiVersion( API_VERSION );
	}

	loadOrRefreshOrders (): void {
		
		let filters: any = { where: {}, limit: 50 };
		
		if ( this.selectedOrderType )
			filters.where.pddcto = this.selectedOrderType;

		this.log.info(filters);

		this.openOrdersApi.find( filters )
			.subscribe( ( orders: OpenOrdersInterface[] ) => {
				this.orders = orders;
				this.isOrdersFetched = true;

				setTimeout( () => {
					const hotInstance = this.hotRegisterer.getInstance( this.instance );
					hotInstance.updateSettings({
						data: this.orders,
					}, true );
				}, 1000 )

			},
			error => {
				this.log.error( error );
				this.matUiService.dialog('Error', 'Etwas ist schief gelaufen beim abruf der Daten! <br /><br />' + error)
			});
	}

	on

	ngOnInit() {

		this.alive = true;

	}

	onAfterInit() {

		const hotInstance = this.hotRegisterer.getInstance( this.instance );
		return;
	}

	ngOnDestroy() {

		this.alive = false;

	}
}


