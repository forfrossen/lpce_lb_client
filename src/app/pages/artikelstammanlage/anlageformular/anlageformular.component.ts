import { Component, OnInit 												} from '@angular/core';
import { DatePipe, registerLocaleData, Location        					} from '@angular/common';
import localeDe 														  from '@angular/common/locales/de';
import localeDeExtra													  from '@angular/common/locales/extra/de';
import { NbMenuService 													} from '@nebular/theme';
import { filter 														} from 'rxjs/operators';

import { LoopBackConfig                                                 } from 'app/shared/sdk';
import { ArtikelstammanlageInterface, Artikelstammanlage                } from 'app/shared/sdk/models';
import { ArtikelstammanlageApi				              				} from 'app/shared/sdk/services';
import { LoggerServiceExtended 											} from 'app/shared/extended/logger.service.extended';
import { ActivatedRoute } from '@angular/router';


@Component({
	selector: 'anlageformular',
	templateUrl: './anlageformular.component.html',
	styleUrls: ['./anlageformular.component.scss']
})
export class AnlageformularComponent implements OnInit {

	datePipe							= new DatePipe('de-DE');
	sName				: string		= 'Anlageforular.Component';
	isLoading			: boolean		= false;

	artikelstammanlage$: ArtikelstammanlageInterface = { artikelnummer: ''};

    items = [
		{ title: 'Save & Send', action: 'SaveAndSend' },
		{ title: 'Save Only', action: 'SaveOnly' },
	];

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private nbMenuService: NbMenuService,
		private log: LoggerServiceExtended,
		private artikelstammanlageApi: ArtikelstammanlageApi
	) { 
		registerLocaleData(localeDe, 'de-DE', localeDeExtra);
	}

	ngOnInit() {

		this.loadAnlage();


		this.artikelstammanlage$.starterdatum = new Date();
		this.artikelstammanlage$.startername = 'Markus Kristen';

		this.nbMenuService.onItemClick()
			.pipe( filter(({ tag }) => tag === 'serviceteam-action-menu'))
			.subscribe(	(MenuBag: any)  => {
                this.log.inform( this.sName, 'Action:' , MenuBag.item.action  )
                this.save( 'serviceteam');
            });
	}

	save( abteilung: string ){

        this.artikelstammanlage$[abteilung + 'name'] = 'THISWASME';

		this.artikelstammanlageApi.patchOrCreate( this.artikelstammanlage$ )
			.subscribe( response => {
				this.log.inform (this.sName, 'save Response:', response )
				//if ( ! this.artikelstammanlage$.id ) this.artikelstammanlage$.id = response.id;

                this.artikelstammanlage$ = response;
			});
	}

	loadAnlage(){
		let id: number;

		if( this.route.snapshot.paramMap.get('id') ){
			id = +this.route.snapshot.paramMap.get('id');
			this.artikelstammanlageApi.findById( id ).subscribe(( anlage: Artikelstammanlage ) => {
				this.log.inform (this.sName, 'load anlage:', anlage )
				this.artikelstammanlage$ = anlage;
			})
		} else {
			this.log.inform (this.sName, 'no id' );
		}

		
	}
}
