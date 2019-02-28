import { Component, OnInit } from '@angular/core';

@Component({
  selector: 	  'label-component',
  templateUrl: 	  './label.component.html',
  styleUrls: 	[ './label.component.scss' ]
})
export class LabelComponent implements OnInit {

    additional			: string = '';
	item				: string = '';
	ean					: string = '';
	cp					: string = '';
	size				: string = '';
	backgroundLabel		: string = '';
	wo					: string = '';
	type				: string = '';
	today				: number = Date.now();
	
	
    constructor() { }

    ngOnInit() {
		
		//alert(' Achtung, bitte legen Sie die _schmalen_ Labels in den Drucker und bestaetigen Sie!');
		
		//window.print();


        this.item = '07K08XLP001S';
	
		switch ( this.item ) {
			case '07K08XLP001S':
				this.cp = 'WD00120A';
				this.size = 'small';
				this.ean = '04042761082686';
				this.additional = '_W9052893';
				break;
			case '07K08XLP001S_01':
				this.cp = 'WD00120A';
				this.size = 'small';
				this.ean = '04042761082686';
				this.additional = '_W9052893';
				break;
			case '07K08XLP002S':
				this.cp = 'WD00121A';
				this.size = 'small';
				this.ean = '04042761082693';
				this.additional = '_W9052893';
				break;
			case '07K08XLP003S':	
				this.cp = 'WD00122A';
				this.size = 'small';
				this.ean = '04042761082709';
				this.additional = '_W9052893';
				break;
			case '07K08XLP003S_02':	
				this.cp = 'WD00122A';
				this.size = 'small';
				this.ean = '04042761082709';
				this.additional = '_W9052893';
				break;
			case 'M-07K08XLP003S':	
				this.cp = 'WD00122A';
				this.size = 'small';
				this.ean = '04042761082709';
				this.additional = '_W9052893';
				break;
			case '07K08XLP004S':
				this.cp = 'WD00123A';
				this.size = 'small';
				this.ean = '04042761077637';
				//this.additional = '_pentax';
				this.additional = '_W9053065_01';
				break;
			case '07K08XLP004S_01':
				this.cp = 'WD00123A';
				this.size = 'small';
				this.ean = '04042761077637';
				//this.additional = '_pentax';
				this.additional = '_W9053065_01';
				break;
			case '07K08XLP005S':
				this.cp = 'WD00124A';
				this.size = 'small';
				this.ean = '04042761082716';
				this.additional = '_W9053058';
				break;
			case '07K08XLP005S_01':
				this.cp = 'WD00124A';
				this.size = 'small';
				this.ean = '04042761082716';
				this.additional = '_W9053058';
				break;
			case '07K08XLP009S':
				this.cp = 'WD00129A';
				this.size = 'small';
				this.ean = '04042761085007';
				this.additional = '_W9209829';
				break;
			case '07K08XLP009S_01':
				this.cp = 'WD00129A';
				this.size = 'small';
				this.ean = '04042761085007';
				this.additional = '_W9209829';
				break;
			case 'SI06/03SET421/427':
				this.cp = 'WD00163A';
				this.size = 'big';
				this.ean = '04042761082730';
				this.additional = '_W9052917';
				break;
			case 'SI06/03SET421/427_02':
				this.cp = 'WD00163A';
				this.size = 'big';
				this.ean = '04042761082730';
				this.additional = '_W9052917';
				break;
			case 'SI06SET411':
				this.cp = 'WD00164A';
				this.size = 'big';
				this.ean = '04042761082747';
				this.additional= '_W9052917';
				break;
			case 'SI06SET411_08':
				this.cp = 'WD00164A';
				this.size = 'big';
				this.ean = '04042761082747';
				this.additional= '_W9052917';
				break;
			case 'SI06SET411_06':
				this.cp = 'WD00164A';
				this.size = 'big';
				this.ean = '04042761082747';
				this.additional= '_W9052917';
				break;
			case 'SI06/06SET414/419':
				this.cp = 'WD00165A';
				this.size = 'big';
				this.ean = '04042761082754';
				this.additional= '_W9052917';
				break;
			case 'SI06/06SET414/419_01':
				this.cp = 'WD00165A';
				this.size = 'big';
				this.ean = '04042761082754';
				this.additional= '_W9052917';
				break;
			case 'SI06/03SET414/427':
				this.cp = 'WD00166A';
				this.size = 'big';
				this.ean = '04042761083829';
				//this.additional = '_pentax';
				this.additional = '_W9200026_00';
				break;
			case 'SI06/03SET414/427_01':
				this.cp = 'WD00166A';
				this.size = 'big';
				this.ean = '04042761083829';
				//this.additional = '_pentax';
				this.additional = '_W9200026_00';
				break;
			case 'SI06/03SET414/427_02':
				this.cp = 'WD00166A';
				this.size = 'big';
				this.ean = '04042761083829';
				//this.additional = '_pentax';
				this.additional = '_W9200026_00';
				break;
        }
		
		if ( this.type == 'main' ) {
			this.backgroundLabel = this.cp + '.jpg';
		} else {
			if ( this.size == 'big' )
				this.backgroundLabel = 'big_additional' + this.additional + '.jpg';
			else
				this.backgroundLabel = 'small_additional' + this.additional + '.jpg';
		}
		
		this.ean = '(01)' + this.ean + '(10)' + this.wo;
		
			
	}
    
}
