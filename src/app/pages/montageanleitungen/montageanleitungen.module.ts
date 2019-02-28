import { NgModule							}	from '@angular/core';
import { FormsModule 						}	from '@angular/forms';
import { BrowserAnimationsModule 			}	from '@angular/platform-browser/animations';
import { NbInputModule, NbButtonModule		}	from '@nebular/theme';
import { NbAlertModule, NbSpinnerModule		}	from '@nebular/theme';
import { PdfViewerModule 					} 	from 'ng2-pdf-viewer';

import { ThemeModule, 						}	from '../../@theme/theme.module';

import { MontageanleitungenRoutingModule	}	from './montagealeitungen-routing.module';
import { MontageanleitungenComponent 		}	from './montageanleitungen.component';
import { LabelComponent 					}	from './label/label.component';
import { PdfViewerComponent					}	from './pdf-viewer/pdf-viewer.component';
import { SearchComponent 					}	from './search/search.component';

@NgModule({
	imports: [
		FormsModule,
		ThemeModule,
		NbInputModule,
		NbButtonModule,
		MontageanleitungenRoutingModule,
		PdfViewerModule,
		NbAlertModule,
		NbSpinnerModule
	],
	declarations: [
		MontageanleitungenComponent,
		LabelComponent,
		PdfViewerComponent,
		SearchComponent,
	],
	entryComponents: [
		MontageanleitungenComponent, SearchComponent
	],
	providers: [

	],
})

export class MontageanleitungenModule { }
