import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile ,  catchError, retry, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable  } from 'rxjs';

import { reject } from 'q';
import { NbAuthService, NbTokenService } from '@nebular/auth'
import { NbAccessChecker } from '@nebular/security';

//import { RoleProvider } 							from 'app/@core/auth/role.provider';

import { BASE_URL, API_VERSION }							from 'app/shared/base.url.config';
import { LoopBackConfig }				 					from 'app/shared/sdk';
import { User, UserInterface, Message, SDKToken } 			from 'app/shared/sdk/models';
import { LoggerServiceExtended } 							from 'app/shared/extended/logger.service.extended'

import * as eva from 'eva-icons';


@Component( {
	selector: 'ngx-dashboard',
	templateUrl: './dashboard.component.html',
} )
export class DashboardComponent implements OnInit, OnDestroy {

	private alive = false;
	private lbToken: SDKToken['id'];
	public LoopbackData: any;
	public roles: string[] = [];
	private UserIf: UserInterface;
	public TiSettings: any;
	sName: string =  'Dashboard.Component - ';
	queryResult: Object = {};
	enoviaJSONdata: any = {};


	constructor(
		private log: LoggerServiceExtended,
		private NBTokenService: NbTokenService,
		private themeService: NbThemeService,
		//public roleProvider: RoleProvider,
		public accessChecker: NbAccessChecker,
		private httpClient: HttpClient,
	) {

		LoopBackConfig.setBaseURL( BASE_URL );
		LoopBackConfig.setApiVersion( API_VERSION );

/*
		const enoviaAPI: string = 'http://qcd480a01.uk.parker.corp/documentSearch/DocumentSearchResultsXML.jsp';
		
		const headers = new HttpHeaders({ 'Content-Type': 'text/xml' }).set('Accept', 'text/xml');
		//const headers = new HttpHeaders( { 'Content-Type': 'text/xml' } ).set( 'Accept', 'text/xml' );
	
		let params = new HttpParams()
			.set( 'type', 'Part' )
			.set( 'revision', '*' )
			.set( 'name', '502KRAM12*' )
			.set( 'current', '*' )
			.set( 'short_description', '*' )
			.set( 'user', 'QCDEDocSearch' )
			.set( 'rdo', 'QCDE-Unrestricted' )
			.set( 'results_field', 'Type,Name,Revision,State,RDO,Short_Description,FileLink' )
	

		//let asdf = JSON.stringify( options ).replace( '{', '' ).replace( '}', '' )
		
		// console.log( params.toString() );

		try {
			this.httpClient.get( enoviaAPI, { headers: headers, responseType: 'text', params: params } ).subscribe( ( data: any ) => {
				
				data = data.trim();

				var parser = new XML2js.Parser({
					mergeAttrs : true
				});
				
				parser.parseString( data, ( err, result ) => {
					if ( err ) throw err;
					
					this.enoviaJSONdata = result.phcXML.data[ 0 ][ "z:row" ];

					console.log('Done');
				});

				//console.log( data );
			} )

		} catch {
			console.error( 'something went wrong' );
		} finally {
			console.log( 'enovia api query done...%O', this.enoviaJSONdata );
		}

		*/
	}
	
	
	ngOnInit() {

		this.alive = true;

		eva.replace( );

	}

	ngOnDestroy() {
		this.alive = false;
	}
/*
	timensionQuery(): void{
		this.log.inform( this.sName, 'Querying Timension', new Date() );

		const headers = new HttpHeaders ({
			Encoding			: 'gzip, deflate',
			Language			: 'de-DE,de;q=0.9,en-DE;q=0.8,en;q=0.7,en-US;q=0.6',
			Connection			: 'keep-alive',
			Cookie				: 'callingframe=; PHPSESSID=657d9j3vbdsr3o3jmida51o5v2',
			DNT					: '1',
			Host				: 'idc091a145',
			Referer				: 'http://idc091a145/timension/timension_php/index.php',
			Agent				: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36'
		})

		const queryParams = {
			comboinput0: 'Abrechnungskreis',
			comboinput999: 'keine Auswahl',
			feld999: '',
			feld999_wert: '',
			feld888: '',
			feld888_wert: '',
			comboinput1: 'Mehrfachauswahl',
			feld_vor: 'Profil 5',
			comboinput3: 'Di, 21.05.2019',
			feld05: '',
			comboinput4: 'Anwesend',
			parm_table: 'PzmAnAbwesend53_5',
			do: 'erstelleliste',
			action: 'erstelleListe',
			gruppe: '',
			datumvon: 'Di, 21.05.2019',
			uhrzeit: '',
			dspstatus: '',
			werte: '008;004;005;010;001;009;007;006;003;002;',
			dspgrund: '',
			sortierung: '',
			BCHKEY: 'new#anw#006#044#053#36#AD#021#14#144#146#145#148#147#35#35h#16#020#unf#unh#19#20#10#052#004#7#71#77#13#131#810#831#33#34#37#005#008#009#44#80#028#gs#014#5#hs#HS0#HS6#hsh#21#kmh#2#2a#2o#42#3#3R#222#122#22H#22#L#029#4#NDA#nst#p#042#003#054#046#017#PR#045#019#rp#12#043#27#24#25#28#32#013#15#8#6a#6#61#016#30#027#1#1h#9#015#26#18',
			HEADCHANGED: 'false',
			filterauswahl: '',
			filterwert: '',
			sortauswahl: '',
			sortart: 'asc',
			ausgabe: 'HTML',
		}

		this.httpClient.get( 'http://idc091a145/timension/timension_php/index.php', { headers: headers, params: queryParams } ).subscribe( response => {
			this.queryResult = response;
		})
	
		

	}

	*/
}