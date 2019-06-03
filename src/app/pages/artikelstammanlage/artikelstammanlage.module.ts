import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnlageformularComponent } from './anlageformular/anlageformular.component';
import { SucheComponent } from './suche/suche.component';
import { ListeComponent } from './liste/liste.component';
import { ArtikelstammanlageComponent } from './artikelstammanlage.component';
import { ArtikelstammanlageRoutingModule } from './artikelstammanlage-routing.module';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from 'app/@theme/theme.module';
import { NbInputModule, NbButtonModule, NbAlertModule, NbSpinnerModule, NbActionsModule, NbDialogModule } from '@nebular/theme';
import { HotTableModule } from '@handsontable/angular';


@NgModule( {
    declarations: [
        AnlageformularComponent,
        SucheComponent,
        ListeComponent,
        ArtikelstammanlageComponent,
    ],
    imports: [
        CommonModule,
        ArtikelstammanlageRoutingModule,
        FormsModule,
        ThemeModule,
        NbInputModule,
        NbButtonModule,
        NbAlertModule,
        NbSpinnerModule,
        NbActionsModule,
        HotTableModule.forRoot(),
        NbDialogModule.forRoot(),
    ],
} )
export class ArtikelstammanlageModule { }
