import { NgModule							}	from '@angular/core';
import { FormsModule 						}	from '@angular/forms';
import { NbInputModule, NbButtonModule		}	from '@nebular/theme';
import { NbAlertModule, NbSpinnerModule		}	from '@nebular/theme';
import { NbActionsModule, NbDialogModule	}	from '@nebular/theme';
import { PdfViewerModule 					} 	from 'ng2-pdf-viewer';

import { ThemeModule, 						}	from '../../@theme/theme.module';

import { HotTableModule  					} 	from '@handsontable/angular';

import { MontageanleitungenRoutingModule	}	from './montagealeitungen-routing.module';
import { MontageanleitungenComponent 		}	from './montageanleitungen.component';
import { LabelComponent 					}	from './label/label.component';
import { PdfViewerComponent					}	from './pdf-viewer/pdf-viewer.component';
import { SearchComponent 					}	from './search/search.component';
import { AnweisungenViewerComponent 		}	from './anweisungen-viewer/anweisungen-viewer.component';
import { AnweisungenEditorComponent 		} 	from './anweisungen-editor/anweisungen-editor.component';
import { AnweisungenListComponent 			}	from './anweisungen-list/anweisungen-list.component';
@NgModule({
	imports: [
		FormsModule,
		ThemeModule,
		NbInputModule,
		NbButtonModule,
		MontageanleitungenRoutingModule,
		PdfViewerModule,
		NbAlertModule,
		NbSpinnerModule,
		NbActionsModule,
		HotTableModule.forRoot(),
		NbDialogModule.forRoot(),
	],
	declarations: [
		MontageanleitungenComponent,
		LabelComponent,
		PdfViewerComponent,
		SearchComponent,
		AnweisungenViewerComponent,
		AnweisungenEditorComponent,
		AnweisungenListComponent,
	],
	entryComponents: [
		MontageanleitungenComponent, SearchComponent
	],
	providers: [

	],
})

export class MontageanleitungenModule { }
