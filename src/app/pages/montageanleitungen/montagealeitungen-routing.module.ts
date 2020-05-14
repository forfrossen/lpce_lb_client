import { NgModule 							} from '@angular/core';
import { RouterModule, Routes 				} from '@angular/router';

import { AuthGuard 							} from '../../@core/auth/auth-guard.service';
import { MontageanleitungenComponent 		} from './montageanleitungen.component';
import { PdfViewerComponent			 		} from './pdf-viewer/pdf-viewer.component';
import { SearchComponent			 		} from './search/search.component';
import { AnweisungenListComponent	 		} from './anweisungen-list/anweisungen-list.component';
import { AnweisungenViewerComponent	 		} from './anweisungen-viewer/anweisungen-viewer.component';
import { AnweisungenEditorComponent	 		} from './anweisungen-editor/anweisungen-editor.component';

const routes: Routes = [ {
	path: '',
	component: MontageanleitungenComponent,
	children: [
		{
			path: 'documentsearch',
			component: MontageanleitungenComponent,
		},
		{
			path: 'suche',
			component: SearchComponent,
		},
		{
			path: 'pdf-viewer',
			component: PdfViewerComponent,
		},
		{
			path: 'montageanleitungen',
			component: SearchComponent,
		},
		{
			path: 'montageanweisungen-liste',
			component: AnweisungenListComponent,
		},
		{
			path: 'montageanweisungen-viewer',
			component: AnweisungenViewerComponent,
		},
		{
			path: 'montageanweisungen-editor',
			component: AnweisungenEditorComponent,
		},
		{
			path: '',
			redirectTo: 'suche',
			pathMatch: 'full',
		},
	]
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
	],
	exports: [
		RouterModule,
	],
})

export class MontageanleitungenRoutingModule {
};
